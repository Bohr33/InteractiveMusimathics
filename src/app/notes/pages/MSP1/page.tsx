import { getMarkdownContent } from '../../../utils/getMarkdownContent'; // Adjust the path accordingly


export default async function Page() {
  const noteContent = await getMarkdownContent("../../app/notes/Copied_Notes/Music_Systems_Programming_1/2_DataTypes_IO.md"); // Change filename dynamically if needed

  return (
    <main>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: noteContent }} />
    </main>
  );
}
