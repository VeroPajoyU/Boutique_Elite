import connection from './database.js'; 
import bcrypt from 'bcrypt';

// Autenticación de usuario
const authenticateUser = async (login_usuario, password_usuario) => {
    const query = `SELECT * FROM usuarios WHERE login_usuario = ?`;
    const [results] = await connection.query(query, [login_usuario]);

    if (results.length === 0) {
        throw new Error('Usuario no encontrado');
    }
    console.log('Usuario: ', results);

    const user = results[0];

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }
    console.log('Contraseña correcta');

    // Retorna el usuario sin la contraseña
    const { password_usuario: userPassword, ...userWithoutPassword } = user;
    return userWithoutPassword.nombre_usuario;
};

// Registro de usuario con Valor predeterminado para usuarios estándar = 2
const registerUser = async (login_usuario, nombre_usuario, email_usuario, celular_usuario, password_usuario, id_rol_usuario = 2) => {
    const hashedPassword = await bcrypt.hash(password_usuario, 10);

    // Agregamos el campo `id_rol_usuario` con valor predeterminado 2
    const query = `INSERT INTO usuarios (login_usuario, nombre_usuario, email_usuario, celular_usuario, password_usuario, id_rol_usuario) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.query(query, [login_usuario, nombre_usuario, email_usuario, celular_usuario, hashedPassword, id_rol_usuario]);

    // Aseguramos que solo se retornen datos serializables
    return { login_usuario, nombre_usuario, email_usuario, celular_usuario, id_rol_usuario };
};

export { authenticateUser, registerUser };