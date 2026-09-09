const APP_STORE_URL = "https://apps.apple.com/us/app/my-tummi/id6761124782";

export default function DownloadCta() {
  return (
    <section id="download" className="scroll-mt-16 bg-peach px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">Start listening to your gut</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
          My Tummi is free to download. Your first insights are just a few logged meals away.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-primary-dark"
          >
            Download for iOS
          </a>
          <span className="rounded-full border-2 border-ink/15 px-8 py-4 text-lg font-semibold text-ink-soft">
            Coming soon to Android
          </span>
        </div>
      </div>
    </section>
  );
}
