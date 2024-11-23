import storage from '../../utils/storage';
import { INotesList } from '../Notes/types';
import { signal } from '@preact/signals-react';
import MinimizedNote from './MinimizedNote/MinimizedNote';
import './MinimizedNotes.scss';

export const minimizedList = signal<INotesList>(storage.getMinimizedNotes());

function MinimizedNotes() {
    return (
        <div className="minimized-notes">
            {Object.entries(minimizedList.value).map(([id, note]) => (
                <MinimizedNote key={id} note={note} />
            ))}
        </div>
    );
}

export default MinimizedNotes;
