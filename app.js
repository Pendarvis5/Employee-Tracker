const inquirer = require('inquirer')
const mysql = require('mysql2')
const table = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Officer0808!',
    database: 'employee_db'

})

const employeeTracker = async () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What do you want to do?',
                name: 'options',
                choice: [
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "View All Departments",
                    "View Role",
                    "View All Employees",
                    "Update Employee Role"
                ]

            },
            {
                type: 'input',
                message: 'What is the name of your department',
                name: 'addDepartment',
                when: (answers) => {
                    if (answers.option == 'Add Department') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the title of the role',
                name: 'addRole',
                when: (answers) => {
                    if (answers.option == 'Add Role') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the salary of the role',
                name: 'roleSalary',
                when: (answers) => {
                    if (answers.option == 'Add Role') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'list',
                message: 'What is the department of the role',
                name: 'newRoleDepartmentId',
                choices: async (answers) => {
                    const [rows, field] = await connection.promise().query('SELECT name FROM department')
                },
                when: (answers) => {
                    if (answers.option == 'Add Role') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the first name of the employee',
                name: 'newEmployeeFirst',
                when: (answers) => {
                    if (answers.option == 'Add Employee') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the last name of the employee',
                name: 'newEmployeeLast',
                when: (answers) => {
                    if (answers.option == 'Add Employee') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'list',
                message: 'What is the role of the employee',
                name: 'newRoleId',
                choices: async (answers) => {
                    const [rows, field] = await connection.promise().query('SELECT title FROM role');
                    const roleArray = []
                    rows.forEach(element => {
                        return roleArray.push(element.title)
                    });
                    return roleArray;
                },
                when: (answers) => {
                    if (answers.option == 'Add Employee') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'list',
                message: 'Who is the manager of the employee',
                name: 'newEmployeeManager',
                choices: async (answers) => {
                    let queryOne =`SELECT concat(first_name,' ', last_name ) AS manager FROM employee`
                    let queryTwo =`SELECT concat(first_name,' ', last_name ) AS manager FROM employee WHERE manger_id is NULL`
                    const [rows, field] = await connection.promise().query(queryOne);
                    const managerArray = []
                    rows.forEach(element => {
                        return managerArray.push(element.title)
                    });
                    return managerArray;
                },
                when: (answers) => {
                    if (answers.option == 'Add Employee') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'list',
                message: 'Which employee to update',
                name: 'updateRoleEmployee',
                choices: async (answers) => {
                    let queryOne =`SELECT concat(first_name,' ', last_name ) AS currentEmployee FROM employee`
                    const [rows, field] = await connection.promise().query(queryOne);
                    const employeeArray = []
                    rows.forEach(element => {
                        return employeeArray.push(element.title)
                    });
                    return employeeArray;
                },
                when: (answers) => {
                    if (answers.option == 'Update Employee Role') {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: 'list',
                message: 'What is the new employee role?',
                name: 'updateRoleId',
                choices: async (answers) => {
                    let queryOne =`SELECT title FROM role`
                    const [rows, field] = await connection.promise().query(queryOne);
                    const roleArray = []
                    rows.forEach(element => {
                        return roleArray.push(element.title)
                    });
                    return roleArray;
                },
                when: (answers) => {
                    if (answers.option == 'Update Employee Role') {
                        return true
                    } else {
                        return false
                    }
                }
            }

        ])
        .then((answers) => {
            switch(answers.options){
                case "Add Department":
                    connection.query(`INSERT INTO department (name) values ('${answers.addDepartment}')`, function(err, results, fields) {
                            restart()
                    } )
                break;

                case "Add Role":
                    connection.query(`INSERT INTO department (name) values ('${answers.addDepartment}')`, function(err, results, fields) {
                        restart();
                    } )
                break;

               default:
                    break;
            }
        
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

function restart() {
    employeeTracker()
}

employeeTracker()