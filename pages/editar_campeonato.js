formulario = document.querySelectorAll('#formulario');
const inputs = document.querySelectorAll('#formulario input');
const inputsdate = document.querySelectorAll('#formulario input.date');
const form = document.getElementById("formulario");
const Logo_campeonato = document.getElementById("File_logo");
const QR1 = document.getElementById("QR-file1");
const QR2 = document.getElementById("QR-file2");
let dropdown1=document.getElementById("inputGroupSelect01");
let dropdown2=document.getElementById("inputGroupSelect02")
//INPUTS_DATES
const fechaInicio = document.getElementById("Fecha_ini");
const fechaFin = document.getElementById("Fecha_fin");
const fechaInscripcion = document.getElementById("Fecha_inscription_normal");
const fechaLimiteInsc = document.getElementById("Fecha_limite_incription");
const fechaInicioPreinsc=document.getElementById("Fecha_inicio_Preinscripcion");

const expresiones ={
    Nombre: /^[a-zA-Z ñ Ñ]{5,70}$/,
    invitacion:/^[\w ñÑ?¿=,.;'"-:<>]{10,1000}$/,
    NombreO: /^[a-zA-Z ñ Ñ]{2,70}$/,
    CostoPre:/^\d*(\.\d+)$/,
    Costo:/^\d*(\.\d+)$/,
    
};
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
    ImagenQr1:true,
    ImagenQr2:true,
    Logo:true
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
fechaInicioPreinsc.addEventListener("change", ()=>{
    errorDesactivo('fechaInicioPreinsc');
});
form.addEventListener("submit",e=>{
    e.preventDefault();
    //verificacion dates vacios
//fecha inicio
    if(fechaInicio.value.length > 0){
        
    }else{
        errorActivo('FechaInicio');
    }
//fecha fin
    if(fechaFin.value.length > 0){
            
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
    if(fechaInicioPreinsc.value.length > 0){
                
    }else{
        errorActivo('fechaInicioPreinsc');
    }
});

//activar fechas
function verificar(a){
    switch(a){
        case 1:
                console.log('caso')
                if(Date.parse(fechaInscripcion.value)<Date.parse(fechaInicioPreinsc.value) || Date.parse(fechaInscripcion.value)==Date.parse(fechaInicioPreinsc.value)){
                    errorActivo('fechaInscripcion');
                }
                if(Date.parse(fechaLimiteInsc.value) < Date.parse(fechaInscripcion.value) || Date.parse(fechaLimiteInsc.value) == Date.parse(fechaInscripcion.value)){
                    console.log('cuak')
                    errorActivo('fechaLimiteInsc');
                }
            break;

            case 2:
                if(Date.parse(fechaInscripcion.value)<Date.parse(fechaInicioPreinsc.value) || Date.parse(fechaInscripcion.value)==Date.parse(fechaInicioPreinsc.value)){
                    errorActivo('fechaInscripcion');
                }

                if(Date.parse(fechaLimiteInsc.value) < Date.parse(fechaInscripcion.value) || Date.parse(fechaLimiteInsc.value) == Date.parse(fechaInscripcion.value)){
                    errorActivo('fechaLimiteInsc');
                }
            break;

            case 3:
                if(Date.parse(fechaLimiteInsc.value) < Date.parse(fechaInscripcion.value) || Date.parse(fechaLimiteInsc.value) == Date.parse(fechaInscripcion.value)){
                    errorActivo('fechaLimiteInsc');
                }
            break;
    }
    

    
}

fechaInicioPreinsc.addEventListener('change',()=>{
    if(fechaInicioPreinsc.value !=''){
        // if(fechaInscripcion.value > fechaInicioPreinsc.value){
        //     if(fechaLimiteInsc.value > fechaInicioPreinsc.value){

        //     }else{errorActivo('fechaLimiteInsc')}
        // }else{errorActivo('fechaInscripcion')}
        verificar(1)
    }else{
        errorActivo('fechaInicioPreinsc')
    }
})

fechaInscripcion.addEventListener('change',()=>{
    if(fechaInscripcion.value !=''){
      verificar(2)
    }else{
        errorActivo('fechaInscripcion');
        
    }
})

fechaLimiteInsc.addEventListener('change',()=>{
    if(fechaLimiteInsc.value != ''){
        verificar(3)
    }else{
        errorActivo('fechaLimiteInsc');
    }
})


fechaInicio.addEventListener('change',()=>{
    if(fechaInicio.value != ''){
        console.log('a')
        if(Date.parse(fechaInicio.value) < Date.parse(fechaLimiteInsc.value) || Date.parse(fechaInicio.value) == Date.parse(fechaLimiteInsc.value)){
            errorActivo('FechaInicio');
        }
    }else{
        errorActivo('FechaInicio');
   }  
})
fechaFin.addEventListener('change',()=>{
    if(fechaFin.value !=''){
        if(Date.parse(fechaFin.value) < Date.parse(fechaInicio.value) || Date.parse(fechaFin.value) == Date.parse(fechaInicio.value)){
            errorActivo('FechaFin');
        }
    }else{
         errorActivo('FechaFin');
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
    document.getElementById("Fecha_inscription_normal").setAttribute('min',Fecha()) ;
});
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_limite_incription").setAttribute('min',Fecha()) ;
});
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Fecha_inicio_Preinscripcion").setAttribute('min',Fecha()) ;
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
        
    }else{
        document.getElementById('error-logo').classList.add('msg-error-activo');
        logo.src="../assets/img/logo-placeholder.png";

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
        qr1.src="../assets/img/QR.png";
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

    }else{
        document.getElementById('error-qr2').classList.add('msg-error-activo');
        qr2.src="../assets/img/QR.png";
    }    
});