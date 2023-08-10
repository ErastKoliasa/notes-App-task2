import React from "react";
import { Note } from "../../../redux/action";

interface SummaryTableProps {
  notes: Note[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ notes }) => {
  const categories = ["Task", "Random Thought", "Idea"];
  return (
    <div>
      <h1 className="my-10 text-4xl text-yellow-500 text-center font-bold">Summary</h1>
      <table className="border-collapse w-full">
        <thead className="text-center text-white bg-yellow-300">
          <tr>
            <th className="p-2">Note Category</th>
            <th className="p-2">Active</th>
            <th className="p-2">Archived</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const activeCount = notes.filter((note) => note.category === category && !note.archived).length;
            const archivedCount = notes.filter((note) => note.category === category && note.archived).length;
            return (
              <tr key={category} className="text-center bg-amber-100 hover:bg-yellow-50">
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
