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
const paramURL = window.location.search;
console.log(paramURL);

const parametrosURL = new URLSearchParams(paramURL);
console.log(typeof(parametrosURL));

for (let valoresURL of parametrosURL) {
    console.log(valoresURL)
}

let idCamp = parametrosURL.get('id')
console.log(idCamp)

db.collection("Campeonatos").doc(idCamp).collection("EquiposInscritos").get().then((doc) => {
    let docs = doc.docs
    let lim = doc.size;
    console.log(docs[0].data().idEquipo)
    for (let i = 0; i < lim; i++) {
        equipo = docs[i].data().idEquipo
        db.collection("Equipos").get().then((querySnapshot) => {
            let eq = querySnapshot.docs
            let limi = querySnapshot.size
            for (let j = 0; j < limi; j++) {
                if (equipo == eq[j].data().nombreEquipo) {
                    aux1.innerHTML += `
                    <div class="cont-formulario" id="formu1">
        
                                <div class="imagenLogo">
                                       <img src="${eq[j].data().logo}" alt="" id="logocampeonato">
                                </div>
                                <div class="contenido">
                                    <p id="titulo">${eq[j].data().nombreEquipo}</p>
                                    <div class="rama">
                                        <div class="texto-info">
                                            <p id="informacion">Rama: ${eq[j].data().rama}</p>
                                            <p id="informacion">Categoria: ${eq[j].data().categoria}</p>
                                        </div> 
                                        
                                        <div class="boton">
                                            <button title="Ingresar" onclick="acceso(this)" name="detalles equipo" id="${eq[j].data().nombreEquipo}">DETALLES</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                        </div> 
                    `
                }
            }


        })
    }

})

function acceso(datosBoton) {

    //location.href=`verificarInscripcion.html?id='${idEquiposcade[datosBoton.id-1]}'`;-------ESTE ES EL ORIGINAL

    console.log(datosBoton.id)
    location.href = `equipoPerfil.html?id=${datosBoton.id}`;
}