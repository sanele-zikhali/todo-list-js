let addBtn = document.getElementById("btn-add");
let taskInput = document.getElementById("task-input");
let todoList = document.querySelector(".todo-list");
let validationIcon = document.createElement("i");
let errorWrapper = document.querySelector(".error-wrapper");
let validationError = document.getElementById("error");
let taskCounter = document.getElementById("task-counter");
let inputIcon = document.querySelector(".input-icon");

let Time = new Date();

let timeEl = Time.getHours() > 12 ? " PM" : " AM";
let tasks = [];
let fullTime = Time.getHours() + ":" + Time.getMinutes() + timeEl;

validationIcon.className = "fa fa-warning col-danger";

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("click", (e) => {
  e.target.classList.remove("input-val");
  validationError.innerText = "";
});

function addTask() {
  const todo = document.createElement("div");
  const todoDetails = document.createElement("div");
  const time = document.createElement("p");
  const task = document.createElement("p");
  const action = document.createElement("div");
  const completeBtn = document.createElement("button");
  const completeIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");
  const deleteBtn = document.createElement("button");

  if (taskInput.value == "") {
    validationError.innerText = "Task input cannot be empty.";

    //errorWrapper.appendChild(validationIcon);
    taskInput.classList.add("input-val");
  } else {
    // Add Classes to elements
    todo.classList.add("todo");
    todo.classList.add("flex");
    todo.classList.add("flex-justify-between");

    todoDetails.classList.add("todo-details");
    time.classList.add("time");
    time.classList.add("col-dark");
    time.classList.add("text-mute");
    time.innerText = fullTime;
    task.classList.add("task");
    task.classList.add("col-dark");
    task.innerText = taskInput.value;
    action.classList.add("todo-action");

    //Create Json List
    const uniqueTask = {
      id: tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1,
      task: taskInput.value,
      time: fullTime,
    };
    tasks.push(uniqueTask);
    todo.id = uniqueTask.id;

    taskCounter.innerText = tasks.length;

    //Complete Button
    completeBtn.classList.add("bt");
    completeBtn.classList.add("bt-nrl");
    completeBtn.classList.add("bkg-primary");
    completeBtn.id = "completeBtn";
    //Complete Task
    completeBtn.onclick = (e) => {
      let parentEL = e.target.parentElement;
      let todoTarget = parentEL.parentElement;
      // console.log(todoTarget.id);
      // todoTarget.remove();
      let parentClass = parentEL.className;
      //console.log(parentClass == "todo-action" ? "Todo" : "icon");
      if (parentClass == "todo-action") {
        //todoTarget.remove();
        //todoTarget.style.background = "red";
        todoTarget.classList.add("completed");
        completeBtn.classList.add("disabled");
        completeBtn.setAttribute("disabled", "true");
        console.log("Task Completed");
      } else {
        let todoAc = todoTarget.parentElement;
        todoAc.classList.add("completed");
        completeBtn.classList.add("disabled");
        completeBtn.setAttribute("disabled", "true");
        console.log("Task Completed");
      }
      taskCounter.innerText = tasks.length;
    };

    //Delete Button
    deleteBtn.classList.add("bt");
    deleteBtn.classList.add("bt-nrl");
    deleteBtn.classList.add("bkg-danger");
    //Delete Task
    deleteBtn.id = "deleteBtn";
    deleteBtn.onclick = (e) => {
      let parentEL = e.target.parentElement;
      let todoTarget = parentEL.parentElement;
      // console.log(todoTarget.id);
      // todoTarget.remove();
      let parentClass = parentEL.className;
      //console.log(parentClass == "todo-action" ? "Todo" : "icon");
      if (parentClass == "todo-action") {
        todoTarget.remove();
        console.log("Task Deleted");
      } else {
        let todoAc = todoTarget.parentElement;
        todoAc.remove();
        console.log("Task Deleted");
      }

      tasks.map((task, key) => {
        if (task.id == todoTarget.id) {
          tasks.pop();
        }
      });
      taskCounter.innerText = tasks.length;
    };
    //Buttons Icons
    deleteIcon.classList.add("fa");
    deleteIcon.classList.add("fa-trash");
    completeIcon.classList.add("fa");
    completeIcon.classList.add("fa-check-circle");

    //Create new viarables based on created elements

    //Append Children
    todoList.appendChild(todo);
    todoDetails.appendChild(time);
    todoDetails.appendChild(task);
    todo.appendChild(todoDetails);
    todo.appendChild(action);
    completeBtn.appendChild(completeIcon);
    deleteBtn.appendChild(deleteIcon);
    action.appendChild(completeBtn);
    action.appendChild(deleteBtn);
    taskInput.value = "";
  }
}
