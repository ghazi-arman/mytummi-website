import PhoneFrame from "./PhoneFrame";

const SHOTS: Array<{ src: string; alt: string; caption: string }> = [
  { src: "/screenshots/sensitivities-list.png", alt: "Sensitivities screen ranking top suspects with score bars", caption: "Your top suspects, ranked" },
  { src: "/screenshots/product-detail.png", alt: "Product page for coconut chips showing a score and category chips", caption: "Every product, broken down by category" },
];

export default function Gallery() {
  return (
    <section className="bg-peach-soft px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-4xl font-bold text-ink sm:text-5xl">More to explore</h2>
        <div className="mt-12 flex flex-wrap items-start justify-center gap-10">
          {SHOTS.map((shot) => (
            <figure key={shot.src} className="text-center">
              <PhoneFrame src={shot.src} alt={shot.alt} className="w-52 sm:w-56" />
              <figcaption className="mt-4 text-ink-soft">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
