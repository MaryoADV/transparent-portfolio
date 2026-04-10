<?php
// Delete single email
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = intval($data['id'] ?? 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

$emailsFile = __DIR__ . '/emails.json';

if (!file_exists($emailsFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'File not found']);
    exit;
}

$emails = json_decode(file_get_contents($emailsFile), true);
$emails = array_filter($emails, function($e) use ($id) { return $e['id'] !== $id; });
$emails = array_values($emails); // Re-index

file_put_contents($emailsFile, json_encode($emails, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo json_encode(['success' => true]);
?>
