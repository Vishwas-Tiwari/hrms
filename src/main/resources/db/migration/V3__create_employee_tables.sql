-- 1. Create the schema first so the tables can be placed inside it
CREATE SCHEMA IF NOT EXISTS tran;

-- 2. Create the Employee Details table
CREATE TABLE IF NOT EXISTS tran.employee_details
(
    employee_id numeric(10,0) NOT NULL,
    organization_id numeric(5,0),
    office_id numeric(5,0),
    department_id numeric(5,0),
    emp_ini_name character varying(30) COLLATE pg_catalog."default",
    emp_first_name character varying(100) COLLATE pg_catalog."default",
    emp_mid_name character varying(30) COLLATE pg_catalog."default",
    emp_last_name character varying(30) COLLATE pg_catalog."default",
    gender character varying(1) COLLATE pg_catalog."default",
    date_of_birth date,
    mobile_number character varying COLLATE pg_catalog."default",
    CONSTRAINT employee_details_pk_2 PRIMARY KEY (employee_id)
);

-- 3. Create the Employee ACR Status table
CREATE TABLE IF NOT EXISTS tran.employee_acr_status
(
    employee_id numeric(10,0) NOT NULL,
    organization_id numeric(5,0),
    office_id numeric(5,0),
    department_id numeric(5,0),
    emp_ini_name character varying(30) COLLATE pg_catalog."default",
    emp_first_name character varying(100) COLLATE pg_catalog."default",
    emp_mid_name character varying(30) COLLATE pg_catalog."default",
    emp_last_name character varying(30) COLLATE pg_catalog."default",
    is_acr_submitted boolean DEFAULT false,
    CONSTRAINT employee_acr_status_pkey PRIMARY KEY (employee_id)
);

-- 4. Create the Employee ACR Details table
CREATE TABLE IF NOT EXISTS tran.employee_acr_details
(
    _id bigserial,
    employee_id numeric NOT NULL,
    organisation_id numeric,
    office_id numeric,
    department_id numeric,
    target text COLLATE pg_catalog."default",
    achievements text COLLATE pg_catalog."default",
    CONSTRAINT employee_acr_details_pkey PRIMARY KEY (_id, employee_id)
);