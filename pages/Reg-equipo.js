const firebaseConfig = {
    apiKey: "AIzaSyDJVqTcYHItYzzg2Utp3Zxtr3fPLly7XWU",
    authDomain: "pruebas-b230c.firebaseapp.com",
    projectId: "pruebas-b230c",
    storageBucket: "pruebas-b230c.appspot.com",
    messagingSenderId: "768876786611",
    appId: "1:768876786611:web:543e92b1e0bf3098a411c6"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


var storageRef = firebase.storage().ref();
var imgActual;
var imagenPintada;
var ima2;

 function revisarArchivo(img) {
     if (img.files[0]) {
         var fileInput = document.getElementById('logo-equipo');
         var filePath = fileInput.value;
         var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
         if (!allowedExtensions.exec(filePath)) {
             alert('Por favor solo subir imagenes con extension .jpeg .jpg .png');
             fileInput.value = '';
             return false;
         }else{
             imagenPintada=img;
             console.log("IMAGEN ACTUAL",imagenPintada)
         }
     }
 }


/*-------------------------aqui se sube la imagen-------------------------------*/
function subirImagen() {
  var imagenASubir = document.querySelector(`#logo-equipo`).files[0];
  var nombreima=new Date()+'-'+imagenASubir.name;
 var uploadTask = storageRef.child('images/'+nombreima).put(imagenASubir);

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
              console.log('File available at', downloadURL);
              ima2=downloadURL;
              registrarequipo(downloadURL);
              alert('whacho si se logro'+ima2);
              /*registarReceta(downloadURL, carpeta);*/
          });
      }
  );
}

function registrarequipo(url){
  
  var v1=document.getElementById("correo-equipo").value;
  var v2=document.getElementById("Nombre-E").value;
  db.collection("Equipos").add({
    categoria: 'Maxi',
    correodelegado: v1,
    logo : url,
    nombreequipo : v2
  });

}
var contador=6;
function añadirhtml(){
    botonfeo.innerHTML='';
    aux2.innerHTML+=`
    <div class="nombre">
                    <label for="nombres">Nombres y Apellidos</label>
                    <input type="text" id="${contador}" placeholder="Nombres" required>
                    
                    <input type="text" id="${contador+1}" placeholder="Apellidos completos" required >
                </div>
                <div class="datos">
                    <div>
                        <label for="Ci">Numero de CI</label>
                        <input type="text" id="${contador+2}" placeholder="Numero de CI" required>
                    </div>
                    <div>
                        <label for="telefono">Nº de Celular</label>
                        <input type="text" id="${contador+3}" placeholder="Numero de celular" required>
                    </div>
                   
                </div>
                <div class="datos-2">
                    <label for="start">Fecha de nacimiento:</label>
                    <input class="fecha" type="date" id="${contador+4}" name="Fecha de nacimiento"
                        value="2018-07-22"
                         min="1965-01-01" max="2004-12-31">
                </div>
                <button class="icon-btn add-btn" onclick="añadirhtml()">
                    <div class="add-icon"></div>
                    <div class="btn-txt">Añadir</div>
                </button>
                    <div class="boton">
                             <button title="registrar"  id="botongrande" name="registrar">CREAR USUARIO</button>
                    </div>
                <p>Al crear un usuario acepta los términos, acepta que su información personal se recopile, almacene y procese en la web.</p>
    `
    contador=contador+5;
}
/*
function registrar(){
    const ref= firebase.storage().ref();
    const file= document.querySelector(`#logo-equipo`).files[0];
    const nombreima= new Date()+`-`+ file.name;
    if(file==null){
         alert(`debe seleccionar un imagen no joda`)
    }else{
         const metadata={
          contentType:file.type
         }
         const talk=ref.child(nombreima)
    }
    console.log(ref)
}*/