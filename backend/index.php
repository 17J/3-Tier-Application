<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000/'); // Replace with your frontend origin
header('Access-Control-Allow-Methods: GET, POST'); // Allow GET and POST methods
header('Access-Control-Allow-Headers: Content-Type');
// Replace with your database credentials
$servername = "db";
$username = "root";
$password = "root@123";
$dbname = "guestbook";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle GET requests (fetch guestbook entries)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM entries ORDER BY timestamp DESC";
    $result = $conn->query($sql);

    $entries = [];
    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }

    echo json_encode($entries);
}

// Handle POST requests (add new entry)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $message = $data['message'];

    $sql = "INSERT INTO entries (name, message) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $name, $message);
    $stmt->execute();

    echo json_encode(['message' => 'Entry added successfully']);
}

$conn->close();
