import Note from './Note/Note';
import './Notes.scss';
import { notes, maxZIndex } from '../Nav/Nav';
import MinimizedNotes from '../MinimizedNotes/MinimizedNotes';
import { minimizedList } from '../MinimizedNotes/MinimizedNotes';
import { INote } from './types';
import { DraggableData, DraggableEventHandler } from 'react-draggable';

const handleMinimize = (id: string, note: INote) => () => {
    minimizedList.value = { ...minimizedList.value, [id]: note };
    notes.value = {
        ...notes.value,
        [id]: {
            ...notes.value[id],
            minimized: true,
        },
    };
};

const handleRemoveNote = (id: string) => () => {
    const { [id]: note, ...rest } = notes.value;
    notes.value = rest;
};

const handleMoveNoteUp = (id: string, zIndex: number) => {
    if (maxZIndex.value === zIndex) return;

    maxZIndex.value++;
    notes.value = {
        ...notes.value,
        [id]: {
            ...notes.value[id],
            zIndex: maxZIndex.value,
        },
    };
};

const handleEditNoteName = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    notes.value = {
        ...notes.value,
        [id]: {
            ...notes.value[id],
            name: event.target.value,
        },
    };
};

function Notes() {
    const notesList = Object.entries(notes.value);

    const onStart =
        (id: string, zIndex: number): DraggableEventHandler =>
        () => {
            handleMoveNoteUp(id, zIndex);
        };

    const onStop =
        (id: string): DraggableEventHandler =>
        (_: any, ui: DraggableData) => {
            notes.value = {
                ...notes.value,
                [id]: {
                    ...notes.value[id],
                    position: {
                        x: ui.lastX,
                        y: ui.lastY,
                    },
                },
            };
        };

    return notesList.length === 0 ? (
        <div className="empty">
            <h1>Add your first sticker</h1>
        </div>
    ) : (
        <>
            {Object.entries(notes.value)
                .filter(([_, note]) => !note.minimized)
                .map(([id, note]) => (
                    <Note
                        key={id}
                        note={note}
                        handleMinimize={handleMinimize}
                        handleRemoveNote={handleRemoveNote}
                        handleMoveNoteUp={handleMoveNoteUp}
                        handleEditNoteName={handleEditNoteName}
                        onStart={onStart}
                        onStop={onStop}
                    />
                ))}
            <MinimizedNotes />
        </>
    );
}

export default Notes;
