import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 border-r-2 border-white-200 w-1/8 h-screen fixed">
      <nav className="flex flex-col items-center space-y-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
          <Link href="/fourier">Fourier</Link>
          <Link href="/display">Notes</Link>
          <Link href="/filters">Filters</Link>
          <Link href="/phasor">phasor</Link>
          <Link href="/MathTest">mathTest</Link>
          <Link href="/FilterVisualizer">FilterVisualizer</Link>
          <Link href="/notes2">New Notes</Link>
      </nav>

      </header>
      <main className="p-4 ml-50">{children}</main>
    </div>
  );
}
