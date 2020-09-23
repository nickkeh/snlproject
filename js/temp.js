/*************************** Create TaskManager Class ***************************/
// #region

let TaskManager1 = class  {
    constructor() {
        this.tasks = [];
        this.currentId = this.tasks.length + 1;
    }

    // function that retrieves only tasks with status that matches the selected status. 
    searchTask = keyword => this.tasks.filter(task => {
        keyword = keyword.toLowerCase();

        if(task.name.toLowerCase().includes(keyword) ||
            task.description.toLowerCase().includes(keyword) || 
            task.dueDate.toLowerCase().includes(keyword) || 
            task.assignedTo.toLowerCase().includes(keyword) || 
            task.status.toLowerCase().includes(keyword)) {
                return task;
        }
    }); 

    // functions that add a new task object into the tasks array.   
    addTask = task => {
        task.id = 'todo' + this.currentId;
        this.currentId++;
        this.tasks.push(task);
        localStorage.setItem('taskList', JSON.stringify(task));
    };

    // function that retrieves all tasks in the Tasks array.
    getAllTasks = () => console.log(localStorage.getItem('taskList'));
    // getAllTasks = () => this.tasks.map(task => task);
        // .sort((a, b) => { 
        //     const dateA = new Date(a.dueDate); 
        //     const dateB = new Date(b.dueDate);
        //     dateA < dateB ? 1 : -1;        
        // });

    // function that retrieves only tasks with status that matches the selected status. 
    getTaskById = id => this.tasks.find(task => task.id === id);

    // function that retrieves only tasks with status that matches the selected status. 
    getAllTasksByStatus = status => this.tasks.filter(task => task.status === status);

    // function that retrieves only tasks with status that matches the selected status. 
    getAllTasksByExpiry = () => this.tasks.filter(task => task.dueDate <= new Date().toISOString().substring(0, 10) && task.status.toLowerCase() !== 'done');

    // function that find and delete a selected task.  
    deleteTask = id => {
        const selectedIndex = this.tasks.findIndex(task => task.id === id);
        const deletedTask = this.tasks.splice(selectedIndex, selectedIndex >= 0 ? 1 : 0);
        localStorage.removeItem(deletedTask.name);
        // the return here is for future use
        return deletedTask;
    };

    // function that find and update the status of a selected task.  
    updateTaskStatus = (id, status) => this.tasks.map(task => {
        if(task.id === id)
        task.status = status;
    });

    // function that find and update the asignee of the selected task.  
    assignTask = (id, assignee) => this.tasks.map(task => {
        if(task.id === id)
            task.assignedTo = assignee;
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
            return task;
    });

    render(tasks) {
        let tasksHtml = ''; 
        
        if(tasks) 
            tasks.map(task => {
                const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, task.dueDate, task.status);
                tasksHtml += (taskHtml + '\n');
            });
        else
            this.tasks.map(task => {
                const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, task.dueDate, task.status);
                tasksHtml += (taskHtml + '\n');
            });

        let taskListNode = document.querySelector('#task-list')
        if(taskListNode) {
            taskListNode.innerHTML = tasksHtml;
        }
    }
}

// #endregion
