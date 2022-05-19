<?php
$link = mysqli_connect('localhost', 'f0673693_rahman', 'TsR8bvxh', 'f0673693_rahman');
$query = 'SELECT name, email, otziv FROM otzivi';
mysqli_query($link, 'SET NAMES utf8mb4'); 
$result = mysqli_query($link, $query);
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>