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
    document.querySelector('#due-date').addEventListener('change', event => {
        event.preventDefault();
        const dueDate = document.querySelector('#due-date');
        const today = new Date().toISOString().substring(0, 10);
        const isDueDateValid = dueDate.value > today;
        toggleValid(isDueDateValid, dueDate);
    }, true);
}

// validate user input on create task form
const validateTaskForm = (id, name, description, assignedTo, dueDate, status) => {
    const isNameValid = name.value.length !== 0 && name.value.length <= 64;
    toggleValid(isNameValid, name);

    const isDescriptionValid = description.value.length !== 0 && description.value.length <= 128;
    toggleValid(isDescriptionValid, description);

    const isAssignedToValid = assignedTo.selectedIndex > 0 && assignedTo.options[assignedTo.selectedIndex].value.length <= 8;
    toggleValid(isAssignedToValid, assignedTo);

        const today = new Date().toISOString().substring(0, 10);
        let isDueDateValid = true;
        if(!id.value) {
            isDueDateValid = dueDate.value > today;
            toggleValid(isDueDateValid, dueDate);
    }

    if(isNameValid && isDescriptionValid && isAssignedToValid && isDueDateValid) {
        const validatedTask = new Task(name.value, description.value, assignedTo.options[assignedTo.selectedIndex].value, dueDate.value, status.options[status.selectedIndex].value);
        return validatedTask;
    }
    else
        return false;
};

const getTaskFormElement = () => {
    const taskForm = document.forms['task-form'];
    if(taskForm) {    
        const id = taskForm.elements['task-id'];
        const name = taskForm.elements['name'];
        const description = taskForm.elements['description'];
        const assignedTo = taskForm.elements['assigned-to'];
        const dueDate = taskForm.elements['due-date'];
        const status = taskForm.elements['status'];
        const submit = taskForm.elements['submit'];

        return {id, name, description, assignedTo, dueDate, status, submit}
    }
    else
        return;
};

const clearTaskForm = (form) => {
    const element = getTaskFormElement(form);
    if(element) 
    {
        element.name.value = '';
        element.description.value = '';
        element.assignedTo.value = '';
        element.dueDate.value = new Date().toISOString().substring(0, 10);
        element.status.selectedIndex = 0;
    }
};

// #endregion


/************************************ Event Listeners ************************************/
// #region 

const displayTaskList = () => {
    document.querySelector('#tasks').classList.add('d-block');    
    document.querySelector('#tasks').classList.remove('d-none');    
    document.querySelector('#create-task').classList.add('d-none');
    document.querySelector('#create-task').classList.remove('d-block');    

    taskList.render();
};

const displayTaskForm = (action, task) => {
    const taskForm = document.forms['task-form']

    const formInputs = taskForm.querySelectorAll('.form-control');
    formInputs.forEach(element => {
        if(element.classList.contains('is-valid'))
            element.classList.remove('is-valid');
        if(element.classList.contains('is-invalid'))
            element.classList.remove('is-invalid');
    });

    if(taskForm) clearTaskForm(taskForm);

    if(action === 'create')
        taskForm.elements['submit'].value = 'Save';
    else if(action === 'update') {
        taskForm.elements['task-id'].value = task.id;
        taskForm.elements['name'].value = task.name;
        taskForm.elements['description'].value = task.description;
        taskForm.elements['assigned-to'].value = task.assignedTo;
        taskForm.elements['due-date'].value = task.dueDate;
        taskForm.elements['status'].value = task.status;
        taskForm.elements['submit'].value = 'Update';
    }

    document.querySelector('#tasks').classList.add('d-none');
    document.querySelector('#tasks').classList.remove('d-block');
    document.querySelector('#create-task').classList.add('d-block');
    document.querySelector('#create-task').classList.remove('d-none');
};

const addButton = document.querySelector('#add-button');
if(addButton) {
    addButton.addEventListener('click', event => {
        event.preventDefault();
        displayTaskForm('create');
    }, true);
};

const plusButton = document.querySelector('#plus-button');
if(plusButton) {
    plusButton.addEventListener('click', event => {
        event.preventDefault();
        displayTaskForm('create');
    }, true);
};

const cancelNewTask = () => {
    displayTaskList();
};

const taskForm = document.forms['task-form'];
if(taskForm) {
    taskForm.addEventListener('submit', event => {
        event.preventDefault();

        const element = getTaskFormElement();    
        const newTask = validateTaskForm(element.id, element.name, element.description, element.assignedTo, element.dueDate, element.status);
        if(newTask) {
            if(element.submit.value === 'Save')
                taskList.addTask(newTask);
            else
                taskList.updateTask(element.id.value, newTask);

            displayTaskList();
        }
    });
};

const getParentElement = (parentClass, currentElement) => { 
    while (currentElement && currentElement.parentElement) {
        if (currentElement.classList.contains(parentClass))
            return currentElement.id;
        else
            currentElement = currentElement.parentElement;
    } 
}

const taskListGroupClick = document.querySelector('#task-list');
if(taskListGroupClick) {
    taskListGroupClick.addEventListener('click', event => {
        let element = event.target;
        if(element.classList.contains('done-button')) {
            const taskId = element.parentElement.parentElement.parentElement.parentElement.id;
            element.classList.add('invisible');
            taskList.updateTaskStatus(taskId, 'Done');
            taskList.render();
        }
        else if(element.classList.contains('done-icon')) {
            const taskId = element.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            element.classList.add('invisible');
            taskList.updateTaskStatus(taskId, 'Done');
            taskList.render();
        }
        else if(element.classList.contains('delete-button')) {
            const taskId = element.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            taskList.render();
        }
        else if(element.classList.contains('delete-icon')) {
            const taskId = element.parentElement.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            taskList.render();
        }
        else if(element.classList.contains('list-group-item') ||
            element.classList.contains('card') || 
            element.classList.contains('card-header') || 
            element.classList.contains('status') || 
            element.classList.contains('duedate') ||
            element.classList.contains('card-body') ||
            element.classList.contains('card-title') ||
            element.classList.contains('card-text') ||
            element.classList.contains('card-footer') ||
            element.classList.contains('assigned-to')) {

            let task = taskList.getTaskById(getParentElement('list-group-item', element));
            displayTaskForm('update', task);
       }
    }, true);
};

const taskListGroupHover = document.querySelector('#task-list');
if(taskListGroupHover) {
    taskListGroupHover.addEventListener('mouseover', event => {
        const element = event.target;
        if(element.classList.contains('done-button') || element.classList.contains('done-icon')) {
            element.style.color = 'white';
        }
        else if(element.classList.contains('delete-button') || element.classList.contains('delete-icon')) {
            element.style.color = 'white';
        }
    }, true);
};

const selectStatusChange = document.querySelector('#select-status');
if(selectStatusChange) {
    selectStatusChange.addEventListener('change', event => {
        const selectedStatus = event.target.value;
        let selectedTasks = {};
        if(selectedStatus.toLowerCase() === 'expired')
            selectedTasks = taskList.getAllTasksByExpiry();
        else
            selectedTasks = taskList.getAllTasksByStatus(selectedStatus);

        taskList.render(selectedTasks);  
    }, true);
};

const searchForm = document.forms['search-form'];
if(searchForm) { 
    searchForm.addEventListener('submit', event => {
        event.preventDefault();

        const searchInput = searchForm.querySelector('input').value;
        const selectedTasks = taskList.searchTask(searchInput);
        taskList.render(selectedTasks);
    }, true);
};

const searchInput = document.querySelector('#search-input');
if(searchInput) { 
    searchInput.addEventListener('keyup', event => {
        if(event.keyCode === 13 || event.key === "Enter")
        {
            event.preventDefault();
            const searchInput = searchForm.querySelector('input').value;
            const selectedTasks = taskList.searchTask(searchInput);
            taskList.render(selectedTasks);
        }
    }, true);
};

// #endregion