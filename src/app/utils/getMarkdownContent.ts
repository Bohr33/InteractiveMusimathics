import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMath from "remark-math"
import { rehype } from "rehype";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkHtml from "remark-html";

export async function getMarkdownContent(filename: string) {

    const filePath = path.join(process.cwd(), "src","app", "notes", filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    
    // Preprocess to add space after '#' for headers
    const fixedContent = fileContent.replace(/(#+)([^\s#])/g, '$1 $2');
    // Parse frontmatter and markdown content
    const { content } = matter(fixedContent);
  
    // Ensure markdown is converted correctly, including headers
    const processedContent = await remark()
      // .use(remarkParse)   // Parse Markdown
      .use(remarkGfm)     // Enables GitHub-style Markdown (lists, tables)
      .use(remarkMath)    // Enables inline & block math
      .use(remarkHtml)
      .process(content);
  
      const finalHtml = await rehype()
      .use(rehypeKatex)        // Render KaTeX math equations
      .use(rehypeStringify)    // Convert the HTML back into a string
      .process(processedContent.toString())

      console.log(finalHtml);
    
    // Convert markdown to HTML
    return finalHtml.toString();
  }