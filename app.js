document.addEventListener('DOMContentLoaded', init);

function init() {
    cargarTareas();
    actualizarContadores();
}

function cargarTareas() {
    const listaTareas = document.getElementById("lista-tareas");
    listaTareas.innerHTML = '';
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    tareas.forEach((tarea, index) => {
        crearTarea(tarea, index);
    });
}

function crearTarea(tarea, index) {
    const listaTareas = document.getElementById("lista-tareas");
    const tareaElemento = document.createElement("div");
    tareaElemento.classList.add("tarea");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;
    checkbox.addEventListener("change", function() {
        tarea.completada = this.checked;
        guardarTareas();
        actualizarContadores();

        if (tarea.completada) {
            tareaElemento.classList.add("completada");
        } else {
            tareaElemento.classList.remove("completada");
        }
    });

    const nombreTarea = document.createElement("span");
    nombreTarea.textContent = tarea.nombre;

    tareaElemento.appendChild(checkbox);
    tareaElemento.appendChild(nombreTarea);
    listaTareas.appendChild(tareaElemento);

    if (tarea.completada) {
        tareaElemento.classList.add("completada");
    }
}

function guardarTareas() {
    const listaTareas = document.getElementById("lista-tareas");
    const tareas = [];
    listaTareas.querySelectorAll('.tarea').forEach(tareaElemento => {
        const nombre = tareaElemento.querySelector('span').textContent;
        const completada = tareaElemento.querySelector('input').checked;
        tareas.push({ nombre, completada });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function actualizarContadores() {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const completadas = tareas.filter(tarea => tarea.completada).length;
    const pendientes = tareas.length - completadas;

    document.getElementById('tareas-completadas').textContent = completadas;
    document.getElementById('tareas-pendientes').textContent = pendientes;
}