class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
//acá se cambia el estado de si esta completado o no
    toggleComplete() {
        this.completed = !this.completed;
    }
}
//este es la clase que nos predetermina los atributos y metodos que van a tener las instancias de TaskManager
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.renderTasks();
    }
//aca creamos las instancias de los task y se los añadimos en la ultima posicion de array tasks
    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }
//en este metodo recibimos el id y filtramos el array con los datos que su id no coincida con el id indicado
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
//con este methodo lo que hacemos es crear una instancia con la informacion guardada de la instancia anterior en el local para poder acceder al metodo toggle, apenas podemos acceder y cambiar su estado, recorremos el array y reemplazamos la instancia en el arreglo y lo volvemos a subir
    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const newTask = new Task(task.id, task.description, task.completed)
            newTask.toggleComplete();
            this.tasks = this.tasks.map((task) =>  { return task.id === id ? newTask: task} )
            this.saveTasks();
            this.renderTasks();
        }
    }
//Acá llevamos la info a los input para reciclar los elementos y editarlo.
    showEditTask(id) {
        const task = this.tasks.find(task => task.id === id);
        document.getElementById('new-task').value = task.description;
        localStorage.setItem('editing', task.id)
    }

//aca cargamos la informacion editada en el local y lo guardamos
    setEditedTask(editId) {
        const task = this.tasks.find(task => task.id === editId);
        task.id = editId;
        task.description = document.getElementById('new-task').value;
        task.completed = false;
        this.saveTasks()
        this.renderTasks()
    }

//llevamos la info al local
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
//tercero para renderizar los tasks
    loadTasks() {
        this.renderTasks();
    }
//renderizamos los tasks con sus butones de edit y eliminar
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
//event para cargar los elementos una vez se haya cargado todos los elementos del dom
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
