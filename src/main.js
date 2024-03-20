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
      if (change.type === "added"||change.type === "modified") {
        if (change.doc.data().estadoCuenta === true) {
          const caso = 1;
          const usuarioDataCreado = change.doc.data();
          console.log("Se ha creado un usuario:", usuarioDataCreado);

          CRUDUsuario(usuarioDataCreado, caso);
        }
      }

      /* if (change.type === "modified") {
        const caso = 2;
        const usuarioDataModificado = change.doc.data();
        console.log("Se ha modificado un usuario:", usuarioDataModificado);

        CRUDUsuario(usuarioDataModificado, caso);
      } */

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

  try {
    const objCuentas = await obtenerCuentas();
    const usuarioExistenteIndex = objCuentas.findIndex(cuenta => cuenta.usu_fb_uid === uid);

    if (usuarioExistenteIndex !== -1) {
      // El usuario ya existe, actualizamos sus datos
      const usuarioExistente = objCuentas[usuarioExistenteIndex];
      const actualizarUsuario = await prisma.usuario.update({
        where: { usu_id: usuarioExistente.usu_id },
        data: {
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
/* 
async function CRUDUsuario(usuarioDataCreado, casos) {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    uid,
    correo,
    estadoCuenta,
    fechaNacimiento,
  } = usuarioDataCreado;
  const caso = casos;
  const newFecha = conversorFechaToISO(fechaNacimiento);
  if (caso === 1) {
    try {
      const  objCuentas = await obtenerCuentas();      if (Array.isArray(objCuentas) && objCuentas.length !== 0) {
        console.log("Existen mas usuarios")
        for (const cuentas of objCuentas) {
          console.log("llega al for")

          if (cuentas.usu_fb_uid === uid) {
            console.log("Usuario ya creado");
          } 
          
          else if(cuentas.usu_fb_uid !== uid) {
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
            console.log("Se creo con exito", crearCuenta);
          } 
          
          else {
            console.log("Error al crear usuario")
          }
        }
      } else if((await objCuentas).length == 0) {
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
        console.log("Se creo con exito", crearCuenta);
      }
    } catch (error) {
      console.error("Error al crear datos del usuario:", error);
    }
  } else if (caso === 2) {
    const objCuenta = obtenerCuentas();
    console.log((await objCuenta).length);
    console.log(typeof objCuenta);
    try {
      for (const cuenta in objCuenta) {
        console.log(cuenta);
        if (cuenta.usu_fb_uid === uid) {
          const modificarCuenta = await prisma.nombre_Usuario.update({
            where: {
              nomu_id: cuenta.nomu_id, // este es FK de usuario
            },
            data: {
              update: {
                nomu_nombre: nombre,
                nomu_appat: apellidoPaterno,
                nomu_apmat: apellidoMaterno,
              },
            },
          });

          console.log("Se modifico usuario con exito", modificarCuenta);
        }
      }
    } catch (error) {
      console.error("Error al modificar datos del usuario:", error);
    }
  }
}
 */
/*
   try {
        const actualizarCuenta = await prisma.usuario.create({
          
        });

        console.log("Se actualizo con exito", actualizarCuenta);
      } catch (error) {
        console.error("Error al actualizar datos del usuario:", error);
      }
 */
