    import path from "path";
    import fs from "fs";
    
    export default function getNotesPath(){

    // Define the base path for your notes directory
    const basePath = path.join(process.cwd(), 'notes2');
  
    // Get all categories (subdirectories in the notes folder)
      const categories = fs.readdirSync(basePath).filter((name) => {
        const fullPath = path.join(basePath, name);
        return fs.statSync(fullPath).isDirectory(); // only keep directories
      });
  
    // Array to hold all categories and their notes
    const notesData = categories.map((category) => {
      // Get all files in this category (subdirectory)
      const files = fs.readdirSync(path.join(basePath, category));
      // Filter out only the markdown files
      const notes = files.filter(file => file.endsWith('.md')).map(file => ({
        note: file.replace(/\.md$/, ''), // Remove .md extension
        category,
      }));
      return {
        category,
        notes,
      };
    });

    return notesData;
};