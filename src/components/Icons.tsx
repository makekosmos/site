import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Stroke className="arrow" width={14} height={14} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Stroke width={13} height={13} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Stroke>
  );
}

export function CheckSquare(props: IconProps) {
  return (
    <Stroke width={12} height={12} {...props}>
      <path d="m9 11 3 3 8-8" />
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
    </Stroke>
  );
}

export function Notebook(props: IconProps) {
  return (
    <Stroke width={12} height={12} {...props}>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M9 7h6" />
    </Stroke>
  );
}

export function Mic(props: IconProps) {
  return (
    <Stroke width={12} height={12} {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M19 10a7 7 0 0 1-14 0M12 17v5" />
    </Stroke>
  );
}

export function Timer(props: IconProps) {
  return (
    <Stroke width={12} height={12} {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2M10 2h4" />
    </Stroke>
  );
}

export function AppleLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16.365 1.43c0 1.14-.47 2.2-1.23 3.02-.79.85-2.08 1.5-3.16 1.42-.13-1.11.42-2.28 1.19-3.08.83-.86 2.21-1.48 3.2-1.36zm3.63 17.02c-.57 1.31-.85 1.9-1.59 3.06-1.03 1.63-2.48 3.66-4.28 3.68-1.6.02-2.01-1.05-4.18-1.04-2.17.01-2.62 1.06-4.22 1.04-1.8-.02-3.17-1.85-4.2-3.48C-0.7 17.7-1.03 12.2 1.06 9.5c1.05-1.35 2.71-2.2 4.27-2.2 1.58 0 2.58 1.07 3.89 1.07 1.27 0 2.04-1.07 3.87-1.07 1.38 0 2.84.75 3.88 2.05-3.41 1.87-2.85 6.73.65 8.13z"
      />
    </svg>
  );
}

export function WindowsLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M3 5.6 10.75 4.5v7.1H3zM11.9 4.34 21 3v8.6h-9.1zM3 12.9h7.75v7.1L3 18.9zM11.9 12.9H21V21l-9.1-1.34z"
      />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <Stroke width={15} height={15} strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </Stroke>
  );
}
