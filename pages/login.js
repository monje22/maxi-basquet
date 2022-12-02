const mail = document.getElementById("1");
const password = document.getElementById("2");
const inputs = document.querySelectorAll('#form_login input');

const expresiones={
    email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password:/^.{6,16}$/
}
function comprobar(){
    console.log("cuak");
}
const validarFormulario = (e) => {
    
	switch (e.target.id) {
        case "1":
			validarCampo(expresiones.email, e.target, 'Email');
		break;
		case "2":
			validarCampo(expresiones.password, e.target, 'Password');
		break;
    }
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		
		document.getElementById(`error-${campo}`).classList.remove('msg-error-activo');
        document.getElementById(`error-${campo}`).classList.add('msg-error');
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`${campo}`).classList.add('is-valid');
	} else {
		document.getElementById(`error-${campo}`).classList.add('msg-error-activo');
        document.getElementById(`${campo}`).classList.add('is-invalid');
		
	}
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

