<?php
require_once 'db.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$user_id = $_SESSION['user_id'];
$action = $_GET['action'] ?? '';

// ADD TASK
if ($action === 'add' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title']);
    $description = trim($_POST['description'] ?? '');
    $priority = $_POST['priority'] ?? 'medium';
    $due_date = $_POST['due_date'] ?? null;

    if (empty($title)) {
        echo json_encode(['success' => false, 'message' => 'Title is required']);
        exit();
    }

    $due_date = empty($due_date) ? null : $due_date;

    $stmt = $conn->prepare("INSERT INTO tasks (user_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $user_id, $title, $description, $priority, $due_date);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Task added successfully', 'task_id' => $conn->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add task']);
    }
    $stmt->close();
}

// FETCH TASKS
elseif ($action === 'fetch' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $status = $_GET['status'] ?? 'all';

    if ($status === 'all') {
        $stmt = $conn->prepare("SELECT id, title, description, priority, status, due_date, created_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC");
    } else {
        $stmt = $conn->prepare("SELECT id, title, description, priority, status, due_date, created_at FROM tasks WHERE user_id = ? AND status = ? ORDER BY created_at DESC");
        $stmt->bind_param("is", $user_id, $status);
    }

    if (!isset($_GET['status']) || $_GET['status'] === 'all') {
        $stmt->bind_param("i", $user_id);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $tasks = [];

    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode(['success' => true, 'tasks' => $tasks]);
    $stmt->close();
}

// UPDATE TASK
elseif ($action === 'update' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_id = $_POST['task_id'] ?? 0;
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $priority = $_POST['priority'] ?? 'medium';
    $status = $_POST['status'] ?? 'pending';
    $due_date = $_POST['due_date'] ?? null;

    if (empty($task_id) || empty($title)) {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit();
    }

    $due_date = empty($due_date) ? null : $due_date;

    $stmt = $conn->prepare("UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?");
    $stmt->bind_param("sssssii", $title, $description, $priority, $status, $due_date, $task_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Task updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update task']);
    }
    $stmt->close();
}

// DELETE TASK
elseif ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_id = $_POST['task_id'] ?? 0;

    if (empty($task_id)) {
        echo json_encode(['success' => false, 'message' => 'Invalid task ID']);
        exit();
    }

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $task_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Task deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete task']);
    }
    $stmt->close();
}

else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
