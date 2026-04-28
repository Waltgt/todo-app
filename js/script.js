const listaTareas = document.getElementById('listaTareas');
const input = document.getElementById('tareaInput');
const mensajeError = document.getElementById('mensajeError');

document.getElementById('agregarTarea').addEventListener('click', agregarTarea);
input.addEventListener('keypress', function(event) {

    if (event.key === 'Enter') {
        agregarTarea();
    }
});

function agregarTarea() {
    console.log('Inicia función agregar tarea');

    const textArea = input.value.trim();
    console.log(textArea);

    if (textArea === '') {
        mensajeError.innerHTML = 'Ingrese un texto para agregar la tarea';
        mensajeError.style.display = 'block';
        return;
    } else {
        mensajeError.style.display = 'none';
    }

    crearTarea(textArea);
    input.value = "";   

    guardarLocalStorage();

    console.log('Finaliza función agregar tarea');
}

function crearTarea(texto, completada = false) {

    console.log('Inicia función crear tarea');

    const li = document.createElement('li');
    li.textContent = texto;

    if (completada) {
        li.classList.add('completada');
        guardarLocalStorage();
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completada');
    });

    const eliminar = document.createElement('span');
    eliminar.textContent = 'X';
    eliminar.classList.add('eliminar');
    eliminar.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(eliminar);

    listaTareas.appendChild(li);

    console.log('Finaliza función crear tarea');
}

function guardarLocalStorage() {
    const tareas = [];
    
    listaTareas.querySelectorAll('li').forEach(li => {
        tareas.push({
            texto: li.firstChild.textContent,
            completada: li.classList.contains('completada')
        });
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarDesdeLocalStorage() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    tareasGuardadas.forEach(tarea => crearTarea(tarea.texto, tarea.completada));
}

cargarDesdeLocalStorage();