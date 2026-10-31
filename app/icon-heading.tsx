import type { ReactNode } from "react";

const symbols = {
  person: <><circle cx="12" cy="7" r="3.5" /><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2" /></>,
  book: <><path d="M12 5.5C9 3.5 5.5 3.5 2.5 4.5v15c3-1 6.5-1 9.5 1 3-2 6.5-2 9.5-1v-15c-3-1-6.5-1-9.5 1Zm0 0v15" /></>,
  tools: <><path d="m14 6 4 4 3.5-3.5a6 6 0 0 1-8 8L6 22l-4-4 7.5-7.5a6 6 0 0 1 8-8L14 6Z" /></>,
  media: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h10M14 11h3M14 15h3M7 18h10" /><rect x="7" y="11" width="4" height="4" rx=".5" /></>,
  education: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c3 3 9 3 12 0v-7M22 8v8" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  wechat: <><path d="M16.8 9.1a6 6 0 0 0-6-5.1C6.5 4 3 6.6 3 9.8A5.3 5.3 0 0 0 5.2 14l-.7 2.4 2.8-1.3 1.8.4" /><path d="M21 14c0-2.8-2.7-5-6-5s-6 2.2-6 5 2.7 5 6 5c.8 0 1.5-.1 2.2-.4l2.4 1.3-.6-2.2A4.8 4.8 0 0 0 21 14Z" /><g fill="currentColor" stroke="none"><circle cx="7.5" cy="8" r=".75" /><circle cx="12" cy="8" r=".75" /><circle cx="12.7" cy="13.3" r=".75" /><circle cx="17.2" cy="13.3" r=".75" /></g></>,
  car: <><path d="m5 10 2-6h10l2 6M3 10h18v8H3v-8Zm1 8v3m16-3v3M1 10h2m18 0h2M7 14h1m8 0h1" /></>,
  mechanism: <><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><circle cx="8" cy="6" r="2.5" /><circle cx="16" cy="6" r="2.5" /><path d="M5.7 15.6 7.3 8.4m9.4 0 1.6 7.2M10.5 6h3M7.5 18h9" /></>,
  gripper: <><path d="M8 3h8v5H8V3Zm4 5v4M6 12h12M6 12l-4 5 4 5 3-3m9-7 4 5-4 5-3-3" /></>,
  leaf: <><path d="M20 3C9 2 3 7 3 13a7 7 0 0 0 7 7c7 0 11-7 10-17ZM3 22 16 9M7 18v-6m0 6h6" /></>,
  fold: <><path d="m3 9 18-6-6 18-4-8-8-4Zm8 4L21 3" /></>,
  target: <><circle cx="11" cy="13" r="8" /><circle cx="11" cy="13" r="4" /><path d="m11 13 9-9m-1-2v4h4" /></>,
  chart: <><path d="M3 3v18h18M7 16l4-6 4 3 6-8" /><path d="M17 5h4v4" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7l10-5Zm-10 10 10 5 10-5M2 17l10 5 10-5" /></>,
  check: <><rect x="4" y="4" width="16" height="18" rx="2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="m8 13 3 3 5-6" /></>,
  team: <><circle cx="9" cy="7" r="3" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2" /></>,
  microscope: <><path d="m9 3 4-2 5 10-4 2L9 3Zm3 9-2 1M4 16h8M7 21h13M8 16v5m8-7a5 5 0 0 0 4-7" /></>,
  droplet: <><path d="M12 2C10 6 4 10 4 15a8 8 0 0 0 16 0c0-5-6-9-8-13Z" /><path d="M8 15a4 4 0 0 0 4 4" /></>,
  cycle: <><path d="M3 10a9 9 0 0 1 15-5l3 3M21 3v5h-5M21 14a9 9 0 0 1-15 5l-3-3M3 21v-5h5" /></>,
} satisfies Record<string, ReactNode>;

export type HeadingIconName = keyof typeof symbols;

export function HeadingIcon({ name }: { name: HeadingIconName }) {
  return <svg className="heading-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {symbols[name]}
  </svg>;
}

export function IconHeading({ as: Tag = "h2", icon, id, children }: {
  as?: "h2" | "h3";
  icon: HeadingIconName;
  id?: string;
  children: ReactNode;
}) {
  return <Tag className="icon-heading" id={id}>
    <HeadingIcon name={icon} />
    <span className="heading-text">{children}</span>
  </Tag>;
}
