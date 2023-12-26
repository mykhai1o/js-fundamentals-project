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

//Localstorage
let tasks = [];
function saveToLocal(id, taskValue, checked) {
    const createdTasks =  tasksContainer.querySelectorAll('.task-child');
    let allTasks = [];
    for(let i = 0; i < createdTasks.length; i++){
        const taskId = createdTasks[i].getAttribute("id");
        const taskText = createdTasks[i].children[1].firstElementChild.textContent;
        const taskTextWithoutN = taskText.replaceAll("\n", "");
        const checkedValue = createdTasks[i].firstElementChild.firstElementChild.checked;
        let result = {
            "id": `${taskId}`,
            "task": `${taskTextWithoutN}`,
            "checked": `${checkedValue}`,
        }
        allTasks.push(result);
        
    }
    localStorage.setItem("tasks", JSON.stringify(allTasks))
    // console.log(localStorage.getItem("tasks"));
    
}

function getFromLocal() {
    const infoFromLocal = JSON.parse(localStorage.getItem("tasks"));
    // console.log(infoFromLocal);
    if(infoFromLocal) {
        // console.log(infoFromLocal);
        // console.log(infoFromLocal.length);
        for(let i = 0; i < infoFromLocal.length; i++) {
            const taskId = infoFromLocal[i].id;
            const taskText = infoFromLocal[i].task;
            const taskChecked = Boolean((infoFromLocal[i].checked === "false") ? false : true);
            // console.log(taskChecked);
            //Створення завдань з localstorage
            const newTaskDiv = document.createElement("div");
            newTaskDiv.classList.add("task-child");
            // newTaskDiv.style.display = "flex";
            taskCreated.append(newTaskDiv);
            newTaskDiv.innerHTML = `
            <div class="task-child__checkboks"><input type="checkbox" ${(taskChecked) ? "checked" : ""}></div>
            <div class="task-child__created-task"><p>${taskText}</p></div>
            <div class="task-child__delete-button"><input type="submit" value="x"></div>
            `;
            newTaskDiv.setAttribute("id",`${taskId}`);

            //Переміщення у виконані
            const checkbox = newTaskDiv.firstElementChild.firstElementChild;
            const currentTaskBody = newTaskDiv.children[1].firstElementChild;
            if(checkbox.checked) {
                // console.log(currentTaskBody);
                currentTaskBody.classList.toggle("complited-task");
                // const taskCompletedBody = document.querySelector(".task-completed-body");
                taskCompletedBody.append(newTaskDiv);
            }   
            
            //Відображення виконаних завдань
            const allCheckbox = document.querySelectorAll("input[type='checkbox']");
            const checkedCheckbox = Array.from(allCheckbox).filter((item) => item.checked);
            if(checkedCheckbox.length>=1 && !taskCompleted.classList.contains("show")) {
                taskCompleted.classList.toggle("show");
            } else if(checkedCheckbox.length === 0) {
                taskCompleted.classList.remove("show"); 
            }
        }
    }

};

getFromLocal();



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
        // newTaskDiv.style.display = "flex";
        taskCreated.prepend(newTaskDiv);
        newTaskDiv.innerHTML = `
        <div class="task-child__checkboks"><input type="checkbox"></div>
        <div class="task-child__created-task"><p>${taskCreatorInput.value}</p></div>
        <div class="task-child__delete-button"><input type="submit" value="x"></div>
        `;
        const idNumber = (taskCreated.querySelectorAll(".task-child").length);
        newTaskDiv.setAttribute("id",`task${idNumber}`);
        saveToLocal();
        }

        taskCreatorInput.value = "";
        taskCreatorInput.focus();
}
//Додавання завдання    
taskCreatorButton.addEventListener('click', createTask);
taskCreatorInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        createTask();
        e.preventDefault();
        e.stopPropagation();
    }
});

//Видалення завдання
taskCreated.addEventListener('click', function(event) {
    const currentDelBut = event.target.closest('input[type="submit"]');
    if(!currentDelBut) return;
    event.target.closest(".task-child").remove();
    saveToLocal();
});
taskCompleted.addEventListener('click', function(event) {
    const currentDelBut = event.target.closest('input[type="submit"]');
    if(!currentDelBut) return;
    event.target.closest(".task-child").remove();
    saveToLocal();
    if(taskCompletedBody.querySelectorAll('.task-child').length === 0) {
        taskCompleted.classList.remove("show"); 
        saveToLocal();
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
            if(inputText === ""){
                const taskChildCreated = inputContainer.parentNode;
                taskChildCreated.remove();
            }
            inputTaskExisted.remove();
            inputContainer.innerHTML = `<p>${inputText}</p>`;
            saveToLocal();
        }
        if(currentTaskP.parentNode.parentNode.parentNode === taskCreated) {
            const currentTaskParentParentID = currentTaskP.parentNode.parentNode.getAttribute("id");
            const findCurrentTask = taskCreated.querySelector(`#${currentTaskParentParentID}`);
            const currentTaskWrapper = findCurrentTask.children[1];
            const taskPValue = currentTaskWrapper.firstElementChild.textContent;
            currentTaskWrapper.firstElementChild.remove();
            currentTaskWrapper.innerHTML = `<input type="text" value="${taskPValue}">`;
            currentTaskWrapper.firstElementChild.focus();
            saveToLocal();
        }
        
    } else if(!event.target.matches('input')) {
        const taskTextInInput = document.querySelector('.task-created input[type="text"]');
        if(taskTextInInput) {
            const inputText = taskTextInInput.value;
            const inputContainer = taskTextInInput.parentNode;
            taskTextInInput.remove();
            inputContainer.innerHTML = `<p>${inputText}</p>`;
            saveToLocal();
        }
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        const inputTask = taskCreated.querySelector('input[type="text"]');
        if(inputTask) {
            const inputTaskValue = inputTask.value;
            const inputContainer = inputTask.parentNode;
            if(inputTaskValue === ""){
                const taskChildCreated = inputContainer.parentNode;
                taskChildCreated.remove();
            }
            inputTask.remove();
            inputContainer.innerHTML = `<p>${inputTaskValue}</p>`;
            saveToLocal();
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
        const task = checkbox.parentNode.parentNode;
        currentTaskBody.classList.toggle("complited-task");
        taskCompletedBody.prepend(task);
        saveToLocal();
    } else {
        currentTaskBody.classList.remove("complited-task");
        const task = checkbox.parentNode.parentNode;
        taskCreated.prepend(task);
        saveToLocal();
    }
})

//Приховати виконані завдання
const hideButton = document.querySelector(".header-button");
hideButton.addEventListener("click", function() {
    if(!taskCompletedBody.classList.contains("hide")){
        taskCompletedBody.classList.toggle("hide");
        const clearButton = document.querySelector('.clear-button');
        clearButton.classList.toggle("hide");
        console.log(clearButton);
        hideButton.firstElementChild.textContent = "Show";
    } else if(taskCompletedBody.classList.contains("hide")){
        taskCompletedBody.classList.remove("hide");
        const clearButton = document.querySelector('.clear-button');
        clearButton.classList.remove("hide");
        hideButton.firstElementChild.textContent = "Hide";
    }
});

// Очистити виконані завдання
// const clearButton = document.querySelector('.clear-button');
// clearButton.addEventListener("click", function(){
//     console.log(taskCompletedBody[0]);
//     for(let i = 0; i < taskCompletedBody.length; i++) {
//     }
        
// });

//_________________________________________________________________


