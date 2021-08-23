<?php

$data = json_decode(file_get_contents("php://input"));

if(isset($data->filename)) {
    $path = '../quotes/';
    $filename = $data->filename;

    $fileContent = file_get_contents($path . $filename);
    if($fileContent) {
        $r = json_encode(['success' => true, 'message' => 'Cargado con exito!', 'file' => $fileContent]);
        echo($r);
    } else {
        $r = json_encode(['success' => false, 'message' => 'Error al cargar']);
        echo($r);
    };
    
} else {
    $r = json_encode(['success' => false, 'message' => 'No se pudo cargar. Ingrese el nombre']);
    echo($r);
}