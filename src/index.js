import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";
import pkg from "pg";
const { Client } = pkg;

const firebaseConfig = {
  apiKey: "AIzaSyBEcjGyiFFkHELCiZnA_6AeUFVVy_J1LEc",
  authDomain: "prueba-docker-f4ba0.firebaseapp.com",
  projectId: "prueba-docker-f4ba0",
  storageBucket: "prueba-docker-f4ba0.appspot.com",
  messagingSenderId: "228251118350",
  appId: "1:228251118350:web:a9c9d51007fa8e5c14855f",
};
const postgressConfig = {
  host: "ceu9lmqblp8t3q.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "d3nti5jnr2u6dg",
  user: "ue7mkb7g5m9lh3",
  password: "p60ba528dddcc490233f3734bafad9fe71114a9b98a1358f8522cb4785340a30a",
  ssl: {
    rejectUnauthorized: false,
  },
};

const postgressClient = new Client(postgressConfig);

const client = new Client(postgressClient);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const reportesCol = collection(db, "Reportes");
const usuariosCol = collection(db, "Usuarios");

const reporteData = [];
const usuarioData = [];


async function insertarDatosEnBaseDeDatos(client)  {

   
}


const reportListener = onSnapshot(reportesCol, async (querySnapshot) => {
    try {
      await client.connect(); // Conectar a la base de datos una vez
  
      querySnapshot.forEach(async (doc) => {
        const {
          fechaReporte,
          estado,
          nombre,
          apellidoPaterno,
          imagenURL,
          ubicacion,
          descripcion,
          uidUsuario,
        } = doc.data();
  
        const id = doc.id;
  
        reporteData.push(
          fechaReporte,
          estado,
          nombre,
          apellidoPaterno,
          imagenURL,
          ubicacion,
          descripcion,
          uidUsuario
        );
  
        // Aquí deberías ejecutar la consulta correspondiente para insertar los datos en la base de datos
        // Por ejemplo, algo como esto:
        try {
            const res = await client.query('SELECT * FROM "Alcaldia" a');
            const result = res.rows;
            return result;
          } catch (error) {
            console.error("Error al insertar datos en la base de datos", error);
            throw error;
          }
      
      });
    } catch (error) {
      console.error("Error al conectar con la base de datos", error);
    } finally {
      await client.end(); // Desconectar la base de datos al finalizar
    }
  });

const userListener = onSnapshot(usuariosCol, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const {
      apellidoMaterno,
      correo,
      disabled,
      fechaNacimiento,
      imagenURL,
      rol,
      uid,
    } = doc.data();

    usuarioData.push(
      apellidoMaterno,
      correo,
      disabled,
      fechaNacimiento,
      imagenURL,
      rol,
      uid
    );
    return usuarioData;
  });
});

/* 
const obtenerCategorias = async () => {
    const client = new Client(postgressConfig);
    await client.connect();
    
    const res = await client.query('SELECT * FROM "Alcaldia" a');
    
    const result = res.rows;
    
    await client.end();
    
    return result;
}; 

obtenerCategorias().then((result) => {
    console.log(result);
});

*/

/*

 querySnapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added' || change.type === 'modified') {
          
          try {
            await postgressClient.connect();
            // Realizar operaciones de inserción o modificación en la base de datos PostgreSQL
            // Por ejemplo:
            await postgressClient.query('INSERT INTO Reportes (rep_ubicacion, rep_descripcion, rep_imagenURL) VALUES ($1, $2, $3)', [change.doc.data.ubicacion, change.doc.data.descripcion, change.doc.data.imagenURL]);
          } catch (error) {
            console.error('Error al insertar en PostgreSQL:', error);
          } finally {
            await postgressClient.end();
          }
        } else if (change.type === 'removed') {
          // Manejar eliminaciones en PostgreSQL si es necesario
        }
      });
      
      */
// Initialize Firebase

/* //aqui se llaman todas las funciones que se van a ejecutar
//1. TRAER LOS DATOS DE FIREBASE USANDO UN TRIGGER
import express from 'express'

const app = express();

app.get("/", (req, res) => {
  res.send("si");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
 */
