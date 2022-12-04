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
const storageRef = firebase.storage().ref();


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
function registrarUser() {
    let correo = document.getElementById("1").value;;
    let contraseña = document.getElementById("2").value;;
    let nombre = document.getElementById("3").value;
    let apellido = document.getElementById("4").value;;
    let fechaN = document.querySelector('input[type="date"]');
    let nomcomp = nombre + " " + apellido;
    let cedula = document.getElementById('5');
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
                    fechaNac: fechaN.value,
                    ci: cedula
                };
                //(Firestore) Funcion que añade una nueva coleccion de datos a la BD
                db.collection('userData').doc('user').collection(uid).doc('datos iniciales').set(initialData);

                window.location.href = "./HomeDelegado"

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
            let correo = user.email;
            let bandera = correo.search(/@one.com/i);
            if (bandera < 0) {
                window.location.href = "HomeDelegado.html"
            } else {
                window.location.href = "HomeAdministrador.html"
            }
            // ...
        })
        .catch((error) => {
            // Ocurrio un error al inicar sesion
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(msg(errorCode))
        });

}

function crearCamp() {
    let logo = document.getElementById("File_logo").files[0];
    let nomCamp = document.getElementById("Nombre").value;
    let catA = document.getElementById("inputGroupSelect01");
    let catB = catA.options[catA.selectedIndex].text;
    let ramaA = document.getElementById("inputGroupSelect02");
    let ramaB = ramaA.options[ramaA.selectedIndex].text;
    let invt = document.getElementById("Invitacion").value;
    let nomOrg = document.getElementById("NombreO").value;
    let fechaIni = document.getElementById("Fecha_ini").value;
    let fechaFin = document.getElementById("Fecha_fin").value;
    let fechaIniIns = document.getElementById("Fecha_Inicio_inscription").value;
    let fechaLimIns = document.getElementById("Fecha_limite_incription").value;
    let costoPre = document.getElementById("CostoPre").value;
    let costoIns = document.getElementById("Costo").value;
    let depoPreIns = document.getElementById("QR-file1").files[0];
    let depoIns = document.getElementById("QR-file2").files[0];

    const initialData = {
        Logo: "",
        NomCamp: nomCamp,
        Categoria: catB,
        Rama: ramaB,
        Invitacion: invt,
        NombOrg: nomOrg,
        FechaInicio: fechaIni,
        FechaFinal: fechaFin,
        FechaIniInsc: fechaIniIns,
        FechaLimIns: fechaLimIns,
        CostoPreIns: costoPre,
        CostoIns: costoIns,
        DepositoPre: "",
        DepositoIns: ""
    };
    //(Firestore) Funcion que añade una nueva coleccion de datos a la BD
    db.collection('Campeonatos').doc(nomCamp).set(initialData)
        .then(() => {
            console.log("Guardado Exitoso");
        })
        .catch((error) => {
            console.error("Error : ", error);
        });

    let uploadTask1 = storageRef.child("Logo Equipos" + '/' + logo.name).put(logo);
    let uploadTask2 = storageRef.child("Depositos" + '/' + depoPreIns.name).put(depoPreIns);
    let uploadTask3 = storageRef.child("Depositos" + '/' + depoIns.name).put(depoIns);
    uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {},
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
            uploadTask1.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                db.collection('Campeonatos').doc(nomCamp).update({
                        Logo: downloadURL
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            });
        }
    );
    uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {},
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
            uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                db.collection('Campeonatos').doc(nomCamp).update({
                        DepositoPre: downloadURL
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            });
        }
    );

    uploadTask3.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {},
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
            uploadTask3.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                db.collection('Campeonatos').doc(nomCamp).update({
                        DepositoIns: downloadURL
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            });
        }
    );
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