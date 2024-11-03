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
    }



    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskName = taskInput.value.trim();
        if (taskName !== "") {
            const task = new Task(taskName); // Crear una nueva instancia de Task
            this.tasks.push(task); // Agregar la tarea a la lista
            this.saveTasks(); // Guardar la lista en LocalStorage
            this.displayTasks(); // Mostrar las tareas en la lista
            taskInput.value = ""; // Limpiar el input
        }else {
            swal({
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
            const li = document.createElement("li");
            li.textContent = task.name;
            //Botón para eliminar la tarea
            const removeBtn = document.createElement("span");
            removeBtn.textContent = "❌";
            removeBtn.classList.add("remove");
            removeBtn.onclick = () => this.removeTask(task.id);

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

     // Método para eliminar una tarea por ID
     removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Guardar la lista actualizada en LocalStorage
        this.displayTasks();
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
const btn_newTask = document.getElementById('btn-newTask').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento predeterminado del Enter
        const btn_newTask = event.target.value;
        if (btn_newTask.trim() !== '') { // Verifica que el campo no esté vacío
            const newListItem = document.createElement('li');
            newListItem.textContent = btn_newTask;
            document.getElementById('list').appendChild(newListItem);
            event.target.value = ''; // Limpia el campo de entrada
        }
    }
});
const taskManager = new TaskManager();
taskManager.displayTasks();
