// ++ Створення елементів через клас
// ++ Видалення завдань поштучно
// ++ Виконанні завдання приховувати з можливість переглядати їх окремо
// +- Зміна завдання (зробити захист від одночасного редагування кількох параграфів)
// - Зберігання завдань в кеші
// - Перетягнення завдань
// - Очищення всього переліку завдань??






const tasksContainer = document.querySelector('.tasks-wrapper');
const taskCreated = document.querySelector('.task-created');
const taskCreatorInput = document.querySelector('.task-creator__input');
const taskCreatorButton = document.querySelector('.task-creator__button');
const taskCompleted = document.querySelector('.task-completed');
const taskCompletedBody = document.querySelector('.task-completed-body');

//Width of the created tasks
let taskCreatorWidth = document.querySelector('.task-creator').scrollWidth;
taskCreated.style.width = taskCreatorWidth + "px";
taskCompleted.style.width = taskCreatorWidth +"px";
window.addEventListener("resize", function() {
    let taskCreatorWidth = document.querySelector('.task-creator').scrollWidth;
    taskCreated.style.width = taskCreatorWidth + "px";
    taskCompleted.style.width = taskCreatorWidth +"px";
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
        const idNumber = (taskCreated.querySelectorAll(".task-child").length);
        newTaskDiv.setAttribute("id",`task${idNumber}`);
        }
        taskCreatorInput.value = "";
        taskCreatorInput.focus();
}
//Додавання завдання    
taskCreatorButton.addEventListener('click', createTask);
taskCreatorInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") createTask();
});

//Видалення завдання
taskCreated.addEventListener('click', function(event) {
    const currentDelBut = event.target.closest('input[type="submit"]');
    if(!currentDelBut) return;
    event.target.closest(".task-child").remove();
});
taskCompleted.addEventListener('click', function(event) {
    const currentDelBut = event.target.closest('input[type="submit"]');
    if(!currentDelBut) return;
    event.target.closest(".task-child").remove();
    if(taskCompletedBody.querySelectorAll('.task-child').length === 0) {
        taskCompleted.classList.remove("show"); 
    }
});

//Редагування завдання
document.addEventListener('click', function(event) {
    if(event.target.closest('p')) {
        const currentTaskP = event.target.closest('p');
        const inputTaskExisted = taskCreated.querySelector('input[type="text"');
        if(inputTaskExisted){
            const inputText = inputTaskExisted.value;
            const inputContainer = inputTaskExisted.parentNode;
            inputTaskExisted.remove();
            inputContainer.innerHTML = `<p>${inputText}</p>`;
        }
        if(currentTaskP.parentNode.parentNode.parentNode === taskCreated) {
            const currentTaskParentParentID = currentTaskP.parentNode.parentNode.getAttribute("id");
            const findCurrentTask = taskCreated.querySelector(`#${currentTaskParentParentID}`);
            const currentTaskWrapper = findCurrentTask.children[1];
            const taskPValue = currentTaskWrapper.firstElementChild.textContent;
            currentTaskWrapper.firstElementChild.remove();
            currentTaskWrapper.innerHTML = `<input type="text" value="${taskPValue}">`;
            currentTaskWrapper.firstElementChild.focus();
        }
        
    } else if(!event.target.matches('input')) {
        const taskTextInInput = document.querySelector('.task-created input[type="text"]');
        if(taskTextInInput) {
            const inputText = taskTextInInput.value;
            const inputContainer = taskTextInInput.parentNode;
            taskTextInInput.remove();
            inputContainer.innerHTML = `<p>${inputText}</p>`;
        }
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        const inputTask = taskCreated.querySelector('input[type="text"]');
        if(inputTask) {
            const inputTaskValue = inputTask.value;
            const inputContainer = inputTask.parentNode;
            inputTask.remove();
            inputContainer.innerHTML = `<p>${inputTaskValue}</p>`;
        }
    } 
});


//Checkbox
document.addEventListener("click", function(event) {
        const checkbox = event.target.closest('input[type="checkbox"]');
    if(!checkbox) return;
    const allCheckbox = document.querySelectorAll("input[type='checkbox']");
    const checkedCheckbox = Array.from(allCheckbox).filter((item) => item.checked);
    if(checkedCheckbox.length>=1 && !taskCompleted.classList.contains("show")) {
        taskCompleted.classList.toggle("show");
    } else if(checkedCheckbox.length === 0) {
        taskCompleted.classList.remove("show"); 
    }
    //Переміщення завдань
    const currentTaskBody = checkbox.parentNode.nextElementSibling.children[0];
    if(checkbox.checked) {
        if(currentTaskBody.matches('input[type="text"]')) {
            const inputTaskValue = currentTaskBody.value;
            const inputContainer = currentTaskBody.parentNode;
            currentTaskBody.remove();
            inputContainer.innerHTML = `<p class="complited-task">${inputTaskValue}</p>`;
        }
        console.log(currentTaskBody.matches('input[type="text"]'));
        const task = checkbox.parentNode.parentNode;
        currentTaskBody.classList.toggle("complited-task");
        taskCompletedBody.prepend(task);
    } else {
        currentTaskBody.classList.remove("complited-task");
        const task = checkbox.parentNode.parentNode;
        taskCreated.prepend(task);
    }
})

//Приховати виконані завдання
const hideButton = document.querySelector(".header-button");
hideButton.addEventListener("click", function() {
    if(!taskCompletedBody.classList.contains("hide")){
        taskCompletedBody.classList.toggle("hide");
        hideButton.firstElementChild.textContent = "Show";
    } else if(taskCompletedBody.classList.contains("hide")){
        taskCompletedBody.classList.remove("hide");
        hideButton.firstElementChild.textContent = "Hide";
    }
});

//_________________________________________________________________







//_____________________________________________________
//Class variation

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

