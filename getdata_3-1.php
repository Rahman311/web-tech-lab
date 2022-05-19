<?php
$kol = $_POST['kol'];
$tek = $_POST['tek'];
$link = mysqli_connect('localhost', 'f0673693_rahman', 'TsR8bvxh', 'f0673693_rahman');
$query = 'SELECT img, zag, opisanie FROM novosti LIMIT '.$tek.', '.$kol;
mysqli_query($link, 'SET NAMES utf8mb4'); 
$result = mysqli_query($link, $query);
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>