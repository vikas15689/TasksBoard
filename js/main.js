import { htmlToElement } from "./utils.js";
import TaskList from "./TaskList.js";
import Task from "./Task.js";
import state from "./state.js";
/**
 * register custom elements
 */
customElements.define("app-task-list", TaskList);
customElements.define("app-task", Task);




const container = document.getElementById("task-container");

function renderTasks() {
    container.innerHTML = '';
    state.columns.forEach(c => {
        container.append(new TaskList(c));
    });

    const addColumnElement = htmlToElement( /*html*/ `
    <div class="app-task-list placeholder">
                <span class="app-icon small primary outlined">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                            <path d="M24.0607 10L24.024 38" stroke-width="4" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M10 24L38 24" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span> Add Task List
            </div>`);

    addColumnElement.addEventListener("click", () => {
        state.columns.push({
            id: state.columns.length,
            name: "New Status"
        });
        renderTasks();
    });
    container.append(addColumnElement);
}

renderTasks();