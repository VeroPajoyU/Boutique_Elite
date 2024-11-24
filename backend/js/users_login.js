import { authenticateUser } from './users_authentication.js';

const get_users_login = async (req) => {
    const { login_usuario, password_usuario } = req.body;

    try {
        const user = await authenticateUser(login_usuario, password_usuario);
        console.log('[INFO] Usuario autenticado:', user.login_usuario);
        return user; // Retorna el usuario autenticado para que el async_wrapper maneje la respuesta
    } catch (error) {
        console.error('[ERROR]', error.message);
        // Lanza un error detallado para que sea capturado por async_wrapper
        if (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta') {
            throw { status: 401, message: error.message }; // 401 para credenciales incorrectas
        } else {
            throw { status: 500, message: 'Error en el servidor' }; // 500 para otros errores
        }
    }
};

export default get_users_login;