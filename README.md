# Workforce Management System

## Overview
Workforce Management System backend built using Flask and PostgreSQL.

## Features
- JWT Authentication
- Employee Management
- Job Management
- Timesheet Tracking
- Dashboard Analytics

## Tech Stack
- Python
- Flask
- PostgreSQL
- SQLAlchemy
- JWT
- bcrypt

## API Endpoints
### Authentication
POST /api/auth/register
POST /api/auth/login

### Employees
POST /api/employees
GET /api/employees
PUT /api/employees/<id>
DELETE /api/employees/<id>

### Jobs
POST /api/jobs
GET /api/jobs
PUT /api/jobs/<id>/status
DELETE /api/jobs/<id>

### Timesheets
POST /api/timesheets
GET /api/timesheets

### Dashboard
GET /api/dashboard
