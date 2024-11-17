import connection from './database.js'; 
import bcrypt from 'bcrypt';

// Autenticación de usuario
const authenticateUser = async (login_usuario, password_usuario) => {
    const query = `SELECT * FROM usuarios WHERE login_usuario = ?`;
    const [results] = await connection.query(query, [login_usuario]);

    if (results.length === 0) {
        throw new Error('Usuario no encontrado');
    }

    const user = results[0];

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    // Retorna el usuario sin la contraseña
    const { password_usuario: userPassword, ...userWithoutPassword } = user;
    return userWithoutPassword.nombre_usuario;
};

// Registro de usuario
const registerUser = async (login_usuario, password_usuario, nombre_usuario, email_usuario) => {
    const hashedPassword = await bcrypt.hash(password_usuario, 10);
    const query = `INSERT INTO usuarios (login_usuario, password_usuario, nombre_usuario, email_usuario) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query(query, [login_usuario, hashedPassword, nombre_usuario, email_usuario]);

    // Retorna el nuevo usuario (sin la contraseña)
    return { login_usuario, nombre_usuario, email_usuario };
};

export {
    authenticateUser,
    registerUser
};