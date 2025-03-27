import { getMarkdownContent } from '../utils/getMarkdownContent'; // Adjust the path accordingly


export default async function FilterPage() {
  const noteContent = await getMarkdownContent("Filters.md"); // Change filename dynamically if needed

  return (
    <main>
      <h1>Math Notes</h1>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: noteContent }} />
    </main>
  );
}
