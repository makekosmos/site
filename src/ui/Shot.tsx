type Img = { src: string; width: number; height: number };

export function Shot({ alt, phone, eager, narrow, ...img }: Img & { alt: string; phone?: boolean; eager?: boolean; narrow?: Img }) {
  const shot = (
    <img
      className="shot"
      src={`/agenda/${img.src}.webp`}
      alt={alt}
      width={img.width}
      height={img.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
  // Offscreen renders carry no OS chrome, so the frame draws the native controls the real window shows.
  if (phone) {
    return (
      <div className="window shot-frame shot-phone">
        <div className="shot-status mono" aria-hidden="true">
          <span>9:41</span>
          <StatusIcons />
        </div>
        {shot}
        <i className="shot-home" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className={`window shot-frame shot-mac${narrow ? " shot-wide-only" : ""}`}>
      <span className="shot-lights" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {narrow ? (
        <picture>
          <source media="(max-width: 640px)" srcSet={`/agenda/${narrow.src}.webp`} width={narrow.width} height={narrow.height} />
          {shot}
        </picture>
      ) : (
        shot
      )}
    </div>
  );
}

function StatusIcons() {
  return (
    <svg viewBox="0 0 40 12" width="40" height="12" fill="currentColor">
      <path d="M1 11 9 3v8z" />
      <path d="M14 4.5a7.5 7.5 0 0 1 10 0L19 11z" />
      <rect x="28" y="2" width="10" height="8" rx="1.5" fill="none" stroke="currentColor" />
      <rect x="29.5" y="3.5" width="6" height="5" rx="0.5" />
    </svg>
  );
}
