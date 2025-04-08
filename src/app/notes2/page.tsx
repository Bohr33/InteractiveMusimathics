import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import getNotesPath from '../utils/getNotesPath';

export default async function NotesNavPage() {
    const notesData = getNotesPath();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Notes</h1>
      
      {notesData.map((categoryData) => (
        <div key={categoryData.category}>
          <h2 className="text-2xl font-semibold mt-6 mb-2">{categoryData.category}</h2>
          <ul>
            {categoryData.notes.map((note) => (
              <li key={note.note}>
                <Link
                  href={`/notes2/${note.category}/${note.note}`}
                  className="text-blue-500 hover:underline"
                >
                  {note.note}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
