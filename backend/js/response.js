const success_response = (data, resp) => {
    resp.json({data});
}
const err_response = (err, resp) => {
    console.error(err);
    resp.status(500).json({ err: 'DATA NO FOUND' });
}

export {success_response, err_response};

/**
 * Este código define dos funciones para gestionar respuestas en un servidor: 
 * success_response envía datos en una respuesta JSON cuando la operación es exitosa, 
 * mientras que err_response registra el error en la consola y 
 * devuelve un mensaje de error JSON con un código HTTP 500 si ocurre un problema.
**/