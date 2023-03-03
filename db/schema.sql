DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30)
);



CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary decimal(6),
department_id int,
FOREIGN KEY (department_id) references department(id)
);




CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id int,
FOREIGN KEY (role_id) references role(id),
foreign key (manager_id) references employee(id)
);

