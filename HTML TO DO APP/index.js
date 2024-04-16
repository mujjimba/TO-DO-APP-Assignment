document.addEventListener("DOMContentLoaded", function() {
    const todoValue = document.getElementById("todoText"),
        listItems = document.getElementById("list-items"),
        addUpdateClick = document.getElementById("AddupdateClick");

    if (!todoValue || !listItems || !addUpdateClick) {
        console.error("One or more elements not found.");
        return;
    }

    addUpdateClick.addEventListener("click", createTodoData);

    document.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addUpdateClick.click();
        }
    });

    function createTodoData() {
        if (todoValue.value === "") {
            alert("Please enter your todo text");
            todoValue.focus();
            return;
        }

        const todoItem = document.createElement("li");
        todoItem.innerHTML = `
            <div>${todoValue.value}</div>
            <div>
    <button class="edit todo-controls">Edit</button>
    <button class="delete todo-controls">Delete</button>
</div>
        `;
        listItems.appendChild(todoItem);
        todoValue.value = "";
    }

    function updateTodoitems(item) {
        const newValue = prompt("Enter new value:", item.querySelector("div").textContent);
        if (newValue !== null) {
            item.querySelector("div").textContent = newValue;
        }
    }

    function deleteTodoItems(item) {
        if (confirm("Are you sure you want to delete this item?")) {
            item.remove();
        }
    }

    function completeTodoItem(e) {
        if (e.style.textDecoration === "") {
            e.style.textDecoration = "line-through";
        } else {
            e.style.textDecoration = "";
        }
    }

    listItems.addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            updateTodoitems(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains("delete")) {
            deleteTodoItems(e.target.parentElement.parentElement);
        } else if (e.target.tagName === "DIV") {
            completeTodoItem(e.target);
        }
    });
});

