import { DeferredVideo } from "./deferred-video";

const root = "/research/honeybee-study/";
const papers = {
  interface: "https://doi.org/10.1007/s40544-023-0743-0",
  patch: "https://doi.org/10.1002/advs.202524043",
};

function ResearchFigure({ file, caption, paper, figure, wide = false }: {
  file: string;
  caption: string;
  paper: keyof typeof papers;
  figure: string;
  wide?: boolean;
}) {
  return <figure className={`honeybee-figure${wide ? " honeybee-wide" : ""}`}>
    <a className="honeybee-image" href={root + file} target="_blank" rel="noreferrer" aria-label={`查看大图：${caption}`}>
      <img src={root + file} alt={caption} loading="lazy" />
    </a>
    <figcaption>{caption}<span className="honeybee-source"><a href={papers[paper]} target="_blank" rel="noreferrer">{paper === "interface" ? "Liang 等，Friction（2024）" : "Zhao、Xiang 等，Advanced Science（2026）"} · {figure}</a></span></figcaption>
  </figure>;
}

const sections = [
  ["overview", "研究问题"],
  ["wet-interface", "生物界面"],
  ["contact-mechanics", "黏附机制"],
  ["bioinspired-design", "仿生设计"],
  ["validation", "性能验证"],
  ["environment", "工程拓展"],
];

export function HoneybeeDetail() {
  return <main className="page project-page honeybee-page" lang="zh-CN">
    <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
    <header className="project-header">
      <p className="project-category">生物界面力学 · 仿生可控黏附</p>
      <h1>极端环境可控黏附机制与蜜蜂爪垫界面力学仿生研究</h1>
      <p className="meta">2024 年 1 月—至今 · 项目负责人</p>
      <p className="funding">国家自然科学基金（5237052667）与北京市科技新星计划（20240484712）资助</p>
      <p>围绕蜜蜂足垫的固–液–气三相接触，研究微结构与液体分布对黏附的调控作用，并将其转化为兼顾湿态承载、液体输运与可控释放的人工界面。</p>
    </header>
    <nav className="evidence-nav" aria-label="本页目录">
      {sections.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}
    </nav>

    <section id="overview" aria-labelledby="honeybee-overview">
      <h2 id="honeybee-overview">研究问题：湿润界面如何兼顾承载与释放</h2>
      <p>湿黏附依赖界面液体形成液桥，但液体积聚也可能改变接触状态，造成滑移或剥离。对可重复抓附机构，切向承载与法向释放需要分别调控；对皮肤贴片，还需在维持附着的同时排出持续产生的汗液。</p>
      <p>项目以课题组关于蜜蜂足垫三相界面的前期研究为机制基础，开展层级黏附结构与定向液体输运设计，并通过湿态皮肤附着和生理信号采集验证界面功能。项宇负责项目统筹、实验表征与结构设计，是湿态黏附贴片论文的共同第一作者、学生第一作者。</p>
    </section>

    <section id="wet-interface" aria-labelledby="honeybee-interface">
      <h2 id="honeybee-interface">生物观察：接触界面中的液体与气穴</h2>
      <p>蜜蜂足垫表面由条纹状褶皱和凹陷的多边形微框架构成。Cryo-SEM 对足垫及足印的观察显示，分泌液并未完全填满接触区，液膜中仍存在局部气穴。AFM 提供表面高度与模量信息，干涉反射显微观察进一步支持三相接触的存在。</p>
      <div className="honeybee-figure-grid">
        <ResearchFigure file="polygonal-frame.png" caption="去除液体后显露的多边形微框架及凹陷结构。" paper="interface" figure="Fig. 1g（局部）" />
        <ResearchFigure file="three-phase-contact.png" caption="足印中的液膜、孔隙与局部气穴，构成固–液–气三相接触。" paper="interface" figure="Fig. 2f（局部）" />
      </div>
      <p>因此，足垫不能仅按连续液膜与平面接触处理。微框架几何、液体体积和气穴分布共同决定液桥形态，是解释方向性黏附和建立人工结构参数的关键。</p>
      <figure className="honeybee-video">
        <DeferredVideo src="/research/optimized/honeybee-full.mp4" poster="/research/optimized/honeybee-poster.webp" width={1024} height={768} label="蜜蜂足垫接触与形变显微记录" />
        <figcaption>蜜蜂足垫接触、展开与形变的显微记录。</figcaption>
      </figure>
    </section>

    <section id="contact-mechanics" aria-labelledby="honeybee-contact">
      <h2 id="honeybee-contact">机制分析：液体自吸与气穴抗剪</h2>
      <p>前期研究通过单足垫法向、切向力测量与三相界面模型，分析两类增强机制。<strong>液体自吸效应</strong>使分泌液沿微框架重新分布，改变液桥高度和弯月面曲率，从而调节毛细作用与法向黏附。</p>
      <p><strong>气穴抗剪效应</strong>来自切向加载时气穴两侧弯月面的不对称变形：界面压差为切向承载提供附加阻力。适当的微框架尺寸与较少的液量，可在保持切向附着的同时降低法向脱离负担，为稳定支撑与快速抬足提供机制解释。</p>
      <ResearchFigure file="air-pocket-shear-model.png" wide caption="平滑液膜与含气穴界面的受力比较，以及切向加载后的弯月面与压差变化。" paper="interface" figure="Fig. 7" />
      <p>对应的设计变量包括微框架宽度、凹腔几何、液桥高度和润湿性。设计目标是根据承载方向与释放方式调节接触状态，而非单独追求更大的法向黏附力。</p>
    </section>

    <section id="bioinspired-design" aria-labelledby="honeybee-design">
      <h2 id="honeybee-design">仿生转化：将黏附单元与排液通道分工设计</h2>
      <p>在出汗皮肤上，连续液膜会削弱贴片接触并干扰电信号。锥形微沟槽黏附贴片（CMAP）将蜜蜂、树蛙足垫的层级黏附结构，与鸟喙锥形毛细输运和猪笼草微沟槽导流特征结合，在同一复合膜中分别承担附着与排液功能。</p>
      <ul className="honeybee-design-list">
        <li><strong>接触层：</strong>六边形微柱及凹腔将液膜分割为离散液桥，调节接触线长度与局部气穴；框架节点处的通孔为多余液体提供出口。</li>
        <li><strong>输运层：</strong>锥形孔与层级微沟槽通过几何梯度产生毛细压差，将液体由皮肤侧输运至外侧纤维层并扩散蒸发。</li>
        <li><strong>界面处理：</strong>采用 PDMS 结构成形、氧等离子体与 PVA 亲水处理，并集成 CNT 电极，使附着、输运与信号采集共用稳定接触界面。</li>
      </ul>
      <ResearchFigure file="cmap-layer-architecture.png" caption="CMAP 分层结构：电极、黏附微结构、排液孔层与亲水界面。" paper="patch" figure="Fig. 1e（局部）" />
      <p>该结构保留形成液桥所需的局部湿润状态，同时疏导过量液体。模拟汗液供给实验中，平面 PDMS 对照出现液体鼓包和外溢，CMAP 则将液体沿通道排出。</p>
      <ResearchFigure file="sweat-drainage-comparison.png" wide caption="持续供液条件下，平面 PDMS 与 CMAP 的液体积聚及排出过程对比。" paper="patch" figure="Fig. 3g（局部）" />
    </section>

    <section id="validation" aria-labelledby="honeybee-validation">
      <h2 id="honeybee-validation">性能验证：湿态附着、透湿与信号稳定性</h2>
      <p>验证从接触力、液体输运和器件功能三个层面展开。法向与切向测试比较结构在不同预载和润湿条件下的响应；透湿实验评价持续排液能力；皮肤电信号测试检验界面在水分和运动扰动下的稳定性。</p>
      <div className="honeybee-table-scroll">
        <table className="honeybee-validation-table">
          <thead><tr><th scope="col">验证项目</th><th scope="col">代表性结果</th><th scope="col">实验条件与范围</th></tr></thead>
          <tbody>
            <tr><th scope="row">湿态皮肤附着</th><td>悬挂 200 g 载荷，并进行手腕转动演示。</td><td>局部湿润皮肤上的承载演示，不代表最大负载。</td></tr>
            <tr><th scope="row">水蒸气透过率</th><td>黏附侧至纤维侧方向约为商用 ECG 贴片的 2.7 倍。</td><td>与 XUNDA X-1 对比；50 °C 加热平台，环境 26 °C、45% RH。</td></tr>
            <tr><th scope="row">ECG 与 sEMG</th><td>干燥、湿润及流水条件下记录 ECG；不同负重下记录可区分的肌电响应。</td><td>皮肤电极测试；肌电采用不同负重的屈臂动作。</td></tr>
          </tbody>
        </table>
      </div>
      <ResearchFigure file="skin-load-demonstration.png" caption="湿润皮肤上的 200 g 承载与手腕转动演示。" paper="patch" figure="Fig. 2k（局部）" />
      <ResearchFigure file="ecg-wet-interface.png" wide caption="干燥、湿润与流水条件下，CMAP 与商用电极的贴附状态及 ECG 波形对比。" paper="patch" figure="Fig. 4d（局部）" />
      <p>这些结果表明，排液通道可在汗液持续产生时维持接触界面，减少液体积聚引起的剥离与信号扰动。成果发表于 <em>Advanced Science</em>（2026）。</p>
      <p className="honeybee-links"><a href={papers.patch} target="_blank" rel="noreferrer">Advanced Science 论文 ↗</a><a href="/projects/sweat-managing-patch">论文项目详情 →</a></p>
    </section>

    <section id="environment" aria-labelledby="honeybee-environment">
      <h2 id="honeybee-environment">工程拓展：极端环境与刚柔耦合抓附</h2>
      <p>面向异形曲面与非合作目标，进一步将局部黏附单元与刚柔耦合支撑结构结合，分别处理柔顺贴合、载荷传递和顺序释放。与湿态皮肤贴片相比，该方向还需要评价温度变化、辐照及反复抓附对结构和界面性能的影响。</p>
      <dl className="honeybee-results">
        <div><dt>热循环后黏附</dt><dd>样机经 ±100 °C 热循环后，黏附强度保持 ≥10 kPa。</dd></div>
        <div><dt>辐照后黏附</dt><dd>样机经单次 γ 辐照后，黏附强度保持 ≥5 kPa。</dd></div>
      </dl>
      <p className="honeybee-note">以上为项目样机在两类独立工况下的阶段性结果。多因素耦合环境与重复抓附寿命仍需进一步验证。</p>
      <p className="honeybee-links"><a href="/projects/space-adhesion">变刚度黏附研究 · 论文撰写中</a><a href="/projects/insect-dexterous-grasping">昆虫启发的灵巧抓附 · 进行中</a></p>
    </section>

    <section className="honeybee-references" aria-labelledby="honeybee-references-heading">
      <h2 id="honeybee-references-heading">相关论文</h2>
      <ol>
        <li><a href={papers.interface} target="_blank" rel="noreferrer">Development of wet adhesion of honeybee arolium incorporated polygonal structure with three-phase composite interfaces</a><br /><span>Lulu Liang, Jieliang Zhao, et al. · Friction 12, 215–230（2024）· 课题组前期机制研究。</span></li>
        <li><a href={papers.patch} target="_blank" rel="noreferrer">Bioinspired Hierarchical Architecture with Water Transport Channels for Strong Adhesion at the Sweating Interface</a><br /><span>Jieliang Zhao, Yu Xiang, et al. · Advanced Science（2026）· 项宇为共同第一作者、学生第一作者。</span></li>
      </ol>
      <p className="honeybee-note">论文图示依据 CC BY 许可转载；局部分图经裁切，原有标注和比例尺保留。</p>
    </section>
    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 11 月</p></footer>
  </main>;
}
