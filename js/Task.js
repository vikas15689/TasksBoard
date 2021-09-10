import { htmlToElement } from "./utils.js";
export default class Task extends HTMLElement {
    constructor(meta, taskStatus) {
        super();
        this.meta = meta;
        this.taskStatus = taskStatus;
    }
    render() {
        this.innerHTML = '';

        const taskElement = htmlToElement( /*html*/ `
        <div class="app-task" draggable="true" data-task-id="${this.meta.id}">
                    <div class="app-task-content-wrapper">
                        <div class="app-task-content editable task-title" contenteditable="true">
                            ${this.meta.title}
                        </div>
                        <span class="app-icon small clickable onhover">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 512.006 512.006" style="enable-background:new 0 0 512.006 512.006;"
                                    xml:space="preserve">
                                    <g>
                                        <g>
                                            <path
                                                d="M508.247,246.756l-72.457-72.465c-5.009-5.009-13.107-5.009-18.116,0c-5.009,5.009-5.009,13.107,0,18.116l50.594,50.594
                                                                    			H268.811V43.748l50.594,50.594c5.009,5.009,13.107,5.009,18.116,0c5.009-5.009,5.009-13.107,0-18.116L265.056,3.761
                                                                    			c-5.001-5.009-13.107-5.009-18.116,0l-72.457,72.457c-5.009,5.009-5.009,13.107,0,18.116c5.001,5.009,13.107,5.009,18.116,0
                                                                    			l50.594-50.594v199.27H43.744l50.594-50.594c5.009-5.009,5.009-13.107,0-18.116c-5.009-5.009-13.107-5.009-18.116,0L3.757,246.756
                                                                    			c-5.009,5.001-5.009,13.107,0,18.116l72.465,72.457c5.009,5.009,13.107,5.009,18.116,0c5.009-5.001,5.009-13.107,0-18.116
                                                                    			l-50.594-50.594h199.458v199.646l-50.594-50.594c-5.009-5.001-13.107-5.001-18.116,0c-5.009,5.009-5.009,13.107,0,18.116
                                                                    			l72.457,72.465c5,5,13.107,5,18.116,0l72.465-72.457c5.009-5.009,5.009-13.107,0-18.116c-5.009-5-13.107-5-18.116,0
                                                                    			l-50.594,50.594V268.627h199.458l-50.594,50.594c-5.009,5.009-5.009,13.107,0,18.116s13.107,5.009,18.116,0l72.465-72.457
                                                                    			C513.257,259.872,513.257,251.765,508.247,246.756z" />
                                        </g>
                                    </g>
                                </svg>
                            </span>
                    </div>
                </div>`);

        const taskTitle = taskElement.getElementsByClassName('task-title')[0];
        /**
         * Update value whenever changes
         */
        const thisElement = this;
        taskTitle.addEventListener("input", function() {
            thisElement.meta.title = this.innerText.trim() || this.textContent.trim();
        }, false);


        /**
         * blur on enter button click
         */
        taskTitle.addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.blur();
            }

        }, false);
        taskElement.addEventListener("dragstart", function(e) {
            window.dragthis = this;
            window.dragdata = thisElement;
        });

        this.append(taskElement)
    }
    connectedCallback() {
        this.render();
    }
}