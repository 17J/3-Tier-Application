CREATE DATABASE IF NOT EXISTS guestbook;
CREATE USER 'root'@'db' IDENTIFIED BY 'root@123';
GRANT ALL PRIVILEGES ON guestbook.* TO 'root'@'db';

USE guestbook;

CREATE TABLE IF NOT EXISTS guestbook.entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
