PHP
<!DOCTYPE html>
<html>
<head>
    <title>Guestbook</title>
</head>
<body>
    <h1>Guestbook</h1>

    <?php
    $servername = getenv('MYSQL_HOST');
    $username = getenv('MYSQL_USER');
    $password = getenv('MYSQL_PASSWORD');
    $dbname = getenv('MYSQL_NAME'); // Replace with your database configuration file

    // Connect to the database
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve guestbook entries
    $sql = "SELECT * FROM entries ORDER BY timestamp DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<p>" . $row["name"] . ": " . $row["message"] . "</p>";
        }
    } else {
        echo "No entries found";
    }

    $conn->close();
    ?>

    <form method="post" action="index.php">
        <label for="name">Name:</label>
        <input type="text" name="name" required><br>
        <label for="message">Message:</label>
        <textarea name="message" required></textarea><br>
        <input type="submit" value="Submit">
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = $_POST['name'];
        $message = $_POST['message'];

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO entries (name, message) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
        } else {
    // Bind parameters and execute the statement
            $stmt->bind_param("ss", $name, $message);
            $stmt->execute();
    // ...
        }

        echo "<p>Thank you for your message!</p>";

        $conn->close();
    }
    ?>
</body>
</html>
