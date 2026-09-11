<?php
require_once 'db.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager - Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <h1>Task Manager</h1>
                <div class="user-info">
                    <span>Welcome, <strong><?php echo htmlspecialchars($username); ?></strong></span>
                    <a href="logout.php" class="btn btn-logout">Logout</a>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Add Task Section -->
            <section class="add-task-section">
                <h2>Add New Task</h2>
                <form id="taskForm" class="task-form">
                    <div class="form-group">
                        <label for="title">Task Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Enter task title" 
                            required
                        >
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="priority">Priority</label>
                            <select id="priority" name="priority">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="due_date">Due Date</label>
                            <input 
                                type="date" 
                                id="due_date" 
                                name="due_date"
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            placeholder="Enter task description" 
                            rows="3"
                        ></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Add Task</button>
                </form>
            </section>

            <!-- Tasks Display Section -->
            <section class="tasks-section">
                <h2>Your Tasks</h2>

                <!-- Filter Buttons -->
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="pending">Pending</button>
                    <button class="filter-btn" data-filter="in_progress">In Progress</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
                </div>

                <!-- Tasks List -->
                <div id="tasksList" class="tasks-list">
                    <p class="loading">Loading tasks...</p>
                </div>
            </section>
        </main>
    </div>

    <!-- Edit Task Modal -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Task</h2>
            <form id="editForm" class="task-form">
                <input type="hidden" id="editTaskId" name="task_id">

                <div class="form-group">
                    <label for="editTitle">Task Title</label>
                    <input 
                        type="text" 
                        id="editTitle" 
                        name="title" 
                        required
                    >
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="editPriority">Priority</label>
                        <select id="editPriority" name="priority">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="editStatus">Status</label>
                        <select id="editStatus" name="status">
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="editDueDate">Due Date</label>
                    <input 
                        type="date" 
                        id="editDueDate" 
                        name="due_date"
                    >
                </div>

                <div class="form-group">
                    <label for="editDescription">Description</label>
                    <textarea 
                        id="editDescription" 
                        name="description" 
                        rows="3"
                    ></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Update Task</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
