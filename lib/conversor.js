import { prisma } from "../lib/prisma.js";
function conversorFechaToISO(fecha) {
  const objFecha = new Date(fecha);

  const fechaPrisma = new Date(objFecha).toISOString();
  return fechaPrisma;
}

function conversorFechaDate(fecha) {
  const objFecha = new Date(fecha);
  const tiemstamp = objFecha.toISOString();
  return tiemstamp;
}

function conserverStrBool(bool) {
  const booleano = new Boolean(bool) ? true : false;
  return booleano;
}

async function obtenerUsuarios() {
  const objNombreUsuario = await prisma.nombre_Usuario.findMany({});
  return objNombreUsuario;
}

async function obtenerCuentas() {
    const objCuenta = await prisma.usuario.findMany({})
    return objCuenta
}

async function obtenerEstadoCuenta(edo, uid) {

  
  const objUsuarios = await obtenerUsuarios()

  const objCuentas = await obtenerCuentas()
  console.log("AQUIIIIIIIIII",edo)
  for (const usuario of objUsuarios) {
      
      if (usuario.nomu_fb_uid === uid) {
        for (const cuentas of objCuentas) {
            
            try {
              const actualizarCuenta = await prisma.usuario.update({
                where: {
                  usu_id: usuario.usu_id,
                  AND: {
                    nomu_id: cuentas.nomu_id
                  }
                },
                data: {
                    usu_estado_cuenta: edo,
                },
              });
      
              console.log("Se actualizo con exito EL ESTADO", actualizarCuenta);
              return actualizarCuenta
            } catch (error) {
              console.error("Error al actualizar datos del usuario:", error);
              return null
            }
        }
    } else {
        console.log("HAY UN ERROR DE LOGICA")
    }
  }
}
export {
  conversorFechaToISO,
  conversorFechaDate,
  conserverStrBool,
  obtenerUsuarios,
  obtenerEstadoCuenta,
  obtenerCuentas
};
