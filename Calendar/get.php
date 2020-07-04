<?php
    require_once "db.php";
    $date = $_POST['date'];
    $query = "SELECT * FROM `events` WHERE `date` = '$date'";
    if ($result = $mysqli->query($query)) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }