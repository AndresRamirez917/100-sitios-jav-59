class Task {
    constructor(name) {
        this.name = name;
        this.id = Date.now();
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskName = taskInput.value.trim();
        if(taskName !== ""){
            const task = new Task(taskName);
            this.tasks.push(task);
            this.displayTasks();
            taskInput.value = "";
            taskInput.focus();
        }else {
            swal({
                title: `El campo no puede estar vacío`,
                icon: "error",
                 })
                 return false
        }
    }

    displayTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.name;

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
        this.displayTasks();
    }
}
// Crear una instancia de TaskManager
//const btn_newTask = document.getElementById('btn-newTask').onclick = (e) => {
//e.preventDefault();
const taskManager = new TaskManager();
//}
