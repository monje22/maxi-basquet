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


//----------------METODO QUE RELLENA LA TABLA DE LAS POSICIONES--------------

db.collection("Campeonatos").doc("Campeonato UwU").collection("EquiposInscritos").where("categoria","==","20").get().then((querySnapshot)=>{
    var contador=1;
    nombreCampeonato.innerText="Campeonato UwU";
    categoria.innerText="sub "+"35";
    querySnapshot.forEach((doc) => {
        console.log("Contador inicio: "+contador);
        db.collection("Equipos").doc(doc.data().idEquipo).get().then((docs2)=>{
          
            datosTabla.innerHTML+=`
                <tr>
                      <td>${contador}</td>
                      <td class="team-name"><a href=""><img class="logoLista"src="${docs2.data().logo}" alt=""><span class="team-name-full">${docs2.data().nombreEquipo}</span><span class="team-name-code"></span><span class="liveStandingsIndicator"></span></a></td>
                      <td>${doc.data().partidosJugados}</td>
                      <td>${doc.data().partidosGanados}</td>
                      <td>${doc.data().partidosPerdidos}</td>
                      <td>${doc.data().puntosAfavor}</td>
                      <td>${doc.data().puntosContra}</td>
                      <td>${doc.data().puntosAfavor-doc.data().puntosContra}</td>
                      <td>31</td>
                </tr>          
            `   
            contador++; 
        });
         console.log("fin: "+contador);
    })

});
