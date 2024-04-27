import CryptoJS from 'crypto-js';
import { IWish } from '@/models/IWish';

export const encryptedData = (data: string, secret: string): string => CryptoJS.AES.encrypt(data, secret).toString();

export const decryptedData = (data: string, secret: string): string => {
//    try {
//        const decrypted = CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8);
//        if (!decrypted) {
//            throw new Error('Decryption failed');
//        }
//        return decrypted;
//    } catch (error) {
//        return data;
//    }
//    *******************************************************
    return CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8) || data;
};

export const unencryptedData = (data: string, show: IWish['show']): string => {
    if (!data || !process.env.REACT_APP_CRYPTO_JS_SECRET) {
        return '';
    }

    if (show === 'all') {
        return data;
    }

    return decryptedData(data, process.env.REACT_APP_CRYPTO_JS_SECRET);
}
