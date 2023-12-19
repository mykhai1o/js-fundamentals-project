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



const tasksContainer = document.querySelector('.tasks-wrapper');
const taskCreated = document.querySelector('.task-created');
const taskCreatorInput = document.querySelector('.task-creator__input');
const taskCreatorButton = document.querySelector('.task-creator__button');
const taskCompleted = document.querySelector('.task-completed');

//Width of the created tasks
let taskCreatorWidth = document.querySelector('.task-creator').scrollWidth;
taskCreated.style.width = taskCreatorWidth - 40 + "px";
window.addEventListener("resize", function() {
    let taskCreatorWidth = document.querySelector('.task-creator').scrollWidth;
    taskCreated.style.width = taskCreatorWidth - 40 + "px";
});

const createTask = function() {
    if (/(\S+)/.test(taskCreatorInput.value)) {
        const newTaskDiv = document.createElement("div");
        newTaskDiv.classList.add("task-child");
        newTaskDiv.style.display = "flex";
        taskCreated.prepend(newTaskDiv);
        newTaskDiv.innerHTML = `
        <div class="task-child__checkboks"><input type="checkbox"></div>
        <div class="task-child__created-task"><p>${taskCreatorInput.value}</p></div>
        <div class="task-child__delete-button"><input type="submit" value="x"></div>
            `;
            // const idNumber = (taskCreated.querySelectorAll(".task-child").length);
            // newTaskDiv.setAttribute("id",`task${idNumber}`);
        }
        taskCreatorInput.value = "";
        taskCreatorInput.focus();
}
    
taskCreatorButton.addEventListener('click', createTask);
taskCreatorInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") createTask();
});
taskCreated.addEventListener('click', function(event) {
    const currentDelBut = event.target.closest('input[type="submit"]');
    if(!currentDelBut) return;
    event.target.closest(".task-child").remove();
});
//Редагування завдання
taskCreated.addEventListener('click', function(event) {
    const currentTaskBody = event.target.closest('.task-child__created-task');
    if(!currentTaskBody) return;
    let taskValue = event.target.closest('p').value;
    console.log("tasktest")
});
//Checkbox
document.addEventListener("click", function(event) {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if(!checkbox) return;
    if(checkbox.hasAttribute("checked")) {
        console.log( "test");
    }

})


//_____________________________________________________

// const taskCreatorInput = document.querySelector('.task-creator__input');
// const taskCreatorButton = document.querySelector('.task-creator__button');
// const tasksContainer = document.querySelector('.tasks-wrapper');
// const taskCreated = document.querySelector('.task-created');
// const taskDeleteButton = document.querySelector('.task-child__delete-button');


// class Task  {
//     constructor(task) {
//         this._task = task;
//     }
    
//     createTask() {
//         console.log("test")
//         if (/(\w+)/.test(this._task)) {
//             const newTaskDiv = document.createElement("div");
//             newTaskDiv.classList.add("task-child");
//             newTaskDiv.style.display = "flex";
//             taskCreated.prepend(newTaskDiv);
//             newTaskDiv.innerHTML = `
//             <div class="task-child__checkboks"><input type="checkbox"></div>
//             <div class="task-child__created-task">${this._task}</div>
//             <div class="task-child__delete-button"><input type="submit" value="x"></div>
//             `;
//             const idNumber = (taskCreated.querySelectorAll(".task-child").length);
//             newTaskDiv.setAttribute("id",`task${idNumber}`);
//         }
//         taskCreatorInput.value = "";
//         taskCreatorInput.focus();
//     }
//     // deleteTask() {
//     //     this.newTaskDiv.remove();
//     // }
// };


// taskCreatorButton.addEventListener('click', function(e) {
//    new Task(taskCreatorInput.value).createTask();
// });
// taskCreatorInput.addEventListener('keyup', (e) => {
//     if (e.key === "Enter") new Task(taskCreatorInput.value).createTask();
// });

// // taskDeleteButton.addEventListener('click', function() {
// //     this.deleteTask();
// // });

