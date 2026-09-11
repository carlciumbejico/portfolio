# Task Manager Application

A full-featured task management system with user authentication, built with PHP, MySQL, HTML, CSS, and vanilla JavaScript.

## Features

- **User Authentication**: Secure registration and login system
- **Password Security**: Bcrypt password hashing
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (pending, in-progress, completed)
- **Priority Levels**: Set task priority (low, medium, high)
- **Due Dates**: Assign due dates to tasks
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: AJAX-based task operations without page reload

## System Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- XAMPP / Local server environment
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

### Step 1: Download and Extract
1. Download the entire `task-manager-php` folder
2. Extract it to your XAMPP's `htdocs` directory
   - Location: `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/htdocs/` (Mac)

### Step 2: Create the Database

1. Open phpMyAdmin in your browser
   - Visit: `http://localhost/phpmyadmin`
2. Click on "New" or "Create database"
3. Enter database name: `task_manager`
4. Click "Create"
5. Select the `task_manager` database
6. Click on the "SQL" tab
7. Copy and paste the contents of `database.sql` file
8. Click "Go" to execute the SQL commands

**OR** use the command line:
```bash
mysql -u root < database.sql
```

### Step 3: Verify File Structure

Make sure all files are in the `task-manager-php` folder:
```
task-manager-php/
├── index.php
├── register.php
├── login.php
├── logout.php
├── api.php
├── db.php
├── style.css
├── script.js
├── database.sql
└── README.md
```

### Step 4: Start XAMPP
1. Open XAMPP Control Panel
2. Start Apache and MySQL services
3. Open your browser and navigate to: `http://localhost/task-manager-php/`

## Usage

### First Time Setup
1. You'll be redirected to the login page
2. Click "Register here" to create a new account
3. Enter your username (min 3 characters), email, and password (min 6 characters)
4. Click "Register"

### Login
1. Enter your username and password
2. Click "Login"

### Creating Tasks
1. Enter task title (required)
2. Set priority level (optional, defaults to medium)
3. Add description (optional)
4. Set due date (optional)
5. Click "Add Task"

### Managing Tasks
- **View**: All your tasks are displayed as cards
- **Filter**: Use filter buttons to view tasks by status
- **Edit**: Click "Edit" button to modify task details
- **Delete**: Click "Delete" button to remove a task (with confirmation)
- **Update Status**: Change task status while editing (pending, in-progress, completed)

### Logout
- Click the "Logout" button in the top right corner

## Database Schema

### Users Table
```sql
id (INT) - Primary Key, Auto Increment
username (VARCHAR) - Unique, Required
email (VARCHAR) - Unique, Required
password (VARCHAR) - Hashed Password
created_at (TIMESTAMP) - Account creation date
```

### Tasks Table
```sql
id (INT) - Primary Key, Auto Increment
user_id (INT) - Foreign Key, Links to Users
title (VARCHAR) - Task Title, Required
description (TEXT) - Task Description
priority (ENUM) - low, medium, high
status (ENUM) - pending, in_progress, completed
due_date (DATE) - Task Due Date
created_at (TIMESTAMP) - Task creation date
```

## File Descriptions

- **index.php** - Main dashboard (protected, requires login)
- **register.php** - User registration page
- **login.php** - User login page
- **logout.php** - Logout handler (clears session)
- **api.php** - REST API for task operations (add, fetch, update, delete)
- **db.php** - Database connection and configuration
- **style.css** - All styling for the application
- **script.js** - JavaScript for AJAX and interactivity
- **database.sql** - SQL schema and table definitions

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **Session Management**: Secure PHP sessions
- **Input Validation**: Server-side validation on all inputs
- **SQL Injection Prevention**: Prepared statements with parameterized queries
- **XSS Prevention**: HTML escaping in JavaScript
- **CSRF Protection**: Session-based security
- **Access Control**: Protected pages require authentication

## Troubleshooting

### Issue: "Database connection failed"
- Check XAMPP is running (Apache and MySQL)
- Verify database name is `task_manager`
- Check MySQL username is `root` and password is empty
- Ensure database.sql was executed successfully

### Issue: "Undefined variable" errors
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh the page (Ctrl+Shift+R)
- Check db.php file is in the same folder

### Issue: "Login not working"
- Verify you registered an account successfully
- Check that the password is correct
- Ensure MySQL service is running
- Clear browser cookies and try again

### Issue: "Tasks not displaying"
- Refresh the page (F5)
- Check browser console for JavaScript errors (F12)
- Verify you're logged in
- Check MySQL is running

### Issue: "Cannot add tasks"
- Verify you're logged in
- Check that you entered a task title
- Ensure all form fields are valid
- Check browser console for errors

## Future Enhancements

- Email notifications
- Task categories/tags
- Task sharing and collaboration
- File attachments
- Task search functionality
- Dark mode
- Export tasks to PDF/Excel
- Calendar view
- Recurring tasks

## License

This project is free to use for educational purposes.

## Support

For issues or questions, check:
1. The MySQL logs in XAMPP
2. Browser console (F12) for JavaScript errors
3. PHP error logs in XAMPP
4. Verify all files are in the correct location

---

Happy task managing! 🚀
