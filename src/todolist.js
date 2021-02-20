const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDos = [];
let finishedToDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanToDos = toDos.filter(toDo =>  toDo.id !== parseInt(li.id))
    toDos = cleanToDos;
    saveToDos();
};

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinished = finishedToDos.filter(finish =>  finish.id !== parseInt(li.id));
    finishedToDos = cleanFinished;
    saveFinished();
};

function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
};

function saveToDos() {
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
};

function getContent(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.querySelector('span').innerText;
    return text;
};

function moveToDo(event) {
    const content = getContent(event);
    deleteFinished(event);
    paintToDo(content);
};

function moveFinished(event) {
    const content = getContent(event);
    deleteToDo(event);
    paintFinished(content);
};

function paintFinished(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const moveBtn = document.createElement("button");
    const newId = new Date().getTime();
    span.innerText = text;
    delBtn.innerText = "🗑";
    delBtn.style.fontSize = "20px";
    delBtn.style.border = "none";
    delBtn.style.backgroundColor = "inherit";
    delBtn.style.padding = "0px 5px";
    delBtn.addEventListener("click", deleteFinished);
    delBtn.style.cursor = "pointer";
    moveBtn.innerText = "❌";
    moveBtn.style.fontSize = "20px";
    moveBtn.style.border = "none";
    moveBtn.style.backgroundColor = "inherit";
    moveBtn.style.borderRight = "1px solid black";
    moveBtn.style.padding = "0px 5px";
    moveBtn.addEventListener("click", moveToDo);
    moveBtn.style.cursor = "pointer";
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = newId;
    finishedList.appendChild(li);
    const finishedObj = {
        id: newId,
        text: text
    };
    finishedToDos.push(finishedObj);
    saveFinished();
};

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const moveBtn = document.createElement("button");
    const newId = new Date().getTime();
    span.innerText = text;
    delBtn.innerText = "🗑";
    delBtn.style.fontSize = "20px";
    delBtn.style.border = "none";
    delBtn.style.backgroundColor = "inherit";
    delBtn.style.padding = "0px 5px";
    delBtn.addEventListener("click", deleteToDo);
    delBtn.style.cursor = "pointer";
    moveBtn.innerText = "⭕️";
    moveBtn.style.fontSize = "20px";
    moveBtn.style.border = "none";
    moveBtn.style.backgroundColor = "inherit";
    moveBtn.style.borderRight = "1px solid black";
    moveBtn.style.padding = "0px 5px";
    moveBtn.addEventListener("click", moveFinished);
    moveBtn.style.cursor = "pointer";
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const toDoObj = {
        id: newId,
        text: text
    };
    toDos.push(toDoObj);
    saveToDos();
};

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    saveFinished();
};

function loadToDos() {
    const loadedToDos = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);

    if(loadedToDos !== null) {
         const parsedToDos = JSON.parse(loadedToDos);
         parsedToDos.forEach(function(toDo) {
             paintToDo(toDo.text);
         });
    };

    if(loadedFinished !== null) {
        const parsedToDos = JSON.parse(loadedFinished);
        parsedToDos.forEach(function(toDo) {
            paintFinished(toDo.text);
        });
   };
};

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
};
init();