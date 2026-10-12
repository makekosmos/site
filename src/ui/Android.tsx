// Adapted from Magic UI's Android mockup (MIT, magicui.design), with the camera drawn above the screen.
export function Android({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 380 830" role="img" aria-label={alt}>
      <path d="M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z" fill="#404040" />
      <path d="M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z" fill="#404040" />
      <path
        d="M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z"
        fill="#404040"
      />
      <path
        d="M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z"
        fill="#161616"
      />
      <defs>
        <clipPath id="android-screen">
          <rect width="360" height="800" rx="33" ry="25" transform="translate(9 14)" />
        </clipPath>
      </defs>
      <image href={src} x="9" y="14" width="360" height="800" preserveAspectRatio="xMidYMid slice" clipPath="url(#android-screen)" />
      <circle cx="189" cy="28" r="6" fill="#000" />
    </svg>
  );
}
