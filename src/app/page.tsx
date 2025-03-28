import "katex/dist/katex.min.css";
import katex from "katex";

export default function Home() {
  const equation = "E = mc^2";
  const renderedEquation = katex.renderToString(equation, {
    throwOnError: false,
  });

  return (
    <main className="centered" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to My Math Blog</h1>
      <p>This is an interactive space to explore mathematical concepts.</p>
      <h2>Featured Equation</h2>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        dangerouslySetInnerHTML={{ __html: renderedEquation }}
      />
    </main>
  );
}

