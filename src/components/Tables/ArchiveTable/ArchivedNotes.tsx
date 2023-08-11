import React from "react";
import { Note } from "../../../redux/action";
import Button from "../../Buttons/Button";

interface ArchivedNotesProps {
  notes: Note[];
  handleDelete: (id: number) => void;
  handleArchive: (id: number) => void;
}

const ArchivedNotes: React.FC<ArchivedNotesProps> = ({ notes, handleDelete, handleArchive }) => {
  const buttonStyle: string = "mt-1 mr-1.5 bg-gradient-to-r from-yellow-500 to-pink-500 text-white text-center rounded-md";

  return (
    <div>
      <h1 className="my-10 text-4xl text-orange-600 text-center font-bold">Archive Notes</h1>
      <table className="border-collapse w-full">
        <thead className="text-center text-white bg-orange-400">
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
            if (note.archived) {
              return (
                <tr key={note.id} className="text-center bg-orange-200 hover:bg-orange-100">
                  <td className="line-through">{note.name}</td>
                  <td className="line-through">{note.time}</td>
                  <td className="line-through">{note.content}</td>
                  <td className="line-through">{note.category}</td>
                  <td className="line-through">{note.datesMentioned.map((date) => `${date} `)}</td>
                  <td className="flex flex-col">
                    <Button onClick={() => handleDelete(note.id)} className={buttonStyle}>Delete</Button>
                    <Button onClick={() => handleArchive(note.id)} className={buttonStyle}>Unarchive</Button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedNotes;
