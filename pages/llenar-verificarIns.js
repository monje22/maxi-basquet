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


const contenidoInicial=document.querySelectorAll('#cont-1');
const imagenResivo=document.getElementById('logo');

//-------------AQUI SE OPTIENE EL URL DE LA PAGINA PARA DECIFRAR EL ID USUARIO---------------
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var idUrl=urlParams.get('id');
var idVerdadero=urlParams.get('idEquipo');
var idCampe=urlParams.get('idCampeonato');



db.collection("Equipos").doc(idUrl).get().then((doc) => {

    var axx=document.getElementById('logocampeonato');
    var aux2=document.getElementById('titulo');
    var aux3=document.getElementById('texto-info1')
    axx.src=doc.data().logo;
    aux2.innerText=doc.data().nombreEquipo;
    aux3.innerHTML+=`
    <p id="informacion">Rama: ${doc.data().rama}</p>
    <p id="informacion">Categoria: ${doc.data().categoria}</p>
    `
    //---------LLENAR DATOS DEL DELEGADO----------
    var datosdele=document.getElementById("nombre1");
    var telefDele=document.getElementById("telefono1");
    var datosCi=document.getElementById("datCi");
    console.log(datosdele,telefDele);
    db.collection("userData").doc("user").collection(doc.data().idDelegado).doc("datos iniciales").get().then((doc2)=>{
       datosdele.innerText=doc2.data().Nombre;
       telefDele.innerText="Telefono: "+doc.data().celularDele;
       datosCi.innerText="Ci: "+doc.data().ci;
    });

    db.collection("Equipos").doc(idUrl).collection("Jugadores").get().then((querySnapshot) => {
        credencialesaux1.innerHTML=``;
        querySnapshot.forEach((doc1) => {
            credencialesaux1.innerHTML+=`
            <div class="cont-credenciales" id="contcredenciales1">
              <img src="${doc1.data().fotoperfil}" alt="" id="foto-credencial">
                <div class="datos-credencial">
                    <p id="nombre-Jugador">${doc1.data().nombre}</p>
                    <p>Nacionalidad: ${doc1.data().nacionalidad}</p>
                    <p>Edad: ${doc1.data().edad} años</p>
                    <p>Peso: ${doc1.data().peso}kg</p>
                    <p>Altura: ${doc1.data().altura}cm</p>
                    <p>Cedula de Identidad: ${doc1.data().cedula1}</p>
                </div>
                    <img src="${doc1.data().qr}" alt="" id="img-qr">
            </div>
            `
        });
    });  


}); 

//-------------METODO QUE RECHAZA AL EQUIPO INSCRITO------------
function leerDatos(){
    db.collection("Campeonatos").doc(idCampe).collection("EquiposInscritos").doc(idVerdadero).update({
        aceptado:true
    });
    cerarModal();
}

//----------------METODO QUE HABRE LOS MODALS---------------
var modalito=document.querySelector('#contmodal');
var modalito2=document.querySelector('#contmodal2')

function abrirModal2(){
    modalito2.showModal();
}



function abrirModal(){
 modalito.showModal();
}
function cerarModal(){
    modalito.close();
    modalito2.close();
    
}
function redireccionar1(){
    window.history.back();
}

