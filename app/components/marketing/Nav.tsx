export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-peach bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="font-display text-2xl font-bold text-ink">My Tummi</a>
        <div className="flex items-center gap-6 sm:gap-8">
          <a href="#how-it-works" className="hidden text-ink-soft transition-colors hover:text-ink sm:block">How it works</a>
          <a href="#features" className="hidden text-ink-soft transition-colors hover:text-ink sm:block">Features</a>
          <a href="#download" className="rounded-full bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-dark">Download</a>
        </div>
      </div>
    </nav>
  );
}
