import Nav, { handleOpenRegistrationModal } from '../Nav/Nav';
import Modal from '../Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../Notification/Notification';
import { maxZIndex, notes, isLoggedIn } from '../../store';
import { useUpdateNotes } from '@hooks/useUpdateNotes';
import './Layout.scss';

import { effect } from '@preact/signals-react';
import { getProfile } from '../../api';

effect(() => {
    getProfile();
});

const handleAddNote = () => {
    maxZIndex.value++;
    const id = uuidv4();
    notes.value = {
        ...notes.value,
        [id]: {
            id,
            name: `new note`,
            position: {
                x: Math.floor((window.innerWidth - 400) * Math.random()),
                y: Math.floor((window.innerHeight - 480) * Math.random()),
            },
            zIndex: maxZIndex.value,
            content: '',
            minimized: false,
        },
    };
};

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    useUpdateNotes();
    return (
        <>
            <Nav />
            <main className="main">
                {isLoggedIn.value ? (
                    children
                ) : (
                    <div className="login-message">
                        <h1>
                            <button className="button primary" onClick={handleOpenRegistrationModal}>
                                Sign Up
                            </button>{' '}
                            to make your notes
                        </h1>
                    </div>
                )}
            </main>
            <Modal />
            <Notification />
            {isLoggedIn.value && (
                <button className="add-note" onClick={handleAddNote}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6d3b9c" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                </button>
            )}
        </>
    );
};

// TODO complete this after user data update

export default Layout;
