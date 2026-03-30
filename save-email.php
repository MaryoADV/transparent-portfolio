<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

// Validate request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON data
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// Path to emails file
$emailsFile = __DIR__ . '/emails.json';

// Initialize file if not exists
if (!file_exists($emailsFile)) {
    file_put_contents($emailsFile, '[]');
    chmod($emailsFile, 0666);
}

// Read existing emails
$emails = json_decode(file_get_contents($emailsFile), true);

// Check if email already exists
foreach ($emails as $existingEmail) {
    if ($existingEmail['email'] === $email) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already registered', 'exists' => true]);
        exit;
    }
}

// Add new email
$newEmail = [
    'id' => count($emails) + 1,
    'email' => $email,
    'created_at' => date('c'),
    'reward' => null
];

$emails[] = $newEmail;

// Save to file
if (file_put_contents($emailsFile, json_encode($emails, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
    echo json_encode(['success' => true, 'message' => 'Email saved successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save email']);
}
?>
