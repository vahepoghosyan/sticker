import { useState, useEffect } from 'react';
import { notes, prevNotes } from '../store';
import { updateNotes } from '../api';

export const useUpdateNotes = () => {
    const [isSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handler = setInterval(async () => {
            if (JSON.stringify(notes.value) === JSON.stringify(prevNotes.value)) return;
            setIsLoading(true);
            prevNotes.value = notes.value;
            updateNotes(setIsLoading, setIsLoading);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, []);

    return [isSuccess, isLoading];
};
