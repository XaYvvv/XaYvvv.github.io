const milestones = [
  {
    date: "2020.10",
    dateTime: "2020-10",
    organization: "Beijing Institute of Technology",
    milestone: "Started undergraduate studies",
    logo: "/research/gallery/PPT-image13-preview.webp",
    logoAlt: "Beijing Institute of Technology logo",
    href: "https://english.bit.edu.cn/",
  },
  {
    date: "2020.12",
    dateTime: "2020-12",
    endDate: "2024.10",
    endDateTime: "2024-10",
    organization: "BITFSAE",
    milestone: "Chassis Lead → Mechanical Systems Lead → Team Captain",
    logo: "/research/gallery/PPT-image15-preview.webp",
    logoAlt: "BITFSAE racing team logo",
    href: "https://www.bitfsae.com/",
  },
  {
    date: "2023.10",
    dateTime: "2023-10",
    organization: "BIB Lab",
    milestone: "Joined the Laboratory of Biological Intelligence and Biomimetics",
    logo: "/logos/bib-lab-gold-v2.png",
    logoAlt: "BIB Lab gold logo",
    logoClass: "timeline-logo-bib",
    href: "https://me.bit.edu.cn/szdw/jsml/zzgcx/jxsjjys/bssds18/011124976e4b4967affa67c6f99e2e19.htm",
  },
  {
    date: "2024.09",
    dateTime: "2024-09",
    organization: "Beijing Institute of Technology",
    milestone: "Started master’s studies in Mechanical Engineering",
    logo: "/research/gallery/PPT-image13-preview.webp",
    logoAlt: "Beijing Institute of Technology logo",
    href: "https://english.bit.edu.cn/",
  },
  {
    date: "2026.08",
    dateTime: "2026-08",
    organization: "ByteDance Seed Robotics",
    milestone: "Joined as a Robotics Hardware Intern",
    logo: "/logos/bytedance-seed-wordmark.svg",
    logoAlt: "ByteDance Seed official wordmark",
    href: "https://seed.bytedance.com/zh/direction/robotics",
  },
];

export function Timeline() {
  return (
    <section className="journey" aria-labelledby="journey-heading">
      <h3 id="journey-heading">Education &amp; Teams</h3>
      <ol className="timeline" role="list">
        {milestones.map((item) => (
          <li className="timeline-item" key={item.dateTime}>
            <p className="timeline-date">
              <time dateTime={item.dateTime}>{item.date}</time>
              {item.endDate && (
                <> – <time dateTime={item.endDateTime}>{item.endDate}</time></>
              )}
            </p>
            <div className="timeline-detail">
              <div className={`timeline-logo ${item.logoClass ?? ""}`}>
                <img src={item.logo} alt={item.logoAlt} width="148" height="48" loading="lazy" />
              </div>
              <h4><a href={item.href} target="_blank" rel="noreferrer">{item.organization}</a></h4>
              <p>{item.milestone}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
