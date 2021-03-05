-- for table: members
INSERT INTO members (firstname, lastname, salary, role_id, manager_id, depart_id)
VALUES ('Edith', 'Present', 70000.00, 1, 1, 1);
INSERT INTO members (firstname, lastname, salary, role_id, manager_id, depart_id)
VALUES ('Barbara', 'Sloan', 80000.00, 1, 1, 1);
INSERT INTO members (firstname, lastname, salary, role_id, manager_id, depart_id)
VALUES ('Blake', 'Short', 100000.00, 2, 2, 2);
INSERT INTO members (firstname, lastname, salary, role_id, manager_id, depart_id)
VALUES ('Stephanie', 'November', 50000.00, 3, 3, 3);
INSERT INTO members (firstname, lastname, salary, role_id, manager_id, depart_id)
VALUES ('Lory', 'Shake', 40000.00, 4, 4, 4);

-- for table: managers
INSERT INTO managers (firstname, lastname, salary, depart_id)
VALUES ('Matt', 'Pike', 80000.00, 1);
INSERT INTO managers (firstname, lastname, salary, depart_id)
VALUES ('Molly', 'Montgomery', 100000.00, 2);
INSERT INTO managers (firstname, lastname, salary, depart_id)
VALUES ('Dominic', 'Constance', 50000.00, 3);
INSERT INTO managers (firstname, lastname, salary, depart_id)
VALUES ('Rohit', 'Rashid', 50000.00, 4);

-- for table: departments
INSERT INTO departments (depart_name)
VALUES ('Respiratory Therapy');
INSERT INTO departments (depart_name)
VALUES ('Emergency');
INSERT INTO departments (depart_name)
VALUES ('Imaging');
INSERT INTO departments (depart_name)
VALUES ('Human Resources');

-- for table: roles
INSERT INTO roles (title, depart_id)
VALUES ('RT', 1);
INSERT INTO roles (title, depart_id)
VALUES ('ER Doc', 2);
INSERT INTO roles (title, depart_id)
VALUES ('DI Tech', 3);
INSERT INTO roles (title, depart_id)
VALUES ('Admin', 4);