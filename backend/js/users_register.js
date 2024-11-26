import { registerUser } from './users_authentication.js';

const get_users_register = async (req) => {
    const { login_usuario, nombre_usuario, email_usuario, celular_usuario, password_usuario, id_rol_usuario } = req.body;

    try {
        if (!login_usuario || !nombre_usuario || !email_usuario || !celular_usuario || !password_usuario) {
            console.error('[ERROR] Datos incompletos para registro');
            throw { status: 400, message: 'Todos los campos son obligatorios' };
        }

        // Registrar usuario con un rol predeterminado si no se proporciona
        const newUser = await registerUser(
            login_usuario,
            nombre_usuario,
            email_usuario,
            celular_usuario,
            password_usuario,
            id_rol_usuario || 2 // Asignar rol predeterminado
        );

        return newUser; // Devolver usuario registrado para que async_wrapper maneje la respuesta
    } catch (error) {
        console.error('[ERROR]', error.message);

        // Reenviar errores detallados para que async_wrapper los maneje
        if (error.status) {
            throw error; // Si el error ya tiene un status definido, lo propagamos
        } else {
            throw { status: 500, message: 'Error al registrar el usuario' };
        }
    }
};

export default get_users_register;