<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$response = ['success' => false, 'message' => ''];

try {
    $file = __DIR__ . '/emails.json';
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data || !isset($data['email'])) {
        throw new Exception('No email in request');
    }
    
    $email = trim($data['email']);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email');
    }
    
    // Read existing
    $json = @file_get_contents($file);
    $emails = $json ? json_decode($json, true) : [];
    if (!is_array($emails)) $emails = [];
    
    // Check duplicate
    foreach ($emails as $e) {
        if ($e['email'] === $email) {
            $response['error'] = 'Email exists';
            $response['exists'] = true;
            echo json_encode($response);
            exit;
        }
    }
    
    // Add
    $emails[] = [
        'id' => count($emails) + 1,
        'email' => $email,
        'created_at' => date('c'),
        'reward' => null
    ];
    
    // Save
    @file_put_contents($file, json_encode($emails, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    
    $response['success'] = true;
    $response['message'] = 'Email saved';
    
} catch (Exception $e) {
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
exit;

