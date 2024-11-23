import { useState, ChangeEvent, useEffect } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { notes } from '../../Nav/Nav';
import { INote } from '../types';
import { useDebouncedValue } from '@/hooks/useDebounce';

import './Note.scss';

interface Prop {
    note: INote;
    handleMinimize: (id: string, note: INote) => (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleRemoveNote: (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleMoveNoteUp: (id: string, zIndex: number) => void;
    onStart: (id: string, zIndex: number) => DraggableEventHandler;
    onStop: (id: string) => DraggableEventHandler;
}

function Note({ note, handleMinimize, handleRemoveNote, handleMoveNoteUp, onStop, onStart }: Prop) {
    const { id, name, zIndex, position, content } = note;
    const [textContent, setTextContent] = useState(content);
    const debouncedValue = useDebouncedValue(textContent, 1000);

    const handleChangeContent = (event: ChangeEvent) => {
        const { value } = event.target as HTMLInputElement;
        setTextContent(value);
    };

    const handleMouseDown = () => {
        handleMoveNoteUp(id, zIndex);
    };

    useEffect(() => {
        notes.value = {
            ...notes.value,
            [id]: {
                ...notes.value[id],
                content: debouncedValue,
            },
        };
    }, [debouncedValue]);

    return (
        <Draggable
            bounds="parent"
            handle="strong"
            defaultPosition={{
                x: position.x,
                y: position.y,
            }}
            onStart={onStart(id, zIndex)}
            onStop={onStop(id)}
        >
            <div
                className="note"
                style={{
                    zIndex: zIndex,
                }}
            >
                <strong className="panel">
                    <div className="panel-buttons">
                        <button className="remove-note" onClick={handleRemoveNote(id)} />
                        <button className="minimize" onClick={handleMinimize(id, note)} />
                    </div>
                    {name}
                </strong>
                <textarea value={textContent} onChange={handleChangeContent} onMouseDown={handleMouseDown} />
            </div>
        </Draggable>
    );
}

export default Note;
