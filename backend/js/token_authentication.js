import jwt from 'jsonwebtoken'; // This is the library we will use to sign and verify tokens
import { KEY } from './config.js'; // This is the secret key that will be used to sign the JWT

// This is the secret key that will be used to sign the JWT
const SECRET_KEY = KEY;

// This function generates a token with the user's data
const generateToken = (data) => {
    return jwt.sign(
        user,
        SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}

// This function verifies the token and returns the user's data
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error ('Invalid Token');
    }
}

export {
    generateToken,
    verifyToken
};