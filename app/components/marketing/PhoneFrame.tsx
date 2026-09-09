import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function PhoneFrame({ src, alt, className = "", priority = false, sizes = "(max-width: 768px) 60vw, 280px" }: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[302/654] overflow-hidden rounded-[2.5rem] border-[6px] border-ink bg-ink shadow-2xl shadow-ink/20 ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
    </div>
  );
}
