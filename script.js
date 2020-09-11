/************************Validate input************************/
// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past

const validateTaskForm = () => {
    let isValid = false;
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');
    const assignedTo = document.querySelector('#assigned-to');
    const dueDate = document.querySelector('#due-date');
    console.log(name.length !== 0 && name.length <= 8);

    if(name.value.length !== 0 && name.value.length <= 8) {
        name.classList.add('is-valid');
        name.classList.remove('is-invalid');
    }
    else {
        name.classList.add('is-invalid');
        name.classList.remove('is-valid');
    }

    if(description.value.length !== 0 && description.value.length <= 15) {
        description.classList.add('is-valid');
        description.classList.remove('is-invalid');
    }
    else {
        description.classList.add('is-invalid');
        description.classList.remove('is-valid');
    }

    if(assignedTo.selectedIndex > 0 && assignedTo.options[assignedTo.selectedIndex].value.length <= 8)  {
        assignedTo.classList.add('is-valid');
        assignedTo.classList.remove('is-invalid');
    }
    else {
        assignedTo.classList.add('is-invalid');
        assignedTo.classList.remove('is-valid');
    }
    

    // if(duedate != undefined)  {
    //     dueDate.classList.add('is-valid');
    //     dueDate.classList.remove('is-invalid');
    // }
    // else {
    //     dueDate.classList.add('is-invalid');
    //     dueDate.classList.remove('is-valid');
    // }
}

document.querySelector('#create-task').addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log('this is submit');
    validateTaskForm();
    // const item = document.createElement('li');
    // item.innerText = document.querySelector('#form-hobby-text').value;
    // item.classList.add('list-group-item');
     
    // document.querySelector('#hobby-list').appendChild(item);
    // document.querySelector('#form-hobby-text').value = "";
 }, true);
