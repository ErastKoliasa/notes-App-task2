import React from "react";
import { Note } from "../../../redux/action";
import "./archived.css"

interface ArchivedNotesProps {
  notes: Note[];
  handleDelete: (id: number) => void;
  handleArchive: (id: number) => void;
}

const ArchivedNotes: React.FC<ArchivedNotesProps> = ({ notes, handleDelete, handleArchive }) => {
  return (
    <div>
      <h1>Archive Notes</h1>
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
            if (note.archived) {
              return (
                <tr key={note.id} className="archived">
                  <td>{note.name}</td>
                  <td>{note.time}</td>
                  <td>{note.content}</td>
                  <td>{note.category}</td>
                  <td>{note.datesMentioned.map((date) => `${date} `)}</td>
                  <td className="actions">
                    <button onClick={() => handleDelete(note.id)}>Delete</button>
                    <button onClick={() => handleArchive(note.id)}>Unarchive</button>
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
