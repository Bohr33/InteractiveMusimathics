import { useState, useRef, useEffect, ReactNode } from "react";

type DropdownProps = {
  label: ReactNode;
  children: ReactNode;
};

export default function Dropdown({ label, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left bg-white dark:bg-gray-800 text-black dark:text-white">
      <div
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center w-full border px-4 py-2 bg-white dark:bg-gray-800 text-2xl font-medium hover:bg-gray-50 cursor-pointer"
      >
        {label}
      </div>

      {open && (
        <div className="text-center ">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
}
