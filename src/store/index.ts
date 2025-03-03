import { signal } from '@preact/signals-react';
import storage from '../utils/storage';

export interface IModal {
    name?: 'Login' | 'Registration';
    isOpened: boolean;
}

export interface INotification {
    type: 'success' | 'error' | 'warning' | 'info' | '';
    message: string;
    isOpened: boolean;
}

export type TPosition = {
    x: number;
    y: number;
};

export interface INote {
    id: string;
    color?: string;
    name: string;
    position: TPosition;
    content: string;
    zIndex: number;
    minimized: boolean;
}

export interface INotesList {
    [key: string]: INote;
}

export const notification = signal<INotification>({ type: '', message: '', isOpened: false });
export const newNote = signal<INote | {}>({});
// export const notes = signal<INotesList>(storage.getStickyNotes());
export const notes = signal<INotesList>({});
export const prevNotes = signal<INotesList>({});
export const modalOpen = signal<IModal>({ isOpened: false });
export const isLoggedIn = signal<boolean>(!!storage.getJWT());
export const maxZIndex = signal<number>(storage.getMaxZIndex());
