const camp = db.collection("Campeonatos").get()
camp.then((querySnapshot) => {
    let doc = querySnapshot.docs
    let lim = querySnapshot.size;
    const ht = document.getElementById("tarjeta")
    let i;
    for (i = 0; i < lim; i++) {
        ht.innerHTML += `<div id="tarjeta0${i}" class="row align-item-center">
        <div class="col-3">
            <img class="logo_evento" src="${doc[i].data().Logo}">
        </div>
        <div class="col">
            <div>
                <h3>${doc[i].data().NomCamp}</h3>
            </div>
            <div class="col row detalle">
                <h5 class="col-1">Rama:</h5>
                <label class="col-4">${doc[i].data().Rama}</label>
                <h5 class="col-2">Categoria:</h5>
                <label class="col-3">${doc[i].data().Categoria}</label>
            </div>
            <div>
                <label>${doc[i].data().Invitacion}</label>
            </div>
        </div>

        <div class="btn-editar">
            <br>
            <button class="btn btn-edit" id="editar${i}" type="button">Editar</button>
        </div>

    </div>
    <hr>`;
    }

    for (let j = 0; j < i; j++) {
        const btn_editar = document.getElementById('editar' + j);
        btn_editar.addEventListener("click", () => {
            window.location.href = ("editar_campeonato.html" + "#" + j)
        })

    }

    let btn_crear = document.getElementById('crear_camp');
    const seeker = document.getElementById('search');
    const tarjetas = document.getElementById('tarjetas');

    btn_crear.addEventListener("click", () => {
        /*if(contador<5){
            descripcion="o((>ω< ))o Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        crearEvento('https://www.ejemplos.co/wp-content/uploads/2015/11/Logo-Chanel.jpg','Campeonato chanel',descripcion);
        }   ------FUNCION DEL NICO QUE AÑADE TARJETAS-------*/
        window.location.href = "crear_campeonato.html";

    })

    // //-----------------FUNCION DEL BOTON CREAR CAMPEONATO QUE TE ENVIA A LA PAGINA CREARCAMPEONATO.HTML-------------
    // btn_editar.addEventListener("click", () => {
    //     window.location.href = "www.google.com"
    // })

});