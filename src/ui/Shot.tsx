import { Android } from "./Android";

type Img = { src: string; width: number; height: number };

export function Shot({ alt, phone, eager, narrow, ...img }: Img & { alt: string; phone?: boolean; eager?: boolean; narrow?: Img }) {
  if (phone) return <Android className="shot-phone" src={`/agenda/${img.src}.webp`} alt={alt} />;
  const shot = (
    <img
      className="window shot"
      src={`/agenda/${img.src}.webp`}
      alt={alt}
      width={img.width}
      height={img.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
  if (!narrow) return shot;
  return (
    <picture className="shot-picture">
      <source media="(max-width: 640px)" srcSet={`/agenda/${narrow.src}.webp`} width={narrow.width} height={narrow.height} />
      {shot}
    </picture>
  );
}
