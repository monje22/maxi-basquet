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
const auth = firebase.auth();

//-----------------RECUPERAR ID DEL CAMPEONATO SELECCIONADO----------------

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var urlPagina=urlParams.get('id');
console.log(urlPagina);


//-----------------RECUOERAR ID USUARIO--------------   

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("si esta logueado")
        console.log(user)
            // ...
    } else {
        // User is signed out
        // ...
        console.log("no esta logueado")
        window.location.href="../index.html";
        
    }
});

//-----------------CERRAR SESION-----------------

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
}


//-----------------LLENAR LOS CAMPOS CON LA INFROMACION PREVIA DE LOS EQUIPOS---------------

const idEquiposcade=[];
const idVerdadero=[];
db.collection("Campeonatos").doc(urlPagina).collection("EquiposInscritos").where("aceptado","==",false).get().then((querySnapshot) => {
var contador=0;

    querySnapshot.forEach((doc) => {
        idVerdadero.push(doc.id);
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
            contador=contador+1;
        });
        
    });
   console.log(idEquiposcade);
}); 



function acceso(datosBoton){
    location.href=`verificarInscripcion.html?id=${idEquiposcade[datosBoton.id]}&idEquipo=${idVerdadero[datosBoton.id]}&idCampeonato=${urlPagina}`;
}