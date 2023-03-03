USE employee_db;

insert into department(name) value ('SALES');
insert into department(name) value ('ENGINEERING');
insert into department(name) value ('LEGAL');
insert into department(name) value ('FINANCE');

insert into role (title, salary,department_id) value ('SALES LEAD', 100000,1);
insert into role (title, salary,department_id) value ('ACCOUNTANT', 120000,4);
insert into role (title, salary,department_id) value ('LAWYER', 90000,3);
insert into role (title, salary,department_id) value ('LEAD ENGINEER', 150000,2);


insert into employee (first_name, last_name,role_id,manager_id) value ('Kevin','Wright', 1, null);
insert into employee (first_name, last_name,role_id,manager_id) value ('Larry','Woods', 2, 1);
insert into employee (first_name, last_name,role_id,manager_id) value ('Tamara','Mitchell', 3, null);
insert into employee (first_name, last_name,role_id,manager_id) value ('Teresa','Ware', 4, 3);