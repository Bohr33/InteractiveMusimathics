import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { getMarkdownContent } from '@/app/utils/getMarkdownContent';
import { Convert2Markdown } from '@/app/utils/Convert2Markdown';

type Props = {
  params: {
    category: string;
    note: string;
  };
};


export async function generateStaticParams() {
  const basePath = path.join(process.cwd(), 'notes2');
  const categories = fs.readdirSync(basePath).filter((name) => {
    const fullPath = path.join(basePath, name);
    return fs.statSync(fullPath).isDirectory(); // only keep directories
  });

  return categories.flatMap((category) => {
    const categoryPath = path.join(basePath, category);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));

    return files.map((filename) => ({
      category,
      note: filename.replace(/\.md$/, ''),
    }));
  });
}


export default async function NotePage({ params }: Props) {
  const { category, note } = await params;

  const filePath = path.join(
    process.cwd(),
    'notes2',
    category,
    `${note}.md`
  );

  console.log(filePath);
  console.log("Hello!");

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    notFound();
  }

  const noteContent = await Convert2Markdown(fileContent);

  return (
    <div className="max-w-3xl mx-auto p-6 prose dark:prose-invert">
      <div className="markdown" dangerouslySetInnerHTML={{ __html: noteContent }} />
    </div>
  );
}
