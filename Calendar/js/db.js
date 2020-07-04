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

conn.end(err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Close successful');
    }
});