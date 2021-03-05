DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;
USE cms_db;

DROP TABLE IF EXISTS members;
CREATE TABLE members (
  id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstname VARCHAR (30),
  lastname VARCHAR (30),
  salary DECIMAL NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  depart_id INTEGER
);

DROP TABLE IF EXISTS managers;
CREATE TABLE managers (
  id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstname VARCHAR (30),
  lastname VARCHAR (30),
  salary DECIMAL NOT NULL,
  depart_id INTEGER
);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    depart_name VARCHAR (30)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR (30),
    depart_id INTEGER
);