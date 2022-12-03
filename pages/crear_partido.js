const equipo1 = document.getElementById("equipo1");
const equipo2 = document.getElementById("equipo2");
const fecha = document.getElementById("Fecha_encuentro");
const categoria = document.getElementById("categoria");
const agregar = document.getElementById("btn_agregar");
const cancelar = document.getElementById("btn_cancelar")
const tiempo = document.getElementById("tiempo");

let campos = {
    equipo1: false,
    equipo2: false,
    fecha: false,
    categoria: false,
    tiempo: false
}

agregar.addEventListener('click', () => {
    mismoEquipo();
    date();
    category();
    time();
    if (campos[equipo1] == true && campos[equipo2] == true && campos[fecha] == true && campos[categoria] == true) {
        console.log("agregao");
    }

});

function mismoEquipo() {
    if (equipo1.value != 0 && equipo2.value != 0) {
        if (equipo1.value == equipo2.value) {
            campos['equipo1'] = false;
            campos['equipo2'] = false;
            errorActivo('equipo');
        } else {
            errorDesactivo('equipo');
            campos['equipo1'] = true;
            campos['equipo2'] = true;
        }
    } else {
        campos['equipo1'] = false;
        campos['equipo2'] = false;
        errorActivo('equipo');

    }
}

function date() {
    if (fecha.value == "") {
        errorActivo('fecha');
        campos['fecha'] = false
    } else {
        campos['fecha'] = true;
        errorDesactivo('fecha');
    }
}

function time() {
    if (tiempo.value == "") {
        errorActivo('tiempo');
        campos['tiempo'] = false
    } else {
        campos['tiempo'] = true;
        errorDesactivo('tiempo');
    }
}

function category() {
    if (categoria.value == 0) {
        errorActivo('categoria');
        campos['categoria'] = false
    } else {
        campos['categoria'] = true;
        errorDesactivo('categoria');
    }
}

function errorActivo(campo) {
    document.getElementById(`msg_${campo}`).classList.add('msg-error-activo');
}

function errorDesactivo(campo) {
    document.getElementById(`msg_${campo}`).classList.remove('msg-error-activo');
    document.getElementById(`msg_${campo}`).classList.add('msg-error');
}

// equipo1.addEventListener('change',()=>{
//     mismoEquipo();
// });
// equipo2.addEventListener('change',()=>{
//     mismoEquipo();
// });
tiempo.addEventListener('change', () => {
    time();
});
fecha.addEventListener('change', () => {
    date();
});
categoria.addEventListener('change', () => {
    category();
});
//limites de fechas
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("Fecha_encuentro").setAttribute('min', Fecha());
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("Fecha_encuentro").setAttribute('max', '2023-01-01');
});
//fecha de hoy
function Fecha() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    let fecha_hoy = year + "-" + month + "-" + day;
    return fecha_hoy;
}
cancelar.addEventListener('click', () => {
    window.location.href = "./calendarioAdmin.html"
})