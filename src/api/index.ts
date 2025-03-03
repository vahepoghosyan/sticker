import { notes, isLoggedIn, modalOpen, prevNotes } from '../store';
import { showNotification } from '../utils/notification';
import storage from '../utils/storage';
import { Signal } from '@preact/signals-react';

export const getProfile = async () => {
    await fetch('https://sticker-go.onrender.com/api/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: storage.getJWT(),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'success') {
                console.log('Profile Data success!', data);
                notes.value = data.notes ? JSON.parse(data.notes) : {};
                prevNotes.value = data.notes ? JSON.parse(data.notes) : {};
            } else {
                data.message === 'Invalid token' && showNotification({ type: 'error', isOpened: true, message: 'Yo! Please login again!!' });
                isLoggedIn.value = false;
                storage.setJWT();
                console.error('Profile Data failed:', data.status, data.message);
            }
        })
        .catch((error) => console.error('Error:', error));
};

export const userRegistration = async (username: Signal, password: Signal, error: Signal) => {
    await fetch('https://sticker-go.onrender.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                console.log('Login successful! Token:', data.token);
                isLoggedIn.value = true;
                modalOpen.value = { isOpened: false };
                notes.value = {};
                prevNotes.value = {};
                showNotification({ type: 'success', isOpened: true, message: 'Yo! You are registered!!' });
                localStorage.setItem('jwt', data.token);
            } else {
                error.value = data.message;
                console.error('Registration failed:', data.error);
            }
        })
        .catch((error) => console.error('Error:', error));
};

export const userLogin = async (username: Signal, password: Signal, error: Signal) => {
    await fetch('https://sticker-go.onrender.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value || 'vahtyue',
            password: password.value || 'secure123',
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                console.log('Login successful! Token:', data.token);
                isLoggedIn.value = true;
                modalOpen.value = { isOpened: false };
                error.value = '';
                storage.setJWT(data.token);
                getProfile();
            } else {
                error.value = data.message;
                console.error('Login failed:', data.error);
            }
        })
        .catch((error) => console.error('Error:', error));
};

export const updateNotes = async (setIsLoading: (a: boolean) => void, setIsSuccess: (a: boolean) => void) => {
    await fetch('https://sticker-go.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: storage.getJWT(),
        },
        body: JSON.stringify({
            notes: JSON.stringify(notes),
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            if (data.status === 'success') {
                setIsSuccess(true);
                console.log('Profile Data success!', data);
            } else {
                setIsSuccess(false);
                console.error('Profile Data failed:', data.error);
                showNotification({ type: 'error', isOpened: true, message: 'Yo! Please login again!!' });
                isLoggedIn.value = false;
                storage.setJWT();
            }
        })
        .catch((error) => {
            setIsSuccess(false);
            setIsLoading(false);
            console.error('Error:', error);
        });
};
