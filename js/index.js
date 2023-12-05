class Task  {
    constructor(title, discription, date, time) {
        this._title = title;
        this._discription = discription;
        this._date = date;
        this._time = time;

    }
    get title() {
        this._title = title; 
    }
    set title(value) {
        this._title = value; 
    }
};

const task1 = new Task("My first Task", "I need to make my oun toDoList-application","2024-03-15", "9:00")


console.log(task1);