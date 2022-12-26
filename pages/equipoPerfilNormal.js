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

let idEquipo = parametrosURL.get('id')
console.log(idEquipo)

db.collection("Equipos").doc(idEquipo).get().then((doc) => {

    let logoEqui = document.getElementById("logoEquipo1");
    idEquipoDE = doc.data().idDelegado;
    logoEqui.src = doc.data().logo;
    nombre1.innerText = doc.data().nombreEquipo;
    cate.innerText = doc.data().categoria;
    ram.innerText = doc.data().rama;

    db.collection("userData").doc("user").collection(idEquipoDE).doc("datos iniciales").get().then((doc1) => {
        nombre2.innerText = doc1.data().Nombre;
    });
});

db.collection("Equipos").doc(idEquipo).collection("Jugadores").get().then((querySnapshot) => {
    credencialesaux1.innerHTML = ``;
    querySnapshot.forEach((doc1) => {
        credencialesaux1.innerHTML += `
        <div class="cont-credenciales" id="contcredenciales1">
          <img src="${doc1.data().fotoperfil}" alt="" id="foto-credencial">
            <div class="datos-credencial">
                <p id="nombre-Jugador">${doc1.data().nombre}</p>                
            </div>
                <div class="botonPerfilJugador">
                <button title="perfilJugador" name="${idEquipo}" onclick="verPerfil(this)" id="${doc1.data().nombre}">Ver Perfil</button>
            </div>
        </div>
        `
    });
});

function verPerfil(nomJug) {
    location.href = `perfilJugador_delegado.html?id=${nomJug.id}&team=${nomJug.name}`;
}