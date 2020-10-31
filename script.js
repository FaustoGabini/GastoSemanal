const presupuestoUsuario = prompt('Cual es tu presupuesto?');
const formulario = document.getElementById('formulario');
let cantidadPresupuesto;

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    VerPresupuesto() {
        console.log(this.presupuesto);
    }

    presupuestoRestante(cantidad = 0) { // 0 por defecto
        return this.restante -= Number(cantidad);
    }

}

class Interfaz {

    insertarPresupuesto(presupuesto) {
        const total = document.getElementById('total');
        const restante = document.getElementById('restante');

        total.innerText = `${presupuesto}`;
        restante.innerText = `${presupuesto}`;

    }

    ImprimirMensaje(mensaje, tipo) {

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alerta');
        if (tipo == 'error') {
            divMensaje.classList.add('error');
        } else if (tipo == 'correcto') {
            divMensaje.classList.add('correcto');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));

        // Insertar en el DOM
        document.querySelector('.contenido-primario').insertBefore(divMensaje, formulario);
        setTimeout(function () {
            document.querySelector('.alerta').remove();
            formulario.reset();
        }, 3000)

    }

    AgregarGasto(gasto, cantidad) {
        const gastoListado = document.getElementById('listado');
        const li = document.createElement('li');
        li.innerHTML = `${gasto}
                      <span>$${cantidad}</span>`;

        gastoListado.appendChild(li)
    }

    ActualizarRestante(cantidad) {
        const restante = document.getElementById('restante');
        const presupuestoUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerText = `${presupuestoUsuario}`;
        this.comprobarEstado();

    }

    comprobarEstado() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // Comprobar el 25% del gasto
        if ((presupuestoTotal * 0.25) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('restante-bien', 'restante-precaucion');
            restante.classList.add('restante-peligro');
        } else if ((presupuestoTotal * 0.5) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('restante-bien');
            restante.classList.add('restante-precaucion');
        }
    }

}


// Event Listeners
document.addEventListener('DOMContentLoaded', function () {

    if (presupuestoUsuario == null || presupuestoUsuario == '') {
        window.location.reload();
    } else {
        ui = new Interfaz();
        ui.insertarPresupuesto(presupuestoUsuario);
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        cantidadPresupuesto.VerPresupuesto();
        // console.log(presupuesto.presupuestoRestante(100));
    }
})

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const gasto = document.getElementById('gasto').value;
    const cantidad = document.getElementById('cantidad').value;
    const ui = new Interfaz();
    const presupuesto = new Presupuesto(presupuestoUsuario);

    if (gasto == '' || cantidad == '') {
        ui.ImprimirMensaje("Hubo un error", "error");
    } else {
        ui.ImprimirMensaje('Correcto', 'correcto');
        ui.AgregarGasto(gasto, cantidad);
        ui.ActualizarRestante(cantidad);

    }

})