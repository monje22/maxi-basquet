const mail=document.getElementById("mail");
const password=document.getElementById("password");
const password2=document.getElementById("password2");
const nameD=document.getElementById("nombDelegado");
const form=document.getElementById("form");
const expresiones ={
    nombreDelegado:/^[a-zA-Z]{2,70}$/,
    usuario:/^[a-zA-z_-]{4,16}$/,
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password:/^.{6,16}$/

};
function verificarExpreciones(e){
	console.log("ola");
	let nombre=false,email=false,passw=false, passw2=false;
	//nombreDelegado
	if(expresiones.nombreDelegado.test(nameD.value)){
		document.querySelector(`#nombre .input-error`).classList.remove('input-error-activo');
		nombre=true;
	}else{
		document.querySelector(`#nombre .input-error`).classList.add('input-error-activo');
		console.log("error");
		nombre=false;
	}
	//correo
	if(expresiones.email.test(mail.value)){
		document.querySelector(`#correo .input-error`).classList.remove('input-error-activo');
		email=true;
	}else{
		document.querySelector(`#correo .input-error`).classList.add('input-error-activo');
		console.log("error");
		email=false;
	}
	//contraseña1
	if(expresiones.password.test(password.value)){
		document.querySelector(`#contraseña1 .input-error`).classList.remove('input-error-activo');
		passw=true;
	}else{
		document.querySelector(`#contraseña1 .input-error`).classList.add('input-error-activo');
		console.log("error");
		passw=false;
	}
	//contraseña2
	if(password.value=password2.value){
		document.querySelector(`#contraseña2 .input-error`).classList.remove('input-error-activo');
		passw2=true;
	}else{
		document.querySelector(`#contraseña2 .input-error`).classList.add('input-error-activo');
		passw2=false;
	}
	if(nombre && email && passw && passw2 == true){
		console.log("submit")
	}
};

form.addEventListener("submit",e=>{
	e.preventDefault()
	verificarExpreciones(e);
}
);




