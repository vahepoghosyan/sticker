export interface IModal {
    name?: 'Login' | 'Registration';
    isOpened: boolean;
}

export interface INotification {
    type: 'Success' | 'Error' | 'Warning' | 'Info' | '';
    message: string;
    isOpened: boolean;
}
