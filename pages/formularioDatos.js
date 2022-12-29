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


//-----------------RECUOERAR ID USUARIO--------------   

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("si esta logueado")
        console.log(user)
            // ...
    } else {
        // User is signed out
        // ...
        console.log("no esta logueado")
        window.location.href="../index.html";
        
    }
});

//-----------------CERRAR SESION-----------------

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
}


//----------------RECUPERAR CAMPEONATOS----------------------

db.collection("Campeonatos").get().then((querySnapshot)=>{
    var select = document.getElementsByName("selectCam")[0];
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        var option = document.createElement('option');
        console.log(doc.data().NomCamp);
        option.text = doc.data().NomCamp;
        select.add(option);
    });
    
});

//----------------FUNCION DE PRUEBA PARA RELLENAR UN SELECT-------------

const comboBox=document.getElementById("selectCampe");
const comboBox2=document.getElementById("selectCate");
const comboBoxE1=document.getElementById("E1");
const comboBoxE2=document.getElementById("E2");
var au="";
var equiA="";
var equiB="";
comboBox.addEventListener("change",()=>{
    limpiarSelect("selectCate");
    
    var aux=document.getElementById("selectCampe").value;
    au=aux;
    db.collection("Campeonatos").doc(aux).get().then((doc)=>{
        var select = document.getElementsByName("selectCate")[0];
        var arreglo=doc.data().Categoria.split(",");
        for(i=0;i<arreglo.length;i++){
            var option = document.createElement('option');
            option.text =arreglo[i];
            select.add(option);
        }
           
    });
});

comboBox2.addEventListener("click",()=>{
    var aux=document.getElementById("selectCate").value;
    console.log(aux+"fijate aqui wacho");
    console.log(au);
    limpiarSelect("E1");
    limpiarSelect("E2");
      db.collection("Campeonatos").doc(au).collection("EquiposInscritos").get().then((doc)=>{
        var select=document.getElementById("E1");
        var select1=document.getElementById("E2");
        doc.forEach((doc1) => {
            if(doc1.data().categoria==aux){
                var option = document.createElement('option');
                var option2=document.createElement('option');
                option.text =doc1.data().idEquipo;
                option2.text =doc1.data().idEquipo;
                select.add(option);
                select1.add(option2);
            }
            
        });  
    });
    
})

comboBoxE1.addEventListener("change",()=>{
    jugadoresA.innerHTML="";
    jugadoresA.innerHTML=`<p>Jugadores A</p>`;
    var aux=document.getElementById("E1").value;
    var contador=0;
    db.collection("Equipos").doc(aux).collection("Jugadores").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
         
         jugadoresA.innerHTML+=`
                        <div class="jugador" id="jugadorA">
                            <p id="juga1">${doc.data().nombre}</p>
                            <div class="puntFal">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput${contador}">
                                    <label for="floatingInput">Puntos Anotados</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput${contador+1}">
                                    <label for="floatingInput">Faltas Cometidas</label>
                                </div>
                            </div>
                        </div>
         `
         contador=contador+2;
        });
    });

});


comboBoxE2.addEventListener("change",()=>{
    jugadoresB.innerHTML="";
    jugadoresB.innerHTML=`<p>Jugadores B</p>`;
    var cont=0;
    var aux=document.getElementById("E2").value;
    db.collection("Equipos").doc(aux).collection("Jugadores").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
         
         jugadoresB.innerHTML+=`
                        <div class="jugador" id="jugadorA">
                            <p id="juga1">${doc.data().nombre}</p>
                            <div class="puntFal">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floating${cont}">
                                    <label for="floatingInput">Puntos Anotados</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floating${cont+1}">
                                    <label for="floatingInput">Faltas Cometidas</label>
                                </div>
                            </div>
                        </div>
         `
         cont=cont+2;
        });
    });

});

    function rellenar(){
        var select = document.getElementsByName("selectCam")[0];
        var option = document.createElement('option');
        var valor="numero 1";
        option.value = valor;
        option.text = valor;
        select.add(option);
    }

//--------------FUNCION QUE LIMPIA UN SELECT-----------

function limpiarSelect(Nombre){
    var select = document.getElementsByName(Nombre)[0];
    console.log(select.options.length);
    for(let i = select.options.length; i > 0; i--){
        select.remove(i);
        
    }
}

//--------------FUNCION QUE SELECCIONA TODA LA TABLA----------

function subirtodo(){
    var aux=document.getElementById("selectCampe").value;
    var aux1=document.getElementById("selectCate").value;
    var aux2=document.getElementById("E1").value;
    var aux3=document.getElementById("E2").value;
    var fechaPart=document.getElementById("floatingInput1").value;
    var hora1=document.getElementById("horaIni").value;
    var hora2=document.getElementById("horaFin").value
    var ApuntFavor=document.getElementById("puntsAF").value;
    var ApuntCont=document.getElementById("puntsCO").value;
    var BpuntFavor=document.getElementById("BpuntsAF").value;
    var BpuntCont=document.getElementById("BpuntsCO").value;
    var radios = document.getElementsByName('flexRadioDefault');
    var opcionR="";
    
    for (var radio of radios)
    {
        if (radio.checked){
            opcionR=radio.id.replace("flexRadioDefault","");
        }
    }
    db.collection("Campeonatos").doc(aux).collection("EquiposInscritos").where("categoria","==",aux1).get().then((doc)=>{
        console.log(doc); 
        var contado=0;
         let g=0;
         let p=0;
         let pun=0;
         let e=0;
         if(opcionR==1){
            g=1;
            pun=2;
         }else{
             if(opcionR==2){
               p=1;
               
             }else{
                 e=1;
                 pun=1;
             }
         }
        doc.forEach((doc1)=>{
            console.log(doc1.data().idEquipo);
            if(doc1.data().idEquipo==aux2){
                console.log(doc.docs[contado].id)
                var d=parseInt(doc1.data().puntosAfavor)+parseInt(ApuntFavor);
                var f=parseInt(doc1.data().puntosContra)+parseInt(ApuntCont);
                db.collection("Campeonatos").doc(aux).collection("EquiposInscritos").doc(doc.docs[contado].id).update({
                    partidosGanados:parseInt(doc1.data().partidosGanados)+g,
                    partidosJugados:parseInt(doc1.data().partidosJugados)+1,
                    partidosPerdidos:parseInt(doc1.data().partidosPerdidos)+p,
                    puntos:parseInt(doc1.data().puntos)+pun,
                    puntosAfavor:d,
                    puntosContra:f
                });
            }
        contado++;
        });
    });



    db.collection("Campeonatos").doc(aux).collection("EquiposInscritos").where("categoria","==",aux1).get().then((doc)=>{
        console.log(doc); 
        var contado=0;
         let g=0;
         let p=0;
         let pun=0;
         let e=0;
         if(opcionR==1){
            p=1;
         }else{
             if(opcionR==2){
               g=1;
               pun=2;
             }else{
                 e=1;
                 pun=1;
             }
         }
        doc.forEach((doc1)=>{
            console.log(doc1.data().idEquipo);
            if(doc1.data().idEquipo==aux3){
                console.log(doc.docs[contado].id)
                var d=parseInt(doc1.data().puntosAfavor)+parseInt(BpuntFavor);
                var f=parseInt(doc1.data().puntosContra)+parseInt(BpuntCont);
                db.collection("Campeonatos").doc(aux).collection("EquiposInscritos").doc(doc.docs[contado].id).update({
                    partidosGanados:parseInt(doc1.data().partidosGanados)+g,
                    partidosJugados:parseInt(doc1.data().partidosJugados)+1,
                    partidosPerdidos:parseInt(doc1.data().partidosPerdidos)+p,
                    puntos:parseInt(doc1.data().puntos)+pun,
                    puntosAfavor:d,
                    puntosContra:f
                });
            }
        contado++;
        });
    });
    


    console.log(aux+", "+aux1+", "+aux2+", "+aux3+", "+fechaPart+", "+hora1+", "+hora2+", "+ApuntFavor+", "+ApuntCont+", "+BpuntCont+", "+BpuntFavor+", "+opcionR);
}