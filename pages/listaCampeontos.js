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
/*
db.collection("Patidos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        document.getElementById("titulo").innerHTML=`${doc.data().Titulo}`
        document.getElementById("informacion").innerHTML=`${doc.data().Información}`
        document.getElementById("estado").innerHTML="Estado: "+`${doc.data().Estado}`
    });
});
*/
const idCampeonatos=[];//esta variable contiene un arreglo con los ids de los campeonatos mostrados en la pagina


db.collection("Campeonatos").get().then((querySnapshot) => {
    var contador=0;
    aux1.innerHTML+=``;
    querySnapshot.forEach((doc) => {
        aux1.innerHTML+=`
        <div class="cont-formulario" id="formu1">
                <div class="imagenLogo">
                     <img src="${doc.data().Logo}" alt="" id="logocampeonato">
                </div>
           <div class="contenido">
                <p id="titulo">${doc.data().NomCamp}</p>
                <p id="informacion">${doc.data().Invitacion}</p>
                <p id="estado">Rama:  ${doc.data().Rama}</p>
                <p id="estado">Categoria :  ${doc.data().Categoria}</p>
                <p id="estado">Fecha de Inicio :  ${doc.data().FechaInicio}</p>
                <p id="estado">Fecha de Finalizacion :  ${doc.data().FechaFinal}</p>
              <div class="boton">
                    <button title="Ingresar" onclick="acceso(this)" name="Inscribirse" id="${contador}">VER INSCRITOS</button>
              </div>
           </div>
        </div>
        `
    console.log(querySnapshot.docs[contador].id);
    idCampeonatos.push(querySnapshot.docs[contador].id);
    contador++;
    });
}); 
 

//---------------------------METODO QUE ENVIA DATOS EN LA URL A OTRA PAGINA-------------------------
function acceso(auxId){
    //aqui tiene que ir la pagina del fabricho no te olvides cambiarlo
    console.log(auxId.id);
     location.href=`verEquiposInscritos.html?id='${idCampeonatos[auxId.id]}'`;
}