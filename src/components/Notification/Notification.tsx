import './Notification.scss';
import { notification } from '../../store';

const Notification = () => {
    return notification.value.isOpened && <div className={`notification ${notification.value?.type}`}>{notification.value?.message}</div>;
};

export default Notification;
