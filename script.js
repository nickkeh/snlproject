//Create navbar for every pages
document.querySelector('nav').innerHTML = 
'<a href="#" class="navbar-brand d-none d-md-block">snl-project</a>' +
'<button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">' +
    '<span class="navbar-toggler-icon"></span>' +
'</button>' +
'<div class="collapse navbar-collapse" id="navbarCollapse">' +
    '<ul class="navbar-nav mr-auto">' +
        '<li class="navbar-item">' +
            '<a href="./index.html" class="nav-link">Home</a>' +
        '</li>' +
        '<li class="navbar-item">' +
            '<a href="./create-task.html" class="nav-link">Create Tasks</a>' +
        '</li>' +
        '<li class="navbar-item">' +
            '<a href="./contact-us.html" class="nav-link">Contact Us</a>' +
        '</li>' +
    '</ul>' +
'</div>' +
'<form class="form-inline d-md-block d-none my-2 my-lg-0">' +
    '<input class="form-control mr-sm-2 py-0" type="search" placeholder="Search" aria-label="Search">' +
    '<button class="btn btn-sm btn-outline-light my-2 my-sm-0" type="submit">Search</button>' +
'</form>' +
'<button class="btn btn-sm rounded-circle d-block d-md-none text-white border ml-2">+</button>';

/************************************ Task 4 ************************************/
// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past

// set due date input to display today's date 
if(document.querySelector('#due-date')) {
    document.querySelector('#due-date').value = new Date().toISOString().substring(0, 10);
}

//method that set the valid or invalid style to input element based on input validity
const toggleValid = (valid, element) => {
    if(valid) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}

// validate the duedate input when onchange   
if(document.querySelector('#due-date')) {
    document.querySelector('#due-date').addEventListener('change', (event) => {
        event.preventDefault();
        const dueDate = document.querySelector('#due-date');
        const today = new Date().toISOString().substring(0, 10);
        const isDueDateValid = dueDate.value > today;
        toggleValid(isDueDateValid, dueDate);
    }, true);
}

// validate user input on create task form
const validateTaskForm = () => {
    const name = document.querySelector('#name');
    const isNameValid = name.value.length !== 0 && name.value.length <= 8;
    toggleValid(isNameValid, name);

    const description = document.querySelector('#description');
    const isDescriptionValid = description.value.length !== 0 && description.value.length <= 15;
    toggleValid(isDescriptionValid, description);

    const assignedTo = document.querySelector('#assigned-to');
    const isAssignedToValid = assignedTo.selectedIndex > 0 && assignedTo.options[assignedTo.selectedIndex].value.length <= 8;
    toggleValid(isAssignedToValid, assignedTo);

    const dueDate = document.querySelector('#due-date');
    const today = new Date().toISOString().substring(0, 10);
    const isDueDateValid = dueDate.value > today;
    toggleValid(isDueDateValid, dueDate);

    if(isNameValid && isDescriptionValid && isAssignedToValid && isDueDateValid) {
        return true;
    }
    else
        return false;
}

// create list-group-item based on information provided as parameters
const createTodoItem = (id, name, description, assignedTo, dueDate, status) => {
    const groupList = document.querySelector('#todo-list');
    if(groupList) {
    //    const countItems = 'todo' + (groupList.querySelectorAll('.list-group-item').length + 1);

       const itemLink = document.createElement('a');
       itemLink.classList.add('list-group-item', 'list-group-item-action');
       itemLink.addEventListener('click', () => redirectToUpdatePage(item.id));

       const itemCard = document.createElement('div');
       itemCard.setAttribute('id', id);
       // console.log('i am status ' + dueDate + ' ' + new Date().toISOString().substring(0, 10));

       if(dueDate <= new Date().toISOString().substring(0, 10))
           itemCard.classList.add('itemitemcard', 'mb-2', 'shadow', 'text-danger', 'border', 'border-danger');
       else if(status.replace(/\s/g, '') === 'Todo')
           itemCard.classList.add('itemitemcard', 'mb-2', 'shadow', 'text-primary', 'border', 'border-primary');
       else if(status.replace(/\s/g, '') === 'InProgress')
           itemCard.classList.add('itemitemcard', 'mb-2', 'shadow', 'text-info', 'border', 'border-info');
       else if(status.replace(/\s/g, '') === 'Review')
           itemCard.classList.add('itemitemcard', 'mb-2', 'shadow', 'text-warning', 'border', 'border-warning');
       else if(status.replace(/\s/g, '') === 'Done')
           itemCard.classList.add('itemitemcard', 'mb-2', 'shadow', 'text-success', 'border', 'border-success');

       const itemCardHeader = document.createElement('div');
       itemCardHeader.classList.add('card-header', 'bg-transparent', 'd-flex', 'justify-content-between');

       const itemDueDate = document.createElement('p');
       itemDueDate.innerHTML = 'Due Date: <date>' + dueDate + '</date>';

       const itemStatus = document.createElement('p');
       itemStatus.innerText = status;

       itemCardHeader.appendChild(itemDueDate);
       itemCardHeader.appendChild(itemStatus);

       const itemCardBody = document.createElement('div');
       itemCardBody.classList.add('card-body');

       const itemName = document.createElement('h5');
       itemName.innerText = name;
       itemName.classList.add('card-title');

       const itemDescription = document.createElement('p');
       itemDescription.innerText = description;
       itemDescription.classList.add('card-text');

       itemCardBody.appendChild(itemName);
       itemCardBody.appendChild(itemDescription);

       const itemCardFooter = document.createElement('div');
       itemCardFooter.classList.add('card-footer', 'bg-transparent', 'd-flex', 'justify-content-between');

       const itemAssignedTo = document.createElement('h6');
       itemAssignedTo.innerText = assignedTo;

       const itemDeleteButton = document.createElement('button');
       itemDeleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
       itemDeleteButton.classList.add('btn', 'btn-outline-danger');
       itemDeleteButton.addEventListener('click', () => deleteTodoItem(item.id));

       itemCardFooter.appendChild(itemAssignedTo);
       itemCardFooter.appendChild(itemDeleteButton);

       itemCard.appendChild(itemCardHeader);
       itemCard.appendChild(itemCardBody);
       itemCard.appendChild(itemCardFooter);

       itemLink.appendChild(itemCard);

       groupList.appendChild(itemLink);
  }
};

const deleteTodoItem = (id) => {
    if(document.querySelector('#' + id)) 
        document.querySelector('#' + id).remove()
};

/************************************ Task 5 ************************************/
// array contains list of task objects. 
let tasks = [
    { id: 'todo1', name: 'task1', description: 'description 1', assignedTo: 'Robin', dueDate: '2020-09-20', status: 'To do'},
    { id: 'todo2', name: 'task2', description: 'description 2', assignedTo: 'Lakshmi', dueDate: '2020-09-13', status: 'In Progress'},
    { id: 'todo3', name: 'task3', description: 'description 3', assignedTo: 'Nick', dueDate: '2020-09-14', status: 'Review'},
    { id: 'todo4', name: 'task4', description: 'description 4', assignedTo: 'John', dueDate: '2020-09-15', status: 'Done'},
];

// empty object to store CRUD functions below
let TaskManager = {};

/********** CRUD -> Create **********/
// functions that add a new task as a new list-group-item   
TaskManager.addTask = (name, description, assignedTo, dueDate, status) => {
    const id = 'todo' + (tasks.length + 1);
    tasks.push({id, name, description, assignedTo, dueDate, status});
    // tasks.map(item => console.log(item));
};
TaskManager.addTask('Sprint 2', 'Task 4-7', 'Susanti', '2020-09-18', 'In Progress');

/********** CRUD -> Read **********/
// function that retrieves all tasks in the Tasks array 
TaskManager.getAllTasks = () => tasks
    .map(item => createTodoItem(item.id, item.name, item.description, item.assignedTo, item.dueDate, item.status))
    .sort((a, b) => { 
        const dateA = new Date(a.dueDate); 
        const dateB = new Date(b.dueDate);
        dateA < dateB ? 1 : -1;        
    });
// TaskManager.getAllTasks();

// function that retrieves only tasks with status that matches the selected status. 
TaskManager.getAllTasksWithStatus = (status) => tasks
    .filter(item => item.status === status)
    .map(item => createTodoItem(item.id, item.name, item.description, item.assignedTo, item.dueDate, item.status));
//TaskManager.getAllTasksWithStatus('To do');

/********** CRUD -> Delete **********/
// function that find and delete a selected task.  
TaskManager.deleteTask = (id) => {
    const selectedIndex = tasks.findIndex(item => item.id === id);
    tasks.splice(selectedIndex, selectedIndex >= 0 ? 1 : 0);
    deleteTodoItem();
};
TaskManager.deleteTask('todo2');
// TaskManager.getAllTasks();

/********** CRUD -> Update **********/
// function that find and update the status of a selected task.  
TaskManager.updateTaskStatus = (id, status) => tasks.map(item => {
    if(item.id === id)
        item.status = status;
});
TaskManager.updateTaskStatus('todo4', 'In Progress')
// TaskManager.getAllTasks();
// tasks.map(item => console.log(item));

// function that find and update a selected task.  
TaskManager.updateTask = (id, task) => tasks
    .map(item => {
        if(item.id === id) {
            item.name = task.name;
            item.description = task.description;
            item.dueDate = task.dueDate;
            item.assignedTo = task.assignedTo;
            item.status = task.status;
        }
        else return item;
    });
// create a new task to replace the value of an exsiting task  
const updatedTask = new Object();
updatedTask.name = 'Sprint 3';
updatedTask.description = 'Replace todo3';
updatedTask.dueDate = '2020-09-30';
updatedTask.assignedTo = 'Susanti';
updatedTask.status = 'To do';

TaskManager.updateTask('todo3', updatedTask);
//  TaskManager.getAllTasks();
// tasks.map(item => console.log(item));

// function that find and update the asignee of the selected task.  
TaskManager.assignTask = (id, assignee) => tasks.map(item => {
    if(item.id === id)
        item.assignedTo = assignee;
});
TaskManager.assignTask('todo1', 'Edison')
TaskManager.getAllTasks();
tasks.map(item => console.log(item));

if(document.querySelector('#create-task')) {
    document.querySelector('#create-task').addEventListener('submit', (event) => {
        event.preventDefault();
        if(validateTaskForm()) {
            window.location.href = 'index.html';
            console.log(document.querySelector('#todo-list'));
            // addTask(name.value, description.value, assignedTo.options[assignedTo.selectedIndex].value, dueDate.value, status);
        }
    }, true);
}
