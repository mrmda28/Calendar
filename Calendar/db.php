<?php
$mysqli = new mysqli("localhost", "root", "root", "calendar", "8889");

if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
?>