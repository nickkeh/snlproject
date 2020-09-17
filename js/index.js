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

// validate user input on create task form
const loadUpdateTaskForm = task => {

    let updateForm = document.forms['update-task'];

    const name = document.querySelector('#update-task div div #name');
    if(name) name.value = task.name;
    console.log('this is my updateForm ' + updateForm);

    const description = document.querySelector('#description');
    if(description) document.querySelector('#description').value = task.description;

    const assignedTo = document.querySelector('#assigned-to');
    if(assignedTo) assignedTo.options[assignedTo.selectedIndex].value = task.assignedTo;

    const dueDate = document.querySelector('#due-date');
    if(dueDate) document.querySelector('#due-date').value = task.dueDate;

    const status = document.querySelector('#status');
    if(status) status.options[status.selectedIndex].value = task.status;
};

// #endregion


// const taskHtml = createTaskHtml('task1', 'description 1', 'Susanti', '2020-09-18', 'To Do'); 
// console.log(taskHtml);

/************************************ Event Listeners ************************************/
if(document.forms['create-task-form']) { 
    document.forms['create-task-form'].addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const assignedTo = document.querySelector('#assigned-to');
        const dueDate = document.querySelector('#due-date');
        const status = document.querySelector('#status');

        const newTask = validateTaskForm(name, description, assignedTo, dueDate, status);

        // Add the task to the task manager
        if(newTask) 
            taskList.addTask(newTask);

        console.log(taskList.getAllTasks());
        taskList.render();
        // Clear the form
        name.value = '';
        description.value = '';
        assignedTo.value = '';
        dueDate.value = '';
        status.value = 'To Do';
    });
}

// if(document.querySelector('#task')) {
//     document.querySelector('#task').addEventListener('click', (event) => {
//         console.log(event.target.classList);
//     }, true);
// }

// if(document.querySelector('#add-button')) {
//     document.querySelector('#add-button').addEventListener('click', (event) => {
//         event.preventDefault();
//         window.location.href = 'create-task.html';
//     }, true);
// }

// if(document.querySelector('#create-task')) {
//     document.querySelector('#create-task').addEventListener('submit', (event) => {
//         event.preventDefault();
        
//         const isCreateFormValid = validateTaskForm();
//         if(isCreateFormValid) {
//             window.location.href = 'index.html';
//             TaskManager.addTask(isCreateFormValid);
//             console.log(tasks.length);
//         }
//     }, true);
// }

// if(document.querySelector('#homepage')) {
//     document.querySelector('#homepage').addEventListener('load', (event) => {
//         event.preventDefault();
//         taskList.getAllTasks();

//     }, true);
// }

// if(document.querySelector("#todo-list a")) {
//     document.querySelector("#todo-list a").addEventListener('click', (event) => {
//         event.preventDefault();
//     });
// }

// if(document.querySelector(".card-footer button")) {
//     document.querySelector(".card-footer button").addEventListener('click', (event) => {
//         event.preventDefault();
//     });
// 
