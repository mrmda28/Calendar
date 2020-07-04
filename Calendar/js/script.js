const daysE = document.querySelector(".days"),
      eventList = document.querySelector(".eventList"),
      eventT = document.querySelector(".eventTitle"),
      eventD = document.querySelector(".eventText");
let dt = new Date();
let y, m, d, dayDate, status;

function renderDate() {

    // Calendar
    dt.setUTCDate(1);
    let day = dt.getUTCDay();
    let today = new Date();
    let endDate = new Date(
        dt.getUTCFullYear(),
        dt.getUTCMonth() + 1,
        0
    ).getUTCDate() + 1;

let prevDate = new Date(
    dt.getUTCFullYear(),
    dt.getUTCMonth(),
    0
).getUTCDate();
let months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]
let prevmn = dt.getUTCMonth()-1,
    nextmn = dt.getUTCMonth()+1;
document.getElementById("month").innerHTML = months[dt.getUTCMonth()];
document.getElementById("year").innerHTML = dt.getUTCFullYear();
if (prevmn == -1) {
    prevmn = 11;
}
document.getElementById("prevm").innerHTML = months[prevmn];
if (nextmn == 12) {
    nextmn = 0;
}
document.getElementById("nextm").innerHTML = months[nextmn];

let cells = "";
for (x = day-2; x >= 0; x--) {
    cells += "<div class='prev_date' class='day' id='day'>" + (prevDate - x + 1) + "</div>";
}

for (i = 1; i <= endDate; i++) {
    y = dt.getUTCFullYear();
    m = dt.getUTCMonth()+1;
    d = i;

    dayDate = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);


    if (i == today.getUTCDate() && dt.getUTCMonth() == today.getUTCMonth())
        cells += "<div class='today' data-day='" + dayDate + "' id='day" + i + "' onclick='getDateEvents(id)'>" + i + "</div>";
    else
        cells += "<div id='day" + i + "' data-day='" + dayDate + "' onclick='getDateEvents(id)'>" + i + "</div>";
}
document.getElementsByClassName("days")[0].innerHTML = cells;

dateToday();

daysE.addEventListener("click", function(e){
    let ev = document.getElementById("eventss");
    ev.style.display = "block";

    const dateE = event.target.dataset.day;

    let form = new FormData();
    form.append("date", dateE);

    fetch("../Calendar/get.php", {
        method: "POST",
        body: form
    })
    .then(res => result = res.json())
    .then(result => renderEvent(result));
});

function renderEvent(event){
    
    eventList.innerHTML = '';
    event.forEach(element => {
        const block = document.createElement("div");

        block.innerHTML = `<img class="imgE" src="img/${element.type}.svg"><h4>${element.title}</h4><h5>${element.text}</h5><hr>`;
        eventList.append(block);
    });
};
};

function dateToday() {
    y = dt.getUTCFullYear();
    m = dt.getUTCMonth()+1;
    d = document.getElementsByClassName("today")[0].innerHTML

    dayDateToday = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
};

function getDateEvents(id) {
    y = dt.getUTCFullYear();
    m = dt.getUTCMonth()+1;
    d = document.getElementById(id).innerHTML;

    dayDate = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    document.getElementById("date-events").innerHTML = d + "." + m + "." + y;
};

function moveDate(button) {
    if (button == "prev") {
        dt.setMonth(dt.getMonth() - 1);
    } else if (button == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
};