
formulario = document.querySelectorAll('#formulario');
const inputs = document.querySelectorAll('#formulario input');
const form = document.getElementById("formulario");
const Logo_campeonato = document.getElementById("File_logo");
const QR = document.getElementById("QR-file");
//INPUTS_DATES
const fechaInicio = document.getElementById("Fecha_ini");
const fechaFin = document.getElementById("Fecha_fin");
const fechaInscripcion = document.getElementById("Fecha_Inicio_inscription");
const fechaLimiteInsc = document.getElementById("Fecha_limite_incription");

const campos={
    Nombre : false ,
    Categoria:false,
    Rama:false,
    Invitacion : false,
    NombreO:false,
    FechaInicio:false,
    FechaFin:false,
    FechaInscripcion:false,
    FechaLimiteInsc:false,
    CostoPre:false,
    Costo:false,
    ImagenQr:false
};

const expresiones ={
    Nombre: /^[a-zA-Z ñ Ñ]{5,70}$/,
    invitacion:/^[\w ñÑ?¿=,.;'"-:<>]{10,1000}$/,
    NombreO: /^[a-zA-Z ñ Ñ]{2,70}$/,
    CostoPre:/^\d*(\.\d+)$/,
    Costo:/^\d*(\.\d+)$/,
    
};

const validarFormulario = (e) => {
    
	switch (e.target.id) {
        case "Nombre":
			validarCampo(expresiones.Nombre, e.target, 'Nombre');
		break;
		case "Invitacion":
			validarCampo(expresiones.invitacion, e.target, 'Invitacion');
		break;
		case "NombreO":
			validarCampo(expresiones.NombreO, e.target, 'NombreO');
		break;
		case "CostoPre":
			validarCampo(expresiones.CostoPre, e.target, 'CostoPre');
		break;
		case "Costo":
			validarCampo(expresiones.Costo,e.target,'Costo')
		break;
		
	}
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		
		document.getElementById(`error-${campo}`).classList.remove('msg-error-activo');
        document.getElementById(`error-${campo}`).classList.add('msg-error');
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`${campo}`).classList.add('is-valid');
		campos[campo] = true;
	} else {
		document.getElementById(`error-${campo}`).classList.add('msg-error-activo');
        document.getElementById(`${campo}`).classList.add('is-invalid');
		campos[campo] = false;
	}
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario );
    input.addEventListener('blur', validarFormulario );
});


function errorActivo(campito){
    
    document.getElementById(`error-${campito}`).classList.add('msg-error-activo');
	campos[campito] = false;
	
}

function errorDesactivo(campito){
    document.getElementById(`error-${campito}`).classList.remove('msg-error-activo');
    document.getElementById(`error-${campito}`).classList.add('msg-error');
	campos[campito] = true;
}

function Fecha(){
    let date=new Date();
    let day= date.getDate();
    let month=date.getMonth() +1;
    const year = date.getFullYear();
    
    if(day < 10){
        day ="0" + day;
    }
    if(month<10){
        month = "0"+ month;
    }
    let fecha_hoy= year + "-" + month + "-" + day;
    return fecha_hoy;
}
//limpiar errores de dates
fechaInicio.addEventListener("change", ()=>{
    errorDesactivo('FechaInicio');
});
fechaFin.addEventListener("change", ()=>{
    errorDesactivo('FechaFin');
});
fechaInscripcion.addEventListener("change", ()=>{
    errorDesactivo('fechaInscripcion');
});
fechaLimiteInsc.addEventListener("change", ()=>{
    errorDesactivo('fechaLimiteInsc');
});
    

form.addEventListener("submit",e=>{
    e.preventDefault();
    //verificacion dates vacios
//fecha inicio
    if(fechaInicio.value.length > 0){
        console.log("hay valor");
    }else{
        errorActivo('FechaInicio');
        console.log(fechaInicio.value + "hola 1");
        console.log("no hay valoh");
    }
//fecha fin
    if(fechaFin.value.length > 0){
            campos.FechaFin = true;
    }else{
        errorActivo('FechaFin');
    }
//fecha inicio inscripcion
    if(fechaInscripcion.value.length > 0){
            
    }else{
        errorActivo('fechaInscripcion');
    }
//fecha limite inscripcion
    if(fechaLimiteInsc.value.length > 0){
            
    }else{
        errorActivo('fechaLimiteInsc');
    }



    if(campos.Categoria && campos.Costo && campos.CostoPre && campos.FechaFin && campos.FechaInicio && campos.FechaInscripcion && campos.FechaLimiteInsc && campos.ImagenQr && campos.Invitacion && campos.Nombre && campos.NombreO){
        console.log("subir");
    }
});

//Configuracion de input date
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_ini").setAttribute('min',Fecha()) ;
});
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_fin").setAttribute('min',Fecha()) ;
});
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_Inicio_inscription").setAttribute('min',Fecha()) ;
});
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_limite_incription").setAttribute('min',Fecha()) ;
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