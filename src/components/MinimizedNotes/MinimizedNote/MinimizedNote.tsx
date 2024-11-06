import { notes, maxZIndex } from "../../Nav/Nav";
import { minimizedList } from "../MinimizedNotes";
import { INote } from "../../Notes/types";
import "./MinimizedNote.scss";

interface Prop {
  note: INote;
}

function MinimizedNote({ note }: Prop) {
  const { id, name } = note;

  const handleMaximize = () => {
    maxZIndex.value += 1;
    notes.value = {
      ...notes.value,
      [id]: { ...note, minimized: false, zIndex: maxZIndex.value },
    };
    delete minimizedList.value[id];
  };

  const handleRemoveNote = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    const { [id]: qwe, ...rest } = notes.value;
    notes.value = rest;
    delete minimizedList.value[id];
  };

  return (
    <div className="minimized-note" onClick={handleMaximize}>
      <div className="panel-buttons">
        <button className="remove-note" onClick={handleRemoveNote} />
      </div>
      <strong>{name}</strong>
    </div>
  );
}

export default MinimizedNote;
