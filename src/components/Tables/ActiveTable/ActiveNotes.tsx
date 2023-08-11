import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editNote, Note } from "../../../redux/action";
import Modal from "../../Modal/Modal";
import Button from "../../Buttons/Button";
import { ModalStyles } from "../TablesContainer";
import Input from "../../Input/Input";
import TextArea from "../../TextArea/TextArea";
import Select from "../../Select/Select";

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
  buttonActiveStyle: string;
  modalStyles: ModalStyles;
  optionsModal: string[];
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
  buttonActiveStyle,
  modalStyles,
  optionsModal,
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
                    <Button onClick={() => handleEdit(note.id)} className={buttonActiveStyle}>Edit</Button>
                    <Button onClick={() => handleDelete(note.id)} className={buttonActiveStyle}>Delete</Button>
                    <Button onClick={() => handleArchive(note.id)} className={buttonActiveStyle}>Archive</Button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <Modal active={modalActive}>
        <h2 className={modalStyles.h2}>Edit a Note</h2>
        <form onSubmit={handleSubmit} className="modal__noteForm-edit">
          <label htmlFor="noteName">Name:</label>
          <Input type={"text"} id={"noteName"} value={note.name} onChange={handleChangeName} className={modalStyles.input}></Input>
          <label htmlFor="noteContent">Content:</label>
          <TextArea name="noteContent" id="noteContent" value={note.content} onChange={handleChangeContent} className={modalStyles.textarea}></TextArea>
          <label htmlFor="noteCategory">Category:</label>
          <Select name="noteCategory" id="noteCategory" value={note.category} onChange={handleChangeCategory} className={modalStyles.select} options={optionsModal}></Select>
          <input type="submit" value="Submit" className={modalStyles.button}/>
          <Button onClick={handleClose} className={modalStyles.button}>Close</Button>
        </form>
        
      </Modal>
    </div>
  );
};

export default ActiveNotes;
