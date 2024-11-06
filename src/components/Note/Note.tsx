import { useState, ChangeEvent, useEffect } from "react";
import Draggable, {
  DraggableData,
  DraggableEventHandler,
} from "react-draggable";
import "./Note.scss";
import { maxZIndex, notes } from "../Nav/Nav";
import { minimizedList } from "../MinimizedNotes/MinimizedNotes";
import { INote } from "../Notes/types";
import { useDebouncedValue } from "../../hooks/useDebaunce";

interface Prop {
  note: INote;
}

function Note({ note }: Prop) {
  const [activeDrags, setActiveDrags] = useState<number>(0);
  const { id, name, zIndex, position, content } = note;
  const [textContent, setTextContent] = useState(content);

  const debouncedValue = useDebouncedValue(textContent, 1000);

  const handleChangeContent = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setTextContent(value);
  };

  const handleMinimize = () => {
    minimizedList.value = { ...minimizedList.value, [id]: note };
    notes.value = {
      ...notes.value,
      [id]: {
        ...notes.value[id],
        minimized: true,
      },
    };
  };

  const handleRemoveNote = () => {
    const { [id]: qwe, ...rest } = notes.value;
    notes.value = rest;
  };

  const handleMoveNoteUp = () => {
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

  const onStart: DraggableEventHandler = () => {
    setActiveDrags(activeDrags + 1);
    handleMoveNoteUp();
  };

  const onStop: DraggableEventHandler = (_: any, ui: DraggableData) => {
    setActiveDrags(activeDrags - 1);
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
      onStart={onStart}
      onStop={onStop}
    >
      <div
        className="note"
        style={{
          zIndex: zIndex,
        }}
      >
        <strong className="panel">
          <div className="panel-buttons">
            <button className="remove-note" onClick={handleRemoveNote} />
            <button className="minimize" onClick={handleMinimize} />
          </div>
          {name}
        </strong>
        <textarea
          value={textContent}
          onChange={handleChangeContent}
          onMouseDown={handleMoveNoteUp}
        />
      </div>
    </Draggable>
  );
}

export default Note;
