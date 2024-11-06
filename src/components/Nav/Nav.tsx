import { v4 as uuidv4 } from "uuid";
import storage from "../../utils/storage";
import "./Nav.scss";
import { signal, effect } from "@preact/signals-react";
import { INotesList, INote } from "../Notes/types";
import { minimizedList } from "../MinimizedNotes/MinimizedNotes";

export const maxZIndex = signal<number>(storage.getMaxZIndex());
export const notes = signal<INotesList>(storage.getStickyNotes());
export const newNote = signal<INote | {}>({});

const handleAddNote = () => {
  maxZIndex.value++;
  const id = uuidv4();
  notes.value = {
    ...notes.value,
    [id]: {
      id,
      name: `new note ${maxZIndex}`,
      position: {
        x: Math.floor((window.innerWidth - 400) * Math.random()),
        y: Math.floor((window.innerHeight - 480) * Math.random()),
      },
      zIndex: maxZIndex.value,
      content: "",
      minimized: false,
    },
  };
};

effect(() => {
  storage.setStickyNotes(notes.value);
  storage.setMazZIndex(maxZIndex.value);
});

const handleRemoveAll = () => {
  notes.value = {};
  minimizedList.value = {};
  storage.setStickyNotes(notes.value);
  storage.setMazZIndex(0);
};

function Nav() {
  return (
    <nav className="nav">
      <div className="logo">Sticker</div>
      <button className="primary" onClick={handleAddNote}>
        New Note
      </button>
      <button className="remove" onClick={handleRemoveAll}>
        Remove All
      </button>
    </nav>
  );
}

export default Nav;
