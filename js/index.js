// - Створення елементів через клас
// - Видалення завдань поштучно
// - Очищення всього переліку завдань
// - Виконанні завдання приховувати з можливість переглядати їх окремо
// - зберігання завдань в кеші
// - зберігання завдань в базі даних


// class Task  {
//     // constructor(title, discription, date, time) {
//     //     this._title = title;
//     //     this._discription = discription;
//     //     this._date = date;
//     //     this._time = time;
//     // }
//     constructor(title) {
//         this._title = title;
//     }
//     get title() {
//         this._title = title; 
//     }
//     set title(value) {
//         this._title = value; 
//     }
// };

// const tasksContainer = document.querySelector('.tasks-wrapper');
// const taskCreated = document.querySelector('.task-created');
// const taskCreatorInput = document.querySelector('.task-creator__input');
// const taskCreatorButton = document.querySelector('.task-creator__button');

// const createTask = function() {
//     const emptyRegExp = /^(\s+)/;
//     if (taskCreatorInput.value !== "" && !emptyRegExp.test(taskCreatorInput.value)) {
//         const newDiv = document.createElement("div");
//         newDiv.classList.add("task-child");
//         newDiv.style.display = "flex";
//         taskCreated.prepend(newDiv);
//         newDiv.innerHTML = `
//             <div class="task-child__checkboks"><input type="checkbox"></div>
//             <div class="task-child__created-task">${taskCreatorInput.value}</div>
//         `;
//     }
//     taskCreatorInput.value = "";
//     taskCreatorInput.focus();
// }

// taskCreatorButton.addEventListener('click', createTask);
// taskCreatorInput.addEventListener('keyup', (e) => {
//     if (e.key === "Enter") createTask();
// });




//_____________________________________________________

const taskCreatorInput = document.querySelector('.task-creator__input');
const taskCreatorButton = document.querySelector('.task-creator__button');
const tasksContainer = document.querySelector('.tasks-wrapper');
const taskCreated = document.querySelector('.task-created');
const taskDeleteButton = document.querySelector('.task-child__delete-button');


class Task  {
    constructor(task) {
        this._task = task;
    }
    
    createTask() {
        if (/(\w+)/.test(this._task)) {
            const newTaskDiv = document.createElement("div");
            newTaskDiv.classList.add("task-child");
            newTaskDiv.style.display = "flex";
            taskCreated.prepend(newTaskDiv);
            newTaskDiv.innerHTML = `
            <div class="task-child__checkboks"><input type="checkbox"></div>
            <div class="task-child__created-task">${this._task}</div>
            <div class="task-child__delete-button"><input type="submit" value="x"></div>
            `;
            const idNumber = (taskCreated.querySelectorAll(".task-child").length);
            newTaskDiv.setAttribute("id",`task${idNumber}`);
        }
        taskCreatorInput.value = "";
        taskCreatorInput.focus();
    }
    // deleteTask() {
    //     this.newTaskDiv.remove();
    // }
};


taskCreatorButton.addEventListener('click', function(e) {
   new Task(taskCreatorInput.value).createTask();
});
taskCreatorInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") new Task(taskCreatorInput.value).createTask();
});

// taskDeleteButton.addEventListener('click', function() {
//     this.deleteTask();
// });


test = 1; 
document.querySelector('h1').setAttribute("id",`task${++test}`);