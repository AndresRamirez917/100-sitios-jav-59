//Definición de la clase Task
class Task {
    constructor(name) {
        this.name = name;
        this.id = Date.now();
    }
}

//Definición de la clase TaskManager
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks(); // Cargar las tareas de LocalStorage al iniciar
        this.initEventListeners(); // Inicializar los event listeners
    }

    //Método que dispara el evento click al botón enter
    initEventListeners() {
        const taskInput = document.getElementById('taskInput');
        taskInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.addTask();
            }
        });
    }


    //Método para añadir tareas
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskName = taskInput.value.trim(); // Elimina espacios al inicio y final del input
        if (taskName !== "") {
            const task = new Task(taskName); // Crear una nueva instancia de Task
            this.tasks.push(task); // Agregar la tarea a la lista
            this.saveTasks(); // Guardar la lista en LocalStorage
            this.displayTasks(); // Mostrar las tareas en la lista
            taskInput.focus(); // Da el focus al input para ingresar nueva tarea
            taskInput.value = ""; // Limpiar el input
        }else {
            swal.fire({
                title: `El campo no puede estar vacío`,
                icon: "warning",
                 })
                 return false
        }
    }

    //Método para mostrar las tareas en la lista
    displayTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ""; //limpiar la lista de tareas

        //Recorrer el localStorage con las tareas y crear un elemento li
        this.tasks.forEach(task => {
            const div = document.createElement("div");
            const li = document.createElement("li");
            li.textContent = task.name;
            
            //Botones para eliminar y editar las tareas
            const removeBtn = document.createElement("span");
            const editBtn = document.createElement("span");
            removeBtn.textContent = "❌";
            editBtn.textContent = "🖍";
            editBtn.classList.add("edit");
            removeBtn.classList.add("remove");
            div.classList.add("span-flex")
            editBtn.onclick = () => this.editTask(task.id);
            removeBtn.onclick = () => this.removeTask(task.id);


            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

     // Método para eliminar una tarea por ID
     removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Guardar la lista actualizada en LocalStorage
        this.displayTasks(); //Muestra la lista actualizada
    }

    //Método para editar una tarea por ID
    editTask(id) {
        //Uso de la librería sweet alert para un input personalizado
        Swal.fire({
            title: 'Editar tarea',
            input: 'text',
            inputLabel: 'Nuevo nombre de la tarea',
            inputPlaceholder: 'Ingresa el nuevo nombre',
            showCancelButton: true,
            //value y result pueden ser cualquier cosa
            inputValidator: (value) => {
                if (!value) {
                    return '¡El campo no puede estar vacío!';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newTaskName = result.value.trim();
                if (newTaskName) {
                    const task = this.tasks.find(task => task.id === id);
                    if (task) {
                        task.name = newTaskName;
                        this.saveTasks(); // Guardar la lista actualizada en LocalStorage
                        this.displayTasks(); // Actualizar la lista mostrada
                    }
                } 
            }
        });
    }

     // Guardar las tareas en LocalStorage
     saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    // Cargar las tareas de LocalStorage
    loadTasks() {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    }
}

// Crear una instancia de TaskManager
const taskManager = new TaskManager();
taskManager.displayTasks();


