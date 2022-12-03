//---------------CONEXION CON LA BASE DE DATOS---------------------- 
const firebaseConfig = {
    apiKey: "AIzaSyDTxvTiyRqLmJLZUvAqdufcM6AC_ZgSfTY",
    authDomain: "liga-basket.firebaseapp.com",
    projectId: "liga-basket",
    storageBucket: "liga-basket.appspot.com",
    messagingSenderId: "160475930465",
    appId: "1:160475930465:web:65843fe4a932208eb5af20",
    measurementId: "G-GVRPKCYGBB"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//-----------------RECUPERAR ID DEL CAMPEONATO SELECCIONADO----------------
var idEquipos="BwIx0ILfC0AL2KVQdpcX";
var urlPagina=window.location.search.substring(1).slice(6,-3);
urlPagina=urlPagina.replace("%20"," ");
console.log(urlPagina);

//-----------------LLENAR LOS CAMPOS CON LA INFROMACION PREVIA DE LOS EQUIPOS---------------

const idEquiposcade=[];

db.collection("Campeonatos").doc(urlPagina).collection("EquiposInscritos").get().then((querySnapshot) => {
var contador=0;
    querySnapshot.forEach((doc) => {
        idEquiposcade.push(doc.data().idEquipo)

        db.collection("Equipos").doc(doc.data().idEquipo).get().then((doc)=>{
            aux1.innerHTML+=`
            <div class="cont-formulario" id="formu1">

                        <div class="imagenLogo">
                               <img src="${doc.data().logo}" alt="" id="logocampeonato">
                        </div>
                        <div class="contenido">
                            <p id="titulo">${doc.data().nombreEquipo}</p>
                            <div class="rama">
                                <div class="texto-info">
                                    <p id="informacion">Rama: ${doc.data().rama}</p>
                                    <p id="informacion">Categoria: ${doc.data().categoria}</p>
                                </div> 
                                
                                <div class="boton">
                                    <button title="Ingresar" onclick="acceso(this)" name="detalles equipo" id="${contador}">DETALLES</button>
                                </div>
                            </div>
                            
                        </div>
                        
                   </div> 
            `
        });

    });
    contador=contador+1;
   console.log(idEquiposcade);
}); 



function acceso(datosBoton){
    location.href=`verificarInscripcion.html?id='${idEquiposcade[datosBoton.id-1]}'`;
}