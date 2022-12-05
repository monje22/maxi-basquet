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
 * @var db Base de datos que almacena cualquier tipo de informacion(texto) en colecciones
 */
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.firestore();
var storageRef = firebase.storage().ref();

/**
 * Listener de los usuarios, recupera la sesion activa(si existe)
 * o redirecciona al login
 * @param user El objeto usuario de la sesion activa
 */
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(user)
            // ...
    } else {
        // User is signed out
        // ...
    }
});


/**
 * Funcion que realiza el registro de los usuarios en la BD
 */
function registrarUser() {
    let correo = document.getElementById("1").value;;
    let contraseña = document.getElementById("2").value;;
    let nombre = document.getElementById("3").value;
    let apellido = document.getElementById("4").value;;
    let fechaN = document.querySelector('input[type="date"]');
    let nomcomp = nombre + " " + apellido;
    /*Funcion propia de Firebase que realiza el registro de usuarios
    Esta funcion unicamente acepta 2 parametros: correo y contraseña
    */
    auth.createUserWithEmailAndPassword(correo, contraseña)
        .then((userCredential) => {
            // Inicio de sesion automatico
            const user = userCredential.user;
            let uid = user.uid;
            // (Firebase) Llamada a la funcion updateProfile para añadir el nombre completo a la cuenta
            user.updateProfile({
                displayName: nomcomp,
                photoURL: null
            }).then(() => {
                // Actualizacion exitosa
                console.log(user.displayName)
                    // Creacion de una constante que almacenara el nombre y la fecha de nacimiento
                const initialData = {
                    Nombre: nomcomp,
                    fechaNac: fechaN.value
                };
                //(Firestore) Funcion que añade una nueva coleccion de datos a la BD
                db.collection('userData').doc('user').collection(uid).doc('datos iniciales').set(initialData);
            }).catch((error) => {
                // Ocurrio un error al registrar los datos del usuario
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(msg(errorCode))

            });
        })
        .catch((error) => {
            // Ocurrio un error al registrar al usuario
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(msg(errorCode))
        });
}


/**
 * Funcion que realiza el inicio de sesion de los usuarios
 */
function loginUser() {
    let correo = document.getElementById("1").value;;
    let contraseña = document.getElementById("2").value;;
    auth.signInWithEmailAndPassword(correo, contraseña)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
                // ...
        })
        .catch((error) => {
            // Ocurrio un error al inicar sesion
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(msg(errorCode))
        });

}


/**
 * Funcion que envia codigos de error en español(Firebase los manda en ingles)
 * @param {String} errorCode Codigo de error personalizado o enviado por Firebase
 * @returns Codigo de error en español o personalizado
 */
function msg(errorCode) {
    let msg;
    switch (errorCode) {
        case "auth/invalid-email":
            msg = "Error: Correo electrónico inválido";

            break;
        case "auth/weak-password":
            msg = "Error: La contraseña deberá contener como mínimo 6 caracteres";

            break;
        case "auth/email-already-in-use":
            msg = "Error: Correo electrónico ya en uso";

            break;
        case "auth/internal-error":
            msg = "Error: Hay un problema con el servidor, por favor intente más tarde";
            break;
        default:
            msg = "Error: Algunos de los datos son inválidos, por favor verifica los datos";
    }
    return msg;
}

const paramURL = window.location.search;
console.log(paramURL);

const parametrosURL = new URLSearchParams(paramURL);
console.log(typeof(parametrosURL));

for (let valoresURL of parametrosURL){
    console.log(valoresURL)
}

let idCamp = parametrosURL.get('id')
console.log(idCamp)

let loader = document.getElementById("preloader");

// setTimeout(() => {loader.style.display = "none"}, 2000);


  


let docRef = db.collection("Campeonatos").doc(idCamp);
const box = document.getElementById("bs");

docRef.get().then((doc) => {
    if (doc.exists) {

        
        // console.log("Document data:", doc.data());
        console.log(doc.data())
        let cp=doc.data();
        let a = new Date();
        let año = a.getFullYear();
        let mes = a.getMonth()+1;
        let dia = "";
        if (a.getDate() < 10) {
            dia = "0"+a.getDate();
        }
        if (a.getMonth()+1 < 10) {
            mes = "0"+a.getMonth();
        }
        console.log(a)
        console.log(dia)
        console.log(mes)
        console.log(año)

        let fechaHoy = ""+año+mes+dia;
        // console.log(fechaHoy)
        // console.log(cp.FechaInicio)
        quitarCaracter(cp.FechaPreInsc)
        quitarCaracter2(cp.FechaLimIns)
        console.log(" es la fecha pre "+fechaPre)
        console.log(" es la fecha incio " + fechaIni)
        console.log("es la fecha hoy "+ fechaHoy)
        console.log(Math.floor(fechaHoy))
        console.log(Math.floor(fechaPre))
        console.log(Math.floor(fechaIni))
        console.log(cp.FechaInicio)
        console.log("hsata qui todo bien")
        if (Math.floor(fechaHoy)>=Math.floor(fechaPre) && Math.floor(fechaHoy)<=Math.floor(fechaIni) ) {
            //Pre inscripcion
            console.log("entro en pre")
            box.innerHTML= `<h1 class="th"> <b>${cp.NomCamp}</b></h1>
            <p class="t ta sub"><b>Invitacion</b> </p>
            <p class="ta">${cp.Invitacion}</p>
            <div class="sq2">
                <div class="div1"> 
                    <p class="ta sub"> <b>Rama</b></p>
                    <p class="ta">${cp.Rama}</p>
                </div>
                <div class="div2"> 
                    <p class="ta sub"><b>Categoria</b></p>
                    <p class="ta">${cp.Categoria}</p>
                </div>
                <div class="div3"> 
                    <p class="ta sub"><b>Equipo</b></p>
                    <p class="ta">ASD</p>
                </div>
                <div class="div4"> 
                    <p class="ta sub"><b>Costo</b></p>
                    <p class="ta">${cp.CostoPreIns} Bs Costo Preinscripcion</p>
                </div>
                </div>
            <p class="ta">Escanee el codigo QR para realizar  el pago de inscripcion, una vez realizado el pago debe subir una imagen del comprobante, cuando termine de subir el comprobante, pulse el boton de inscribirse, una vez verificado el pago podra visualizar el campeonato en su perfil de equipo.</p>
            <img src="${cp.DepositoPre}" alt="">
            <div class="bn">
            
            <button id="btnC" class="contenedor-btn-file bordeado">
            <i class="fas fa-file"></i>
            Subir comprobante
            <label for="btn-file"></label>
            <input type="file" id="btn-file">
            </button>

        </div>
            
            <a class="btn-ini espacio robotoCon" onclick="ventana()" > INSCRIBIRSE</a>`; 
        } else if (Math.floor(fechaHoy)>Math.floor(fechaIni)) {
            console.log("entro en ins")
            box.innerHTML= `<h1 class="th"> <b>${cp.NomCamp}</b></h1>
            <p class="t ta sub"><b>Invitacion</b> </p>
            <p class="ta">${cp.Invitacion}</p>
            <div class="sq2">
                <div class="div1"> 
                    <p class="ta sub"> <b>Rama</b></p>
                    <p class="ta">${cp.Rama}</p>
                </div>
                <div class="div2"> 
                    <p class="ta sub"><b>Categoria</b></p>
                    <p class="ta">${cp.Categoria}</p>
                </div>
                <div class="div3"> 
                    <p class="ta sub"><b>Equipo</b></p>
                    <p class="ta">ASD</p>
                </div>
                <div class="div4"> 
                    <p class="ta sub"><b>Costo</b></p>
                    <p class="ta">${cp.CostoIns}Bs Consto Inscripcion</p>
                </div>
                </div>
            <p class="ta">Escanee el codigo QR para realizar  el pago de inscripcion, una vez realizado el pago debe subir una imagen del comprobante, cuando termine de subir el comprobante, pulse el boton de inscribirse, una vez verificado el pago podra visualizar el campeonato en su perfil de equipo.</p>
            <img src="${cp.DepositoIns}" alt="">
            

            <div class="bn">    
                <button id="btnC" class="contenedor-btn-file bordeado" >
                <i class="fas fa-file"></i>
                Subir comprobante
                <label for="btn-file"></label>
                <input type="file" id="btn-file">
                </button>
            </div>

            
            <a class="btn-ini espacio robotoCon" onclick="ventana()"> INSCRIBIRSE</a>`;
        } else {
            console.log("no entro en nada")
            box.innerHTML= `<h1 class="th"> <b>NO ESTA HABILITADO</b></h1>`;
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

let fechaPre = "";
let fechaIni = "";
let quitarCaracter = (fecha) => {
    let i = 0;
    let sw=0;
    let e = "-"
    fechaPre="";
    while (i < fecha.length) {
        if(fecha[i] == e && sw ==0){
            sw=1;
        } else {
            fechaPre = fechaPre + fecha[i];
            sw = 0;
        }
        i=i+1;
    }
}

let quitarCaracter2 = (fecha) => {
    let i = 0;
    let sw=0;
    let e = "-"
    fechaIni="";
    while (i < fecha.length) {
        if(fecha[i] == e && sw ==0){
            sw=1;
        } else {
            fechaIni = fechaIni + fecha[i];
            sw = 0;
        }
        i=i+1;
    }
}

let quitarCaracter3 = (fecha) => {
    let i = 0;
    let sw=0;
    let e = "'"
    nomCamp="";
    while (i < fecha.length) {
        if(fecha[i] == e && sw ==0){
            sw=1;
        } else {
            nomCamp = nomCamp + fecha[i];
            sw = 0;
        }
        i=i+1;
    }
}

let reversa = (texto) =>{
    let reversedStr = '';

    for (let i = texto.length - 1; i >= 0; i--) {
  reversedStr += texto[i];
}
    aux = reversedStr;
}






function ventana () {
    Swal.fire({
        title: 'Esta seguro que desea inscribir a su equipo a este campeonato?.',
        text: "Si su equipo no pertenece a las categorias o rama establecida por el campeonato.Se le cancelara la inscripcion al campeonato",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FE0032',
        cancelButtonColor: '#2B2B2B',
        confirmButtonText: 'Si',
        cancelButtonText:'No',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Gracias por su inscripcion',
            'Se le mandara un mensaje cuando un administrador revise que su pago este realizado y que su equipo cumple con las normas del campeonato',
            'success'
          )
          console.log("se confirmo")
          let ft = document.getElementById("btn-file").files[0];
          console.log(ft)
          subirImagen(ft)
          window.location.href="./campeonatosDelegado.html";
        }
      })
}


function subirImagen(imagenASubir) {
    var nombreima=new Date()+'-'+imagenASubir.name;
    var carpeta="Depositos/";
    var uploadTask = storageRef.child(carpeta+nombreima).put(imagenASubir);

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
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {               
                    urlimagen=downloadURL;
                    db.collection("Campeonatos").doc(idCamp).collection("EquiposInscritos").add({
                        recibo: urlimagen,
                        idEquipo: "CA",
                        aceptado: false
                        
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                    
                console.log('whacho si se logro'+urlimagen);
            });

            
        }

    );
  }