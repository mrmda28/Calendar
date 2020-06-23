let dt = new Date();

function renderDate() {
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
document.getElementById("month").innerHTML = months[dt.getUTCMonth()];
document.getElementById("year").innerHTML = dt.getUTCFullYear();

let cells = "";
for (x = day-2; x >= 0; x--) {
    cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
}

for (i = 1; i <= endDate; i++) {
    if (i == today.getUTCDate() && dt.getUTCMonth() == today.getUTCMonth())
        cells += "<div class='today'>" + i + "</div>";
    else
        cells += "<div>" + i + "</div>";
}
document.getElementsByClassName("days")[0].innerHTML = cells;
}

function moveDate(button) {
    if (button == "prev") {
        dt.setMonth(dt.getMonth() - 1);
    } else if (button == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
}