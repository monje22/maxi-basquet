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

let idJug = parametrosURL.get('id')
let idEquipo = parametrosURL.get('team')
console.log(idJug)
console.log(idEquipo)

db.collection("Equipos").doc(idEquipo).collection("Jugadores").doc(idJug).get().then((doc) => {
    let img = document.getElementById("img-perfil")
    img.src = doc.data().fotoperfil
    Nombre.innerText = doc.data().nombre
    Edad.innerText = doc.data().edad
    let fechaN = document.getElementById("fecha-nac")
    fechaN.innerText = doc.data().edad
    nacionalidad.innerText = doc.data().nacionalidad
    altura.innerText = doc.data().altura
    peso.innerText = doc.data().peso
    equipo.innerText = idEquipo

})