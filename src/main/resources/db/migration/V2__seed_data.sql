-- Seed data for HRMS: sample users, departments, managers, employees

-- Passwords use bcrypt hash for the plaintext 'password'
INSERT INTO users (username, password, role, enabled) VALUES
('admin', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa1c6W3r3v5x0Gf0bG/8h1u1Z46xQv6', 'ADMIN', true),
('manager1', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa1c6W3r3v5x0Gf0bG/8h1u1Z46xQv6', 'MANAGER', true),
('employee1', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa1c6W3r3v5x0Gf0bG/8h1u1Z46xQv6', 'EMPLOYEE', true);

INSERT INTO departments (name) VALUES ('Engineering'), ('HR');

-- Link manager user to a manager record
INSERT INTO managers (name, designation, user_id, department_id)
VALUES ('Alice Manager', 'Senior Manager', (SELECT id FROM users WHERE username='manager1'), (SELECT id FROM departments WHERE name='Engineering'));

-- Link employee user to an employee record
INSERT INTO employees (employee_code, name, designation, department_id, user_id, manager_id)
VALUES ('EMP001', 'Bob Employee', 'Software Engineer', (SELECT id FROM departments WHERE name='Engineering'), (SELECT id FROM users WHERE username='employee1'), (SELECT id FROM managers WHERE name='Alice Manager'));
