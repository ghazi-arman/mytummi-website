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
            className="inline-block transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              className="h-[50px] w-auto"
            />
          </a>
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/google-play-badge.svg"
              alt="Get it on Google Play"
              className="h-[50px] w-auto opacity-40"
            />
            <span className="absolute -top-2 -right-3 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-semibold text-white">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
