const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));
};

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTask(taskText, false);
  saveTasks();

  taskInput.value = "";
});

// Create task function
function createTask(taskText, completed) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  if (completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span>${taskText}</span>

    <div class="task-buttons">
      <button class="btn btn-success btn-sm complete-btn">
        <i class="bi bi-check-lg"></i>
      </button>

      <button class="btn btn-danger btn-sm delete-btn">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  `;

  // Complete task
  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete task
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Save tasks
function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}