import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveNotes from "./ActiveTable/ActiveNotes";
import ArchivedNotes from "./ArchiveTable/ArchivedNotes";
import { addNote, archiveNote, deleteNote } from "../../redux/action";
import Modal from "../Modal/Modal";
import { Note } from "../../redux/action";
import SummaryTable from "./SummaryTable/SummaryTable";
import { NotesState } from "../../redux/reducer";
import "./Tables.css"

const TableContainer = () => {
  const notes = useSelector((state: NotesState) => state.notes);
  const [modalActive, setModalActive] = useState(false);
  const [note, setNote] = useState<Note>({
    id: 0,
    name: "",
    time: "",
    content: "",
    category: "Task",
    datesMentioned: [],
    archived: false,
  });
  const dispatch = useDispatch();

  const cleanField = () => {
    setNote({
      id: 0,
      name: "",
      time: "",
      content: "",
      category: "Task",
      datesMentioned: [],
      archived: false,
    });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleArchive = (id: number) => {
    dispatch(archiveNote(id));
  };

  const extractDates = (content: string) => {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    return content.match(dateRegex) || [];
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      name: event.target.value,
    });
  };

  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({
      ...note,
      content: event.target.value,
      datesMentioned: extractDates(event.target.value),
    });
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNote({
      ...note,
      category: event.target.value,
    });
  };

  const handleAdd = () => {
    setModalActive(true);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      ...note,
      id: new Date().getTime(),
      time: new Date().toLocaleString(),
      archived: false,
    };
    dispatch(addNote(newNote));
    cleanField();
    setModalActive(false);
  };

  const handleClose = () => {
    setModalActive(false);
    cleanField();
  };

  return (
    <div>
      <ActiveNotes
        notes={notes}
        handleDelete={handleDelete}
        handleArchive={handleArchive}
        note={note}
        setNote={setNote}
        handleChangeName={handleChangeName}
        handleChangeContent={handleChangeContent}
        handleChangeCategory={handleChangeCategory}
        cleanField={cleanField}
      />
      <div className="button__noteAdd-wrapper">
        <button onClick={handleAdd} className="button__note-add ">Add Note</button>
      </div>
      <ArchivedNotes notes={notes} handleDelete={handleDelete} handleArchive={handleArchive} />
      <SummaryTable notes={notes} />
      <Modal active={modalActive}>
        <h2>Add a Note</h2>
        <form onSubmit={handleAddNote} className="modal__noteForm-add">
          <label htmlFor="noteName">Name:</label>
          <input type="text" id="noteName" value={note.name} onChange={handleChangeName} required />
          <label htmlFor="noteContent">Content:</label>
          <textarea name="noteContent" id="noteContent" value={note.content} onChange={handleChangeContent} required></textarea>
          <label htmlFor="noteCategory">Category:</label>
          <select name="noteCategory" id="noteCategory" value={note.category} onChange={handleChangeCategory} required>
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <input type="submit" value="Add" />
          <button onClick={handleClose}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default TableContainer;
