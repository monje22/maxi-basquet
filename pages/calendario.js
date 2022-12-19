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
const btn_tablaP = document.getElementById("btn_tab")


btn_añadirFecha.addEventListener('click', () => {
    let add = window.location.href.slice(-1)
    console.log(add)
    if (add == "l")
        alert("Debe seleccionar previamente un campeonato")
    else
        window.location.href = "./crear_Partido.html#" + add
})

btn_tablaP.addEventListener('click', () => {
    let add = window.location.href.slice(-1)
    if (add)
        alert("Debe seleccionar previamente un campeonato")
    else {
        let catA = document.getElementById("categoria")
        let catB = catA.options[catA.selectedIndex].text;
        window.location.href = "./tabla_posicionesT.html" + "?id=Campeonato UwU" + "&categoria=" + catB
    }

})

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
                // let url="";
                // db.collection("Equipos").doc(doc[i].data().Equipo1).get().then((aux3)=>{
                //   url=aux3.data().logo;
                // });
                // console.log(url);
                // let url2=db.collection("Equipos").doc(doc[i].data().Equipo2).get();
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
        let arrayCategorias = [];
        db.collection("Campeonatos").doc(campe).get().then((docu) => {
            susCategorias = docu.data().Categoria
            console.log(docu.data().Categoria)
                // susCategorias = susCategorias.replace("+","")
            while (susCategorias.indexOf("+") != -1) {
                susCategorias = susCategorias.replace("+", "")
                susCategorias = susCategorias.replace(" ", "")
            }
            console.log(susCategorias)
            console.log(susCategorias.split(","))
            arrayCategorias = susCategorias.split(",");
            console.log(arrayCategorias);
            addOptions("cats", arrayCategorias)
        });
    });
}



function addOptions(domElement, array) {
    var select = document.getElementsByName(domElement)[0];
    let sel = document.getElementById("categorias")
    const lel = sel.options.length
    console.log(lel)
    for (let i = lel; i >= 0; i--) {
        console.log("......")
        console.log()
        sel.remove(i);
    }


    for (value in array) {
        var option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }

}


function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
}