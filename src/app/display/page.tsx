import { getMarkdownContent } from '../utils/getMarkdownContent'; // Adjust the path accordingly


export default async function NotesPage() {
  const noteContent = await getMarkdownContent("Test.md"); // Change filename dynamically if needed

  return (
    <main>
      <h1>Math Notes</h1>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: noteContent }} />
    </main>
  );
}
