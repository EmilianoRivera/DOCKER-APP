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

async function obtenerReportes () {
  //const objReportes = await prisma.reportes.findMany({})
  //return objReportes
}
export {
  conversorFechaToISO,
  conversorFechaDate,
  conserverStrBool,
  obtenerUsuarios,
  obtenerCuentas,
  obtenerReportes
};
