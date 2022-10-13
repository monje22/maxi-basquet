const firebaseConfig = {
    apiKey: "AIzaSyDTxvTiyRqLmJLZUvAqdufcM6AC_ZgSfTY",
    authDomain: "liga-basket.firebaseapp.com",
    projectId: "liga-basket",
    storageBucket: "liga-basket.appspot.com",
    messagingSenderId: "160475930465",
    appId: "1:160475930465:web:65843fe4a932208eb5af20",
    measurementId: "G-GVRPKCYGBB"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.firestore();

function registrarUser() {
    let correo = document.getElementById("1").value;;
    let contraseña = document.getElementById("2").value;;
    let nombre = document.getElementById("3").value;
    let apellido = document.getElementById("4").value;;
    let fechaN = document.querySelector('input[type="date"]');
    let nomcomp = nombre + " " + apellido;
    auth.createUserWithEmailAndPassword(correo, contraseña)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            let uid = user.uid;
            user.updateProfile({
                displayName: nomcomp,
                photoURL: null
            }).then(() => {
                // Update successful
                console.log(user.displayName)
                    // ...
                const initialData = {
                    Nombre: nomcomp,
                    fechaNac: fechaN.value
                };
                db.collection('userData').doc('user').collection(uid).doc('datos iniciales').set(initialData);
            }).catch((error) => {
                // An error occurred
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(msg(errorCode))
                    // ...
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(msg(errorCode))
                // ..
        });
}

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