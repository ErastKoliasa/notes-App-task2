import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editNote, Note } from "../../../redux/action";
import Modal from "../../Modal/Modal";

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
      <h1>Active Notes</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Content</th>
            <th>Category</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => {
            if (!note.archived) {
              return (
                <tr key={note.id}>
                  <td>{note.name}</td>
                  <td>{note.time}</td>
                  <td>{note.content}</td>
                  <td>{note.category}</td>
                  <td>{note.datesMentioned.map((date) => `${date} `)}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(note.id)}>Edit</button>
                    <button onClick={() => handleDelete(note.id)}>Delete</button>
                    <button onClick={() => handleArchive(note.id)}>Archive</button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <Modal active={modalActive}>
        <h2>Edit a Note</h2>
        <form onSubmit={handleSubmit} className="modal__noteForm-edit">
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
          <input type="submit" value="Submit" />
          <button onClick={handleClose}>Close</button>
        </form>
        
      </Modal>
    </div>
  );
};

export default ActiveNotes;
