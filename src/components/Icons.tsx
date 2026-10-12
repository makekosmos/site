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
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
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

export function Lock(props: IconProps) {
  return (
    <Stroke width={16} height={16} strokeWidth={1.8} {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Stroke>
  );
}

export function Phone(props: IconProps) {
  return (
    <Stroke width={16} height={16} strokeWidth={1.8} {...props}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </Stroke>
  );
}

export function Sparkles(props: IconProps) {
  return (
    <Stroke width={16} height={16} strokeWidth={1.8} {...props}>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </Stroke>
  );
}

export function Monitor(props: IconProps) {
  return (
    <Stroke width={16} height={16} strokeWidth={1.8} {...props}>
      <rect x="2" y="4" width="20" height="13" rx="2.5" />
      <path d="M8 21h8M12 17v4" />
    </Stroke>
  );
}

export function Branch(props: IconProps) {
  return (
    <Stroke width={16} height={16} strokeWidth={1.8} {...props}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="8" r="2" />
      <path d="M6 7v10M18 10c0 4-6 3-11.5 7" />
    </Stroke>
  );
}

export function Inbox(props: IconProps) {
  return (
    <Stroke width={16} height={16} {...props}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </Stroke>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Stroke width={16} height={16} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Stroke>
  );
}

export function Archive(props: IconProps) {
  return (
    <Stroke width={16} height={16} {...props}>
      <rect x="2" y="3" width="20" height="5" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4" />
    </Stroke>
  );
}

export function Moon(props: IconProps) {
  return (
    <Stroke width={16} height={16} {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
    </Stroke>
  );
}

export function Doc(props: IconProps) {
  return (
    <Stroke width={16} height={16} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </Stroke>
  );
}

export function Download(props: IconProps) {
  return (
    <Stroke width={15} height={15} {...props}>
      <path d="M12 4v12M6 11l6 6 6-6M5 21h14" />
    </Stroke>
  );
}
