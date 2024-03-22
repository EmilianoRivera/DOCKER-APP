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
  obtenerCuentas,
} from "../lib/conversor.js";

const usuariosCollection = collection(db, "usuarios");

const unListenUser = onSnapshot(
  usuariosCollection,
  (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const usuarioData = change.doc.data();
      if (change.type === "added" || change.type === "modified") {
       
        
          await CRUDUsuario(usuarioData);
        
      }

      if (change.type === "removed") {
        //logica para remover al usuario de postgre
        console.log("Un usuario se ha eliminado:", change.doc.data());
      }
    });
  },
  (error) => {
    console.error("Error al obtener los usuarios:", error);
  }
);


async function CRUDUsuario(usuarioDataCreado){
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    uid,
    correo,
    estadoCuenta,
    fechaNacimiento,
  } = usuarioDataCreado;
  const newFecha = conversorFechaToISO(fechaNacimiento);
  console.log(estadoCuenta)
  try {
    const objCuentas = await obtenerCuentas();
    const usuarioExistenteIndex = objCuentas.findIndex(cuenta => cuenta.usu_fb_uid === uid);

    if (usuarioExistenteIndex !== -1) {
      // El usuario ya existe, actualizamos sus datos
      const usuarioExistente = objCuentas[usuarioExistenteIndex];
      const actualizarUsuario = await prisma.usuario.update({
        where: { usu_id: usuarioExistente.usu_id },
        data: {
          usu_estado_cuenta:estadoCuenta,
          Nombre_Usuario: {
            update: {
              nomu_nombre: nombre,
              nomu_appat: apellidoPaterno,
              nomu_apmat: apellidoMaterno,
            },
          },
        },
      });
      console.log("Usuario actualizado con éxito", actualizarUsuario);
    } else {
      // El usuario no existe, crearlo
      const crearCuenta = await prisma.usuario.create({
        data: {
          usu_fechanac: newFecha,
          usu_correo: correo,
          usu_estado_cuenta: estadoCuenta,
          usu_fb_uid: uid,
          Nombre_Usuario: {
            create: {
              nomu_nombre: nombre,
              nomu_appat: apellidoPaterno,
              nomu_apmat: apellidoMaterno,
            },
          },
        },
      });
      console.log("Usuario creado con éxito", crearCuenta);
    }
  } catch (error) {
    console.error("Error al crear o actualizar datos del usuario:", error);
  }
}