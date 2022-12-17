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

auth.onAuthStateChanged((user) =>   {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log("si esta logueado")
        console.log(user)
            // ...
            
    } else {
        // User is signed out
        // ...
        console.log("no esta logueado")
    }
});


/**
 * Funcion que realiza el registro de los usuarios en la BD
 */
 async function registrarUser() {
    let correo = document.getElementById("1").value;;
    let contraseña = document.getElementById("2").value;;
    let nombre = document.getElementById("3").value;
    let apellido = document.getElementById("4").value;;
    let fechaN = document.querySelector('input[type="date"]');
    let nomcomp = nombre + " " + apellido;
    let cedula=document.getElementById('6').value;
    /*Funcion propia de Firebase que realiza el registro de usuarios
    Esta funcion unicamente acepta 2 parametros: correo y contraseña
    */
    await auth.createUserWithEmailAndPassword(correo, contraseña)
        .then(async (userCredential) => {
            // Inicio de sesion automatico
            const user = userCredential.user;
            let uid = user.uid;
            // (Firebase) Llamada a la funcion updateProfile para añadir el nombre completo a la cuenta
            await user.updateProfile({
                displayName: nomcomp,
                photoURL: null
            }).then(async () => {
                // Actualizacion exitosa
                console.log(user.displayName)
                    // Creacion de una constante que almacenara el nombre y la fecha de nacimiento
                const initialData = {
                    Nombre: nomcomp,
                    fechaNac: fechaN.value,
                    ci: cedula
                };
                //(Firestore) Funcion que añade una nueva coleccion de datos a la BD
               await db.collection('userData').doc('user').collection(uid).doc('datos iniciales').set(initialData);
                // db.collection('userData').doc('user').collection(uid).doc('datos iniciales').get().then();
                
                console.log("putochino");
            
            }).catch((error) => {
                // Ocurrio un error al registrar los datos del usuario
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(msg(errorCode))

            });
            window.location.href="./HomeDelegado.html"
        })
        .catch((error) => {
            // Ocurrio un error al registrar al usuario
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
