'use client';

import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import Link from 'next/link';

type Note = {
  note: string;
};

type NotesCategory = {
  category: string;
  notes: Note[];
};

const NotesNavPage = () => {
  const [notesData, setNotesData] = useState<NotesCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the notes data from the API
    const fetchNotesData = async () => {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotesData(data); // Set the fetched data to the state
    };

    fetchNotesData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedNote(null); // Reset the note selection when changing categories
  };

  const handleNoteChange = (note: string) => {
    setSelectedNote(note); // Set the selected note
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Notes</h1>
      {/* Category selection */}
      <div className="flex flex-col gap-4 p-10 text-2xl text-center w-1/2 mx-auto">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <ul>
          {notesData.map((categoryData) => (
            <Dropdown label={categoryData.category} key={categoryData.category}>
                {categoryData.notes.map((note: Note) => (
                <div key={note.note}>
                    <Link href={`/notes2/${categoryData.category}/${note.note}`}>
                    {note.note}
                    </Link>
                </div>
                ))}
            </Dropdown>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesNavPage;
