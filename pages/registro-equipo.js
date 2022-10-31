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
var storageRef = firebase.storage().ref();


//-----------------PREVISUALIZAR EL LOGO DEL EQUIPO--------------------

const img_perfil1= document.getElementById("File011");

document.addEventListener("DOMContentLoaded", ()=>{
    
    const btn_perfil1=document.getElementById("btn-perfil1");
    btn_perfil1.addEventListener("click",()=>{
        img_perfil1.click();
    });
    img_perfil1.addEventListener("change",()=>{
        for(let i=0;i<img_perfil1.files.length;i++){
            const img_url = URL.createObjectURL(img_perfil1.files[i]);
            const perfil1= document.getElementById("perfil1");
            perfil1.src= img_url;
        }
    });
});
var urlimagen="";
var urlimagen2="";
//-----------------AQUI SE SUBE LOS DATOS SOLO DEL EQUIPO NO DE LOS JUGADORES------------------------
function subirDatosEquipo(){
    var nombreEqui=document.getElementById('Nombre').value;
    var numeroCel=document.getElementById('Celular').value;
    var categoriaE=document.getElementById('cajaCategoria').value;
    var ramaE=document.getElementById('cajaRama').value;
    var carnet=document.querySelector('#File022').files[0];
    var logo=document.querySelector('#File011').files[0];
    //console.log(nombreEqui,numeroCel,categoriaE,ramaE,carnet,logo);
       
    //---------Aqui se llama a la funcion subur imagen para obtener el URL de la imagen-------
      

    subirImagen(carnet,false);
    subirImagen(logo,true);
    console.log("Comprobante imagen :"+urlimagen+'Otra imagen '+urlimagen2);
          
    db.collection("Equipos").add({
        categoria:categoriaE,
        celularDele:numeroCel,
        fotoCarnet:urlimagen,
        logo:urlimagen2,
        nombreEquipo:nombreEqui,
        rama:ramaE
      });

}

//------------------FUNCION QUE SUBE UNA IMAGE A LA BASE DE DATOS----------------- 

function subirImagen(imagenASubir,aux) {
    var nombreima=new Date()+'-'+imagenASubir.name;
    var carpeta;
    if(aux){
        carpeta="Logo Equipos/";
    }else{
        carpeta="Cedula Delegado/";
    }
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
                //console.log('File available at', downloadURL);

                //if(aux){
                    urlimagen=downloadURL;
                //}else{
                    //urlimagen2=downloadURL;
                //}
                console.log('whacho si se logro'+urlimagen);
                //console.log('whacho si se logro'+urlimagen2);
                /*registarReceta(downloadURL, carpeta);*/
            
            });
        }

    );
  }


//---------------------RECUPERAR DATOS DEL FORMULARIO MODAL-------------------

const abrirmodal=document.querySelector('#boton-chiquito');
const cerrarmodal=document.querySelector('#btn-añadir');
const modalito=document.querySelector('#contmodal');

const basedatos=[];
var contador=0;

abrirmodal.addEventListener('click',()=>{
 modalito.showModal();
 let formulario = document.getElementById('tumama');
 formulario.reset();
 console.log(basedatos);
})
cerrarmodal.addEventListener('click',()=>{
   modalito.close();

})

//CAPTURAR DATOS DE FORMULARIO------------------------------------------------------


function capturar(){
    //se capturan lo datos del formulario modal para guradarlos dentro de un objeto
    function Jugadores(nombre,nacionalidad,edad,peso,altura,foto,carnet){
            this.nombre=nombre;
            this.nacionalidad=nacionalidad;
            this.edad=edad;
            this.peso=peso;
            this.altura=altura;
            this.foto=foto;
            this.carnet=carnet;
    }
    var nombrecap= document.getElementById(`Nombref`).value;
    var nacionalidadcap=document.getElementById('Nacionalidadf').value;
    var edadcap=document.getElementById('Edadf').value;
    var pesocap=document.getElementById('Pesof').value;
    var alturacap=document.getElementById('Alturaf').value;
    var fotocap=document.querySelector('#File01').files[0];
    var carnetcap=document.querySelector('#File02').files[0];

     
    var jugador=new Jugadores(nombrecap,nacionalidadcap,edadcap,pesocap,alturacap,fotocap,carnetcap);
    console.log(jugador.foto);
    console.log(fotocap);
    console.log(jugador.carnet);
    console.log(carnetcap);
    agregarlista(jugador);
    llenarTabla(basedatos);
    contador=contador+1;
}


function agregarlista(juga){

   basedatos.push(juga);
   console.log(basedatos);
}

function llenarTabla(listaDatos){
 datosTablita.innerHTML+=`
            <tr>
                <td>${listaDatos[contador].nombre}</td>
                <td>${listaDatos[contador].edad}</td>     
            </tr>
 `;

}
//---------------SUBIR DATOS DE JUGADORES A LA BASE DE DATOS--------------

function llenarDatosJugadores(id,basedatos,contjugador){
    var contador=0;

    for(i=0;i<basedatos.length()-1;i++){
    db.collection(Equipos).doc(id).collection(Jugadores).add({
        altura:basedatos[contjugador].altura,
        carnet:basedatos[contjugador].carnet.name,
        edad:basedatos[contjugador].edad,
        fotoperfil:basedatos[contjugador].fotop.name,
        idEquipo:id,
        nacionalidad:basedatos[contjugador].nacionalidad,
        nombre:basedatos[contjugador].nombre,
        peso:basedatos[contjugador].peso
    });
    }
}



