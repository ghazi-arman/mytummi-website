export default function Footer() {
  return (
    <footer className="border-t border-peach bg-cream px-4 py-12 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h3 className="font-display text-2xl font-bold">My Tummi</h3>
        <p className="mt-2 text-ink-soft">Track your food sensitivities and improve your health</p>
        <div className="mt-6 flex justify-center gap-6">
          <a href="/privacy-policy" className="text-ink-soft transition-colors hover:text-ink">Privacy Policy</a>
          <a href="/terms-of-service" className="text-ink-soft transition-colors hover:text-ink">Terms of Service</a>
          <a href="mailto:support@mytummi.app" className="text-ink-soft transition-colors hover:text-ink">Contact</a>
        </div>
        <p className="mt-8 text-sm text-ink-soft/70">© {new Date().getFullYear()} My Tummi. All rights reserved.</p>
      </div>
    </footer>
  );
}
