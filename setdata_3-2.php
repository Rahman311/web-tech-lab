<?php
$name = $_POST['name'];
$email = $_POST['email'];
$otziv = $_POST['otziv'];
$link = mysqli_connect('localhost', 'f0673693_rahman', 'TsR8bvxh', 'f0673693_rahman');
$query = "INSERT INTO `otzivi` (`id`, `name`, `email`, `otziv`) VALUES (NULL, '".$name."', '".$email."', '".$otziv."')";
mysqli_query($link, 'SET NAMES utf8mb4'); 
$result = mysqli_query($link, $query);
echo "Отзыв принят, всего хорошего!";
?>