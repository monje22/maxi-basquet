formulario = document.querySelectorAll('#formulario');
const inputs = document.querySelectorAll('#formulario input');
const form = document.getElementById("formulario");
const Logo_campeonato = document.getElementById("File_logo");
const QR = document.getElementById("QR-file");

const expresiones ={
    Nombre: /^[a-zA-Z ñ Ñ]{2,70}$/,
    invitacion:/^[a-zA-ZñÑ " "]{10-1000}$/,
    Organizador: /^[a-zA-Z ñ Ñ]{2,70}$/,
    Costo:/^[0-9]$/
};

const validarFormulario = (e) => {
    
	switch (e.target.id) {
        case "Nombre":
			validarCampo(expresiones.Nombre, e.target, 'Nombre');
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

inputs.forEach((input) => {
    input.addEventListener('keyup',()=>{
       validarFormulario();
        console.log("oa")
    });
    input.addEventListener('blur',()=>{
        console.log("tuki")
    });
});

form.addEventListener("submit",e=>{
    e.preventDefault();
    // if(campos.Nombre && campos.Altura && campos.Edad && campos.Nacionalidad && campos.Peso && campos.perfil && campos.Cedula){
    //     console.log("subir");
    // }
});

//previsualizaciones de imagenes
//Logo
document.addEventListener("DOMContentLoaded", ()=>{
    
    const btn_logo = document.getElementById("btn-logo");
    btn_logo.addEventListener("click",()=>{
        Logo_campeonato.click();
    });
    Logo_campeonato.addEventListener("change",()=>{
        for(let i=0;i<Logo_campeonato.files.length;i++){
            const img_url = URL.createObjectURL(Logo_campeonato.files[i]);
            const logo= document.getElementById("logo");
            logo.src= img_url;
        }
    });
});
//QR
document.addEventListener("DOMContentLoaded", ()=>{
    
    const btn_QR = document.getElementById("QR_btn");
    btn_QR.addEventListener("click",()=>{
        QR.click();
    });
    QR.addEventListener("change",()=>{
        for(let i=0;i<QR.files.length;i++){
            const img_url = URL.createObjectURL(QR.files[i]);
            const qr= document.getElementById("QR");
            qr.src= img_url;
        }
    });
});