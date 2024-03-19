import {
  db,
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  collectionGroup,
} from "../lib/firebase.js";
import { prisma } from "../lib/prisma.js";
import {
  conversorFechaToISO,
  conversorFechaDate,
  conserverStrBool,
  obtenerUsuarios,
  obtenerEstadoCuenta,
  obtenerCuentas,
} from "../lib/conversor.js";

const usuariosCollection = collection(db, "usuarios");

const unListenUser = onSnapshot(
  usuariosCollection,
  (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added" || change.type === "modified") {
        if (change.doc.data().estadoCuenta === true) {
          const usuarioDataModificado = change.doc.data();
          console.log("Usuario modificado:", usuarioDataModificado);

          ModificarUsuario(usuarioDataModificado);
        }
      }
      if (change.doc.data().estadoCuenta === false) {
        console.log("FALSOOO");
        const newFecha = conversorFechaToISO(change.doc.data().fechaNacimiento);
        const objCuentas = await obtenerEstadoCuenta(
          change.doc.data().estadoCuenta,
          change.doc.data().uid,
          newFecha,
          change.doc.data().correo
        );
        console.log(objCuentas);
        console.log("desactivado");
      }

      if (change.type === "removed") {
        //logica para remover al usuario de postgre
        console.log("Usuario eliminado:", change.doc.data());
      }
    });
  },
  (error) => {
    console.error("Error al obtener los usuarios:", error);
  }
);

async function ModificarUsuario(usuarioDataModificado) {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    uid,
    correo,
    estadoCuenta,
    fechaNacimiento,
  } = usuarioDataModificado;
  const objCuentas = await obtenerCuentas();
  console.log(estadoCuenta);
  const newFecha = conversorFechaToISO(fechaNacimiento);
  for (const usuario of objCuentas) {
    if (usuario.nomu_fb_uid === uid) {
      try {
        const actualizarCuenta = await prisma.usuario.upsert({
          where: {
            nomu_id: usuario.nomu_id,
          },
          create: {
            usu_fechanac: newFecha,
            usu_correo: correo,
            usu_estado_cuenta: estadoCuenta,
            Nombre_Usuario: {
              create: {
                nomu_nombre: nombre,
                nomu_appat: apellidoPaterno,
                nomu_apmat: apellidoMaterno,
              },
            },
          },
          update: {
            usu_estado_cuenta: estadoCuenta,
            Nombre_Usuario: {
                create: {
                  nomu_nombre: nombre,
                  nomu_appat: apellidoPaterno,
                  nomu_apmat: apellidoMaterno,
                },
              },
          },
        });

        console.log("Se actualizo con exito", actualizarCuenta);
      } catch (error) {
        console.error("Error al actualizar datos del usuario:", error);
      }

      console.log("Actualizando...."); //actualizar datos
    }
  }
}
