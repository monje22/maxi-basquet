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
var storageRef = firebase.storage().ref();
const basedatos = [];
var usuarioId = "";
var tieneEquipo = false;
validatarEquipo()


//-----------------RECUOERAR ID USUARIO--------------   

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        usuarioId = user.uid;
        console.log("si esta logueado")
        console.log(user)
        console.log(usuarioId);
        // ...
    } else {
        // User is signed out
        // ...
        window.location.href = "../index.html";
        console.log("no esta logueado")
    }
});

//-----------------VALIDAR QUE EL USUARIO NO TENGA UN EQUIPO YA CREADO-------------

function validatarEquipo() {
    console.log("Entro")
    db.collection("Equipos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().idDelegado == usuarioId) {
                window.location.href = "./registro-equipo.html#" + 0
            }
        });
    })
}

//-----------------CERRAR SESION-----------------

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
}


//-----------------PREVISUALIZAR EL LOGO DEL EQUIPO--------------------

const img_perfil1 = document.getElementById("File011");

document.addEventListener("DOMContentLoaded", () => {

    const btn_perfil1 = document.getElementById("btn-perfil1");
    btn_perfil1.addEventListener("click", () => {
        img_perfil1.click();
    });
    img_perfil1.addEventListener("change", () => {
        for (let i = 0; i < img_perfil1.files.length; i++) {
            const img_url = URL.createObjectURL(img_perfil1.files[i]);
            const perfil1 = document.getElementById("perfil1");
            perfil1.src = img_url;
        }
    });
});
let urlimagen = "";
let urlimagen2 = "";
//-----------------AQUI SE SUBE LOS DATOS SOLO DEL EQUIPO NO DE LOS JUGADORES------------------------
async function subirDatosEquipo() {
    var nombreEqui = document.getElementById('Nombre').value;
    nombreEqui = nombreEqui.replace("  ", " ");
    var numeroCel = document.getElementById('Celular').value;
    var categoriaE = document.getElementById('cajaCategoria').value;
    var ramaE = document.getElementById('cajaRama').value;
    var carnet = document.querySelector('#File022').files[0];
    var logo = document.querySelector('#File011').files[0];
    //console.log(nombreEqui,numeroCel,categoriaE,ramaE,carnet,logo);
    //---------Aqui se llama a la funcion subur imagen para obtener el URL de la imagen-------

    let add = window.location.href.slice(-1)
    if (tieneEquipo != 0) {

        await db.collection("Equipos").doc(nombreEqui).set({
            categoria: categoriaE,
            celularDele: numeroCel,
            fotoCarnet: "",
            logo: "",
            nombreEquipo: nombreEqui,
            rama: ramaE,
            idDelegado: usuarioId,
            verificado: false
        });

        await subirImagen(carnet, 2, nombreEqui, "fotoCarnet", "");
        await subirImagen(logo, 1, nombreEqui, "logo", "");
        console.log("Comprobante imagen :" + urlimagen + 'Otra imagen ' + urlimagen2);

        await llenarDatosJugadores(basedatos, nombreEqui);

        setTimeout(x, 4000);

        function x() {
            window.location.href = "HomeDelegado.html";
        };


    } else {
        window.alert("Ya tienes un equipo creado");
        window.location.href = "HomeDelegado.html";
    }

}

//------------------FUNCION QUE SUBE UNA IMAGE A LA BASE DE DATOS----------------- 

async function subirImagen(imagenASubir, aux, aux2, aux3, aux4) {
    var nombreima = new Date() + '-' + imagenASubir.name;
    var carpeta;
    if (aux == 1) {
        carpeta = "Logo Equipos/";
    } else {
        if (aux == 2) {
            carpeta = "Cedula Delegado/";
        } else {
            if (aux == 3) {
                carpeta = "Cedula Jugador/"
            } else {
                carpeta = "Foto Jugador/"
            }
        }

    }
    var uploadTask = storageRef.child(carpeta + nombreima).put(imagenASubir);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            console.log("cargando")

        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        async() => {
            // Upload completed successfully, now we can get the download URL
            await uploadTask.snapshot.ref.getDownloadURL().then(async(downloadURL) => {
                //console.log('File available at', downloadURL);

                if (aux3 == "logo") {
                    await db.collection("Equipos").doc(aux2).update({
                        logo: downloadURL
                    });
                } else {
                    if (aux3 == "fotoCarnet") {
                        await db.collection("Equipos").doc(aux2).update({
                            fotoCarnet: downloadURL
                        });
                    } else {
                        if (aux3 == "fotoperfil") {
                            await db.collection("Equipos").doc(aux2).collection("Jugadores").doc(aux4).update({
                                fotoperfil: downloadURL
                            });
                        } else {
                            await db.collection("Equipos").doc(aux2).collection("Jugadores").doc(aux4).update({
                                carnet: downloadURL
                            });
                        }
                    }
                }


                console.log('whacho si se logro' + urlimagen);
                //console.log('whacho si se logro'+urlimagen2);
                /*registarReceta(downloadURL, carpeta);*/

            });
        }

    );
}


//---------------------RECUPERAR DATOS DEL FORMULARIO MODAL-------------------

const abrirmodal = document.querySelector('#boton-chiquito');
const cerrarmodal = document.querySelector('#btn-añadir');
const modalito = document.querySelector('#contmodal');
const cerrarMod = document.querySelector('#cerrarX');

var contador = 0;

abrirmodal.addEventListener('click', () => {
    modalito.showModal();
    let formulario = document.getElementById('tumama');
    formulario.reset();
    console.log(basedatos);
})
cerrarmodal.addEventListener('click', () => {
    modalito.close();

})
cerrarMod.addEventListener('click', () => {
    modalito.close();
})

//CAPTURAR DATOS DE FORMULARIO------------------------------------------------------


function capturar() {
    //se capturan lo datos del formulario modal para guradarlos dentro de un objeto
    function Jugadores(nombre, nacionalidad, edad, peso, altura, foto, carnet) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.edad = edad;
        this.peso = peso;
        this.altura = altura;
        this.foto = foto;
        this.carnet = carnet;
    }
    var fechaNacimiento = document.getElementById("startDate").value;
    console.log("fecha recuperada de nacimiento" + fechaNacimiento);
    var nombrecap = document.getElementById(`Nombref`).value;
    var nacionalidadcap = document.getElementById('Nacionalidadf').value;
    var edadcap = fechaNacimiento;
    var pesocap = document.getElementById('Pesof').value;
    var alturacap = document.getElementById('Alturaf').value;
    var fotocap = document.querySelector('#File01').files[0];
    var carnetcap = document.querySelector('#File02').files[0];


    //----------CATEGORIA EN LA QUE DEBERIA ESTAR INSCRITO EL JUGADOR----------
    var edadCalcu = calcularEdad(fechaNacimiento);
    var cate = document.getElementById('cajaCategoria').value;
    cate = cate.replace(/[^0-9]+/g, "");
    console.log("fffff" + cate);
    if (edadCalcu >= cate) {
        var jugador = new Jugadores(nombrecap, nacionalidadcap, edadcap, pesocap, alturacap, fotocap, carnetcap);
        console.log(jugador.foto);
        console.log(fotocap);
        console.log(jugador.carnet);
        console.log(carnetcap);
        agregarlista(jugador);
        llenarTabla(basedatos);
        contador = contador + 1;
    } else {
        window.alert("La edad del jugador no entrar en el rango establecido en el equipo")
    }

}


function agregarlista(juga) {

    basedatos.push(juga);
    console.log(basedatos);
}

function llenarTabla(listaDatos) {
    let aux = calcularEdad(listaDatos[contador].edad);
    datosTablita.innerHTML += `
            <tr>
                <td>${listaDatos[contador].nombre}</td>
                <td>${aux}</td>     
            </tr>
 `;

}
//---------------SUBIR DATOS DE JUGADORES A LA BASE DE DATOS--------------

async function llenarDatosJugadores(basedatos, nomEquipo) {
    var contjugador = 0;
    var id = "E9ffEllSbiYcnFqSEPxi";
    for (i = 0; i < basedatos.length; i++) {
        await db.collection("Equipos").doc(nomEquipo).collection("Jugadores").doc(basedatos[contjugador].nombre).set({
            altura: basedatos[contjugador].altura,
            carnet: "",
            edad: basedatos[contjugador].edad,
            fotoperfil: "",
            idEquipo: nomEquipo,
            nacionalidad: basedatos[contjugador].nacionalidad,
            nombre: basedatos[contjugador].nombre,
            peso: basedatos[contjugador].peso,
            qr: ""

        });
        await subirImagen(basedatos[contjugador].carnet, 3, nomEquipo, "carnet", basedatos[contjugador].nombre);
        await subirImagen(basedatos[contjugador].foto, 4, nomEquipo, "fotoperfil", basedatos[contjugador].nombre);
        contjugador = contjugador + 1;
    }
}


//--------------METODO QUE CALCULA LA EDAD DEL JUGADOR CON SU FECHA DE NACIMIENTO------------

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