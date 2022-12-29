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

function calcularEdad(fechaNacimiento) {
    var fechaActual = new Date();
    var anoActual = parseInt(fechaActual.getFullYear());
    var mesActual = parseInt(fechaActual.getMonth()) + 1;
    var diaActual = parseInt(fechaActual.getDate());

    // 2016-07-11
    var anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
    var mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
    var diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

    let edad = anoActual - anoNacimiento;
    if (mesActual < mesNacimiento) {
        edad--;
    } else if (mesActual === mesNacimiento) {
        if (diaActual < diaNacimiento) {
            edad--;
        }
    }
    console.log("la edad de este juador es:" + edad);
    return edad;
};

db.collection("Equipos").doc(idEquipo).collection("Jugadores").doc(idJug).get().then((doc) => {
    let img = document.getElementById("img-perfil")
    img.src = doc.data().fotoperfil
    Nombre.innerText = doc.data().nombre

    Edad.innerText = calcularEdad(doc.data().edad)
    let fechaN = document.getElementById("fecha-nac")
    fechaN.innerText = doc.data().edad
    nacionalidad.innerText = doc.data().nacionalidad
    altura.innerText = doc.data().altura
    peso.innerText = doc.data().peso
    equipo.innerText = idEquipo

})

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
}