<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"));

if(isset($data->data) && isset($data->filename)) {
    $path = '../quotes/';
    $filename = $data->filename . '_' . time() . '.json';

    if(file_put_contents($path . $filename, $data->data)) {
        $r = json_encode(['success' => true, 'message' => 'Guardado con exito!', 'filename' => $filename]);
        echo($r);
    } else {
        $r = json_encode(['success' => false, 'message' => 'Error al guardar']);
        echo($r);
    };
    
} else {
    $r = json_encode(['success' => false, 'message' => 'No se pudo guardar. Ingrese el nombre']);
    echo($r);
}