import { registerUser } from './users_authentication.js';

const get_users_register = async (req, res) => {
    const { login_usuario, password_usuario, nombre_usuario, email_usuario } = req.body;

    try {
        const newUser = await registerUser(login_usuario, password_usuario, nombre_usuario, email_usuario);
        res.status(201).json(newUser); // Devuelve el nuevo usuario registrado
    } catch (error) {
        console.error(error); // Añadir consola para detectar cualquier problema
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

export default get_users_register;