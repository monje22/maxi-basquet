
formulario = document.querySelectorAll('#formulario');
inputs = document.querySelectorAll('#formulario input');
const form=document.getElementById("formulario");
const Ci_img = document.getElementById("File02");
const img_perfil= document.getElementById("File01");

const expresiones ={
    nombre:/^[a-zA-Z]{2,70}$/,
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
    Nombre: false,
    Nacionalidad: false,
    Edad: false,
    Peso: false,
    Altura: false,
    Cedula: false
};

const validarFormulario = (e) => {
    
	switch (e.target.id) {
        case "Nombre":
			validarCampo(expresiones.nombre, e.target, 'Nombre');
		break;
		case "Nacionalidad":
			validarCampo(expresiones.nacionalidad, e.target, 'Nacionalidad');
		break;
		case "Edad":
			validarCampo(expresiones.edad, e.target, 'Edad');
		break;
		case "Peso":
			validarCampo(expresiones.peso, e.target, 'Peso');
		break;
		case "Altura":
			validarCampo(expresiones.altura,e.target,'Altura')
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
Ci_img.addEventListener("change",()=>{
    if(Ci_img.files.length == 1){
        document.getElementById('error-Cedula').classList.remove('input-error-activo');
        document.getElementById('error-Cedula').classList.add('input-error');
        campos['Cedula'] = true;
    }else{
        document.getElementById('error-Cedula').classList.add('input-error-activo');
        document.getElementById('File02').classList.add('is-invalid');
        campos['Cedula']=false;
    }
});

//BOTON SUBMIT
form.addEventListener("submit",e=>{
    e.preventDefault();
    if(campos.Nombre && campos.Altura && campos.Edad && campos.Nacionalidad && campos.Peso && campos.perfil && campos.Ci){
        console.log("subir");
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


