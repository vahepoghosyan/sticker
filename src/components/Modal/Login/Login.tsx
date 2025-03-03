import { signal } from '@preact/signals-react';
import { userLogin } from '../../../api';
import './Login.scss';

const username = signal<string>('');
const password = signal<string>('');
const error = signal<string>('');

function Login() {
    return (
        <div className="login-modal">
            <h3 className="title">Login</h3>
            <input type="text" placeholder="Username" value={username.value} onChange={(e) => (username.value = e.target.value)} />
            <input type="password" placeholder="Password" value={password.value} onChange={(e) => (password.value = e.target.value)} />
            {error.value && <span className="error">{error.value}</span>}
            <button className="button primary small submit" onClick={() => userLogin(username, password, error)}>
                Submit
            </button>
        </div>
    );
}

export default Login;
