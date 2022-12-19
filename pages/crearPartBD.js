const firebaseConfig = {
    apiKey: "AIzaSyDTxvTiyRqLmJLZUvAqdufcM6AC_ZgSfTY",
    authDomain: "liga-basket.firebaseapp.com",
    projectId: "liga-basket",
    storageBucket: "liga-basket.appspot.com",
    messagingSenderId: "160475930465",
    appId: "1:160475930465:web:65843fe4a932208eb5af20",
    measurementId: "G-GVRPKCYGBB"
};



/**
 * @constant app Conexion a la API de Firebase
 * @constant auth Base de datos encargada unicamente de los usuarios (correo y contraseña)
 * @let db Base de datos que almacena cualquier tipo de informacion(texto) en colecciones
 */
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let db = firebase.firestore();
const storageRef = firebase.storage().ref();

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        let correo = user.email;
        console.log("si esta logueado")
        let bandera = correo.search(/@one.com/i);
        if (bandera < 0) {
            window.location.href = "HomeDelegado.html"
        }
        //console.log(user)
        // ...
    } else {
        // User is signed out
        // ...
        console.log("no esta logueado")
        window.location.href = "login.html"
    }
});
const camp = db.collection("Campeonatos").get()

const idc = window.location.href.slice(-1)
camp.then((querySnapshot) => {
    let doc = querySnapshot.docs;
    let lim = querySnapshot.size;
    document.getElementById("tiCamp").innerText = doc[idc].data().NomCamp
    document.getElementById("imgL").src = doc[idc].data().Logo
    document.getElementById("cat").innerText = doc[idc].data().Categoria
    const equipos = db.collection("Campeonatos").doc(doc[idc].data().NomCamp).collection("EquiposInscritos").get()
    equipos.then((querySnapshot1) => {
        let docu = querySnapshot1.docs;
        let limi = querySnapshot1.size;
        document.getElementById("equipo1").innerHTML = `<option selected value="0">Elegir Equipo...</option>`
        document.getElementById("equipo2").innerHTML = `<option selected value="0">Elegir Equipo...</option>`
        for (i = 0; i < limi; i++) {
            document.getElementById("equipo1").innerHTML += `<option value="${i + 1}">${docu[i].data().idEquipo}</option>`
            document.getElementById("equipo2").innerHTML += `<option value="${i + 1}">${docu[i].data().idEquipo}</option>`
        }

        /*get().then((docu) => {
                if (docu.exists) {
                    console.log("Document data:", docu.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No existe el documento!");
                }
            }).catch((error) => {
                console.log("Error al adquirir los datos:", error);
            });*/
    })


});

function agregarPart() {
    camp.then((querySnapshot) => {
        let doc = querySnapshot.docs;
        let equipo1p = document.getElementById("equipo1")
        let equipo1 = equipo1p.options[equipo1p.selectedIndex].text;
        let equipo2p = document.getElementById("equipo2")
        let equipo2 = equipo2p.options[equipo2p.selectedIndex].text;
        let fecha = document.getElementById("Fecha_encuentro").value;
        let hora = document.getElementById("tiempo").value;
        const initialData = {
            Equipo1: equipo1,
            Equipo2: equipo2,
            Fecha: fecha,
            Hora: hora
        }
        db.collection('Campeonatos').doc(doc[idc].data().NomCamp).collection("Partidos").add(initialData)
            .then(() => {
                console.log("Guardado Exitoso");
            })
            .catch((error) => {
                console.error("Error : ", error);
            });
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
}