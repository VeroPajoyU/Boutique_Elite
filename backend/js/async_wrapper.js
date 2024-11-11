import { success_response, err_response } from './response.js';

const async_wrapper = (fn) => {
    return async (req, res) => {
        try {
            success_response(await fn(req, res, req.params.id), res);
        } catch (error) {
            err_response(error, res);
        }
    }
}

export default async_wrapper;

/**
 * async_wrapper es una función que simplifica el manejo de errores en funciones asincrónicas. 
 * Envuelve una función dada (fn), ejecutándola de manera asíncrona y 
 * enviando una respuesta de éxito o error según el resultado. 
 * Si la ejecución es exitosa, envía la respuesta con success_response; 
 * si ocurre un error, envía una respuesta de error usando err_response.
**/