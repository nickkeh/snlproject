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
    const isNameValid = name.value.length !== 0 && name.value.length <= 8;
    toggleValid(isNameValid, name);

    const isDescriptionValid = description.value.length !== 0 && description.value.length <= 15;
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

// #endregion


// const taskHtml = createTaskHtml('task1', 'description 1', 'Susanti', '2020-09-18', 'To Do'); 
// console.log(taskHtml);

/************************************ Event Listeners ************************************/
const addButton = document.querySelector('#add-button');
if(addButton) {
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const assignedTo = document.querySelector('#assigned-to');
        const dueDate = document.querySelector('#due-date');
        const status = document.querySelector('#status');

        clearTaskForm(name, description, assignedTo, dueDate, status);
    }, true);
};

const createTaskForm = document.forms['create-task-form'];
if(createTaskForm) { 
    createTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
 
        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const assignedTo = document.querySelector('#assigned-to');
        const dueDate = document.querySelector('#due-date');
        const status = document.querySelector('#status');

        const newTask = validateTaskForm(name, description, assignedTo, dueDate, status);

        if(newTask) 
            taskList.addTask(newTask);

        taskList.render();
       
        const formInputs = createTaskForm.querySelectorAll('.form-control');
        formInputs.forEach(element => {
            if(element.classList.contains('is-valid'))
                element.classList.remove('is-valid');
        });

        name.value = '';
        description.value = '';
        assignedTo.value = '';
        const today = new Date().toISOString().substring(0, 10);
        dueDate.value = today;
        status.selectedIndex = 0;
    
    });
};


const taskListGroup = document.querySelector('#task-list');
if(taskListGroup) {
    taskListGroup.addEventListener('click', (event) => {
        const taskItem = event.target;
        if(taskItem.classList.contains('done-button')) {
            const taskId = taskItem.parentElement.parentElement.parentElement.parentElement.id;
 
            taskList.updateTaskStatus(taskId, 'Done');
            taskList.render();
        }
        else if(taskItem.classList.contains('delete-button')) {
            const taskId = taskItem.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            taskList.render();
        }

    }, true);
};

let inputSelectStatus = document.querySelector('#select-status');
if(inputSelectStatus) {
    inputSelectStatus.addEventListener('change', (event) => {
        event.preventDefault();
        
        let selectedStatus = event.target.value;
        if(selectedStatus === 'Select...') {
            taskList.getAllTasks();
            taskList.render();
        }
        else {
            taskList.getAllTasksWithStatus(selectedStatus);
            taskList.render();
        }

        console.log(taskList.getAllTasksWithStatus(selectedStatus));

    }, true);
};