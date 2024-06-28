function addTask(inputBoxId, listContainerId, dateBoxId, timeBoxId, assigneeBoxId) {
    const inputBox = document.getElementById(inputBoxId);
    const listContainer = document.getElementById(listContainerId);
    const dateBox = document.getElementById(dateBoxId);
    const timeBox = document.getElementById(timeBoxId);
    const assigneeBox = document.getElementById(assigneeBoxId);

    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            ${inputBox.value}
            <br> <small>Due: ${dateBox.value} ${timeBox.value}</small>
            <br> <small>Assignee: ${assigneeBox.value}</small>
        `;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    assigneeBox.value = "";
    saveData(listContainerId);
}

document.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(e.target.parentElement.id);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(e.target.parentElement.parentElement.id);
    }
}, false);

function saveData(listContainerId) {
    const listContainer = document.getElementById(listContainerId);
    localStorage.setItem(listContainerId, listContainer.innerHTML);
}

function showTasks() {
    const listContainer1Content = localStorage.getItem("list-container1");
    if (listContainer1Content) {
        document.getElementById("list-container1").innerHTML = listContainer1Content;
    }
    const listContainer2Content = localStorage.getItem("list-container2");
    if (listContainer2Content) {
        document.getElementById("list-container2").innerHTML = listContainer2Content;
    }
}

function updateTaskStatus() {
    const now = new Date();
    document.querySelectorAll("li").forEach(task => {
        const dateText = task.querySelector("small").innerText.split("Due: ")[1];
        const [date, time] = dateText.split(" ");
        const dueDate = new Date(`${date}T${time}`);
        if (task.classList.contains("checked")) return;
        if (now > dueDate) {
            task.classList.add("past-due");
        } else {
            task.classList.remove("past-due");
        }
    });
}

showTasks();
setInterval(updateTaskStatus, 60000); 
