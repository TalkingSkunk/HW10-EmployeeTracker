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
    const departmentList = await orm.select('depart_name', 'departments', 'ORDER BY depart_name ASC');
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

    console.log (`\n [Total salary of ${input.options}] $ ${totalSalary[0].totalSalary} \n`);
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
            console.log ('\n [Adding an Employee...] \n');
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
            const managers = await orm.select('*', 'managers', `WHERE depart_id='${departmentID[0].id}' ORDER BY lastname ASC`);
            managers.forEach(item=>{
                let manager={
                    fullinfo:`[ID]: ${item.id}, [Name]: ${item.lastname}, ${item.firstname}`
                }
                emptyArrayManagers.push(manager.fullinfo);
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
                    message: 'Who is the Employee\'s Manager?',
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

            const managerID = input2.manager.split(', ')[0].substr(6);

            console.log(`\n [The Employee's info is entered into the database]: [First Name, Last Name, Salary, Role, Manager, Department]: [${input2.firstname}, ${input2.lastname}, $ ${input2.salary}, ${input2.role}, ${input2.manager}, ${input.department}] \n`);

            await orm.insert ('members', 'firstname, lastname, salary, role_id, manager_id, depart_id', `'${input2.firstname}', '${input2.lastname}', '${input2.salary}', ${roleID[0].id}, ${managerID}, ${departmentID[0].id}`);
            menu();
        }
        addEmployee();
        break;
    case 'Edit an Employee.':
        async function editEmployee () {
            console.log(' \n [Identifying the Employee\'s Location...] \n');
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
            const managers = await orm.select('*', 'managers', `WHERE depart_id='${departmentID[0].id}' ORDER BY lastname ASC`);
            managers.forEach(item=>{
                let manager={
                    fullinfo:`[ID]: ${item.id}, [Name]: ${item.lastname}, ${item.firstname}`
                }
                emptyArrayManagers.push(manager.fullinfo);
            });
            const input2 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Who is the Employee\'s Manager?',
                    name: 'manager',
                    choices: emptyArrayManagers,
                },
            ]);
            const managerID = input2.manager.split(', ')[0].substr(6);
            const emptyArrayEmployees = [];
            const employees = await orm.select('*', 'members', `WHERE manager_id='${managerID}' ORDER BY lastname ASC`);
            employees.forEach(item=>{
                let employee={
                    fullname: `[ID]: ${item.id}, [Name]: ${item.lastname}, ${item.firstname}`
                }
                emptyArrayEmployees.push(employee.fullname);
            });
            const input3 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose the Employee to update.',
                    name: 'employee',
                    choices: emptyArrayEmployees,
                },
            ]);
            const employeeID = input3.employee.split(', ')[0].substr(6);

            console.log(`\n Updating Employee: [ ${input3.employee} ] \n`)

            const input4 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What would you like to update?',
                    name: 'options',
                    choices: ['First name', 'Last name', 'Salary', 'Department/Manager/Role'],
                },
            ]);
            switch (input4.options) {
            case 'First name':
                const input4a = await inquirer.prompt([
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
                ]);
                await orm.update('members', `firstname='${input4a.firstname}'`, `id='${employeeID}'`);
                console.log(`\n [Newly Updated First Name] ${input4a.firstname} \n`);
                menu();
                break;
            case 'Last name':
                const input4b = await inquirer.prompt([
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
                ]);
                await orm.update('members', `lastname='${input4b.lastname}'`, `id='${employeeID}'`);
                console.log(`\n [Newly Updated Info] Last name: ${input4b.lastname} \n`);
                menu();
                break;
            case 'Salary':
                const input4c = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the Employee\'s salary? Include only the numbers, without the dollar sign.',
                        name: 'salary',
                        validate: (value) => {
                            if (value) {
                                return true
                            } else {
                                return 'You need to give the salary to continue.'
                            }
                        },
                    },
                ]);
                await orm.update('members', `salary='${input4c.salary}'`, `id='${employeeID}'`);
                console.log(`\n [Newly Updated Info] Salary: ${input4c.salary} \n`);
                menu();
                break;
            case 'Department/Manager/Role':
                const input4di = await inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What is the Employee\'s updated Department?',
                        name: 'department',
                        choices: emptyArrayDepartments,
                    },
                ]);
                const departmentID = await orm.select('id', 'departments', `WHERE depart_name='${input4di.department}'`);

                const emptyArrayManagers = [];
                const managers = await orm.select('*', 'managers', `WHERE depart_id='${departmentID[0].id}' ORDER BY lastname ASC`);
                managers.forEach(item=>{
                    let manager={
                        fullinfo:`[ID]: ${item.id}, [Name]: ${item.lastname}, ${item.firstname}`
                    }
                    emptyArrayManagers.push(manager.fullinfo);
                });

                const emptyArrayRoles = [];
                const roles = await orm.select('title', 'roles', `WHERE depart_id='${departmentID[0].id}' ORDER BY title ASC`);
                roles.forEach(item=>{
                    let role={
                        title:`${item.title}`
                    }
                    emptyArrayRoles.push(role.title);
                });

                const input4dii = await inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What is the Employee\'s updated Manager?',
                        name: 'manager',
                        choices: emptyArrayManagers,
                    },
                    {
                        type: 'list',
                        message: 'What is the Employee\'s updated Role?',
                        name: 'role',
                        choices: emptyArrayRoles,
                    },
                ]);
                const managerID = input4dii.manager.split(', ')[0].substr(6);
                const roleID = await orm.select('id', 'roles', `WHERE title='${input4dii.role}'`);

                await orm.update('members', `role_id=${roleID[0].id}, manager_id=${managerID}, depart_id=${departmentID[0].id}`, `id='${employeeID}'`);

                console.log(`\n [Newly Updated Info] Department: [ ${input4di.department} ], Manager: [ ${input4dii.manager} ], Role: [ ${input4dii.role} ] \n`);

                menu();
                break;
            default:
                menu();
                break;
            }
        }
        editEmployee();
        break;
    case 'Terminate an Employee.':
        async function terminateEmployee(){
            console.log ('\n [Identifying the Employee...] \n')
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
            const managers = await orm.select('*', 'managers', `WHERE depart_id='${departmentID[0].id}' ORDER BY lastname ASC`);
            managers.forEach(item=>{
                let manager={
                    fullinfo:`[ID]: ${item.id}, [Name]: ${item.lastname}, ${item.firstname}`
                }
                emptyArrayManagers.push(manager.fullinfo);
            });
            const input2 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Who is the Employee\'s Manager?',
                    name: 'manager',
                    choices: emptyArrayManagers,
                },
            ]);
            const managerID = input2.manager.split(', ')[0].substr(6);
            const emptyArrayEmployees = [];
            const employees = await orm.select('*', 'members', `WHERE manager_id='${managerID}' ORDER BY lastname ASC`);
            employees.forEach(item=>{
                let employee={
                    fullname: `[ID]: ${item.id}, [Name]: ${item.lastname}, ${item.firstname}`
                }
                emptyArrayEmployees.push(employee.fullname);
            });
            const input3 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose the Employee to terminate.',
                    name: 'employee',
                    choices: emptyArrayEmployees,
                },
            ]);
            console.log(`\n Terminated: [ ${input3.employee} ] \n`)
            const employeeID = input3.employee.split(', ')[0].substr(6);
            await orm.delete( 'members', `id=${employeeID}` );
            menu();
        }
        terminateEmployee();
        break;
    default:
        menu();
        break;
    }
}
async function dealWithDepartments() {
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
            choices: ['Add a Department.', 'Update a Department\'s Info.', 'Remove a Department.'],
        },
    ]);
    switch (input.options) {
    case 'Add a Department.':
        async function addDepartment (){
            console.log ('\n [Adding a Department...] \n');
            const input = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the Department\'s name?',
                    name: 'department',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give the name to continue.'
                        }
                    },
                },
            ]);
            await orm.insert('departments', 'depart_name', `'${input.department}'`);
            console.log(`\n [The new Department is entered into the database]: ${input.department} \n`);
            menu();
        }
        addDepartment();
        break;
    case 'Update a Department\'s Info.':
        async function editDepartment (){
            console.log ('\n [Updating a Department...] \n');
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the Department?',
                    name: 'departmentOld',
                    choices: emptyArrayDepartments,
                },
                {
                    type: 'input',
                    message: 'What is the Department\'s new name?',
                    name: 'departmentNew',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give the name to continue.'
                        }
                    },
                },
            ]);
            await orm.update('departments', `depart_name='${input.departmentNew}'`, `depart_name='${input.departmentOld}'`);
            console.log(`\n [ ${input.departmentOld} ]'s new name is: [ ${input.departmentNew} ] \n`);
            menu();
        }
        editDepartment();
        break;
    case 'Remove a Department.':
        async function terminateDepartment (){
            console.log ('\n [Removing a Department...] \n');
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the Department?',
                    name: 'department',
                    choices: emptyArrayDepartments,
                },
            ]);
            const departmentID = await orm.select( '*', 'departments', `WHERE depart_name='${input.department}'` )
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE depart_id=${departmentID[0].id}`);

            if( employee[0] ){
                console.log(`\n The Department [ ${input.department} ] still has Employees. Please relocate them prior to deleting the Department.`);
                console.table(employee);
                menu();
            } else {
                await orm.delete( 'departments', `depart_name='${input.department}'` );
                console.log(`\n This Department is now removed: [ ${input.department} ] \n`);
                menu();
            }
        }
        terminateDepartment();
        break;
    default:
        menu();
        break;
    }
}

async function dealWithRoles(){
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
            choices: ['Add a Role.', 'Update a Role\'s Info.', 'Remove a Role.'],
        },
    ]);
    switch (input.options) {
    case 'Add a Role.':
        async function addRole (){
            console.log ('\n [Adding a Role...] \n');
            const input = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the Role\'s name?',
                    name: 'role',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give the name to continue.'
                        }
                    },
                },
                {
                    type: 'list',
                    message: 'To what Department does this Role belong?',
                    name: 'department',
                    choices: emptyArrayDepartments,
                },
            ]);

            const departmentID = await orm.select('id', 'departments', `WHERE depart_name='${input.department}'`);

            await orm.insert('roles', 'title, depart_id', `'${input.role}', ${departmentID[0].id}`);

            console.log(`\n The new Role is entered into Department [ ${input.department} ]: ${input.role} \n`);
            menu();
        }
        addRole();
        break;
    case 'Update a Role\'s Info.':
        async function editRole() {
            console.log ('\n [Locating the Role...] \n');
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the Department the Role is located in?',
                    name: 'department',
                    choices: emptyArrayDepartments,
                },
            ]);
            const departmentID = await orm.select('id', 'departments', `WHERE depart_name='${input.department}'`);
            const emptyArrayRoles = [];
            const roles = await orm.select('*', 'roles', `WHERE depart_id='${departmentID[0].id}' ORDER BY title ASC`);
            roles.forEach(item=>{
                let role={
                    title:`${item.title}`,
                }
                emptyArrayRoles.push(role.title);
            });

            const input2 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the Role?',
                    name: 'roleOld',
                    choices: emptyArrayRoles,
                },
                {
                    type: 'input',
                    message: 'What is the Role\'s new name?',
                    name: 'roleNew',
                    validate: (value) => {
                        if (value) {
                            return true
                        } else {
                            return 'You need to give the name to continue.'
                        }
                    },
                },
            ]);

            console.log(`\n Updating Role: [ ${input2.roleOld} ] \n`);

            await orm.update('roles', `title='${input2.roleNew}'`, `title='${input2.roleOld}'`);
            console.log(`\n [ ${input2.roleOld} ]'s new name is: [ ${input2.roleNew} ] \n`);
            menu();
        }
        editRole();
        break;
    case 'Remove a Role.':
        async function removeRole() {
            console.log ('\n [Deleting a Role...] \n');
            const input = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'In which Department is the Role located?',
                    name: 'department',
                    choices: emptyArrayDepartments,
                },
            ]);
            const departmentID = await orm.select( '*', 'departments', `WHERE depart_name='${input.department}'`);
            const emptyArrayRoles = [];
            const roles = await orm.select('*', 'roles', `WHERE depart_id='${departmentID[0].id}' ORDER BY title ASC`);
            roles.forEach(item=>{
                let role={
                    title:`${item.title}`,
                }
                emptyArrayRoles.push(role.title);
            });

            const input2 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What Role would you like to delete?',
                    name: 'role',
                    choices: emptyArrayRoles,
                },
            ]);
            const roleID = await orm.select( '*', 'roles', `WHERE title='${input2.role}'`);
            const employee = await orm.select('firstname, lastname, salary', 'members', `WHERE role_id=${roleID[0].id}`);

            if( employee[0] ){
                console.log(`\n The Role [ ${input2.role} ] still has Employees. Please relocate them prior to deleting the Role.`);
                console.table(employee);
                menu();
            } else {
                await orm.delete( 'roles', `title='${input2.role}'` );
                console.log(`\n This Role is now deleted: [ ${input2.role} ] \n`);
                menu();
            }
        }
        removeRole();
        break;
    default:
        menu();
        break;
    }
}