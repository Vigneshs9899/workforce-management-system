# Workforce Management System

A full-stack Workforce Management System built with React, Flask, PostgreSQL, and JWT Authentication. The application provides separate Admin and Employee dashboards with attendance tracking, job management, timesheets, and analytics.

## Live Demo

Frontend: (https://workforce-management-system-omega.vercel.app/)

Backend API: (https://workforce-management-system-9g14.onrender.com)

## Features

### Authentication & Authorization

* JWT Authentication
* Role-based Access Control
* Admin and Employee Login

### Admin Module

* Dashboard with analytics
* Employee Management
* Job Management
* Timesheet Management
* Import Data Module
* Charts and Reports

### Employee Module

* Personal Dashboard
* Attendance Tracking
* My Jobs
* Timesheets
* Weekly Hours Summary

### Analytics

* Pie Chart for Job Status
* Bar Chart for Working Hours
* Weekly Hours Chart

### Tech Stack

#### Frontend

* React
* Vite
* Bootstrap
* Chart.js
* Axios

#### Backend

* Flask
* Flask-JWT-Extended
* Flask-SQLAlchemy
* Flask-Migrate
* Flask-CORS

#### Database

* PostgreSQL

#### Deployment

* Vercel (Frontend)
* Render (Backend)
* Neon PostgreSQL (Database)

#### Development Tools

* Docker
* Git
* GitHub

## Folder Structure

```
workforce-management-system
│
├── backend
│   ├── app
│   ├── models
│   ├── routes
│   ├── services
│   ├── requirements.txt
│   └── run.py
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── package.json
│
└── docker-compose.yml
```

## Screenshots

### Login Page

<img width="1917" height="957" alt="image" src="https://github.com/user-attachments/assets/f1b589b8-fa97-40b2-8bef-5a483a2f1e63" />


### Admin Dashboard

<img width="1913" height="960" alt="image" src="https://github.com/user-attachments/assets/8aae1e11-3b5e-4692-8798-5218dd47f792" />


### Employee Dashboard

<img width="1912" height="962" alt="image" src="https://github.com/user-attachments/assets/093e9169-250c-45a7-b3ac-691aa8137acb" />


### Jobs Module

<img width="1913" height="957" alt="image" src="https://github.com/user-attachments/assets/1ae83949-5810-4082-95e8-02bcc5e6132d" />

<img width="1912" height="961" alt="image" src="https://github.com/user-attachments/assets/2fb24ce1-2104-4b8d-a120-b0b912f0004d" />


### Attendance Module

<img width="1912" height="960" alt="image" src="https://github.com/user-attachments/assets/3ea01b0d-2719-4cc4-af51-8d49dc31b112" />

<img width="1912" height="960" alt="image" src="https://github.com/user-attachments/assets/37ad99ef-32e9-4f9b-ab5d-4884b52c44f1" />


## Installation

### Backend

```bash
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
npm install
npm run dev
```

## Future Enhancements

* Notifications
* Leave Management
* File Uploads
* Email Integration
* PDF Reports

## Author

Vignesh S

LinkedIn:
https://linkedin.com/in/Vigneshs9899

GitHub:
https://github.com/Vigneshs9899
