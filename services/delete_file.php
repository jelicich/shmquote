<?php
$data = json_decode(file_get_contents("php://input"));

if(isset($data->filename)) {
    $path = '../quotes/';
    $filename = $data->filename;

    if(unlink($path . $filename)) {
        $r = json_encode(['success' => true, 'message' => 'El archivo ' . $filename . ' ha sido borrado']);
        echo($r);
    } else {
        $r = json_encode(['success' => false, 'message' => 'Error al borrar']);
        echo($r);   
    };
    
} else {
    $r = json_encode(['success' => false, 'message' => 'No se pudo borrar. Seleccione un archivo']);
    echo($r);
}