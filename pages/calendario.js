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
const btn_añadirFecha = document.getElementById("btn_añadir")


btn_añadirFecha.addEventListener('click', () => {
    let add = window.location.href.slice(-1)
    console.log(add)
    if (add == "l")
        alert("Debe seleccionar previamente un campeonato")
    else
        window.location.href = "./crear_Partido.html#" + add
})

const camp = db.collection("Campeonatos").get()
camp.then((querySnapshot) => {
    let doc = querySnapshot.docs
    let lim = querySnapshot.size;
    const ht = document.getElementById("tarjcamp")
    console.log(doc[0].data())
    document.getElementById("ti0").innerText = doc[0].data().NomCamp
    document.getElementById("li0").src = doc[0].data().Logo
    for (let i = 1; i < lim; i++) {
        console.log(doc[i].data().NomCamp)
        console.log(doc[i].data().Logo)
        ht.innerHTML += `<hr>
<div type="button">
    <div class="tipoCampeonato" id="${i}" onclick="prep(this)">
        <img class="imgCampeonato" id="li${i}" src="${doc[i].data().Logo}">
        <div>
            <h4 class="tituloCampeonato" id="ti${i}">${doc[i].data().NomCamp}</h4>
        </div>
    </div>
</div>

<hr>`
    }
});



function prep(cmp) {
    window.location.href += ("#" + cmp.id)


    const campref = db.collection("Campeonatos").get()
    campref.then((querySnapshot) => {
        let doc = querySnapshot.docs
        let lim = querySnapshot.size;
        const campe = doc[cmp.id].data().NomCamp
        const part = db.collection("Campeonatos").doc(campe).collection("Partidos").get()
        part.then((querySnapshot) => {
            let doc = querySnapshot.docs
            let lim = querySnapshot.size;
            document.getElementById("tarj").innerHTML = ``
            for (let i = 0; i < lim; i++) {
                document.getElementById("tarj").innerHTML += `
        <div class="dates">
                    <div class="row ">
                    <!-- <h5 class="col-1" id="dia">sabado</h5> -->
                        <!--  <h4 class="col-1" id="guion">-</h4> -->
                        <label class="col-2" id="Fecha">${doc[i].data().Fecha} </label>
                    </div>
                </div>
        <div class="tarjeta">
        <hr>
        <div class="events">
            <a href="www.google.com" class="row align-items-center">
                <div class="col-1 event_time">
                    <h5 id="hora0">${doc[i].data().Hora}</h5>
                </div>
                <div class="teams col-1 ">
                    <div class="row align-items-center equipos">
                        <div class="equipo col-1" id="team1">
                            <div class="nombre_team">
                                <label id="0equi1">${doc[i].data().Equipo1}</label>
                            </div>
                            <img class="img" id="0img1" src="/assets/img/logo-placeholder.png">
                        </div>
                        <div class="score col-1" id="score">
                            <span id="0sco">0:0</span>
                        </div>
                        <div class="equipo col-1" id="team2">
                            <img class="img" id="0img2" src="/assets/img/logo-placeholder.png">
                            <div class="nombre_team">
                                <label id="0equi2">${doc[i].data().Equipo2}</label>
                            </div>
    
                        </div>
                    </div>
                </div>
            </a>
        </div>
    
    </div>`
            }
            document.getElementById("tarj").innerHTML += `<div class="boton">
            <button type="button" class="btn" id="btn_añadir">Añadir Fecha</button>
        </div>`
            const btn_añadirFecha = document.getElementById("btn_añadir")
            btn_añadirFecha.addEventListener('click', () => {
                let add = window.location.href.slice(-1)
                console.log(add)
                if (add == "l")
                    alert("Debe seleccionar previamente un campeonato")
                else
                    window.location.href = "./crear_Partido.html#" + add
            })
        });
    });
}