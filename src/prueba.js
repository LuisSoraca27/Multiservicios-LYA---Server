// import moment from 'moment-timezone';

// const fechaHoraUTC = "2024-01-19T23:43:39.899Z";

// // // Convertir a la zona horaria local (Bogotá)
// // const fechaHoraLocal = moment.utc(fechaHoraUTC).tz('America/Bogota');

// console.log(fechaHoraUTC.format('YYYY-MM-DD HH:mm:ss.SSS'));

// const ENCRYPTION_KEY = '4j9J69j548n5gn76Khg7kk48n8j4aw9b0548n5gn76Khg7kk48n8j4'

import crypto from 'crypto';

const key_secret = '65de83af69a486e626e96e52a40f595ce32ef54f272c9e2ff69c6c9738adafa2'
const ENCRYPTION_KEY = Buffer.from(key_secret, 'hex');
const IV_LENGTH = 16; 

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(encryptedText) {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(parts.join(':'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Ejemplo de uso:
const originalText = 'DK012915';
const encryptedText = encrypt(originalText);
const decryptedText = decrypt(encryptedText);

console.log('Texto Original:', originalText);
console.log('Texto Encriptado:', encryptedText);
console.log('Texto Desencriptado:', decryptedText);

