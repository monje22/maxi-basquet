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

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var urlPagina=urlParams.get('id');
console.log(urlPagina);


var idEquipoDE="";

//--------------FUNCION QUE OPTINE EL ID DEL EQUIPO DEL DELEGADO------------
/*db.collection("Equipos").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
        var aux=doc.data().idDelegado;
       if(aux==urlPagina){
        console
        idEquipoDE=aux;
       }
    });
}); TAL VES LO USES MAS TARDE   */

//-----------------LLENAR LOS CAMPOS CON LA INFROMACION PREVIA DEL EQUIPO-----------------

db.collection("Equipos").doc(urlPagina).get().then((doc)=>{

    var logoEqui=document.getElementById("logoEquipo1");
    idEquipoDE=doc.data().idDelegado;
    logoEqui.src=doc.data().logo;
    nombre1.innerText=doc.data().nombreEquipo;
    telefono1.innerText=doc.data().celularDele;
    cate.innerText=doc.data().categoria;
    ram.innerText=doc.data().rama;

    db.collection("userData").doc("user").collection(idEquipoDE).doc("datos iniciales").get().then((doc1)=>{
        nombre2.innerText=doc1.data().Nombre;

    });


});

db.collection("Equipos").doc(urlPagina).collection("Jugadores").get().then((querySnapshot)=>{
     
    querySnapshot.forEach((doc)=>{
           
    });
});

//-------------LLENAR LOS DATOS DE LOS JUGADORES --------------

db.collection("Equipos").doc(urlPagina).collection("Jugadores").get().then((querySnapshot) => {
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


//----------------METODO QUE HABRE EL MODAL---------------
var modalito=document.querySelector('#contmodal');
var modalito2=document.querySelector('#contmodal2');


function abrirModal(){
 modalito.showModal();
}
function cerarModal(){
    modalito.close();
    
}
 async function redireccionar1(){
    await db.collection("Equipos").doc(urlPagina).update({
        verificado:true
    }).catch((error) => {
        console.error("Error al eliminar el documento: ", error);
    });

     window.history.back();
}
function leerDatos(){
modalito2.showModal();
}
function cerarModal2(){
    modalito2.close();
    
}

async function eliminarEquipo(){
    var text=document.getElementById('floatingTextarea2').value;
    await db.collection("userData").doc("user").collection(idEquipoDE).doc("notificaciones").set({
        informe:"Su Equipo no fue aprobado por los siguentes motivos:"+text,
        fecha:new Date()
    }).catch((error) => {
        console.error("Error al eliminar el documento: ", error);
    });
    /*
    db.collection("Equipos").doc(urlPagina).delete().then(() => {
        console.log("Se a eliminado el documento correctamente");
    }).catch((error) => {
        console.error("Error al eliminar el documento: ", error);
    });---------POR SI SE DESEA ALIMINAR EL EQUIPO UNA VES QUE                  */
    window.history.back();
}