let dt = new Date();
let y, m, d;
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    database: "calendar",
    password: "root"
});

conn.connect(err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Connection successful');
    }
});

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
        if (i == today.getUTCDate() && dt.getUTCMonth() == today.getUTCMonth())
            cells += "<div class='today' id='day" + i + "' onclick='getDateEvents(id)'>" + i + "</div>";
        else
            cells += "<div id='day" + i + "' onclick='getDateEvents(id)'>" + i + "</div>";
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;
// for для рамки

    let eventDate = document.getElementsByClassName("today")[0].innerHTML + "." + (dt.getUTCMonth()+1 + "." + dt.getUTCFullYear());
    document.getElementById("date-events").innerHTML = eventDate; //Временно

    let title = `SELECT title FROM events WHERE year=${y} and month=${m} and day=${d}`;
    let description = `SELECT description FROM events WHERE year=${y} and month=${m} and day=${d}`;

    conn.query(title, (err, result, field) => {
        //console.log(err);
        //console.log(result);
        //console.log(field);
        document.getElementById("eventTitle").innerHTML = result;
    });

    conn.query(description, (err, result, field) => {
        //console.log(err);
        //console.log(result);
        //console.log(field);
        document.getElementById("eventDescr").innerHTML = result;
    });
}

function getDateEvents(id) {
    y = dt.getUTCFullYear();
    m = dt.getUTCMonth()+1;
    d = document.getElementById(id).innerHTML
    document.getElementById("date-events").innerHTML = d + "." + (m + "." + y);
}

function moveDate(button) {
    if (button == "prev") {
        dt.setMonth(dt.getMonth() - 1);
    } else if (button == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
}

conn.end(err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Close successful');
    }
});