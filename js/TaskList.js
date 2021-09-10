import { htmlToElement } from "./utils.js";
import state from "./state.js";
import Task from "./Task.js";
export default class TaskList extends HTMLElement {
    constructor(meta) {
        super();
        this.meta = meta;
    }
    render() {
        if (this.meta.deleted) {
            this.remove();
        } else {
            this.innerHTML = '';
            /**
             * Delevlop html
             */
            const wrapper = htmlToElement( /*html*/ `
            <div class="app-task-list"  data-task-list-id="${this.meta.id}">
                <div class="app-task-list-header">
                    <div class="editable app-task-list-title" contenteditable="true">${this.meta.name}</div>

                    <span class="app-icon small clickable onhover delete-list">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 900.5 900.5" style="enable-background:new 0 0 900.5 900.5;" xml:space="preserve">
                            <g>
                                <path d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z    M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/>
                                <path d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874   c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576   c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/>
                            </g>

                            </svg>
                        </span>
                </div>
               
            </div>`);

            const titleElement = wrapper.getElementsByClassName('app-task-list-title')[0];
            const deleteIcon = wrapper.getElementsByClassName('delete-list')[0];

            /**
             * Update value whenever changes
             */
            const thisElement = this;
            titleElement.addEventListener("input", function() {
                thisElement.meta.name = this.innerText.trim() || this.textContent.trim();
            }, false);
            /**
             * blur on enter button click
             */
            titleElement.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.blur();
                }

            }, false);
            /**
             * Binding delete logic
             */
            deleteIcon.addEventListener("click", () => {
                this.meta.deleted = true;
                this.remove();
            });
            if (this.meta.tasks) {
                this.meta.tasks.forEach(task => {
                    wrapper.append(new Task(task, this.meta.name));
                });
            }
            /**
             * adding placeholder
             */
            const placeholder = htmlToElement( /*html*/ `<div class="add-task-placeholder">
                    <span class="app-icon small outlined">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                                <path d="M24.0607 10L24.024 38" stroke-width="4" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M10 24L38 24" stroke-width="4" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span> Add New Task
                </div>`);

            placeholder.addEventListener("click", () => {
                if (!this.meta.tasks) {
                    this.meta.tasks = [];
                }
                this.meta.tasks.push({
                    id: this.meta.tasks.length,
                    title: "New Task"
                });
                this.render();
            });
            wrapper.addEventListener("drop", function(e) {
                this.classList.toggle("drop-here");
                this.insertBefore(window.dragthis, placeholder);

                state.columns.forEach(col => {
                    if (col.name === window.dragdata.taskStatus) {
                        if (col.tasks) {
                            let delIndex = col.tasks.findIndex(t => t === window.dragdata.meta);
                            col.tasks.splice(delIndex, 1);
                        }
                    }
                });
                if (!thisElement.meta.tasks) {
                    thisElement.meta.tasks = [];
                }
                thisElement.meta.tasks.push(window.dragdata.meta);
            });
            wrapper.addEventListener("dragenter", function(e) {
                this.classList.toggle("drop-here");
                e.preventDefault();
            });
            wrapper.addEventListener("dragleave", function(e) {
                this.classList.toggle("drop-here");
                e.preventDefault();
            });
            wrapper.addEventListener("dragover", function(e) {
                e.preventDefault();
            });

            wrapper.append(placeholder);

            this.append(wrapper);
        }
    }
    connectedCallback() {

        this.render();
    }
}