<?php
$path = '../quotes/';
$files = scandir($path);
$r = json_encode(['success' => true, 'message' => 'Cargado correctamente', 'files' => $files]);
echo($r);