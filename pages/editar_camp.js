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
    const logo = document.getElementById("logo");
    logo.src = doc[idc].data().Logo;
    console.log(logo)
    document.getElementById("Nombre").value = doc[idc].data().NomCamp;
    document.getElementById("llenar").textContent = doc[idc].data().Categoria;
    // for (let i = 0; i < cat.length; i++) {
    //     if (cat[i].text == (doc[idc].data().Categoria)) {
    //         document.getElementById("inputGroupSelect01").value = i;
    //     }
    // }
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
    document.getElementById("Fecha_inscription_normal").value = doc[idc].data().FechaIniInsc;
    document.getElementById("Fecha_limite_incription").value = doc[idc].data().FechaLimIns;
    document.getElementById("Fecha_inicio_Preinscripcion").value = doc[idc].data().FechaPreInsc;
    document.getElementById("CostoPre").value = doc[idc].data().CostoPreIns;
    document.getElementById("Costo").value = doc[idc].data().CostoIns;
    const qr1 = document.getElementById("qr1");
    qr1.src = doc[idc].data().DepositoPre;
    const qr2 = document.getElementById("qr2");
    qr2.src = doc[idc].data().DepositoIns;


});

async function verfNom() {
    const camp = db.collection("Campeonatos").get()
    camp.then((querySnapshot) => {
        let doc = querySnapshot.docs;
        let lim = querySnapshot.size;
        let nomCamp = document.getElementById("Nombre").value;
        let fl = false
        for (let i = 0; i < lim && !fl; i++) {
            if (nomCamp == doc[i].data().NomCamp) {
                alert("El nombre del campeonato ya existe, escriba otro")
                fl = true
            }
        }
        if (!fl) {
            crearCamp();
        }
    })
}

async function crearCamp() {
    let logo = document.getElementById("File_logo").files[0];
    let nomCamp = document.getElementById("Nombre").value;
    // let catA = document.getElementById("inputGroupSelect01");
    let catB = document.getElementById('llenar').textContent;
    let ramaA = document.getElementById("inputGroupSelect02");
    let ramaB = ramaA.options[ramaA.selectedIndex].text;
    let invt = document.getElementById("Invitacion").value;
    let nomOrg = document.getElementById("NombreO").value;
    let fechaIni = document.getElementById("Fecha_ini").value;
    let fechaFin = document.getElementById("Fecha_fin").value;
    let fechaIniIns = document.getElementById("Fecha_inscription_normal").value;
    let fechaLimIns = document.getElementById("Fecha_limite_incription").value;
    let fechaIniPreIns = document.getElementById("Fecha_inicio_Preinscripcion").value;
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
        FechaPreInsc: fechaIniPreIns,
        CostoPreIns: costoPre,
        CostoIns: costoIns,
        DepositoPre: "",
        DepositoIns: ""
    };
    //(Firestore) Funcion que añade una nueva coleccion de datos a la BD
    await db.collection('Campeonatos').doc(nomCamp).set(initialData)
        .then(() => {
            console.log("Guardado Exitoso");
        })
        .catch((error) => {
            console.error("Error : ", error);
        });
    if (logo == undefined) {
        const logo = document.getElementById("logo").src;
        db.collection('Campeonatos').doc(nomCamp).update({
                Logo: logo
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    } else {
        let uploadTask1 = storageRef.child("Logo Equipos" + '/' + logo.name).put(logo);
        await uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
            async() => {
                // Upload completed successfully, now we can get the download URL
                await uploadTask1.snapshot.ref.getDownloadURL().then((downloadURL) => {
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
    }
    if (depoPreIns == undefined) {
        const qr1 = document.getElementById("qr1").src;
        db.collection('Campeonatos').doc(nomCamp).update({
                DepositoPre: qr1
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    } else {
        let uploadTask2 = storageRef.child("Depositos" + '/' + depoPreIns.name).put(depoPreIns);
        await uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
            async() => {
                // Upload completed successfully, now we can get the download URL
                await uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL) => {
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
    }
    if (depoIns == undefined) {
        const qr2 = document.getElementById("qr2").src;
        db.collection('Campeonatos').doc(nomCamp).update({
                DepositoIns: qr2
            })
            .then(() => {
                console.log("Document successfully updated!");
                window.location.href = "Vista_campeonatos.html";
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    } else {
        let uploadTask3 = storageRef.child("Depositos" + '/' + depoIns.name).put(depoIns);
        await uploadTask3.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
            async() => {
                // Upload completed successfully, now we can get the download URL
                await uploadTask3.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    db.collection('Campeonatos').doc(nomCamp).update({
                            DepositoIns: downloadURL
                        })
                        .then(() => {
                            console.log("Document successfully updated!");
                            window.location.href = "Vista_campeonatos.html";
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                });
            }
        );
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