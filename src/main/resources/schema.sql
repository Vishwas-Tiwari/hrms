-- PostgreSQL schema for HRMS Annual Performance Assessment System

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE departments (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE managers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  designation VARCHAR(255),
  user_id BIGINT,
  department_id BIGINT,
  CONSTRAINT fk_managers_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_managers_dept FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id BIGSERIAL PRIMARY KEY,
  employee_code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255),
  designation VARCHAR(255),
  department_id BIGINT,
  user_id BIGINT,
  manager_id BIGINT,
  CONSTRAINT fk_employees_dept FOREIGN KEY(department_id) REFERENCES departments(id),
  CONSTRAINT fk_employees_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_employees_mgr FOREIGN KEY(manager_id) REFERENCES managers(id)
);

CREATE TABLE assessment_statuses (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE assessments (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT,
  manager_id BIGINT,
  assessment_year INTEGER,
  self_assessment TEXT,
  key_achievements TEXT,
  challenges TEXT,
  training_undertaken TEXT,
  goals_for_next_year TEXT,
  manager_remarks TEXT,
  status_id BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT fk_assess_employee FOREIGN KEY(employee_id) REFERENCES employees(id),
  CONSTRAINT fk_assess_manager FOREIGN KEY(manager_id) REFERENCES managers(id),
  CONSTRAINT fk_assess_status FOREIGN KEY(status_id) REFERENCES assessment_statuses(id)
);

-- Seed common statuses
INSERT INTO assessment_statuses (name) VALUES
('DRAFT'), ('SUBMITTED'), ('UNDER_REVIEW'), ('APPROVED'), ('REJECTED'), ('RETURNED');
