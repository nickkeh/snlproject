/************************************ Task 8 ************************************/
// #region

const setTaskStatusColor = (dueDate, status) => {
    let itemColor = ''; 
    if(dueDate <= new Date().toISOString().substring(0, 10) && status.replace(/\s/g, '') !== 'Done')
        itemColor = 'danger';
   else if(dueDate > new Date().toISOString().substring(0, 10)) {
        if(status.replace(/\s/g, '') === 'ToDo')
            itemColor = 'info';
        else if(status.replace(/\s/g, '') === 'InProgress')
            itemColor = 'primary';
        else if(status.replace(/\s/g, '') === 'Review')
            itemColor = 'warning';
    }
    
    if(status.replace(/\s/g, '') === 'Done')
        itemColor = 'success';

    return itemColor
}

// #endregion



/************************************ Task 7 ************************************/
// #region

// create the html element of a task based on information of the task parameters
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
    const itemColor = setTaskStatusColor(dueDate, status);
    const doneButtonVisibility = status.replace(/\s/g, '') === 'Done' ? 'invisible' : 'visible'; 
    
    const taskItemHtml = 
    `<li id="${id}" class="list-group-item list-group-item-action  mb-2">
        <div href="#/update-task" class="card border-${itemColor} shadow text-${itemColor}">
            <div class="card-header bg-transparent">
                <div class=" d-flex justify-content-between">
                <p>${status}</p>                
                <button class='btn btn-outline-${itemColor} text-${itemColor} ${doneButtonVisibility} done-button'>Mark as Done</button>
                </div>
                <p>Due Date: <date>${dueDate}</date></p>
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <h6>${assignedTo}</h6>
                <button class='btn btn-outline-${itemColor} text-${itemColor} delete-button'>Delete</button>
            </div>  
        </div>
    </li>`;

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

    // function that retrieves only tasks with status that matches the selected status. 
    searchTask = keyword => this.tasks.filter(task =>
        task.name ===  keyword ||
        task.description ===  keyword || 
        task.dueDate ===  keyword || 
        task.assignedTo ===  keyword || 
        task.status ===  keyword
    );

    // functions that add a new task object into the tasks array.   
    addTask = task => {
        task.id = 'todo' + this.currentId;
        this.currentId++;
        this.tasks.push(task);
    };

    // function that retrieves all tasks in the Tasks array.
    getAllTasks = () => this.tasks.map(item => item);
        // .sort((a, b) => { 
        //     const dateA = new Date(a.dueDate); 
        //     const dateB = new Date(b.dueDate);
        //     dateA < dateB ? 1 : -1;        
        // });

    // function that retrieves only tasks with status that matches the selected status. 
    getAllTasksWithStatus = status => this.tasks.filter(item => { 
        if(item.status === status) 
            return item; 
    });

    // function that find and delete a selected task.  
    deleteTask = id => {
        const selectedIndex = this.tasks.findIndex(item => item.id === id);
        const deletedTask = this.tasks.splice(selectedIndex, selectedIndex >= 0 ? 1 : 0);

        return deletedTask;
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

        // console.log(this.tasks);

        this.tasks.map(task => {
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, task.dueDate, task.status);
            tasksHtmlList.push(taskHtml);
            tasksHtml += (taskHtml + '\n');
        });

        let taskListNode = document.querySelector('#task-list')
        if(taskListNode) {
            taskListNode.innerHTML = tasksHtml;
        }
        // console.log(taskListNode);
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
const task5 = new Task('task 5', 'z', 'Group', '2020-09-12', 'To Do');

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
taskList.addTask(task5);

/******************** CRUD -> Read ********************/

taskList.getAllTasks();

taskList.getAllTasksWithStatus('To Do');
// console.log(taskList.getAllTasksWithStatus('To Do'));

/******************** CRUD -> Delete ********************/
const deleteThisTask = taskList.tasks.find(item => item.id === 'todo2')
// taskList.deleteTask('todo2');
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
// taskList.updateTask('todo3', updatedTask);
// taskList.assignTask('todo1', 'Edison')

// console.log(taskList.getAllTasks());

 taskList.render();

// #endregion

// #endregion