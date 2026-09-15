const root = "/research/honeybee-study/";
const papers = {
  fibers: "https://doi.org/10.1016/j.mtbio.2023.100704",
  interface: "https://doi.org/10.1007/s40544-023-0743-0",
  patch: "https://doi.org/10.1002/advs.202524043",
};

// Display an individual source panel with its native proportions and labels.
function ResearchFigure({ src, caption, source, href, crop }: {
  src: string;
  caption: string;
  source?: string;
  href?: string;
  crop: { sourceWidth: number; x: number; y: number; width: number; height: number };
}) {
  return <figure className="honeybee-figure">
    <a className="honeybee-image honeybee-panel" href={src} target="_blank" rel="noreferrer" aria-label={`查看原始组图：${caption}`} style={{ aspectRatio: crop.width / crop.height }}>
      <img src={src} alt={caption} loading="lazy" style={{ width: `${crop.sourceWidth / crop.width * 100}%`, left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }} />
    </a>
    <figcaption>{caption}{source && <span className="honeybee-source">{href ? <a href={href} target="_blank" rel="noreferrer">{source}</a> : source}</span>}</figcaption>
  </figure>;
}

const sections = [
  ["overview", "项目概述"],
  ["contact-mechanics", "形变与接触"],
  ["wet-interface", "湿黏附界面"],
  ["bioinspired-design", "仿生转化"],
  ["environment", "极端环境拓展"],
];

export function HoneybeeDetail() {
  return <main className="page project-page honeybee-page" lang="zh-CN">
    <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
    <header className="project-header">
      <p className="project-category">生物界面力学 · 仿生可控黏附</p>
      <h1>极端环境可控黏附机制与蜜蜂爪垫界面力学仿生研究</h1>
      <p className="meta">2024 年 1 月—至今 · 项目负责人</p>
      <p className="funding">国家自然科学基金（5237052667）与北京市科技新星计划（20240484712）资助</p>
    </header>

    <nav className="evidence-nav" aria-label="本页目录">
      {sections.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}
    </nav>

    <section id="overview" aria-labelledby="honeybee-overview">
      <h2 id="honeybee-overview">研究对象与工作范围</h2>
      <p>研究蜜蜂足垫形变、分泌液与界面接触的耦合机制，开发兼顾稳定承载与低力释放的仿生黏附结构。作为项目负责人，统筹实验表征、力学分析及结构设计，主要方法包括高速成像、Cryo-SEM、AFM 和黏附力测试。</p>
    </section>

    <section id="contact-mechanics" aria-labelledby="honeybee-contact">
      <h2 id="honeybee-contact">足垫形变与接触面积调控</h2>
      <p>剪切载荷通过内部纤维转动及液压作用调节足垫展开。结合动态接触观测与前期力学模型，分析载荷方向、接触边界及脱附顺序，为刚柔耦合末端提供设计依据。</p>
      <ResearchFigure src={root + "fiber-contact-model.png"} crop={{ sourceWidth: 1320, x: 8, y: 437, width: 685, height: 516 }} caption="纤维单元在剪切作用下的转动与接触扩展。" source="Liang 等，Materials Today Bio（2023），Fig. 4D；前期研究依据，CC BY-NC-ND。" href={papers.fibers} />
      <figure className="honeybee-video">
        <video src="/research/gallery/PPT-media2.mp4" poster="/research/ppt/honeybee-footpad.png" autoPlay muted loop playsInline preload="auto" aria-label="蜜蜂足垫接触与形变显微记录" />
        <figcaption>足垫接触与形变的显微记录。<span className="honeybee-source">项目汇报素材。</span></figcaption>
      </figure>
    </section>

    <section id="wet-interface" aria-labelledby="honeybee-interface">
      <h2 id="honeybee-interface">微结构与固液气三相界面</h2>
      <p>足垫表面的多边形微框架与分泌液、局部气穴共同形成三相接触界面。研究关注微结构几何和液体分布对法向释放、切向承载的不同影响，以指导方向性湿黏附设计。</p>
      <ResearchFigure src={root + "footpad-microstructure.png"} crop={{ sourceWidth: 1373, x: 419, y: 533, width: 352, height: 288 }} caption="去除液体后显露的足垫多边形微框架。" source="Liang 等，Friction，Fig. 1g；前期研究依据，CC BY 4.0。" href={papers.interface} />
    </section>

    <section id="bioinspired-design" aria-labelledby="honeybee-design">
      <h2 id="honeybee-design">仿生转化：湿黏附与定向液体输运</h2>
      <p>将层级黏附微结构与定向导流通道结合，维持湿态接触并排出多余汗液，用于稳定的皮肤生理信号采集。</p>
      <ResearchFigure src={root + "adhesive-patch-architecture.png"} crop={{ sourceWidth: 1500, x: 985, y: 0, width: 515, height: 718 }} caption="黏附微结构与液体输运通道的协同设计。" source="Zhao、Xiang 等，Advanced Science（2026），Fig. 1c；CC BY。" href={papers.patch} />
      <p>成果发表于 <em>Advanced Science</em>（2026），项宇为共同第一作者、学生第一作者。</p>
      <p className="honeybee-links"><a href="/projects/sweat-managing-patch">查看论文项目</a><a href={papers.patch} target="_blank" rel="noreferrer">论文原文 ↗</a></p>
    </section>

    <section id="environment" aria-labelledby="honeybee-environment">
      <h2 id="honeybee-environment">极端环境验证与抓附结构拓展</h2>
      <p>面向异形曲面与非合作目标，开发刚柔耦合仿生指端，兼顾柔顺贴合、承载与顺序释放，拓展至软体抓手和舱外抓附操作。</p>
      <dl className="honeybee-results">
        <div><dt>热循环验证</dt><dd>样机经 ±100 °C 热循环后，黏附强度保持 ≥10 kPa。</dd></div>
        <div><dt>辐照后验证</dt><dd>样机经单次 γ 辐照后，黏附强度保持 ≥5 kPa。</dd></div>
      </dl>
      <p className="honeybee-note">以上为已有样机测试结果；复杂环境下的适用边界与重复抓附稳定性仍在研究中。</p>
      <p className="honeybee-links"><a href="/projects/space-adhesion">变刚度黏附研究 · 论文撰写中</a><a href="/projects/insect-dexterous-grasping">昆虫启发的灵巧抓附 · 进行中</a></p>
    </section>

    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 9 月</p></footer>
  </main>;
}
