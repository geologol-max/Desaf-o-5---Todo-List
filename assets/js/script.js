// Requerimiento 6: Arreglo inicial de tareas
const initialTasks = [
    { id: 1711123456789, description: 'Hacer mercado', completed: true },
    { id: 1711123456790, description: 'Estudiar para la prueba', completed: false },
    { id: 1711123456791, description: 'Sacar a pasear a Tobby', completed: false },
];

let tasks = [...initialTasks];

// Elementos del DOM
const taskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const tasksContainer = document.getElementById('tasks-container');
const totalTasksElem = document.getElementById('total-tasks');
const completedTasksElem = document.getElementById('completed-tasks');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');

// Iconos SVG reutilizables
const circleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="10"/></svg>`;
const checkCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;

// Renderizar tareas (Actualiza el DOM basado en el arreglo `tasks`)
function renderTasks() {
    // Limpiar contenedor
    tasksContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<div class="p-12 text-center text-zinc-500 italic">No hay tareas pendientes. ¡Buen trabajo!</div>';
    } else {
        let html = '';
        for (const task of tasks) {
            // Últimos 4 digitos del ID
            const shortId = task.id.toString().slice(-4);
            
            // Clases CSS condicionales en base a "completed"
            const textStyle = task.completed ? 'text-zinc-500 line-through' : 'text-zinc-200';
            const btnStyle = task.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300';
            const icon = task.completed ? checkCircleIcon : circleIcon;
            
            html += `
                <div class="grid grid-cols-[80px_1fr_100px] gap-4 p-4 items-center hover:bg-zinc-800/20 transition-colors group">
                    <div class="text-[10px] font-mono text-zinc-600 pl-2">${shortId}</div>
                    
                    <div class="text-sm transition-all duration-300 ${textStyle}">
                        ${task.description}
                    </div>
                    
                    <div class="flex items-center justify-center gap-3">
                        <button onclick="toggleTask(${task.id})" class="p-1.5 rounded-lg transition-all ${btnStyle}" title="${task.completed ? 'Desmarcar' : 'Completar'}">
                            ${icon}
                        </button>
                        <button onclick="deleteTask(${task.id})" class="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:bg-red-500/20 hover:text-red-400 transition-all" title="Eliminar">
                            ${trashIcon}
                        </button>
                    </div>
                </div>
            `;
        }
        tasksContainer.innerHTML = html;
    }
    
    // Actualizar sección de estadísticas
    updateStats();
}

// Requerimiento 3 y 5: Actualizar contadores
function updateStats() {
    const total = tasks.length;
    // Filtrar tareas que estén completadas
    const completed = tasks.filter(t => t.completed).length;
    
    totalTasksElem.textContent = total;
    completedTasksElem.textContent = completed;
    
    // Barra de progreso
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressText.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;
}

// Requerimiento 1: Función para agregar tarea
function addTask() {
    const description = taskInput.value.trim();
    if (description === '') return;
    
    const newTask = {
        id: Date.now(),
        description: description,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = ''; // Limpiar el input
    
    renderTasks();
}

// Requerimiento 2: Función para eliminar tarea
// Se agrega a window param poder llamarla desde el atributo 'onclick' del HTML inyectado
window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};

// Requerimiento 4: Función para cambiar estado completado
window.toggleTask = function(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }
};

// Listeners de Eventos
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Inicialización de la aplicación
renderTasks();
