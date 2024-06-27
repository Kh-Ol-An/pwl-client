import myUserApi from '@/store/my-user/api';
import { IUser } from "@/models/IUser";

export const requestNotificationPermission = async (userId: IUser['id']) => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    console.log('reg: ', reg);
    console.log('sub: ', sub);
    if ('Notification' in window && navigator.serviceWorker) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const registration = await navigator.serviceWorker.ready;
            if (!process.env.REACT_APP_PUBLIC_VAPID_KEY) {
                return Promise.reject('REACT_APP_PUBLIC_VAPID_KEY is not defined.');
            }
            const subscription: PushSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)
            });
            await myUserApi.notificationSubscription({ userId, subscription });
            console.log('User is subscribed:', subscription);
        }
    }
};

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
