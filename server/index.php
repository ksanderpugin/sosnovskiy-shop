<?php

require __DIR__ . '/vendor/autoload.php';

use App\Views\View;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    View::renderJSON();
    return;
}


$route = $_GET['route'] ?? '';
$patterns = require __DIR__ . '/src/routes.php';

$isRouteFound = false;

$className = ''; $action = ''; $data = '';

foreach ($patterns as $pattern => $controllerAndAction) {
    preg_match($pattern, $route, $matches);
    if (!empty($matches)) {
        $isRouteFound = true;
        $className = $controllerAndAction[0];
        $action = $controllerAndAction[1];
        unset($matches[0]);
        $data = $matches;
        break;
    }
}

if (!$isRouteFound) {
    echo '404 page not found';
    return;
}

try {
    $controller = new $className();
    $controller->$action(...$data);

} catch (\Exception $e) {
    View::renderJSON(['ok' => false, 'error' => $e->getMessage()]);
}