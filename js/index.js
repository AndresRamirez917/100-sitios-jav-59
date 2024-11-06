class Task {
    constructor(name, id = Date.now()) {
        this.name = name;
        this.id = id;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks(); // Cargar las tareas de LocalStorage al iniciar
        this.currentTaskId = null; // ID de la tarea que se está editando
        this.initEventListeners(); // Inicializar los event listeners
        this.displayTasks(); // Mostrar las tareas al iniciar
    }

    initEventListeners() {
        const taskInput = document.getElementById('taskInput');
        taskInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevenir el comportamiento por defecto del Enter
                this.saveTask();
            }
        });
    }

    saveTask() {
        const taskInput = document.getElementById('taskInput');
        const taskName = taskInput.value.trim(); // Elimina espacios al inicio y final del input
        if (taskName !== "") {
            if (this.currentTaskId !== null) {
                // Editar tarea existente
                const task = this.tasks.find(task => task.id === this.currentTaskId);
                if (task) {
                    task.name = taskName;
                }
            } else {
                // Crear nueva tarea
                const task = new Task(taskName);
                this.tasks.push(task);
            }
            this.currentTaskId = null; // Resetear el ID de la tarea actual
            this.saveTasks(); // Guardar la lista en LocalStorage
            this.displayTasks(); // Mostrar las tareas en la lista
            taskInput.value = ""; // Limpiar el input
        } else {
            swal.fire({
                title: `El campo no puede estar vacío`,
                icon: "warning",
            });
        }
    }

    editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            document.getElementById('taskInput').value = task.name;
            document.getElementById('taskInput').focus();
            this.currentTaskId = id;
        }
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Guardar la lista actualizada en LocalStorage
        this.displayTasks(); // Mostrar la lista actualizada
        document.getElementById('taskInput').focus();
    }

    displayTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ""; // Limpiar la lista de tareas

        this.tasks.forEach(task => {
            const div = document.createElement("div");
            const li = document.createElement("li");
            li.textContent = task.name;

            const removeBtn = document.createElement("span");
            const editBtn = document.createElement("span");
            removeBtn.textContent = "❌";
            editBtn.textContent = "🖍";
            editBtn.classList.add("edit");
            removeBtn.classList.add("remove");
            div.classList.add("span-flex");
            editBtn.onclick = () => this.editTask(task.id);
            removeBtn.onclick = () => this.removeTask(task.id);

            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }
}

const taskManager = new TaskManager();