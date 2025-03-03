import { modalOpen } from '../../store';
import Login from './Login/Login';
import './Modal.scss';
import Registration from './Registration/Registration';

const handleCloseModal = () => {
    modalOpen.value = { isOpened: false };
};

function Modal() {
    let modalChild;
    switch (modalOpen.value?.name) {
        case 'Login': {
            modalChild = <Login />;
            break;
        }

        case 'Registration': {
            modalChild = <Registration />;
            break;
        }
        default: {
            return null;
        }
    }
    return (
        <div className="modal-wrapper">
            <div className="modal-single">
                <button className="close-modal" onClick={handleCloseModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>
                {modalChild}
            </div>
        </div>
    );
}

export default Modal;
