/************************************ Task 4 ************************************/
/******************************* Input Validation *******************************/
// #region

// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past

// set due date input to display today's date 
if(document.querySelector('#due-date')) {
    document.querySelector('#due-date').value = new Date().toISOString().substring(0, 10);
}

// method that sets the valid or invalid style to input element based on input validity
const toggleValid = (valid, element) => {
    if(valid) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
};

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
const validateTaskForm = (name, description, assignedTo, dueDate, status) => {
    const isNameValid = name.value.length !== 0 && name.value.length <= 64;
    toggleValid(isNameValid, name);

    const isDescriptionValid = description.value.length !== 0 && description.value.length <= 128;
    toggleValid(isDescriptionValid, description);

    const isAssignedToValid = assignedTo.selectedIndex > 0 && assignedTo.options[assignedTo.selectedIndex].value.length <= 8;
    toggleValid(isAssignedToValid, assignedTo);

    const today = new Date().toISOString().substring(0, 10);
    const isDueDateValid = dueDate.value > today;
    toggleValid(isDueDateValid, dueDate);

    if(isNameValid && isDescriptionValid && isAssignedToValid && isDueDateValid) {
        const newTask = new Task(name.value, description.value, assignedTo.options[assignedTo.selectedIndex].value, dueDate.value, status.options[status.selectedIndex].value);
        return newTask;
    }
    else
        return false;
};

const clearTaskForm = (name, description, assignedTo, dueDate, status) => {
    name.value = '';
    description.value = '';
    assignedTo.value = '';
    const today = new Date().toISOString().substring(0, 10);
    dueDate.value = today;
    status.selectedIndex = 0;
}

// #endregion


// const taskHtml = createTaskHtml('task1', 'description 1', 'Susanti', '2020-09-18', 'To Do'); 
// console.log(taskHtml);

/************************************ Event Listeners ************************************/
// #region 

const displayTaskList = () => {
    document.querySelector('#tasks').classList.add('d-block');    
    document.querySelector('#tasks').classList.remove('d-none');    
    document.querySelector('#create-task').classList.add('d-none');
    document.querySelector('#create-task').classList.remove('d-block');    
    document.querySelector('#update-task').classList.add('d-none');
    document.querySelector('#update-task').classList.remove('d-block');    
};

const displayCreateTask = () => {
    document.querySelector('#tasks').classList.add('d-none');
    document.querySelector('#tasks').classList.remove('d-block');
    document.querySelector('#create-task').classList.add('d-block');
    document.querySelector('#create-task').classList.remove('d-none');
    document.querySelector('#update-task').classList.add('d-none');
    document.querySelector('#update-task').classList.remove('d-block');    
};

const displayUpdateTask = () => {
    document.querySelector('#tasks').classList.add('d-none');
    document.querySelector('#tasks').classList.remove('d-block');
    document.querySelector('#create-task').classList.add('d-none');
    document.querySelector('#create-task').classList.remove('d-block');    
    document.querySelector('#update-task').classList.add('d-block');
    document.querySelector('#update-task').classList.remove('d-none');    
};

const getTaskElement = () => {
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');
    const assignedTo = document.querySelector('#assigned-to');
    const dueDate = document.querySelector('#due-date');
    const status = document.querySelector('#status');

    return {name, description, assignedTo, dueDate, status}
};

const addButton = document.querySelector('#add-button');
if(addButton) {
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const taskElement = getTaskElement();
        clearTaskForm(taskElement.name, taskElement.description, taskElement.assignedTo, taskElement.dueDate, taskElement.status);
        displayCreateTask();
    }, true);
};

const plusButton = document.querySelector('#plus-button');
if(plusButton) {
    plusButton.addEventListener('click', (event) => {
        event.preventDefault();
        const taskElement = getTaskElement();
        clearTaskForm(taskElement.name, taskElement.description, taskElement.assignedTo, taskElement.dueDate, taskElement.status);
        displayCreateTask();
    }, true);
};

const cancelNewTask = () => {
    const taskElement = getTaskElement();
    clearTaskForm(taskElement.name, taskElement.description, taskElement.assignedTo, taskElement.dueDate, taskElement.status);

    const formInputs = createTaskForm.querySelectorAll('.form-control');
    formInputs.forEach(element => {
        if(element.classList.contains('is-valid'))
            element.classList.remove('is-valid');
        if(element.classList.contains('is-invalid'))
            element.classList.remove('is-invalid');
    });

    displayTaskList();
};

const createTaskForm = document.forms['create-task-form'];
if(createTaskForm) { 
    createTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskElement = getTaskElement();    
        const newTask = validateTaskForm(taskElement.name, taskElement.description, taskElement.assignedTo, taskElement.dueDate, taskElement.status);

        if(newTask){
            taskList.addTask(newTask);
            
            displayTaskList();

            const formInputs = createTaskForm.querySelectorAll('.form-control');
            formInputs.forEach(element => {
                if(element.classList.contains('is-valid'))
                    element.classList.remove('is-valid');
                if(element.classList.contains('is-invalid'))
                    element.classList.remove('is-invalid');
            });

            clearTaskForm(taskElement.name, taskElement.description, taskElement.assignedTo, taskElement.dueDate, taskElement.status);
        }
        else return false;
        
        taskList.render();
    });
};

const taskListGroup = document.querySelector('#task-list');
if(taskListGroup) {
    taskListGroup.addEventListener('click', (event) => {
        const taskElement = event.target;
        console.log(taskElement);
        if(taskElement.classList.contains('card')) {
            displayUpdateTask();
        }
        else if(taskElement.classList.contains('done-button')) {
            const taskId = taskElement.parentElement.parentElement.parentElement.parentElement.id;
            taskElement.classList.add('invisible');
            taskList.updateTaskStatus(taskId, 'Done');
            taskList.render();
        }
        else if(taskElement.classList.contains('done-icon')) {
            const taskId = taskElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            taskElement.classList.add('invisible');
            taskList.updateTaskStatus(taskId, 'Done');
            taskList.render();
        }
        else if(taskElement.classList.contains('delete-button')) {
            const taskId = taskElement.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            taskList.render();
        }
        else if(taskElement.classList.contains('delete-icon')) {
            const taskId = taskElement.parentElement.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            taskList.render();
        }
    }, true);
};

const taskListGroupHover = document.querySelector('#task-list');
if(taskListGroupHover) {
    taskListGroupHover.addEventListener('mouseover', (event) => {
        const taskElement = event.target;
        if(taskElement.classList.contains('done-button') || taskElement.classList.contains('done-icon')) {
            taskElement.style.color = 'white';
        }
        else if(taskElement.classList.contains('delete-button') || taskElement.classList.contains('delete-icon')) {
            taskElement.style.color = 'white';
        }
    }, true);
};

const inputSelectStatus = document.querySelector('#select-status');
if(inputSelectStatus) {
    inputSelectStatus.addEventListener('change', (event) => {
        const searchInput = event.target.value;
        const selectedTasks = taskList.searchTask(searchInput);
        taskList.renderSelectedTask(selectedTasks);  
    }, true);
};

const searchForm = document.forms['search-form'];
if(searchForm) { 
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchInput = searchForm.querySelector('input').value;
        const selectedTasks = taskList.searchTask(searchInput);
        taskList.renderSelectedTask(selectedTasks);
    }, true);
};

const searchInput = document.querySelector('#search-input');
if(searchInput) { 
    searchInput.addEventListener('keyup', (event) => {
        if(event.keyCode === 13 || event.key === "Enter")
        {
            event.preventDefault();
            const searchInput = searchForm.querySelector('input').value;
            const selectedTasks = taskList.searchTask(searchInput);
            taskList.renderSelectedTask(selectedTasks);
        }
    }, true);
};

document.querySelector('#task-list')

// #endregion