
const localStorage = window.localStorage;

    document.getElementById('agregar-tarea').addEventListener('submit', function(event) {
        event.preventDefault();

        const nuevaTareaNombre = document.getElementById('nueva-tarea').value;
        const nuevaTarea = { nombre: nuevaTareaNombre, completada: false };

        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.push(nuevaTarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));

        document.getElementById('mensaje').textContent = "Tarea guardada correctamente";
        document.getElementById('nueva-tarea').value = '';
    });