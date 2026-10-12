"use client";

import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-peach bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="font-display text-2xl font-bold text-ink">My Tummi</a>
        <div className="flex items-center gap-6 sm:gap-8">
          <a href="/#how-it-works" className="hidden text-ink-soft transition-colors hover:text-ink sm:block">How it works</a>
          <a href="/#features" className="hidden text-ink-soft transition-colors hover:text-ink sm:block">Features</a>
          <a href="/blog" className="hidden text-ink-soft transition-colors hover:text-ink sm:block">Blog</a>
          <a href="#download" className="rounded-full bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-dark">Download</a>
          <button
            className="sm:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-peach bg-cream px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-4">
            <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="text-ink-soft transition-colors hover:text-ink">How it works</a>
            <a href="/#features" onClick={() => setMenuOpen(false)} className="text-ink-soft transition-colors hover:text-ink">Features</a>
            <a href="/blog" onClick={() => setMenuOpen(false)} className="text-ink-soft transition-colors hover:text-ink">Blog</a>
          </div>
        </div>
      )}
    </nav>
  );
}
