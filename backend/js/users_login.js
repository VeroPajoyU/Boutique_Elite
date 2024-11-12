import { authenticateUser } from './users_authentication.js';

const get_users_login = async (req, res) => {
    const { login_usuario, password_usuario } = req.body;

    try {
        const user = await authenticateUser(login_usuario, password_usuario);
        res.json(user); // Devuelve el usuario autenticado
        console.log('Usuario:', login_usuario);
        console.log('Contraseña:', password_usuario);
    } catch (error) {
        // Mejor manejo de errores y códigos de estado
        if (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta') {
            res.status(401).json({ message: error.message }); // 401 para credenciales incorrectas
        } else {
            res.status(500).json({ message: 'Error en el servidor' }); // 500 para otros errores
        }
    }
};

export default get_users_login;