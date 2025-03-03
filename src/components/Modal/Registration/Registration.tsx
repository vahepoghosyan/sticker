import { signal } from '@preact/signals-react';
import { modalOpen } from '../../../store';
import { userRegistration } from '../../../api';
import './Registration.scss';

const username = signal<string>('');
const password = signal<string>('');
export const error = signal<string>('');

const handleOpenLoginModal = () => {
    modalOpen.value = { name: 'Login', isOpened: true };
};

function Registration() {
    return (
        <div className="reg-modal">
            <h3 className="title">Sign Up</h3>
            <input type="text" placeholder="Username" value={username.value} onChange={(e) => (username.value = e.target.value)} />
            <input type="password" placeholder="Password" value={password.value} onChange={(e) => (password.value = e.target.value)} />
            {error.value && <span className="error">{error.value}</span>}
            <button className="button primary small submit" onClick={() => userRegistration(username, password, error)}>
                Submit
            </button>{' '}
            <span className="sign-in" onClick={handleOpenLoginModal}>
                I have account
            </span>
        </div>
    );
}

export default Registration;
