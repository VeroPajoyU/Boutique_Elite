import jwt from 'jsonwebtoken'; // This is the library we will use to sign and verify tokens
import KEY from './config.js'; // This is the secret key that will be used to sign the JWT

// This is the secret key that will be used to sign the JWT
const SECRET_KEY = KEY;

// This function generates a token with the user's data
const generateToken = (user) => {
    return jwt.sign(
        {
            id_usuario: user.id_usuario,
            nombre_usuario: user.nombre_usuario
        }, // Pasa un objeto con los datos del usuario
        SECRET_KEY,
        {
            expiresIn: '1h'
        }
    );
}

// This function verifies the token and returns the user's data
const verifyToken = (req) => {
    const { token } = req.body;
    try {
        const result = jwt.verify(token, SECRET_KEY);
        return { id: result.id_usuario, name: result.nombre_usuario }; // Retorna un objeto con los datos del usuario
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw new Error('Invalid Token');
    }
}

export { generateToken, verifyToken };