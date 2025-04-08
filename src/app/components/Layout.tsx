import Link from "next/link";


//This function creates the navigation bar on the side. It is included with every loaded page on the site.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 border-r-2 border-white-200 w-1/8 h-screen fixed">
      <nav className="flex flex-col items-center space-y-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
          <Link href="/phasor">phasor</Link>
          <Link href="/FilterVisualizer">FilterVisualizer</Link>
          <Link href="/notes2">New Notes</Link>
          <Link href="/test">Notes Nav</Link>
      </nav>

      </header>
      <main className="p-4 ml-50">{children}</main>
    </div>
  );
}
