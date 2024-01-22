import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_APP_AUTH_SECRET_KEY;

// Encryption function
export const encryptString = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey);
  return encrypted.toString();
};

// Decryption function
export const decryptString = (cipherText) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
