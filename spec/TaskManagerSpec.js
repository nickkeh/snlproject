describe('Task Manager', () => {
    let taskManager;
    let newTask;

    beforeAll(() => {

    });

    beforeEach(() => {
        taskManager = new TaskManager();
        newTask = new Task('task 1', 'description 1', 'Susanti', '2020-09-20', 'To Do');
    });

    describe('#constructor', () => {
        describe('when initializing new TaskManager', () => {
            it('should create variable "tasks" as empty array', () => {
                expect(taskManager.tasks).toEqual([]);
            });

            it('should set value of "currentId" equals to length of tasks array', () => {
                expect(taskManager.currentId).toEqual(taskManager.tasks.length+1);
            }); 
        });
    });

    describe('#crud', () => {
        beforeEach(() => {
            taskManager.addTask(newTask);
        });

        describe('#addTask', () => {
            describe('when passing new "task" object as parameter', () => {
                it('should add the task object to the tasks array', () => {
                    expect(taskManager.tasks[0]).toEqual(newTask);
                }); 

                it('should increment the value of currentId by 1', () => {
                    expect(taskManager.currentId).toEqual(2);
                }); 
            });        
        });

        describe('#deleteTask', () => {
            describe(`when passing a task's id as parameter`, () => {
                it('should remove the associated task from the tasks array', () => {      
                    taskManager.deleteTask(newTask.id);
                    expect(taskManager.tasks).not.toContain(newTask);
                });
            });
        });

        describe('#getTaskById', () => {
            describe(`when passing a task's id as parameter`, () => {
                it('should get the associated task from the tasks array', () => {
                    const result = taskManager.getTaskById(newTask.id);

                    expect(taskManager.tasks[0]).toEqual(result);
                });
            });
        });

        describe('#getAllTasks', () => {
            describe('when saved "TaskList" are retrieved from localStorage', () => {
                it('should set the tasks into the tasks array', () => {
                    const tasks = [JSON.stringify(newTask)];
                    
                    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(tasks));
                    
                    taskManager.getAllTasks();
                    
                    expect(taskManager.tasks).toEqual(tasks);
                });
            });
        });
        
        describe('#save', () => {
            describe('when tasks array exists in the taskManager', () => {
                it('should save the tasks array into the local storage with key name as "TaskList"', () => {
                    const spy = spyOn(localStorage, 'setItem');
                    taskManager.saveTask();

                    // check the first call of the setItem() function in the spy obj, 
                    //then get the args object containing "TasKList" data saved in the localStorage
                    expect(spy.calls.first().args).toEqual(['TaskList', JSON.stringify(taskManager.tasks)]);
                });

                // I set the currentId to be equal to the length of tasks array + 1
            });
        });
    });
});