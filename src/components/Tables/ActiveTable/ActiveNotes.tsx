import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editNote, Note } from "../../../redux/action";
import Modal from "../../Modal/Modal";
import Button from "../../Buttons/Button";

interface ActiveNotesProps {
  notes: Note[];
  handleDelete: (id: number) => void;
  handleArchive: (id: number) => void;
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  cleanField: () => void;
}

const ActiveNotes: React.FC<ActiveNotesProps> = ({
  notes,
  handleDelete,
  handleArchive,
  handleChangeName,
  handleChangeContent,
  handleChangeCategory,
  note,
  setNote,
  cleanField,
}) => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const buttonStyle: string = "mt-1 mr-1.5 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-center rounded-md";
  const buttonModalStyle: string = "mt-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-center font-bold rounded-md cursor-pointer"

  const handleEdit = (id: number) => {
    const currentNote = notes.find((note) => note.id === id);
    if (currentNote) {
      setNote({
        ...currentNote,
      });
      setModalActive(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editNote(note));
    setModalActive(false);
    cleanField();
  };

  const handleClose = () => {
    setModalActive(false);
    cleanField();
  };

  return (
    <div>
      <h1 className="my-10 text-4xl text-pink-700 text-center font-bold">Active Notes</h1>
      <table className="border-collapse w-full">
        <thead className="text-center text-white bg-rose-500">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Created</th>
            <th className="p-2">Content</th>
            <th className="p-2">Category</th>
            <th className="p-2">Dates</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => {
            if (!note.archived) {
              return (
                <tr key={note.id} className="text-center bg-rose-200 hover:bg-rose-100">
                  <td>{note.name}</td>
                  <td>{note.time}</td>
                  <td>{note.content}</td>
                  <td>{note.category}</td>
                  <td>{note.datesMentioned.map((date) => `${date} `)}</td>
                  <td className="flex flex-col">
                    <Button onClick={() => handleEdit(note.id)} className={buttonStyle}>Edit</Button>
                    <Button onClick={() => handleDelete(note.id)} className={buttonStyle}>Delete</Button>
                    <Button onClick={() => handleArchive(note.id)} className={buttonStyle}>Archive</Button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <Modal active={modalActive}>
        <h2 className="text-2xl m-3 text-pink-700 text-center font-bold">Edit a Note</h2>
        <form onSubmit={handleSubmit} className="modal__noteForm-edit">
          <label htmlFor="noteName">Name:</label>
          <input type="text" id="noteName" value={note.name} onChange={handleChangeName} required className="px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm 
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
          <label htmlFor="noteContent">Content:</label>
          <textarea name="noteContent" id="noteContent" value={note.content} onChange={handleChangeContent} required className="px-3 py-2  border border-slate-400 rounded-md text-sm shadow-sm 
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"></textarea>
          <label htmlFor="noteCategory">Category:</label>
          <select name="noteCategory" id="noteCategory" value={note.category} onChange={handleChangeCategory} required className="px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm 
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <input type="submit" value="Submit" className={buttonModalStyle}/>
          <Button onClick={handleClose} className={buttonModalStyle}>Close</Button>
        </form>
        
      </Modal>
    </div>
  );
};

export default ActiveNotes;
