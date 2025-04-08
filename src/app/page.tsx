"use client";
import "katex/dist/katex.min.css";
import { flatten } from "mathjs";
import { useState } from "react";
import Dropdown from "./components/Dropdown";
import Link from "next/link";


export default function Home() {
  const [open,setOpen] = useState(false);

  const toggleDropDown = () => setOpen(!open);


  return (
    <main className="centered" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>

      <h1 className="text-center font-bold text-4xl">Navigation</h1>
      <div className="flex flex-col gap-4 p-10 text-2xl text-center w-1/2 mx-auto">
      <Dropdown label="Music Systems Programming 1">
        <Link href="/notes/pages/MSP1">Data Types</Link>
        <div>Hello Again</div>
      </Dropdown>
      <h2 className="nav-header">Music Sytems Programming 2</h2>
      <h2 className="nav-header">Software Sound Synthesis</h2>
      <h2 className="nav-header">Acoustics/Psychoacoustics</h2>
      <h2 className="nav-header">Music Signal Processing</h2>
      <h2 className="nav-header">Interactive Systems</h2>
      </div>
      


    </main>
  );
}

