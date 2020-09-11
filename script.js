/************************Validate input************************/
// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past

document.querySelector('#due-date').value = new Date().toISOString().substring(0, 10);

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

document.querySelector('#due-date').addEventListener('change', (event) => {
    event.preventDefault();
    const dueDate = document.querySelector('#due-date').value;
    const today = new Date().toISOString().substring(0, 10);
    const isDueDateValid = dueDate > today;
    toggleValid(isDueDateValid, dueDate);
}, true);

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

    if(isNameValid && isDescriptionValid && isAssignedToValid && isDueDateValid) 
        return true;
    else
        return false;
}

document.querySelector('#create-task').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(validateTaskForm());
    // const item = document.createElement('li');
    // item.innerText = document.querySelector('#form-hobby-text').value;
    // item.classList.add('list-group-item');
     
    // document.querySelector('#hobby-list').appendChild(item);
    // document.querySelector('#form-hobby-text').value = "";
}, true);

const status = document.querySelector('#status');
status.addEventListener('change', () => {
    const selectedStatus = status.options[status.selectedIndex].value;
    switch (selectedStatus) {
    }
});
