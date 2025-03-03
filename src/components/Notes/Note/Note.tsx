import { useState, ChangeEvent, useEffect, useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { notes } from '../../../store';
import { INote } from '../types';
import { useDebouncedValue } from '@hooks/useDebounce';

import './Note.scss';

interface Prop {
    note: INote;
    handleMinimize: (id: string, note: INote) => (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleRemoveNote: (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleMoveNoteUp: (id: string, zIndex: number) => void;
    handleEditNoteName: (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    onStart: (id: string, zIndex: number) => DraggableEventHandler;
    onStop: (id: string) => DraggableEventHandler;
}

function Note({ note, handleMinimize, handleRemoveNote, handleMoveNoteUp, handleEditNoteName, onStop, onStart }: Prop) {
    const { id, name, zIndex, position, content } = note;
    const [textContent, setTextContent] = useState(content);
    const [toggleNoteName, setToggleNoteName] = useState(false);
    const debouncedValue = useDebouncedValue(textContent, 1000);
    const textRef = useRef<HTMLInputElement | null>(null);

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
                    <div className="note-name">
                        <input disabled={!toggleNoteName} ref={textRef} type="text" value={name} onChange={handleEditNoteName(id)} />
                    </div>

                    <div
                        className="edit-button"
                        onClick={() => {
                            setToggleNoteName(!toggleNoteName);
                            setTimeout(() => {
                                textRef.current?.focus();
                            }, 0);
                        }}
                    >
                        {!toggleNoteName ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                            </svg>
                        )}
                    </div>
                </strong>
                <textarea value={textContent} onChange={handleChangeContent} onMouseDown={handleMouseDown} />
            </div>
        </Draggable>
    );
}

export default Note;
