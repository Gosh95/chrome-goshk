const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveUser(text) {
   localStorage.setItem(USER_LS, text);
};

function submitUser(event) {
    form.classList.remove(SHOWING_CN);
    event.preventDefault();
    const currentValue = input.value;
    saveUser(currentValue);
    showUser(currentValue);
};

function askUser() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", submitUser);
};

function showUser(text) {
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Have a nice day ${text}!!`;
    greeting.style.fontSize = "40px";
};

function loadUser() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askUser();
    } else {
        showUser(currentUser);
    }
};

function init(){
  loadUser();
};
init();