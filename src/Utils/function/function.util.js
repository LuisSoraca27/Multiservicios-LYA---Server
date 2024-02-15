import crypto from 'crypto';
import dotenv from 'dotenv';

// Generate ID Unique
export function generateUniquedID(prefix) {
    return prefix + Math.random().toString(36).substr(2, 9);
}

export function generateCategoryId(plataforma) {

    console.log(plataforma)

  const plataformaLowerCase =  plataforma.toLowerCase()

    
    const plataformas = {
        primevideo: 1,
        netflix: 2,
        hbomax: 3,
        disneyplus: 4,
        starplus: 5,
        paramountplus: 6,
        vixplus: 7,
        plex: 8,
        crunchyroll: 9,
        profenet: 10,
        iptv: 11,
        youtube: 12,
        tidal: 13,
        spotify: 14,
        dezzer: 15,
        applemusic: 16,
        canva: 17,
        xboxpass: 18,
        appletv: 19,
        pornhub: 20,
        comboplus: 21,
        rakutenviki: 22,
        funimation: 23,
        mubi: 24,
        universalplus: 25,
        magistv: 26,
        telelatino: 27,
        directvgo: 28,
        clarovideo: 29,
    }

    return plataformas[plataformaLowerCase]

}


const key_secret = process.env.KEY_SECRET
const ENCRYPTION_KEY = Buffer.from(key_secret, 'hex');
const IV_LENGTH = 16; 

export function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText) {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(parts.join(':'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}




