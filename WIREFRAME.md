# Goal : Create nagivational inquirer prompts that draw out the existing database. Cleanest and shortest code only.

## Create a navigation:
'View Department\'s budget...',  
'View Employees...',  
'Add/Edit/Remove an Employee info.',  
'Add/Edit/Remove a Department info.',  
'Add/Edit/Remove a Role info.'  

## 'View Department\'s budget...', 
Create further branches based on departments.
Each department finally shows the total budget each.

## 'View Employees...',  
Create further branches '...by Manager.', '...by Department.', '...by Role.'
Each branch shows the lists of names to choose from.
Each name returns the employees with matching name.

## 'Add/Edit/Remove an Employee info.',
Create further branches, 'add', 'edit', 'remove'.
ADD branch takes you to prompts for new inputs.
EDIT branch shows the list of names to choose from, and shows you the column names to edit. Then you type in new input.
REMOVE branch shows the list of names to choose from, and deletes the entry from database.

## 'Add/Edit/Remove a Department info.',  
Create further branches, ADD, EDIT, REMOVE.
ADD prompts for new input.
EDIT shows the list of departments, and allows you to change the name.
REMOVE shows the list of departments, and deletes the department, but asks you to relocate all the employees to another department.

## 'Add/Edit/Remove a Role info.'
Create ADD, EDIT, REMOVE branches.
ADD prompts for new input.
EDIT shows the list of roles, and allows you to change name.
REMOVE shows the list of roles, and deletes the role, but asks you to relocate all the employees to another role.