const source = "/research/origami-study/project-overview.png";

// Panel coordinates on a 2048px-wide view of the unmodified source image.
const panels = {
  robot: { x: 731, y: 267, width: 395, height: 258 },
  pattern: { x: 1451, y: 10, width: 243, height: 178 },
  body: { x: 1723, y: 17, width: 269, height: 165 },
  linkage: { x: 1410, y: 199, width: 304, height: 300 },
  ankle: { x: 1811, y: 541, width: 192, height: 164 },
  cups: { x: 1758, y: 771, width: 268, height: 138 },
};

function Panel({ name, caption, eager = false, frameAspect = 4 / 3 }: {
  name: keyof typeof panels;
  caption: string;
  eager?: boolean;
  frameAspect?: number;
}) {
  const panel = panels[name];
  const panelAspect = panel.width / panel.height;
  // Contain the entire selected panel inside equal-sized frames; never stretch it.
  const width = Math.min(1, panelAspect / frameAspect) * 100;
  return <figure className="origami-figure">
    <a className="origami-frame" href={source} target="_blank" rel="noreferrer" aria-label={`查看原始素材：${caption}`} style={{ aspectRatio: frameAspect }}>
      <span className="origami-crop" style={{ width: `${width}%`, aspectRatio: panelAspect }}>
        <img src={source} alt={caption} loading={eager ? "eager" : "lazy"} style={{ width: `${2048 / panel.width * 100}%`, left: `${-panel.x / panel.width * 100}%`, top: `${-panel.y / panel.height * 100}%` }} />
      </span>
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function OrigamiDetail() {
  return <main className="page project-page origami-page" lang="zh-CN">
    <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
    <header className="project-header">
      <p className="project-category">本科工程项目 · 团队协作</p>
      <h1>折纸式仿昆虫爬壁机器人</h1>
      <p className="meta">2020 年 11 月—2021 年 9 月 · 团队负责人</p>
    </header>
    <nav className="evidence-nav" aria-label="本页目录">
      <a href="#overview">整机方案</a><a href="#origami-body">折纸机身</a><a href="#leg-and-ankle">腿部与踝部</a><a href="#attachment">吸附足端</a><a href="#contribution">个人工作</a>
    </nav>

    <section id="overview" aria-labelledby="origami-overview">
      <h2 id="origami-overview">整机方案</h2>
      <p>以昆虫多足运动与跗节适应性为参考，设计由折纸机身、四杆连杆腿、自适应踝及负压吸盘构成的爬壁机器人。机构将主动步行与被动足端适应分开，兼顾整机运动和接触面的姿态变化。</p>
      <dl className="origami-dofs">
        <div><dt>6 个主动自由度</dt><dd>腿部步行驱动</dd></div>
        <div><dt>1 个主动自由度</dt><dd>颈部偏航</dd></div>
        <div><dt>6 个被动自由度</dt><dd>足端表面适应</dd></div>
      </dl>
      <div className="origami-hero"><Panel name="robot" eager frameAspect={395 / 258} caption="13 自由度整机设计，集成折纸机身与六足机构。" /></div>
    </section>

    <section id="origami-body" aria-labelledby="origami-body-heading">
      <h2 id="origami-body-heading">折纸机身：平面展开与空间构型</h2>
      <p>采用可由平面展开件折叠形成的机身结构，完成展开布局、折叠构型与实物制作，为腿部机构及驱动部件提供安装载体。</p>
      <div className="origami-grid">
        <Panel name="pattern" caption="机身平面展开设计。" />
        <Panel name="body" caption="折叠成形后的机身样件。" />
      </div>
      <figure className="origami-animation">
        <img src="/research/covers/origami-body.webp" alt="折纸机身折叠与形变演示" loading="lazy" />
        <figcaption>机身折叠与形变演示。</figcaption>
      </figure>
    </section>

    <section id="leg-and-ankle" aria-labelledby="origami-leg-heading">
      <h2 id="origami-leg-heading">四杆腿部与自适应踝</h2>
      <p>四杆连杆机构将驱动输入传递至足端，形成步行动作；仿跗节踝部通过被动形变调整接触姿态。两者分别承担运动传递与局部表面适应功能。</p>
      <div className="origami-grid">
        <Panel name="linkage" caption="四杆机构简图与腿部装配关系。" />
        <Panel name="ankle" caption="自适应踝样件及空间转动方向示意。" />
      </div>
    </section>

    <section id="attachment" aria-labelledby="origami-attachment-heading">
      <h2 id="origami-attachment-heading">负压吸附足端</h2>
      <p>足端采用负压吸盘作为附着单元，与自适应踝连接。完成吸盘构型设计及样件制作，结合腿部机构进行整机装配。</p>
      <div className="origami-cups"><Panel name="cups" frameAspect={268 / 138} caption="负压吸盘及不同构型的足端样件。" /></div>
    </section>

    <section id="contribution" aria-labelledby="origami-contribution-heading">
      <h2 id="origami-contribution-heading">个人工作与项目完成情况</h2>
      <ul className="origami-work">
        <li><strong>整机设计：</strong>负责总体构型及机身、腿部、踝部和吸附足端的机构集成。</li>
        <li><strong>加工装配：</strong>开展零部件加工，完成整机装配。</li>
        <li><strong>团队组织：</strong>组织定期技术讨论，协调成员工作并编写竞赛材料。</li>
      </ul>
      <p>项目完成了总体设计、机构样件制作与整机装配，形成折纸结构、连杆传动及被动适应机构的集成原型。</p>
    </section>

    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 9 月</p></footer>
  </main>;
}
