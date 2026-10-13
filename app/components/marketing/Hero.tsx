import HeroAnimation from "./HeroAnimation";

const APP_STORE_URL = "https://apps.apple.com/us/app/my-tummi/id6761124782";

export default function Hero() {
  return (
    <section className="overflow-hidden px-4 pt-28 pb-8 sm:px-6 lg:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-5xl items-start gap-4 lg:items-start lg:gap-8 lg:grid-cols-[1fr_auto_15rem]">
        <div className="max-w-md pt-6 max-lg:mx-auto max-lg:mb-10 max-lg:max-w-xl max-lg:text-center">
          <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Find the foods behind your symptoms
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            Log your meals and how you feel. My Tummi spots the patterns and shows
            which foods are your likely triggers.
          </p>
          <div className="mt-8 max-lg:flex max-lg:justify-center">
            <div className="flex flex-col items-center gap-2 lg:items-start">
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
                  width={150}
                  height={50}
                />
              </a>
              <p className="text-xs text-ink-soft">No cost. No subscription. No catch.</p>
            </div>
          </div>
        </div>

        {/* Mobile: circle indicators + active description */}
        <div
          id="hero-steps-mobile"
          className="flex flex-col items-center gap-1 max-lg:order-1 lg:hidden"
          aria-label="What the animation is showing"
        >
          <div className="mobile-dots">
            <span className="dot" data-step="0">1</span>
            <span className="dot" data-step="1">2</span>
            <span className="dot" data-step="2">3</span>
            <span className="dot" data-step="3">4</span>
            <span className="dot" data-step="4">5</span>
          </div>
          <p id="hero-steps-mobile-title" className="mobile-step-title"></p>
          <p id="hero-steps-mobile-desc" className="mobile-step-desc"></p>
        </div>

        <div className="max-lg:order-2 max-lg:flex max-lg:justify-center">
          <HeroAnimation />
        </div>

        {/* Desktop: vertical list beside phone */}
        <ol
          id="hero-steps"
          className="hidden flex-col gap-0.5 pt-10 lg:flex max-lg:order-3"
          aria-label="What the animation is showing"
        >
          <li><div className="num">1</div><div><b>Log a meal</b><p className="wd"></p></div></li>
          <li><div className="num">2</div><div><b>Log your day</b><p className="wd"></p></div></li>
          <li><div className="num">3</div><div><b>Track symptoms</b><p className="wd"></p></div></li>
          <li><div className="num">4</div><div><b>See your insights</b><p className="wd"></p></div></li>
          <li><div className="num">5</div><div><b>Run an experiment</b><p className="wd"></p></div></li>
        </ol>
      </div>
    </section>
  );
}
