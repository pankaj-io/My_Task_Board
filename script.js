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
let taskData = {};
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];
let dragElement = null;


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
        <button class="delete-btn">Delete</button>
    `;

    // drag
    div.addEventListener("drag", () => dragElement = div);

    // delete
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateCountsAndStorage();
    });

    return div;
}


// =======================
// UPDATE COUNTS + STORAGE
// =======================
function updateCountsAndStorage() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        // Save column tasks
        taskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            description: t.querySelector("p").innerText
        }));

        // Update count
        count.innerText = tasks.length;
    });

    // Save everything
    localStorage.setItem("tasks", JSON.stringify(taskData));
}


// =======================
// DRAG & DROP HANDLERS
// =======================
function addDropOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
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
// RESTORE FROM LOCAL STORAGE
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


// =======================
// MODAL TOGGLE
// =======================
const toggleButton = document.querySelector('#toggle-modal');
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");

toggleButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});


// =======================
// ADD NEW TASK
// =======================
const addTaskButton = document.querySelector("#add-new-task");

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title").value.trim();
    const taskDesc = document.querySelector("#task-desc").value.trim();

    if (!taskTitle) return;

    const div = createTaskElement(taskTitle, taskDesc);
    todo.appendChild(div);

    updateCountsAndStorage();

    // clear inputs
    document.querySelector("#task-title").value = "";
    document.querySelector("#task-desc").value = "";

    modal.classList.remove("active");
});
