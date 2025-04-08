// src/app/api/notes/route.ts

import fs from 'fs';
import path from 'path';

export async function GET() {
  const basePath = path.join(process.cwd(), 'notes2');
    // Get all categories (subdirectories in the notes folder)
    const categories = fs.readdirSync(basePath).filter((name) => {
        const fullPath = path.join(basePath, name);
        return fs.statSync(fullPath).isDirectory(); // only keep directories
    });

  const notesData = categories.map((category) => {
    const categoryPath = path.join(basePath, category);
    const files = fs.readdirSync(categoryPath);

    // Return category and the corresponding notes (files)
    return {
      category,
      notes: files.filter((file) => file.endsWith('.md')).map((note) => ({
        note: note.replace(/\.md$/, ''), // Remove the .md extension
      })),
    };
  });

  return new Response(JSON.stringify(notesData));
}
