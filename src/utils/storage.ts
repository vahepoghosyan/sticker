import { INote, INotesList } from '../components/Notes/types';

const storage = {
    setStickyNotes: (notes: INotesList) => localStorage.setItem('notes', JSON.stringify(notes)),
    getStickyNotes: () => {
        const notes = localStorage.getItem('notes');

        if (notes !== 'undefined' && notes) {
            return JSON.parse(notes);
        }

        return {};
    },
    setMazZIndex: (zIndex: number) => localStorage.setItem('maxZIndex', JSON.stringify(zIndex)),
    getMaxZIndex: () => {
        const maxZIndex = localStorage.getItem('maxZIndex');

        if (maxZIndex !== 'undefined' && maxZIndex) {
            return JSON.parse(maxZIndex);
        }

        return 0;
    },
    getMinimizedNotes: () => {
        const notes = localStorage.getItem('notes');

        if (notes !== 'undefined' && notes) {
            const parsedNotes = JSON.parse(notes);

            const minimizedNotes = Object.fromEntries(Object.entries(parsedNotes).filter(([_, note]) => (note as INote).minimized)) as INotesList;

            return minimizedNotes;
        }

        return {};
    },
};

export default storage;
