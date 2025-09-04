import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/global.scss';
import './styles.css';
import Notes from './components/Notes/Notes';
import Layout from './components/Layout/Layout';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Layout>
            <Notes />
        </Layout>
    </StrictMode>
);
