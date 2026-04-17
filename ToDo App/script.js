
let filter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
    renderTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    let task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    save();
    renderTasks();

    input.value = "";
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(t => {
        if (filter === "all") return true;
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
    });

    document.getElementById("count").innerText =
        `Total: ${filtered.length} tasks`;

    filtered.forEach(task => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task.text;
        span.className = "task-text";
        if (task.completed) span.classList.add("done");

        span.onclick = function () {
            task.completed = !task.completed;
            save();
            renderTasks();
        };

        let actions = document.createElement("div");
        actions.className = "actions";

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = function () {
            let newText = prompt("Edit task:", task.text);
            if (newText) {
                task.text = newText;
                save();
                renderTasks();
            }
        };

        let delBtn = document.createElement("button");
        delBtn.innerText = "Del";
        delBtn.onclick = function () {
            tasks = tasks.filter(t => t.id !== task.id);
            save();
            renderTasks();
        };

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);
    });
}

function setFilter(type) {
    filter = type;
    renderTasks();
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}