import crypto from 'crypto'; // The library to create the Secret Key

// This is the secret key that will be used to sign the JWT
const KEY = crypto.randomBytes(64).toString('hex');

export default KEY;
