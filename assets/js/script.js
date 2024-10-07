// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || []; // <-created an array
let nextId = JSON.parse(localStorage.getItem("nextId")); //pulling from local storage

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    //if it didnt exist, we are setting it to 1.
    nextId = 1;
  } else {
    nextId++; //if exists, we are adding a 1.
  }
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  //what activates the task
  console.log(event); //object that contains info
  event.preventDefault();
  const taskTitle = $("#taskTitle").val(); //variable
  const taskDate = $("#taskDate").val(); //variable
  const taskDescription = $("#taskDescription").val(); //variables
  const task = {
    title: taskTitle,
    date: taskDate,
    description: taskDescription,
  };
  taskList.push(task); //a function to call the array
  localStorage.setItem("tasks", JSON.stringify(taskList)); //save info to local storage
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  const taskButtonEl = document.getElementById("taskbutton");
  taskButtonEl.addEventListener("click", handleAddTask);
});

// Datepicker widget
$(function () {
  $("#taskDate").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
