import { registerUser } from './users_authentication.js';

const get_users_register = async (req, res) => {
    const { login_usuario, password_usuario, nombre_usuario, email_usuario } = req.body;

    try {
        if (!login_usuario || !password_usuario || !nombre_usuario || !email_usuario) {
            console.error('[ERROR] Datos incompletos para registro');
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newUser = await registerUser(login_usuario, password_usuario, nombre_usuario, email_usuario);
        console.log('[INFO] Usuario registrado:', newUser.login_usuario);
        res.status(201).json(newUser); // Devuelve el usuario registrado sin la contraseña
    } catch (error) {
        console.error('[ERROR]', error.message);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

export default get_users_register;