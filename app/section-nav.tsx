"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "news", label: "Media & Activities" },
];

export function SectionNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = (document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0) + 48;
      let current = "about";
      for (const { id } of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= boundary) current = id;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = "news";
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <nav className="section-nav" aria-label="Main sections">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? "location" : undefined}>
          {id === "news" ? <>Media<span className="nav-media-suffix"> &amp; Activities</span></> : label}
        </a>
      ))}
    </nav>
  );
}
