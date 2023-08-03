import React from "react";
import { Note } from "../../../redux/action";

interface SummaryTableProps {
  notes: Note[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ notes }) => {
  const categories = ["Task", "Random Thought", "Idea"];
  return (
    <div>
      <h1>Summary</h1>
      <table>
        <thead>
          <tr>
            <th>Note Category</th>
            <th>Active</th>
            <th>Archived</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const activeCount = notes.filter((note) => note.category === category && !note.archived).length;
            const archivedCount = notes.filter((note) => note.category === category && note.archived).length;
            return (
              <tr key={category}>
                <td>{category}</td>
                <td>{activeCount}</td>
                <td>{archivedCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
