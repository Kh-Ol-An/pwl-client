import CryptoJS from 'crypto-js';
import { t } from 'i18next';
import { IWish } from '@/models/IWish';

export const encryptedData = (data: string, secret: string): string => CryptoJS.AES.encrypt(data, secret).toString();

export const decryptedData = (data: string, secret: string, wish?: any): string => {
    if (wish.id === '6620f3aaa436b3d1205f0e6e') {
        console.log('---------------------------------');
        console.log('decryptedData');
        console.log('wish: ', wish);
        console.log('data: ', data);
        console.log('secret: ', secret);
        console.log('---------------------------------');
    }
    try {
        const decrypted = CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error(t('encryption-error'));
        }
        return decrypted;
    } catch (error) {
        return data;
    }
};

export const unencryptedData = (data: string, show: IWish['show'], wish?: any): string => {
    if (wish.id === '6620f3aaa436b3d1205f0e6e') {
        console.log('---------------------------------');
        console.log('unencryptedData');
        console.log('wish: ', wish);
        console.log('data: ', data);
        console.log('show: ', show);
        console.log('env: ', !process.env.REACT_APP_CRYPTO_JS_SECRET);
        console.log('---------------------------------');
    }
    if (!data) {
        return '';
    }

    if (show === 'all' || !process.env.REACT_APP_CRYPTO_JS_SECRET) {
        return data;
    }

    return decryptedData(data, process.env.REACT_APP_CRYPTO_JS_SECRET);
}
