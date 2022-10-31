

formulario = document.querySelectorAll('#formulario');
inputs = document.querySelectorAll('#formulario input');
const form=document.getElementById("formulario");
//const Ci_img = document.getElementById("File02");
const img_perfil= document.getElementById("File01");

const expresiones ={
    nombre:/^[a-zA-Z ñ Ñ]{2,70}$/,
    usuario:/^[a-zA-z_-]{4,16}$/,
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password:/^.{6,16}$/,
    nacionalidad:/^[a-zA-Z]{4,70}$/,
    edad: /^[0-9]{2,3}$/,
    peso:/^[0-9]{2,3}$/,
    altura:/^[0-9]{2,3}$/
};

const campos={
    perfil: false,
    Nombref: false,
    Nacionalidadf: false,
    Edadf: false,
    Pesof: false,
    Alturaf: false,
    Cedulaf: true
};

const validarFormulario = (e) => {
    
	switch (e.target.id) {
        case "Nombref":
			validarCampo(expresiones.nombre, e.target, 'Nombref');
		break;
		case "Nacionalidadf":
			validarCampo(expresiones.nacionalidad, e.target, 'Nacionalidadf');
		break;
		case "Edadf":
			validarCampo(expresiones.edad, e.target, 'Edadf');
		break;
		case "Pesof":
			validarCampo(expresiones.peso, e.target, 'Pesof');
		break;
		case "Alturaf":
			validarCampo(expresiones.altura,e.target,'Alturaf')
		break;
		
	}
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		
		document.getElementById(`error-${campo}`).classList.remove('input-error-activo');
        document.getElementById(`error-${campo}`).classList.add('input-error');
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`${campo}`).classList.add('is-valid');
		campos[campo] = true;
	} else {
		document.getElementById(`error-${campo}`).classList.add('input-error-activo');
        document.getElementById(`${campo}`).classList.add('is-invalid');
		campos[campo] = false;
	}
};

inputs.forEach((input)=>{
    // input.addEventListener('keyup', ()=>{
    
    // });
    input.addEventListener('keyup',validarFormulario)
    input.addEventListener('blur', validarFormulario);
});

//VERIFICAR QUE SE AGREGO IMAGEN DE PERFIL
img_perfil.addEventListener("change",()=>{
    if(img_perfil.files.length == 1){
        document.getElementById('error-Perfil').classList.remove('input-error-activo');
        document.getElementById('error-Perfil').classList.add('input-error');
        campos['perfil'] = true;
    }else{
        document.getElementById('error-Perfil').classList.add('input-error-activo');
        perfil.src="/assets/img/perfil_placeholder.jpg";
        campos['perfil']=false;
    }    
});

//VERIFICAR QUE SE AGREGO IMAGEN DE CEDULA DE IDENTIDAD
/*Ci_img.addEventListener("change",()=>{
    if(Ci_img.files.length == 1){
        document.getElementById('error-Cedulaf').classList.remove('input-error-activo');
        document.getElementById('error-Cedulaf').classList.add('input-error');
        document.getElementById('File02').classList.remove('is-invalid');
        document.getElementById('File02').classList.add('is-valid');
        campos['Cedula'] = true;
    }else{
        document.getElementById('error-Cedulaf').classList.add('input-error-activo');
        document.getElementById('File02').classList.add('is-invalid');
        campos['Cedula']=false;
    }
});*/

//BOTON SUBMIT
form.addEventListener("submit",e=>{
    e.preventDefault();
    if(campos.Nombref && campos.Alturaf && campos.Edadf && campos.Nacionalidadf && campos.Pesof && campos.perfil && campos.Cedulaf){
        console.log("Esto deberia aparecer");
    }
});

//PREVISUALIZAR LA IMAGEN SELECCIONADA

document.addEventListener("DOMContentLoaded", ()=>{
    
    const btn_perfil=document.getElementById("btn-perfil");
    btn_perfil.addEventListener("click",()=>{
        img_perfil.click();
    });
    img_perfil.addEventListener("change",()=>{
        for(let i=0;i<img_perfil.files.length;i++){
            const img_url = URL.createObjectURL(img_perfil.files[i]);
            const perfil= document.getElementById("perfil");
            perfil.src= img_url;
        }
    });
});



//CAPTURAR DATOS DE FORMULARIO------------------------------------------------------


