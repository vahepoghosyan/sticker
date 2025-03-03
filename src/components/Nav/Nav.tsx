import storage from '../../utils/storage';
import { effect } from '@preact/signals-react';
import { notes, maxZIndex, isLoggedIn, modalOpen } from '../../store';
import './Nav.scss';

effect(() => {
    storage.setStickyNotes(notes.value);
    storage.setMazZIndex(maxZIndex.value);
});

export const handleOpenRegistrationModal = () => {
    modalOpen.value = { name: 'Registration', isOpened: true };
};

const handleUserLogout = () => {
    storage.setJWT('');
    isLoggedIn.value = false;
};

function Nav() {
    return (
        <nav className="nav">
            <div className="logo">Sticker</div>
            {!isLoggedIn.value ? (
                <>
                    <button className="button primary" onClick={handleOpenRegistrationModal}>
                        Sign Up
                    </button>
                </>
            ) : (
                <button className="logout-icon" title="logout" onClick={handleUserLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            fillRule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                        />
                    </svg>
                </button>
            )}
        </nav>
    );
}

export default Nav;
