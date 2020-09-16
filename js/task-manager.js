/************************************ Task 7 ************************************/
// #region

// create the html element of a task based on information of the task parameters
const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
    const taskItemHtml = 
    `<a href="#/update-task" class="list-group-item list-group-item-action">
        <div class="card text-danger border-danger mb-2 shadow">
            <div class="card-header bg-transparent d-flex justify-content-between">
                <p>Due Date: <date>${dueDate}</date></p>
                <p>${status}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <h6>${assignedTo}</h6>
                <button>Delete</button>
            </div>
        </div>
    </a>`;

    return taskItemHtml;
}

// #endregion



/************************************ Task 6 ************************************/
// #region 

/*************************** Create TaskManager Class ***************************/
// #region

// Task manager class
let TaskManager = class  {
    constructor() {
        this.tasks = [];
        this.currentId = this.tasks.length + 1;
    }

    // functions that add a new task object into the tasks array.   
    addTask = task => {
        task.id = 'todo' + this.currentId;
        this.currentId++;
        this.tasks.push(task);
    };

    // function that retrieves all tasks in the Tasks array.
    getAllTasks = () => this.tasks.map(item => item)
        .sort((a, b) => { 
            const dateA = new Date(a.dueDate); 
            const dateB = new Date(b.dueDate);
            dateA < dateB ? 1 : -1;        
        });

    // function that retrieves only tasks with status that matches the selected status. 
    getAllTasksWithStatus = status => this.tasks.filter(item => { 
        if(item.status === status) return item; });

    // function that find and delete a selected task.  
    deleteTask = task => {
        const selectedIndex = this.tasks.findIndex(item => item.id === task.id);
        this.tasks.splice(selectedIndex, selectedIndex >= 0 ? 1 : 0);
        
        return task;
    };

    // function that find and update the status of a selected task.  
    updateTaskStatus = (id, status) => this.tasks.map(item => {
        if(item.id === id)
            item.status = status;
    });

    // function that find and update the asignee of the selected task.  
    assignTask = (id, assignee) => this.tasks.map(item => {
        if(item.id === id)
            item.assignedTo = assignee;
    });

    // function that find and update a selected task.  
    updateTask = (id, task) => this.tasks.map(item => {
        if(item.id === id) {
            item.name = task.name;
            item.description = task.description;
            item.dueDate = task.dueDate;
            item.assignedTo = task.assignedTo;
            item.status = task.status;
        }
        else 
            return item;
    });

    render() {
        let tasksHtmlList = [];
        let tasksHtml = ''; 
        this.tasks.map(task => {
            const date = new Date(task.dueDate);
            const formattedDate = date.toISOString().substring(0, 10);
            const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, formattedDate, task.dueDate);
            tasksHtmlList.push(taskHtml);
            tasksHtml += (taskHtml + '\n');
         });
   }
}

// #endregion



/**************************** Create new task objects ****************************/
// #region

// "Constructor Function" that creates new task object.
function Task(name, description, assignedTo, dueDate, status) {
    this.id = '';
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
}

// creating task items.
const task1 = new Task('task 1', 'description 1', 'Susanti', '2020-09-20', 'To Do');
const task2 = new Task('task 2', 'description 2', 'Nick', '2020-09-15', 'In Progress');
const task3 = new Task('task 3', 'description 3', 'Lakshmi', '2020-09-18', 'Review');
const task4 = new Task('task 4', 'description 4', 'Robin', '2020-09-12', 'Done');

//#endregion



/****************************** Testing Data Manipulation *******************************/
// #region

/******************** Create an Instance of TaskManager ********************/
let taskList = new TaskManager();

/******************** CRUD -> Create ********************/
taskList.addTask(task1);
taskList.addTask(task2);
taskList.addTask(task3);
taskList.addTask(task4);
// console.log(taskList.tasks);

/******************** CRUD -> Read ********************/

// taskList.getAllTasks();

// taskList.getAllTasksWithStatus('To Do');
// console.log(taskList.getAllTasksWithStatus('To Do'));

/******************** CRUD -> Delete ********************/
const deleteThisTask = taskList.tasks.find(item => item.id === 'todo2')
// taskList.deleteTask(deleteThisTask);
// console.log(taskList.deleteTask(deleteThisTask));

/******************** CRUD -> Update ********************/
// taskList.updateTaskStatus('todo4', 'Review')

// first create a new task info to replace the value of an exsiting task  
const updatedTask = new Task();
updatedTask.name = 'Sprint 3';
updatedTask.description = 'Replace todo3';
updatedTask.dueDate = '2020-09-30';
updatedTask.assignedTo = 'Susanti';
updatedTask.status = 'To Do';
taskList.updateTask('todo3', updatedTask);
// taskList.assignTask('todo1', 'Edison')

//console.log(taskList.getAllTasks());

taskList.render();

// #endregion

// #endregion