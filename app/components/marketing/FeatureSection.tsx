import PhoneFrame from "./PhoneFrame";

interface FeatureSectionProps {
  id?: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  imageSide: "left" | "right";
  tone: "cream" | "peach";
}

export default function FeatureSection({ id, title, body, src, alt, imageSide, tone }: FeatureSectionProps) {
  return (
    <section id={id} className={`scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8 ${tone === "peach" ? "bg-peach-soft" : "bg-cream"}`}>
      <div
        className={`mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 md:gap-16 ${
          imageSide === "left" ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <PhoneFrame src={src} alt={alt} className="w-60 shrink-0 sm:w-64" />
        <div className="max-w-xl text-center md:text-left">
          <h3 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{body}</p>
        </div>
      </div>
    </section>
  );
}
