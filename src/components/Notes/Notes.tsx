import Note from "../Note/Note";
import './Notes.scss';
import { notes } from "../Nav/Nav";
import MinimizedNotes from "../MinimizedNotes/MinimizedNotes";

function Notes() {
  const notesList = Object.entries(notes.value);

  return notesList.length === 0 ? (
    <div className="empty">
      <h1>Add your first sticker</h1>
    </div>
  ) : (
    <>
      {Object.entries(notes.value)
        .filter(([_, note]) => !note.minimized)
        .map(([id, note]) => (
          <Note key={id} note={note} />
        ))}
      <MinimizedNotes />
    </>
  );
}

export default Notes;
