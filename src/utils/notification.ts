import { INotification, notification } from '../store';

export const showNotification = (notif: INotification) => {
    notification.value = notif;

    setTimeout(() => {
        notification.value = { type: '', isOpened: false, message: '' };
    }, 3000);
};
