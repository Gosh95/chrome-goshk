const clockContainer = document.querySelector(".js-clock"),
      clockDate = clockContainer.querySelector(".js-clock__date"),
      clockTitle = clockContainer.querySelector(".js-clock__time");

const date = new Date();

function showTime() {
    const date = new Date();
    const years = date.getFullYear();
    const months = date.getMonth() + 1;
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes()
    const seconds = date.getSeconds();
    clockDate.innerText = `${years}년 ${months < 10 ? `0${months}`:months}월 ${days < 10 ? `0${days}`:days}일`;

    clockTitle.innerText = `${
        hours < 10 ? `0${hours}`:hours} : ${
            minutes < 10 ? `0${minutes}`:minutes} : ${
                seconds < 10 ? `0${seconds}`:seconds}`;
}



function init() {
    showTime();
    setInterval(showTime, 1000);
}
init();