class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    showEditTask(id) {
        const task = this.tasks.find(task => task.id === id);
        document.getElementById('new-task').value = task.description;
        localStorage.setItem('editing', task.id)
    }

    setEditedTask(editId) {
        const task = this.tasks.find(task => task.id === editId);
        task.id = editId;
        task.description = document.getElementById('new-task').value;
        task.completed = false;
        this.saveTasks()
        this.renderTasks()
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'editar'
            editButton.setAttribute('data-id', task.id);
            editButton.addEventListener('click', (e) => {
                e.stopPropagation()
                const dataID = editButton.getAttribute('data-id');
                this.showEditTask(Number(dataID));
            })

            item.appendChild(editButton);
            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const idEdit = localStorage.getItem('editing')

        if(idEdit){
            taskManager.setEditedTask(Number(idEdit))
            document.getElementById('new-task').value = '';
            localStorage.removeItem('editing')
            console.log(localStorage.getItem('editing')); //validador de si se borra o no el elemento en el local
        }else{
            const newTask = document.getElementById('new-task').value;
            if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
        }
    });
});
