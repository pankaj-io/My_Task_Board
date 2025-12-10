// let taskData = {};
// const todo = document.querySelector('#todo');
// const progress = document.querySelector('#progress');
// const done = document.querySelector('#done');
// const columns = [todo, progress, done];
// let dragElement = null;

// // console.log(todo,progress,done);

// const tasks = document.querySelectorAll('.task');

// tasks.forEach(task => {
//     task.addEventListener("drag", (e) => {
//         // console.log(e);
//         dragElement = task;
//     })
// })

// function addDropOnColumn(column) {
//     column.addEventListener("dragenter", (e) => {
//         e.preventDefault();
//         column.classList.add("hover-over");
//     })

//     column.addEventListener("dragleave", (e) => {
//         e.preventDefault();
//         column.classList.remove("hover-over");
//     })

//     column.addEventListener("dragover", (e) => {
//         e.preventDefault();
//     })

//     column.addEventListener("drop", (e) => {
//         e.preventDefault();
//         // console.log("droppped" , dragElement, column);
//         column.classList.remove("hover-over");
//         column.appendChild(dragElement);

//         columns.forEach(col => {
//             const tasks = col.querySelectorAll(".task");
//             const count = col.querySelector(".right");

//             taskData[col.id] = Array.from(tasks).map( t =>{
//                     return {
//                         title : t.querySelector("h2").innerText,
//                         description : t.querySelector("p").innerText
//                     }
//             })
//             // console.log(taskData); 
//             localStorage.setItem("tasks", JSON.stringify(taskData));
//             count.innerText = tasks.length;
//         })

//     })

// }
// addDropOnColumn(todo)
// addDropOnColumn(progress)
// addDropOnColumn(done)

// // model opening usning toggle
// const toggleButton = document.querySelector('#toggle-modal');
// const modalBg = document.querySelector(".modal .bg")
// const modal = document.querySelector(".modal");

// toggleButton.addEventListener("click", () => {
//     modal.classList.toggle("active");
// })

// modalBg.addEventListener("click", ()=>{
//     modal.classList.remove("active");
// })

// // add new task 
// const addTaskButton = document.querySelector("#add-new-task");
// addTaskButton.addEventListener("click", ()=>{
//     const taskTitle = document.querySelector("#task-title").value;
//     const taskDesc = document.querySelector("#task-desc").value;

//     const div = document.createElement("div");

//     div.classList.add("task");
//     div.setAttribute("draggable", "true");
//     div.innerHTML = `
//         <h2>${taskTitle}</h2>
//         <p>${taskDesc}</p>
//         <button>Delete</button>
//     `
//     todo.appendChild(div);

//     div.addEventListener('drag', (e)=>{
//          dragElement = div;
//     })
//     modal.classList.remove('active');
// })




// helping

// =======================
// GLOBAL VARIABLES
// =======================
// let taskData = {};
// const todo = document.querySelector('#todo');
// const progress = document.querySelector('#progress');
// const done = document.querySelector('#done');
// const columns = [todo, progress, done];
// let dragElement = null;


// // =======================
// // CREATE TASK ELEMENT
// // =======================
// function createTaskElement(title, description) {
//     const div = document.createElement("div");
//     div.classList.add("task");
//     div.setAttribute("draggable", "true");

//     div.innerHTML = `
//         <h2>${title}</h2>
//         <p>${description}</p>
//         <div class="all-btn">
//             <button class="edit-btn">Edit</button>
//             <button class="delete-btn">Delete</button>
//         </div>

//     `;

//     // drag
//     div.addEventListener("drag", () => dragElement = div);

//     // delete
//     div.querySelector(".delete-btn").addEventListener("click", () => {
//         div.remove();
//         updateCountsAndStorage();
//     });


//     div.querySelector(".edit-btn").addEventListener("click", () => {
//         enableTaskEditing(div);
//     });

//     return div;
// }


// // =======================
// // UPDATE COUNTS + STORAGE
// // =======================
// function updateCountsAndStorage() {
//     columns.forEach(col => {
//         const tasks = col.querySelectorAll(".task");
//         const count = col.querySelector(".right");

//         // Save column tasks
//         taskData[col.id] = Array.from(tasks).map(t => ({
//             title: t.querySelector("h2").innerText,
//             description: t.querySelector("p").innerText
//         }));

//         // Update count
//         count.innerText = tasks.length;
//     });

//     // Save everything
//     localStorage.setItem("tasks", JSON.stringify(taskData));
// }


// // =======================
// // DRAG & DROP HANDLERS
// // =======================
// function addDropOnColumn(column) {
//     column.addEventListener("dragenter", (e) => {
//         e.preventDefault();
//         column.classList.add("hover-over");
//     });

//     column.addEventListener("dragleave", (e) => {
//         e.preventDefault();
//         column.classList.remove("hover-over");
//     });

//     column.addEventListener("dragover", (e) => {
//         e.preventDefault();
//     });

//     column.addEventListener("drop", (e) => {
//         e.preventDefault();
//         column.classList.remove("hover-over");

//         column.appendChild(dragElement);
//         updateCountsAndStorage();
//     });
// }

// addDropOnColumn(todo);
// addDropOnColumn(progress);
// addDropOnColumn(done);


// // =======================
// // RESTORE FROM LOCAL STORAGE
// // =======================

// window.addEventListener("DOMContentLoaded", () => {
//     const saved = JSON.parse(localStorage.getItem("tasks") || "{}");

//     Object.keys(saved).forEach(columnId => {
//         saved[columnId].forEach(task => {
//             const div = createTaskElement(task.title, task.description);
//             document.getElementById(columnId).appendChild(div);
//         });
//     });

//     updateCountsAndStorage();
// });


// // =======================
// // MODAL TOGGLE
// // =======================
// const toggleButton = document.querySelector('#toggle-modal');
// const modalBg = document.querySelector(".modal .bg");
// const modal = document.querySelector(".modal");

// toggleButton.addEventListener("click", () => {
//     modal.classList.toggle("active");
// });

// modalBg.addEventListener("click", () => {
//     modal.classList.remove("active");
// });


// // =======================
// // ADD NEW TASK
// // =======================
// const addTaskButton = document.querySelector("#add-new-task");

// addTaskButton.addEventListener("click", () => {
//     const taskTitle = document.querySelector("#task-title").value.trim();
//     const taskDesc = document.querySelector("#task-desc").value.trim();

//     if (!taskTitle) return;

//     const div = createTaskElement(taskTitle, taskDesc);
//     todo.appendChild(div);

//     updateCountsAndStorage();

//     // clear inputs
//     document.querySelector("#task-title").value = "";
//     document.querySelector("#task-desc").value = "";

//     modal.classList.remove("active");
// });



// // =======================
// // ENABLE EDIT MODE
// // =======================
// function enableTaskEditing(taskDiv) {
//     const titleEl = taskDiv.querySelector("h2");
//     const descEl = taskDiv.querySelector("p");
//     const btnContainer = taskDiv.querySelector(".all-btn");

//     const originalTitle = titleEl.innerText;
//     const originalDesc = descEl.innerText;

//     // replace display text with input fields
//     titleEl.innerHTML = `<input type="text" class="edit-title" value="${originalTitle}">`;
//     descEl.innerHTML = `<textarea class="edit-desc">${originalDesc}</textarea>`;

//     // change buttons
//     btnContainer.innerHTML = `
//         <button class="save-btn">Save</button>
//         <button class="cancel-btn">Cancel</button>
//     `;

//     // SAVE handler
//     btnContainer.querySelector(".save-btn").addEventListener("click", () => {
//         const newTitle = taskDiv.querySelector(".edit-title").value.trim();
//         const newDesc = taskDiv.querySelector(".edit-desc").value.trim();

//         titleEl.innerText = newTitle || "Untitled Task";
//         descEl.innerText = newDesc;

//         restoreButtons(taskDiv);
//         updateCountsAndStorage();
//     });

//     // CANCEL handler
//     btnContainer.querySelector(".cancel-btn").addEventListener("click", () => {
//         titleEl.innerText = originalTitle;
//         descEl.innerText = originalDesc;

//         restoreButtons(taskDiv);
//     });
// }


// // =======================
// // RESTORE BUTTONS AFTER EDIT
// // =======================
// function restoreButtons(taskDiv) {
//     const btnContainer = taskDiv.querySelector(".all-btn");

//     btnContainer.innerHTML = `
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//     `;

//     // reattach events
//     btnContainer.querySelector(".edit-btn")
//         .addEventListener("click", () => enableTaskEditing(taskDiv));

//     btnContainer.querySelector(".delete-btn")
//         .addEventListener("click", () => {
//             taskDiv.remove();
//             updateCountsAndStorage();
//         });
// }








// =======================
// GLOBAL VARIABLES
// =======================
let taskData = {};
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];
let dragElement = null;

// modal elements
const toggleButton = document.querySelector('#toggle-modal');
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const modalTitleInput = document.querySelector("#task-title");
const modalDescInput = document.querySelector("#task-desc");
const addTaskButton = document.querySelector("#add-new-task");

let currentEditingTask = null; // reference to task being edited

// =======================
// CREATE TASK ELEMENT
// =======================
function createTaskElement(title, description) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="all-btn">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // drag
    div.addEventListener("drag", () => dragElement = div);

    // delete
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateCountsAndStorage();
    });

    // edit
    div.querySelector(".edit-btn").addEventListener("click", () => openEditModal(div));

    return div;
}

// =======================
// OPEN MODAL TO EDIT TASK
// =======================
function openEditModal(taskDiv) {
    currentEditingTask = taskDiv;

    modalTitleInput.value = taskDiv.querySelector("h2").innerText;
    modalDescInput.value = taskDiv.querySelector("p").innerText;

    addTaskButton.innerText = "Save Changes";
    modal.classList.add("active");
}

// =======================
// MODAL TOGGLE
// =======================
toggleButton.addEventListener("click", () => {
    modal.classList.toggle("active");
    addTaskButton.innerText = "Add Task";
    currentEditingTask = null;
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
    addTaskButton.innerText = "Add Task";
    currentEditingTask = null;
});

// =======================
// ADD OR SAVE TASK
// =======================
addTaskButton.addEventListener("click", () => {
    const taskTitle = modalTitleInput.value.trim();
    const taskDesc = modalDescInput.value.trim();
    if (!taskTitle) return;

    if (currentEditingTask) {
        // save changes to existing task
        currentEditingTask.querySelector("h2").innerText = taskTitle;
        currentEditingTask.querySelector("p").innerText = taskDesc;
    } else {
        // create new task
        const div = createTaskElement(taskTitle, taskDesc);
        todo.appendChild(div);
    }

    updateCountsAndStorage();

    // clear modal inputs
    modalTitleInput.value = "";
    modalDescInput.value = "";
    modal.classList.remove("active");
    addTaskButton.innerText = "Add Task";
    currentEditingTask = null;
});

// =======================
// UPDATE COUNTS + STORAGE
// =======================
function updateCountsAndStorage() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            description: t.querySelector("p").innerText
        }));

        count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(taskData));
}

// =======================
// DRAG & DROP
// =======================
function addDropOnColumn(column) {
    column.addEventListener("dragenter", e => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", e => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", e => e.preventDefault());

    column.addEventListener("drop", e => {
        e.preventDefault();
        column.classList.remove("hover-over");
        column.appendChild(dragElement);
        updateCountsAndStorage();
    });
}

addDropOnColumn(todo);
addDropOnColumn(progress);
addDropOnColumn(done);

// =======================
// RESTORE TASKS FROM LOCAL STORAGE
// =======================
window.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "{}");

    Object.keys(saved).forEach(columnId => {
        saved[columnId].forEach(task => {
            const div = createTaskElement(task.title, task.description);
            document.getElementById(columnId).appendChild(div);
        });
    });

    updateCountsAndStorage();
});
