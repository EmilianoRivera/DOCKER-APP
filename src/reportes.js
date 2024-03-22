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
  obtenerReportes
} from "../lib/conversor.js";

const reportesCollection = collection(db, "Reportes");

const unListenReport = onSnapshot(
  reportesCollection,
  (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const reporteData = change.doc.data();
      if (change.type === "added" || change.type === "modified") {
        console.log("Se escucho el cambio")
        await CRUDReporte(reporteData);
      }

      if (change.type === "removed") {
        //logica para remover al reporte de postgre
        console.log("Un reporte se ha eliminado:", change.doc.data());
      }
    });
  },
  (error) => {
    console.error("Error al obtener los reportes:", error);
  }
);

async function CRUDReporte(reporteDataCreado) {
  const {
    apellidoPaterno,
    descripcion,
    estado, //estado del reporte
    fechaReporte,
    imagenURL,
    nombre,
    ubicacion,
    uid,
  } = reporteDataCreado;
  const newFecha = conversorFechaToISO(fechaReporte);
  console.log(estado);

  try {
    console.log(apellidoPaterno, " ", descripcion, " ", fechaReporte, " ", imagenURL, " ", nombre, " ", ubicacion, " ", uid)
  } catch (error) {
    console.error("Error al crear o actualizar datos del usuario:", error);
  }
}
