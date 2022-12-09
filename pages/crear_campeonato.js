
formulario = document.querySelectorAll('#formulario');
const inputs = document.querySelectorAll('#formulario input');
const form = document.getElementById("formulario");
const Logo_campeonato = document.getElementById("File_logo");
const QR1 = document.getElementById("QR-file1");
const QR2 = document.getElementById("QR-file2");
let dropdown1=document.getElementById("inputGroupSelect01");
let dropdown2=document.getElementById("inputGroupSelect02")
//INPUTS_DATES
const fechaInicio = document.getElementById("Fecha_ini");
const fechaFin = document.getElementById("Fecha_fin");
const fechaInscripcion = document.getElementById("Fecha_Inicio_inscription");
const fechaLimiteInsc = document.getElementById("Fecha_limite_incription");
const fechaLimitePreinsc=document.getElementById("Fecha_limite_Preinscripcion");

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
    FechaLimitePreinsc:false,
    CostoPre:false,
    Costo:false,
    ImagenQr1:false,
    ImagenQr2:false,
    Logo:false
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
fechaLimitePreinsc.addEventListener("change", ()=>{
    errorDesactivo('fechaLimitePreinsc');
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
//fecha limite preinscripcion
    if(fechaLimitePreinsc.value.length > 0){
                
    }else{
        errorActivo('fechaLimitePreinsc');
    }

    if(campos.Categoria && campos.Costo && campos.CostoPre && campos.FechaFin && campos.FechaInicio && campos.FechaInscripcion && campos.FechaLimiteInsc && campos.FechaLimitePreinsc && campos.ImagenQr && campos.Invitacion && campos.Nombre && campos.NombreO){
        console.log("subir");
    }
});

//activar fechas

fechaInicio.addEventListener('change',()=>{
    if(fechaInicio.value ==''){
        fechaFin.setAttribute('disabled','')
    }else{
        fechaFin.removeAttribute('disabled')
    }
    
})
fechaFin.addEventListener('change',()=>{
    if(fechaInicio.value >= fechaFin.value){
        errorActivo('FechaFin');
        fechaInscripcion.setAttribute('disabled','')
    }else{
        if(fechaInicio.value ==''){
            fechaInscripcion.setAttribute('disabled','')
        }else{
            fechaInscripcion.removeAttribute('disabled')
        }
    }
})
fechaInscripcion.addEventListener('change',()=>{
    if(fechaInscripcion.value >= fechaInicio.value && fechaInscripcion.value <= fechaFin.value){
        if(fechaInscripcion.value ==''){
            fechaLimiteInsc.setAttribute('disabled','')
        }else{
            fechaLimiteInsc.removeAttribute('disabled')
        }
    }else{
        errorActivo('fechaInscripcion');
        fechaLimiteInsc.setAttribute('disabled','')
    }
    
        
})
fechaLimiteInsc.addEventListener('change',()=>{
    if(fechaLimiteInsc.value >= fechaInicio.value && fechaLimiteInsc.value < fechaFin.value){
        if(fechaInscripcion.value ==''){
            fechaLimitePreinsc.setAttribute('disabled','')
        }else{
            fechaLimitePreinsc.removeAttribute('disabled')
        }
    }else{
        errorActivo('fechaLimiteInsc');
        fechaLimitePreinsc.setAttribute('disabled','')
    }
})
fechaLimitePreinsc.addEventListener('change',()=>{
    if(fechaLimitePreinsc.value >= fechaInicio.value && fechaLimitePreinsc.value < fechaFin.value && fechaLimitePreinsc.value < fechaLimiteInsc.value && fechaLimitePreinsc.value !=''){

    }else{
        errorActivo('fechaLimitePreinsc')
    }
})


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
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_limite_Preinscripcion").setAttribute('min',Fecha()) ;
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

Logo_campeonato.addEventListener("change",()=>{
    if(Logo_campeonato.files.length == 1){
        document.getElementById('error-logo').classList.remove('msg-error-activo');
        document.getElementById('error-logo').classList.add('msg-error');
        campos['Logo'] = true;
    }else{
        document.getElementById('error-logo').classList.add('msg-error-activo');
        logo.src="../assets/img/logo-placeholder.png";
        campos['Logo']=false;
    }    
});

//QR1
document.addEventListener("DOMContentLoaded", ()=>{
    
    const btn_QR1 = document.getElementById("QR_btn1");
    btn_QR1.addEventListener("click",()=>{
        QR1.click();
    });
    QR1.addEventListener("change",()=>{
        for(let i=0;i<QR1.files.length;i++){
            const img_url = URL.createObjectURL(QR1.files[i]);
            const qr= document.getElementById("QR1");
            qr1.src= img_url;
        }
    });
});

QR1.addEventListener("change",()=>{
    if(QR1.files.length == 1){
        document.getElementById('error-qr1').classList.remove('msg-error-activo');
        document.getElementById('error-qr1').classList.add('msg-error');
        campos['ImagenQr1'] = true;
    }else{
        document.getElementById('error-qr1').classList.add('msg-error-activo');
        qr1.src="../assets/img/65828429-1454-4d14-abc8-172c34bb9420.png";
        campos['ImagenQr1']=false;
    }    
});

//QR2
document.addEventListener("DOMContentLoaded", ()=>{
    
    const btn_QR2 = document.getElementById("QR_btn2");
    btn_QR2.addEventListener("click",()=>{
        QR2.click();
    });
    QR2.addEventListener("change",()=>{
        for(let i=0;i<QR2.files.length;i++){
            const img_url = URL.createObjectURL(QR2.files[i]);
            const qr= document.getElementById("QR2");
            qr2.src= img_url;
        }
    });
});

QR2.addEventListener("change",()=>{
    if(QR2.files.length == 1){
        document.getElementById('error-qr2').classList.remove('msg-error-activo');
        document.getElementById('error-qr2').classList.add('msg-error');
        campos['ImagenQr2'] = true;
    }else{
        document.getElementById('error-qr2').classList.add('msg-error-activo');
        qr2.src="../assets/img/65828429-1454-4d14-abc8-172c34bb9420.png";
        campos['ImagenQr2']=false;
    }    
});
//DROPDOWNS
//categoria
dropdown1.addEventListener('change',()=>{
    if(dropdown1.value ==1){
        document.getElementById("inputGroupSelect01").classList.add('is-valid');
    }else{
        document.getElementById("inputGroupSelect01").classList.add('is-invalid');
    }
});
dropdown2.addEventListener('change',()=>{
    if(dropdown2.value ==1){
        document.getElementById("inputGroupSelect02").classList.add('is-valid');
    }else{
        document.getElementById("inputGroupSelect02").classList.add('is-invalid');
    }
});