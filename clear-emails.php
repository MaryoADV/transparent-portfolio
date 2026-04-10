<?php
// Clear all emails
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$emailsFile = __DIR__ . '/emails.json';
file_put_contents($emailsFile, '[]');
echo json_encode(['success' => true, 'message' => 'All emails cleared']);
?>
