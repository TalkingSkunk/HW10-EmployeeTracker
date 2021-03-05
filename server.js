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
            const employeeList = await orm.select('*', 'members', `ORDER BY firstname ASC`);
            employeeList.forEach(item=>{
                let employee={
                    fullname:`${item.firstname} ${item.lastname}`,
                    firstname: `${item.firstname}`
                }
                emptyArray.push(employee.fullname);
            });
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View Employees...',
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
            const emptyArray2 = [];
            const employeeList2 = await orm.select('*', 'members', `ORDER BY lastname ASC`);
            employeeList2.forEach(item=>{
                let employee={
                    fullname:`${item.lastname}, ${item.firstname}`,
                    lastname: `${item.lastname}`
                }
                emptyArray2.push(employee.fullname);
            });
            const input2 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'View Employees...',
                    name: 'options',
                    choices: emptyArray2,
                },
            ]);
            const employeeLastname = input2.options.split(', ')[0];
            console.log(`This is the info on this Employee: ${employeeLastname}...`)
            const employee2 = await orm.select('firstname, lastname, salary', 'members', `WHERE lastname='${employeeLastname}'`);
            console.table(employee2);
            menu();
        };
        lastname();
        break;
    default:
        menu();
        break;
    }
}
//     const employee = await orm.select('*', 'members', `WHERE firstname='${input.options}'`);
//     const totalSalary = await orm.select('SUM(salary) AS totalSalary', 'members', `WHERE depart_id=${id[0].id}`)

//     console.log (`\n\n Total salary of ${input.options}:`, `$${totalSalary[0].totalSalary} \n\n`);
//     break;
// case '...by Last Name':
//     viewEmployees();
//     break;
// case '...by Role.':
//     dealWithEmployees();
//     break;
// case '...by Manager.':
//     dealWithDepartments();
//     break;
// case '...by Department.':
//     dealWithRoles();
//     break;
// default:
//     menu();
//     break;
// }