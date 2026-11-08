import { IconHeading } from "./icon-heading";
import { DeferredVideo } from "./deferred-video";

const root = "/research/honeybee-study/";
const papers = {
  interface: "https://doi.org/10.1007/s40544-023-0743-0",
  hybrid: "https://doi.org/10.1021/acsami.5c02890",
  patch: "https://doi.org/10.1002/advs.202524043",
};

function ResearchFigure({ file, caption, wide = false, preview, width, height }: {
  file: string;
  caption: string;
  wide?: boolean;
  preview?: string;
  width?: number;
  height?: number;
}) {
  const src = file.startsWith("/") ? file : root + file;
  return <figure className={`honeybee-figure${wide ? " honeybee-wide" : ""}`}>
    <a className="honeybee-image" href={src} target="_blank" rel="noreferrer" aria-label={`查看大图：${caption}`}>
      <img src={preview ?? src} alt={caption} width={width} height={height} loading="lazy" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

const sections = [
  ["overview", "研究内容"],
  ["wet-interface", "生物界面"],
  ["contact-mechanics", "黏附机制"],
  ["hybrid-interface", "人工界面"],
  ["bioinspired-design", "排汗设计"],
  ["validation", "性能验证"],
  ["environment", "工程拓展"],
];

export function HoneybeeDetail() {
  return <main className="page project-page honeybee-page" lang="zh-CN">
    <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
    <header className="project-header">
      <p className="project-category">生物界面力学 · 仿生可控黏附</p>
      <h1>极端环境可控黏附机制与蜜蜂爪垫界面力学仿生研究</h1>
      <p className="meta">2024 年 1 月—至今</p>
      <p className="funding">国家自然科学基金（5237052667）与北京市科技新星计划（20240484712）资助</p>
      <p>研究蜜蜂足垫三相接触与液桥调控机制，开展层级黏附表面、定向排汗通道及刚柔耦合抓附机构设计。</p>
    </header>
    <nav className="evidence-nav" aria-label="本页目录">
      {sections.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}
    </nav>

    <section id="overview" aria-labelledby="honeybee-overview">
      <IconHeading id="honeybee-overview" icon="target">1 研究内容</IconHeading>
      <p>研究内容包括足垫微结构表征、三相界面力学建模、人工黏附表面与排汗通道设计，以及湿态承载、透湿和生理信号验证。蜜蜂足垫机制采用课题组前期研究结果，人工界面与排汗贴片对应已发表成果；变刚度抓附及环境适应性为在研方向。</p>
    </section>

    <section id="wet-interface" aria-labelledby="honeybee-interface">
      <IconHeading id="honeybee-interface" icon="microscope">2 足垫微结构与三相接触</IconHeading>
      <div className="honeybee-figure-grid honeybee-figure-grid-three">
        <ResearchFigure file="polygonal-frame.png" caption="足垫多边形微框架与凹陷结构" />
        <ResearchFigure file="three-phase-contact.png" caption="足印液膜与局部气穴" />
        <figure className="honeybee-video">
          <DeferredVideo src="/research/optimized/honeybee-full.mp4" poster="/research/optimized/honeybee-poster.webp" width={1024} height={768} label="蜜蜂足垫接触与形变显微记录" />
          <figcaption>足垫接触、展开与形变</figcaption>
        </figure>
      </div>
      <p>Cryo-SEM 显示，蜜蜂足垫表面具有条纹状褶皱和凹陷的多边形微框架，足印液膜中保留局部气穴。AFM 表征表面高度与模量，干涉反射显微观察支持固–液–气三相接触。微框架几何、液量和气穴分布共同影响液桥形态与接触状态。</p>
    </section>

    <section id="contact-mechanics" aria-labelledby="honeybee-contact">
      <IconHeading id="honeybee-contact" icon="droplet">3 液桥调控与方向性黏附</IconHeading>
      <ResearchFigure file="air-pocket-shear-model.png" wide caption="连续液膜与含气穴界面的受力模型" />
      <p>单足垫法向、切向力测量与三相界面模型用于分析液体自吸和气穴抗剪机制。液体沿微框架重新分布，改变液桥高度及弯月面曲率；切向加载引起气穴两侧弯月面不对称变形，界面压差提供附加抗剪作用。微框架宽度、凹腔几何、液量与润湿性是调节法向脱离和切向承载的主要参数。</p>
    </section>

    <section id="hybrid-interface" aria-labelledby="honeybee-hybrid">
      <IconHeading id="honeybee-hybrid" icon="layers">4 复合层级黏附表面</IconHeading>
      <div className="honeybee-figure-grid">
        <ResearchFigure file="/research/ppt/hybrid-adhesive-design.png" preview="/research/optimized/hybrid-adhesive-design.webp" width={812} height={667} caption="蜜蜂微框架与树蛙微柱的复合结构" />
        <ResearchFigure file="/research/gallery/PPT-image120.png" preview="/research/gallery/PPT-image120-preview.webp" width={862} height={429} caption="微柱与基底之间的局部液桥" />
      </div>
      <p>复合层级表面（HTP）采用 PDMS 制备，将六边形微柱与柱顶微框架结合。微柱形成分区接触，细尺度框架约束局部液桥；通过不同结构与润湿条件下的法向、切向测试，评估表面几何对黏附性能的影响。</p>
      <ResearchFigure file="/research/gallery/PPT-image121.png" preview="/research/gallery/PPT-image121-preview.webp" width={2068} height={480} wide caption="液膜分割、液桥形成与三相接触建立" />
      <p>界面观察显示，连续液膜逐步分割为局部液桥，液体在微结构间重新分布并形成局部气穴。该过程与液体自吸及气穴抗剪模型相对应，为人工湿黏附表面的结构设计提供依据。</p>
    </section>

    <section id="bioinspired-design" aria-labelledby="honeybee-design">
      <IconHeading id="honeybee-design" icon="layers">5 黏附与排汗通道设计</IconHeading>
      <div className="honeybee-figure-grid honeybee-figure-grid-three">
        <ResearchFigure file="cmap-layer-architecture.png" caption="CMAP 黏附、排液与电极分层结构" />
        <ResearchFigure file="/research/gallery/PPT-image139.png" preview="/research/gallery/PPT-image139-preview.webp" width={848} height={1149} caption="锥形通道弯月面与受力关系" />
        <ResearchFigure file="/research/gallery/PPT-image141.png" preview="/research/gallery/PPT-image141-preview.webp" width={760} height={600} caption="沟槽层级与液面上升对比" />
      </div>
      <p>锥形微沟槽黏附贴片（CMAP）将层级黏附单元与跨膜排液通道集成。接触层通过微柱与凹腔调节液桥，锥形孔及层级沟槽利用毛细压差将液体输运至外侧纤维层。结构采用 PDMS 成形、氧等离子体与 PVA 亲水处理，并集成 CNT 电极；锥角、润湿性与沟槽层级通过受力分析和输运对比进行评估。</p>
      <ResearchFigure file="sweat-drainage-comparison.png" wide caption="持续供液条件下 PDMS 与 CMAP 的排液对比" />
      <p>模拟汗液供给条件下，平面 PDMS 出现液体鼓包与外溢，CMAP 沿通道排液。黏附区保留形成液桥所需的局部液体，输运区疏导过量液体，降低持续供液造成的接触失稳。</p>
    </section>

    <section id="validation" aria-labelledby="honeybee-validation">
      <IconHeading id="honeybee-validation" icon="chart">6 湿态承载、透湿与信号验证</IconHeading>
      <div className="honeybee-figure-grid">
        <ResearchFigure file="skin-load-demonstration.png" caption="湿润皮肤上的 200 g 承载与转动演示" />
        <ResearchFigure file="/research/gallery/PPT-image148.png" preview="/research/gallery/PPT-image148-preview.webp" width={925} height={545} caption="不同输运方向与商用电极的透湿对比" />
      </div>
      <p>贴片在湿润皮肤上完成 200 g 悬挂承载与手腕转动演示。加热条件下，黏附侧至纤维侧（A2F）的水蒸气透过率约为商用 ECG 贴片的 2.7 倍；反向（F2A）对比用于表征输运方向性。</p>
      <div className="honeybee-figure-grid">
        <ResearchFigure file="ecg-wet-interface.png" caption="不同润湿条件下的贴附状态与 ECG 波形" />
        <ResearchFigure file="/research/gallery/PPT-image153.png" preview="/research/gallery/PPT-image153-preview.webp" width={965} height={389} caption="0、1.5、4 与 8 kg 屈臂负重下的 sEMG" />
      </div>
      <p>ECG 测试比较干燥、湿润及流水条件下的信号保持，sEMG 测试记录不同屈臂负重下的肌电响应。屈臂负重属于动作条件，区别于贴片悬挂承载；测试结果用于评价水分与运动扰动下的电接触稳定性。</p>
      <div className="honeybee-table-scroll">
        <table className="honeybee-validation-table">
          <thead><tr><th scope="col">验证项目</th><th scope="col">结果</th><th scope="col">条件与范围</th></tr></thead>
          <tbody>
            <tr><th scope="row">湿态承载</th><td>200 g 悬挂与手腕转动</td><td>局部湿润皮肤演示，非最大负载</td></tr>
            <tr><th scope="row">水蒸气透过率</th><td>A2F 约为商用贴片的 2.7 倍</td><td>XUNDA X-1 对照；50 °C 平台，26 °C、45% RH 环境</td></tr>
            <tr><th scope="row">ECG / sEMG</th><td>湿态 ECG 与不同负重下的肌电响应</td><td>皮肤电极测试；屈臂负重 0、1.5、4、8 kg</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="environment" aria-labelledby="honeybee-environment">
      <IconHeading id="honeybee-environment" icon="gripper">7 刚柔耦合抓附与环境适应性</IconHeading>
      <div className="honeybee-figure-grid">
        <ResearchFigure file="/research/insect-grasping/contact-release-sequence.png" width={732} height={215} caption="马岛蟑螂足端接触与顺序脱附" />
        <ResearchFigure file="/research/insect-grasping/finger-mechanism-concept.png" width={398} height={277} caption="主动关节与分段柔顺跗节串联方案" />
      </div>
      <p>相关在研课题以马岛蟑螂足端为对象，将分段跗节、界面供液与腱驱动结合。主动关节调整指端位姿，被动单元适应局部曲率，腱传动调节弯曲与接触顺序；研究变量包括节间刚度、载荷分配及脱附路径。</p>
      <p>变刚度抓附与极端环境适应性仍在研究中。后续验证包括机构集成、重复抓持，以及温度变化、真空和辐照条件下的材料与界面性能；现有湿态皮肤测试不作为上述环境性能的验证结果。</p>
      <p className="honeybee-links"><a href="/projects/space-adhesion">变刚度黏附研究 · 论文撰写中</a><a href="/projects/insect-dexterous-grasping">昆虫启发的灵巧抓附 · 在研</a></p>
    </section>

    <section className="honeybee-references" aria-labelledby="honeybee-references-heading">
      <IconHeading id="honeybee-references-heading" icon="book">参考文献与图源</IconHeading>
      <ol>
        <li><a href={papers.interface} target="_blank" rel="noreferrer">Development of wet adhesion of honeybee arolium incorporated polygonal structure with three-phase composite interfaces</a><br /><span>Lulu Liang, Jieliang Zhao, et al. · Friction 12, 215–230（2024）· 课题组前期机制研究。</span></li>
        <li><a href={papers.hybrid} target="_blank" rel="noreferrer">Bionic Wet Adhesive Surface with Micronano Hierarchical Structure for Robust Biosignal Monitoring</a><br /><span>Zhiyun Ma, Lulu Liang, Chenyang Zhang, Yu Xiang, et al. · ACS Applied Materials &amp; Interfaces 17, 20471–20482（2025）· 合作研究。</span></li>
        <li><a href={papers.patch} target="_blank" rel="noreferrer">Bioinspired Hierarchical Architecture with Water Transport Channels for Strong Adhesion at the Sweating Interface</a><br /><span>Jieliang Zhao, Yu Xiang, et al. · Advanced Science（2026）· 项宇为共同第一作者、学生第一作者。</span></li>
      </ol>
      <p className="honeybee-note">第 2—3 节图源为 Friction，第 4 节为 ACS Applied Materials &amp; Interfaces，第 5—6 节为 Advanced Science，第 7 节为相关在研课题材料。Friction 与 Advanced Science 图示按 <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a> 引用，ACS 图示版权归原权利人；既有局部分图保留原标注和比例尺。</p>
    </section>
    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 11 月</p></footer>
  </main>;
}
