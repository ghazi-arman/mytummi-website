import PhoneFrame from "./PhoneFrame";

const APP_STORE_URL = "https://apps.apple.com/us/app/my-tummi/id6761124782";

// Hero fan, left to right. Center phone should stay at index 1; side phones hide on mobile.
const FAN: Array<{ src: string; alt: string; className: string; priority?: boolean }> = [
  {
    src: "/screenshots/sensitivity-detail.png",
    alt: "Sensitivity detail screen showing a likelihood score of 68 out of 100 with a symptom breakdown",
    className: "hidden w-56 -rotate-6 md:block",
  },
  {
    src: "/screenshots/dashboard.png",
    alt: "My Tummi dashboard showing symptom trends and potential sensitivities",
    className: "z-10 w-64 sm:w-72",
    priority: true,
  },
  {
    src: "/screenshots/sensitivity-alert.png",
    alt: "Product scan showing a sensitivity alert for whole milk powder",
    className: "hidden w-56 rotate-6 md:block",
  },
];

export default function Hero() {
  return (
    <section className="overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-5xl font-bold leading-tight text-ink sm:text-6xl lg:text-7xl">
          Finally understand what your gut is telling you
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          My Tummi connects what you eat with how you feel. Log your meals and symptoms,
          and let the patterns reveal your food sensitivities.
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
          <a
            href="#how-it-works"
            className="rounded-full border-2 border-peach px-8 py-4 text-lg font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            See how it works
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl items-end justify-center gap-6">
        {FAN.map((shot) => (
          <PhoneFrame key={shot.src} src={shot.src} alt={shot.alt} className={shot.className} priority={shot.priority} />
        ))}
      </div>
    </section>
  );
}
