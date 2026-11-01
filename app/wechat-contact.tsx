"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function WechatContact({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointerType = useRef("");
  const popupId = useId();

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const focusInside = root.current?.contains(document.activeElement);
      setOpen(false);
      if (focusInside) trigger.current?.focus();
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
    };
  }, [open]);

  return <div className="wechat-contact" ref={root}
    onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={event => {
      if (event.pointerType === "mouse" && !root.current?.querySelector(":focus-visible")) setOpen(false);
    }}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}
  >
    <button className="contact-line wechat-trigger" type="button" ref={trigger}
      aria-expanded={open} aria-controls={popupId}
      onPointerDown={event => { pointerType.current = event.pointerType; }}
      onClick={event => {
        if (event.detail !== 0 && pointerType.current === "mouse") setOpen(true);
        else setOpen(value => !value);
      }}
    >
      {children}<span>Wechat：XYv6626</span>
    </button>
    <div id={popupId} className="wechat-popover" hidden={!open} role="region" aria-label="WeChat QR code">
      <a href="/wechat-qr.png" target="_blank" rel="noreferrer" aria-label="View full-size WeChat QR code">
        <img src="/wechat-qr.webp" alt="WeChat QR code for XYv6626" width="625" height="609" loading="lazy" decoding="async" />
      </a>
    </div>
  </div>;
}
