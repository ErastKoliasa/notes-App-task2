import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveNotes from "./ActiveTable/ActiveNotes";
import ArchivedNotes from "./ArchiveTable/ArchivedNotes";
import { addNote, archiveNote, deleteNote } from "../../redux/action";
import Modal from "../Modal/Modal";
import { Note } from "../../redux/action";
import SummaryTable from "./SummaryTable/SummaryTable";
import { NotesState } from "../../redux/reducer";
import Button from "../Buttons/Button";

export const buttonActiveStyle: string = "m-3 mt-3 p-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-center rounded-md";

export interface ModalStyles {
  h2: string;
  input: string;
  textarea: string;
  select: string;
  button: string;
}

export const modalStyles : ModalStyles = {
  h2: "text-2xl m-3 text-pink-700 text-center font-bold",
  input: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
  textarea: "px-3 py-2  border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
  select: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
  button: "mt-1 p-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-center font-bold rounded-md cursor-pointer",
}

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
        buttonActiveStyle = {buttonActiveStyle}
        modalStyles={modalStyles}
      />
      <div className="grid place-content-end">
        <Button onClick={handleAdd} className={buttonActiveStyle}>Add Note</Button>
      </div>
      <ArchivedNotes notes={notes} handleDelete={handleDelete} handleArchive={handleArchive} />
      <SummaryTable notes={notes} />
      <Modal active={modalActive}>
        <h2 className={modalStyles.h2}>Add a Note</h2>
        <form onSubmit={handleAddNote} className="modal__noteForm-add">
          <label htmlFor="noteName">Name:</label>
          <input type="text" id="noteName" value={note.name} onChange={handleChangeName} required className={modalStyles.input}/>
          <label htmlFor="noteContent">Content:</label>
          <textarea name="noteContent" id="noteContent" value={note.content} onChange={handleChangeContent} required className={modalStyles.textarea}></textarea>
          <label htmlFor="noteCategory">Category:</label>
          <select name="noteCategory" id="noteCategory" value={note.category} onChange={handleChangeCategory} required className={modalStyles.select}>
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <input type="submit" value="Add" className={modalStyles.button} />
          <Button onClick={handleClose} className={modalStyles.button}>Close</Button>
        </form>
      </Modal>
    </div>
  );
};

export default TableContainer;
