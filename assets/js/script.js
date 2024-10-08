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
function createTaskCard(task) {
  console.log(task);

  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3")
    .attr("data-task-id", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(task.date);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id);
  cardDeleteBtn.on("click", handleDeleteTask);

  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  // if (task.dueDate && task.status !== "done") {
  //   const now = dayjs();
  //   const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");

  //   // ? If the task is due today, make the card yellow. If it is overdue, make it red.
  //   if (now.isSame(taskDueDate, "day")) {
  //     taskCard.addClass("bg-warning text-white");
  //   } else if (now.isAfter(taskDueDate)) {
  //     taskCard.addClass("bg-danger text-white");
  //     cardDeleteBtn.addClass("border-light");
  //   }
  // }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  //activate call all task to call in storage. calls create task mult times.
  let taskList = JSON.parse(localStorage.getItem("tasks")) || []; // <-created an array

  // for loop, to iterate each items
  for (i = 0; i < taskList.length; i++) {
    const card = createTaskCard(taskList[i]);

    $("#todo-cards").append(card);
  }
}

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
    id: generateTaskId()
  };
  taskList.push(task); //a function to call the array
  localStorage.setItem("tasks", JSON.stringify(taskList)); //save info to local storage
  window.location.reload(); // fixed the add task function.
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Assuming the task is represented by a list item (li) element
  const taskItem = $(event.target.closest("div")).parent(); // Find the closest li element to the clicked button
  if (taskItem) {
    taskItem.remove(); // Remove the task item from the DOM
  }
  let taskList = JSON.parse(localStorage.getItem("tasks")) || []; // <-created an array
  let target = event.target.dataset.taskId
  console.log(target);
  console.log(taskList);
  let updatedList = taskList.filter(task => task.id != target); //filter is an array method that we use to reduce the item in the array according to the conditional statement.
  console.log(updatedList);

  localStorage.setItem("tasks", JSON.stringify(updatedList)); //over writting the local storage list with the updated list. 
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  const taskButtonEl = document.getElementById("taskbutton");
  taskButtonEl.addEventListener("click", handleAddTask);

  renderTaskList();
});

// Datepicker widget
$(function () {
  $("#taskDate").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
