class Task  {
    // constructor(title, discription, date, time) {
    //     this._title = title;
    //     this._discription = discription;
    //     this._date = date;
    //     this._time = time;

    // }
    constructor(title) {
        this._title = title;
    }
    get title() {
        this._title = title; 
    }
    set title(value) {
        this._title = value; 
    }
};

const tasksContainer = document.querySelector('.tasks-wrapper');
const taskCreated = document.querySelector('.task-created');
const taskCreatorInput = document.querySelector('.task-creator__input');
const taskCreatorButton = document.querySelector('.task-creator__button');

const createTask = function() {
    const newDiv = document.createElement("div");
    newDiv.classList.add("task-child");
    newDiv.style.display = "flex";
    taskCreated.prepend(newDiv);
    newDiv.innerHTML = `
        <div class="task-child__checkboks"><input type="checkbox"></div>
        <div class="task-child__created-task">${taskCreatorInput.value}</div>
    `;
    taskCreatorInput.value = "";
}

taskCreatorButton.addEventListener('click', createTask);


