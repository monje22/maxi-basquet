let btn_crear= document.getElementById('crear_camp');
const seeker=document.getElementById('search');
const tarjetas=document.getElementById('tarjetas');

let contador=0;
function crearEvento(url, titulo, descripcion){
    let elementoHtml="";
    console.log('creando');
    elementoHtml=`<div class="row align-item-center">
                    <div class="col-3">
                        <img class="logo_evento" src=${url}">                                    
                    </div>
                    <div class="col">
                        <div>
                            <h3>${titulo}</h3>
                        </div>
                        <div>
                            <label>${descripcion}</label>
                        </div>    
                    </div>
                    
                    <div class="btn-editar">
                        <br>                        
                        <button class="btn btn-edit" type="button" id="editar">Editar</button>                        
                    </div>                            
                    
                </div>
                <hr>`
    tarjetas.insertAdjacentHTML('beforeend',elementoHtml);
    contador++;
    
}
const btn_editar=document.getElementById('editar');
btn_crear.addEventListener("click", ()=>{
    if(contador<5){
        descripcion="o((>ω< ))o Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    crearEvento('https://www.ejemplos.co/wp-content/uploads/2015/11/Logo-Chanel.jpg','Campeonato chanel',descripcion);
    }
    
})


btn_editar.addEventListener("click", ()=>{
    window.location.href="www.google.com"
})