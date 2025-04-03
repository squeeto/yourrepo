const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const boom = new Audio("./sounds/BOOM.mp3");;
const bento = document.getElementById("bento");

let taskList = [];
localStorage.taskList;
let t = document.getElementById("tasks");
inputs = t.querySelectorAll("input");

class tasks {
    static container;
    static checkbox;
    static task;
    static taskLabel;

    constructor() {
        addBtn.hidden = true;
        this.container = document.createElement("li");
        this.container.style.display = "flex";
        this.container.style.alignItems = "center";
        this.container.style.gap = "10px";
        this.container.style.marginBottom = "8px";

        this.checkbox = document.createElement("input")
        this.checkbox.type = "checkbox"
        this.container.appendChild(this.checkbox);

        let labelInput = document.createElement("input")
        labelInput.type = "text";
        labelInput.placeholder = "add task";
        this.container.appendChild(labelInput);

        

        document.addEventListener("keypress", (e) => {
            if(e.key === "Enter") {
                this.taskLabel = document.createElement("label");
                this.taskLabel.textContent = labelInput.value;
                this.taskLabel.style.color = 'white';
                this.taskLabel.style.fontSize = '20px';
                this.container.appendChild(this.taskLabel);

                labelInput.hidden = true;
                labelInput.value = "";

                addBtn.hidden = false;
            }
        });
        



    }

    removeTask() {
        this.container.classList.toggle('finished');
        setTimeout(() => {
            this.container.remove();
          }, 500);
    }


}

addBtn.onclick = addTask;
closeBtn.onclick = closeWindow;

function closeWindow() {
    window.close();
}


function addTask() {
    addBtn.hidden = true;
    newTask = new tasks()
    t.appendChild(newTask.container);
    taskList.push(newTask);
}


document.addEventListener("mousedown", function(event) {
    if(event.target.matches("input") && event.target.type === "checkbox") {
        const boomReplay = boom.cloneNode();
        boomReplay.volume = 0.2;
        boomReplay.play();

        bento.classList.add("show");

        setTimeout(() => {
            bento.classList.remove("show");
        }, 500);

        let index = 0;
        while(taskList[index].checkbox !== event.target) {
            index++;
        }
        if(!event.target.checked) {
            taskList[index].removeTask();
        }
    }
});
