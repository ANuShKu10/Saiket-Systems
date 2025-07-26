const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = taskText;

  const btnGroup = document.createElement("div");
  btnGroup.className = "task-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.className = "complete";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.className = "edit";
  editBtn.onclick = () => editTask(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
  };

  btnGroup.appendChild(completeBtn);
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);

  taskList.appendChild(li);
  taskInput.value = "";
}

function editTask(spanElement) {
  const currentText = spanElement.textContent;
  const newText = prompt("Edit task:", currentText);
  if (newText !== null && newText.trim() !== "") {
    spanElement.textContent = newText.trim();
  }
}

document.getElementById("footer").innerHTML = `© ${new Date().getFullYear()} | Made with ❤️ by Jayanth Mayur.H`;
