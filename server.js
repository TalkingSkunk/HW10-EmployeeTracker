const inquirer = require('inquirer');
const orm = require('./app/orm');

// SWITCHBOARDS FOR OPTIONS
async function menu() {
    const input = await inquirer.prompt([
        {
            type: 'list',
            message: 'Please choose your options.',
            name: 'options',
            choices: ['View Department\'s budget...', 'View Employees...', 'Add/Edit/Remove an Employee info.', 'Add/Edit/Remove a Department info.', 'Add/Edit/Remove a Role info.'],
        },
    ]);
    switch (input.options) {
    case 'View Department\'s budget...':
        console.log('[Viewing Department\'s budget...]');
        viewDepartments();
        break;
    case 'View Employees...':
        console.log('[Viewing Employees...]');
        viewEmployees();
        break;
    case 'Add/Edit/Remove an Employee info.':
        console.log('[Manipulate Employee info...]');
        dealWithEmployees();
        break;
    case 'Add/Edit/Remove a Department info.':
        console.log('[Manipulate Department info...]');
        dealWithDepartments();
        break;
    case 'Add/Edit/Remove a Role info.':
        console.log('[Manipulate Role info...]');
        dealWithRoles();
        break;
    default:
        menu();
        break;
    }
}
menu();

async function viewDepartments() {
    const emptyArray = [];
    const departmentList = await orm.select('depart_name', 'departments');
    departmentList.forEach(item=>{
        emptyArray.push(item.depart_name)
    });
    const input = await inquirer.prompt([
        {
            type: 'list',
            message: 'Please choose your options.',
            name: 'options',
            choices: emptyArray,
        },
    ]);
    const id = await orm.select('id', 'departments', `WHERE depart_name='${input.options}'`);
    const totalSalary = await orm.select('SUM(salary) AS totalSalary', 'members', `WHERE depart_id=${id[0].id}`)

    console.log (`\n\n Total salary of ${input.options}:`, `$${totalSalary[0].totalSalary} \n\n`);
    menu();
}

async function viewEmployees() {
    const input = await inquirer.prompt([
        {
            type: 'list',
            message: 'View Employees...',
            name: 'options',
            choices: ['...by First Name.', '...by Last Name.', '...by Role.', '...by Manager.', '...by Department.'],
        },
    ]);
    switch (input.options) {
    case '...by First Name.':
        async function firstname () {
            const emptyArray = [];
            const employeeList = await orm.select('*', 'members', 'ORDER BY firstname ASC');
            employeeList.forEach(item=>{
                let employee={
                    fullname:`${item.firstname} ${item.lastname}`
                }
                emptyArray.push(employee.fullname);
            });
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View Employee...',
                    name: 'options',
                    choices: emptyArray,
                },
            ]);
            const employeeFirstname = input.options.split(' ')[0];
            console.log(`This is the info on this Employee: ${employeeFirstname}...`)
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE firstname='${employeeFirstname}'`);
            console.table(employee);
            menu();
        }
        firstname();
        break;
    case '...by Last Name.':
        async function lastname() {
            const emptyArray = [];
            const employeeList = await orm.select('*', 'members', 'ORDER BY lastname ASC');
            employeeList.forEach(item=>{
                let employee={
                    fullname:`${item.lastname}, ${item.firstname}`
                }
                emptyArray.push(employee.fullname);
            });
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View Employee...',
                    name: 'options',
                    choices: emptyArray,
                },
            ]);
            const employeeLastname = input.options.split(', ')[0];
            console.log(`This is the info on this Employee: ${employeeLastname}...`)
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE lastname='${employeeLastname}'`);
            console.table(employee);
            menu();
        }
        lastname();
        break;
    case '...by Role.':
        async function role() {
            const emptyArray = [];
            const employeeList = await orm.select('*', 'roles', 'ORDER BY title ASC');
            employeeList.forEach(item=>{
                let roles={
                    title: `${item.title}`
                }
                emptyArray.push(roles.title);
            });
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View by Role...',
                    name: 'options',
                    choices: emptyArray,
                },
            ]);
            const roleTitle = input.options;
            console.log(`This is the list of Employees with the Role: ${roleTitle}...`)
            const roleID = await orm.select('id', 'roles', `WHERE title='${roleTitle}'`)
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE role_id='${roleID[0].id}'`);
            console.table(employee);
            menu();
        }
        role();
        break;
    case '...by Manager.':
        async function manager() {
            const emptyArray = [];
            const managerList = await orm.select('*', 'managers', 'ORDER BY lastname ASC');
            managerList.forEach(item=>{
                let managers={
                    fullname:`${item.lastname}, ${item.firstname}`
                }
                emptyArray.push(managers.fullname);
            });
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View by Manager...',
                    name: 'options',
                    choices: emptyArray,
                },
            ]);
            const manager = input.options.split(', ')[0];
            console.log(`This is the list of Employees by Manager: ${manager}...`)
            const id = await orm.select('id', 'managers', `WHERE lastname='${manager}'`)
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE manager_id='${id[0].id}'`);
            console.table(employee);
            menu();
        }
        manager();
        break;
    case '...by Department.':
        async function department() {
            const emptyArray = [];
            const departments = await orm.select('*', 'departments', 'ORDER BY depart_name ASC');
            departments.forEach(item=>{
                let departments={
                    departName:`${item.depart_name}`
                }
                emptyArray.push(departments.departName);
            });
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View by Department...',
                    name: 'options',
                    choices: emptyArray,
                },
            ]);
            const department = input.options;
            console.log(`This is the list of Employees by Department: ${department}...`)
            const id = await orm.select('id', 'departments', `WHERE depart_name='${department}'`)
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE depart_id='${id[0].id}'`);
            console.table(employee);
            menu();
        }
        department();
        break;
    default:
        menu();
        break;
    }
}

async function dealWithEmployees() {
    const emptyArrayDepartments = [];
    const departments = await orm.select('depart_name', 'departments', 'ORDER BY depart_name ASC');
    departments.forEach(item=>{
        let department={
            name:`${item.depart_name}`
        }
        emptyArrayDepartments.push(department.name);
    });
    const input = await inquirer.prompt([
        {
            type: 'list',
            message: 'Choose your options.',
            name: 'options',
            choices: ['Add an Employee.', 'Edit an Employee.', 'Terminate an Employee.'],
        },
    ]);
    switch (input.options) {
    case 'Add an Employee.':
        async function addEmployee () {
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the Employee\'s Department?',
                    name: 'department',
                    choices: emptyArrayDepartments,
                },
            ]);
            const departmentID = await orm.select('id', 'departments', `WHERE depart_name='${input.department}'`);
            const emptyArrayManagers = [];
            const managers = await orm.select('lastname, firstname', 'managers', `WHERE depart_id='${departmentID[0].id}' ORDER BY lastname ASC`);
            managers.forEach(item=>{
                let manager={
                    fullname:`${item.lastname}, ${item.firstname}`
                }
                emptyArrayManagers.push(manager.fullname);
            });
            const emptyArrayRoles = [];
            const roles = await orm.select('title', 'roles', `WHERE depart_id='${departmentID[0].id}' ORDER BY title ASC`);
            roles.forEach(item=>{
                let role={
                    title:`${item.title}`
                }
                emptyArrayRoles.push(role.title);
            });
            const input2 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the Employee\'s Manager?',
                    name: 'manager',
                    choices: emptyArrayManagers,
                },
                {
                    type: 'list',
                    message: 'What is the Employee\'s Role?',
                    name: 'role',
                    choices: emptyArrayRoles,
                },
                {
                    type: 'input',
                    message: 'What is the Employee\'s first name?',
                    name: 'firstname',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give the name to continue.'
                        }
                    },
                },
                {
                    type: 'input',
                    message: 'What is the Employee\'s last name?',
                    name: 'lastname',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give the name to continue.'
                        }
                    },
                },
                {
                    type: 'input',
                    message: 'What is the Employee\'s salary? Enter only the number without the dollar sign.',
                    name: 'salary',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give a salary amount to continue.'
                        }
                    },
                },
            ]);
            const roleID = await orm.select('id', 'roles', `WHERE title='${input2.role}'`);
            const managerLastname = input2.manager.split(', ')[0];
            const managerID = await orm.select('id', 'managers', `WHERE lastname='${managerLastname}'`);
            console.log(`[The Employee's info is entered into the database]: [First Name, Last Name, Salary, Role, Manager, Department]: [${input2.firstname}, ${input2.lastname}, $ ${input2.salary}, ${input2.role}, ${input2.manager}, ${input.department}]`);
            await orm.insert ('members', 'firstname, lastname, salary, role_id, manager_id, depart_id', `'${input2.firstname}', '${input2.lastname}', '${input2.salary}', ${roleID[0].id}, ${managerID[0].id}, ${departmentID[0].id}`);
        }
        addEmployee();
        break;
    // case 'Edit an Employee.':
    //     async function firstname () {
    //         const emptyArray = [];
    //         const employeeList = await orm.select('*', 'members', 'ORDER BY firstname ASC');
    //         employeeList.forEach(item=>{
    //             let employee={
    //                 fullname:`${item.firstname} ${item.lastname}`
    //             }
    //             emptyArray.push(employee.fullname);
    //         });
    //         const input = await inquirer.prompt([
    //             {
    //                 type: 'list',
    //                 message: 'View Employee...',
    //                 name: 'options',
    //                 choices: emptyArray,
    //             },
    //         ]);
    //         const employeeFirstname = input.options.split(' ')[0];
    //         console.log(`This is the info on this Employee: ${employeeFirstname}...`)
    //         const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE firstname='${employeeFirstname}'`);
    //         console.table(employee);
    //         menu();
    //     }
    //     firstname();
    //     break;
    // case 'Terminate an Employee.':
    //     async function firstname () {
    //         const emptyArray = [];
    //         const employeeList = await orm.select('*', 'members', 'ORDER BY firstname ASC');
    //         employeeList.forEach(item=>{
    //             let employee={
    //                 fullname:`${item.firstname} ${item.lastname}`
    //             }
    //             emptyArray.push(employee.fullname);
    //         });
    //         const input = await inquirer.prompt([
    //             {
    //                 type: 'list',
    //                 message: 'View Employee...',
    //                 name: 'options',
    //                 choices: emptyArray,
    //             },
    //         ]);
    //         const employeeFirstname = input.options.split(' ')[0];
    //         console.log(`This is the info on this Employee: ${employeeFirstname}...`)
    //         const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE firstname='${employeeFirstname}'`);
    //         console.table(employee);
    //         menu();
    //     }
    //     firstname();
    //     break;
    default:
        menu();
        break;
    }
}

// async function dealWithDepartments() {

// }

// async function dealWithRoles(){

// }