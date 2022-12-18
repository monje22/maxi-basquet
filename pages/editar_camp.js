// const firebaseConfig = {
//     apiKey: "AIzaSyDTxvTiyRqLmJLZUvAqdufcM6AC_ZgSfTY",
//     authDomain: "liga-basket.firebaseapp.com",
//     projectId: "liga-basket",
//     storageBucket: "liga-basket.appspot.com",
//     messagingSenderId: "160475930465",
//     appId: "1:160475930465:web:65843fe4a932208eb5af20",
//     measurementId: "G-GVRPKCYGBB"
// };



// /**
//  * @constant app Conexion a la API de Firebase
//  * @constant auth Base de datos encargada unicamente de los usuarios (correo y contraseña)
//  * @let db Base de datos que almacena cualquier tipo de informacion(texto) en colecciones
//  */
// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// let db = firebase.firestore();
// const storageRef = firebase.storage().ref();

const camp = db.collection("Campeonatos").get()
const idc = window.location.href.slice(-1)
camp.then((querySnapshot) => {
    let doc = querySnapshot.docs;
    const logo = document.getElementById("logo");
    logo.src = doc[idc].data().Logo;
    document.getElementById("Nombre").value = doc[idc].data().NomCamp;
    let cat = document.getElementById("inputGroupSelect01")
    for (let i = 0; i < cat.length; i++) {
        if (cat[i].text == (doc[idc].data().Categoria)) {
            document.getElementById("inputGroupSelect01").value = i;
        }
    }
    let rama = document.getElementById("inputGroupSelect02")
    for (let i = 0; i < rama.length; i++) {
        if (rama[i].text == doc[idc].data().Rama) {
            document.getElementById("inputGroupSelect02").value = i;
        }
    }
    document.getElementById("Invitacion").value = doc[idc].data().Invitacion;
    document.getElementById("NombreO").value = doc[idc].data().NombOrg;
    document.getElementById("Fecha_ini").value = doc[idc].data().FechaInicio;
    document.getElementById("Fecha_fin").value = doc[idc].data().FechaFinal;
    document.getElementById("Fecha_Inicio_inscription").value = doc[idc].data().FechaIniInsc;
    document.getElementById("Fecha_limite_incription").value = doc[idc].data().FechaLimIns;
    document.getElementById("Fecha_limite_Preinscripcion").value = doc[idc].data().FechaPreInsc;
    document.getElementById("CostoPre").value = doc[idc].data().CostoPreIns;
    document.getElementById("Costo").value = doc[idc].data().CostoIns;
    const qr1 = document.getElementById("qr1");
    qr1.src = doc[idc].data().DepositoPre;
    const qr2 = document.getElementById("qr2");
    qr2.src = doc[idc].data().DepositoIns;


});