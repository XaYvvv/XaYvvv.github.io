import photos from "./formula-photos.json";
import { DeferredVideo } from "./deferred-video";
const assetRoot = "/research/formula-student/";

function Photo({ name, caption, eager = false }: {
  name: keyof typeof photos;
  caption: string;
  eager?: boolean;
}) {
  const photo = photos[name];
  const src = `${assetRoot}${name}.png`;
  return (
    <figure className="fsae-photo">
      <a
        className="fsae-photo-window"
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`查看单张大图：${caption}`}
        style={{ aspectRatio: photo.width / photo.height }}
      >
        <img
          src={`/research/optimized/formula-${name}.webp`}
          alt={caption}
          width={photo.width}
          height={photo.height}
          loading={eager ? "eager" : "lazy"}
        />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function TechnicalFigure({ file, caption }: { file: string; caption: string }) {
  return (
    <figure className="fsae-technical">
      <a href={assetRoot + file} target="_blank" rel="noreferrer" aria-label={`放大查看：${caption}`}>
        <img src={assetRoot + file} alt={caption} loading="lazy" />
      </a>
      <figcaption>{caption}（点击图片查看大图）</figcaption>
    </figure>
  );
}

const sections = [
  ["overview", "项目概述"],
  ["design-goals", "工程目标"],
  ["suspension", "轮胎与悬架"],
  ["lightweight", "结构轻量化"],
  ["manufacturing", "制造与装配"],
  ["validation", "测试验证"],
  ["team", "团队协作"],
];

export function FormulaStudentDetail() {
  return (
    <main className="page project-page formula-page" lang="zh-CN">
      <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
      <header className="project-header">
        <p className="project-category">工程实践 · BITFSAE</p>
        <h1>大学生方程式赛车设计与制造</h1>
        <p className="meta">2020—2024 · 北京理工大学方程式车队</p>
        <p>悬架与转向设计、车辆动力学、结构轻量化、轮端集成与整车测试。</p>
        <p><a href="https://www.bitfsae.com/" target="_blank" rel="noreferrer">车队官网 ↗</a></p>
      </header>

      <nav className="evidence-nav fsae-nav" aria-label="本页目录">
        {sections.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}
      </nav>

      <section id="overview" aria-labelledby="fsae-overview-heading">
        <h2 id="fsae-overview-heading">项目概述</h2>
        <p>2020—2024 年参与北京理工大学方程式赛车的设计、制造与赛事准备，先后担任底盘负责人、机械系统负责人及车队队长。工作涵盖悬架与转向运动学设计、车辆动力学分析、结构校核、制造装配和实车测试，并逐步扩展至机械子系统接口协调与整车开发进度管理。</p>
        <dl className="fsae-roles">
          <div><dt>第 1—2 年 · 底盘负责人</dt><dd>悬架几何、转向运动学与结构设计</dd></div>
          <div><dt>第 3 年 · 机械系统负责人</dt><dd>子系统匹配、制造装配与整车调试</dd></div>
          <div><dt>第 4 年 · 车队队长</dt><dd>跨组协作、开发计划与测试安排</dd></div>
        </dl>
        <Photo name="campus-car" eager caption="北京理工大学方程式赛车，校园测试现场。" />
      </section>

      <section id="design-goals" aria-labelledby="fsae-goals-heading">
        <h2 id="fsae-goals-heading">整车目标与底盘开发</h2>
        <p>底盘开发以赛事规则、预算及制造周期为约束，围绕轮胎性能利用率、操控平衡与耐久可靠性展开。结合整车质量、重心位置、轮胎特性和典型赛道工况，将整车性能需求分解为悬架运动学、侧倾刚度分配、转向特性及制动系统要求。</p>
        <p>方案评估关注不同工况下的性能收益，以及质量、结构刚度、制造成本和调试周期之间的权衡，避免以单一部件指标替代整车性能判断。</p>
        <TechnicalFigure file="engineering-objectives.png" caption="整车性能目标分解及车辆子系统与轮胎性能的关联。" />
        <ol className="fsae-process" aria-label="工程开发流程">
          <li>目标分解</li><li>机理分析</li><li>设计仿真</li><li>制造调试</li><li>赛道验证</li>
        </ol>
      </section>

      <section id="suspension" aria-labelledby="fsae-suspension-heading">
        <h2 id="fsae-suspension-heading">悬架运动学与车辆动力学</h2>
        <h3>载荷转移与侧倾刚度分配</h3>
        <p>以轮胎载荷敏感性为分析基础，区分簧上、簧下质量及几何、弹性因素对横向载荷转移的贡献，评估悬架几何与前后轴侧倾刚度分配对操控平衡的影响。参数匹配同时考虑车轮姿态、车身运动及轮胎工作状态。</p>
        <h3>几何设计与参数迭代</h3>
        <p>负责悬架硬点、轮跳与转向运动学设计，分析侧倾中心、外倾角和前束随悬架行程的变化。结合刚度梯度计算及 ADAMS、MATLAB 仿真，对悬架几何、弹簧刚度与阻尼设定进行迭代，并以实车定位和动态测试反馈修正参数。</p>
        <TechnicalFigure file="tire-suspension-workflow.png" caption="轮胎机理分析、悬架仿真、零部件开发与实车验证流程。" />
        <p className="fsae-source-note">橡胶摩擦机理示意来源：Continental AG（见原图标注）。</p>
        <figure className="fsae-simulation">
          <DeferredVideo src={assetRoot + "adams-suspension.mp4"} poster={assetRoot + "adams-suspension-poster.jpg"} width={832} height={898} label="ADAMS 悬架运动及载荷矢量仿真演示" />
          <figcaption>ADAMS 悬架仿真：车轮运动、推杆与弹簧阻尼单元响应，以及载荷矢量变化。</figcaption>
        </figure>
      </section>

      <section id="lightweight" aria-labelledby="fsae-lightweight-heading">
        <h2 id="fsae-lightweight-heading">结构轻量化：载荷获取与方案比较</h2>
        <p>以悬架摇臂、立柱和转向支架为对象，将载荷输入、连接约束、设计空间和制造条件纳入结构优化。工作包括 2022 年摇臂衍生式设计研究，以及 2024 年车队零部件优化设计指导。</p>

        <h3>悬架摇臂：衍生式设计与拓扑优化</h3>
        <p className="meta">2022 ·《基于 FSAE 的结构件衍生式轻量化设计》· 报告第一作者</p>
        <p>通过推杆连接处的力传感器获取载荷，选取记录中的约 2500 N 峰值，并与 ADAMS 转向制动工况下的 2311 N 仿真结果对照。基于连接位置、载荷及装配空间，分别采用 Fusion 360 衍生式设计和 Altair Inspire 拓扑优化生成摇臂方案，再进行几何重构和静力分析。</p>
        <div className="fsae-design-grid">
          <TechnicalFigure file="rocker-generative.png" caption="Fusion 360 衍生式设计的摇臂方案。" />
          <TechnicalFigure file="rocker-topology.png" caption="Inspire 拓扑优化及 PolyNURBS 重构方案。" />
        </div>
        <details className="fsae-load-record">
          <summary>推杆载荷采集记录</summary>
          <TechnicalFigure file="pushrod-load-trace.png" caption="报告中的推杆受力记录，作为摇臂设计的载荷输入参考。" />
        </details>

        <h3>立柱与转向支架：轻量化方案评估</h3>
        <p className="meta">2024 · 银鲨 XIII 赛车零部件优化设计 · 团队技术指导</p>
        <p>在保留轴承、悬架连接及安装接口的基础上，对立柱进行拓扑优化与几何重构；转向支架结合拓扑优化和衍生式设计，比较质量、位移与应力结果，并考虑金属增材制造条件。</p>
        <div className="fsae-design-grid">
          <TechnicalFigure file="upright-optimized.png" caption="后立柱优化与重构方案。" />
          <TechnicalFigure file="steering-bracket-optimized.png" caption="转向支架衍生式设计方案。" />
        </div>
        <div className="fsae-comparison-scroll">
          <table className="fsae-comparison">
            <caption>2024 年报告中的模型质量对比</caption>
            <thead><tr><th scope="col">部件与比较基准</th><th scope="col">基准质量</th><th scope="col">优化方案</th><th scope="col">减重比例</th></tr></thead>
            <tbody>
              <tr><th scope="row">后立柱 · CNC 方案</th><td>756 g</td><td>556 g</td><td>26.5%</td></tr>
              <tr><th scope="row">转向支架 · 原方案</th><td>81.7 g</td><td>50.2 g</td><td>38.6%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="fsae-source-note">数值来自设计报告中的模型对比；后立柱以 CNC 方案为基准。强度与刚度需结合各方案的材料、载荷和制造条件单独评估。</p>
      </section>

      <section id="manufacturing" aria-labelledby="fsae-manufacturing-heading">
        <h2 id="fsae-manufacturing-heading">结构设计、制造与装配</h2>
        <p>围绕制动、转弯及路面冲击等载荷工况开展载荷分析、有限元校核与拓扑优化，检查杆件、轴承、摇臂支座和车架安装点的受力与变形，评估连接柔度对车轮定位参数的影响。</p>
        <p>将加工基准、焊接可达性、装配顺序、工具间隙、标准件选型及公差链纳入工程图纸与制造跟进，兼顾结构性能、定位调节范围和维修空间。机械系统统筹阶段进一步协调悬架、传动、制动及电气系统的布置与接口。</p>
        <div className="fsae-wheel-cad">
          <TechnicalFigure file="wheel-end-cad.png" caption="轮端总成 CAD 模型：齿轮传动、壳体与制动部件的空间布置。" />
        </div>
        <div className="fsae-photo-grid">
          <Photo name="rear-assembly" caption="后部悬架、传动系统及周边总成布置。" />
          <Photo name="wheel-assembly" caption="轮端总成与制动、传动接口。" />
          <Photo name="workshop-tuning" caption="整车装配与工位调试。" />
          <Photo name="system-integration" caption="机械与电气系统集成检查。" />
        </div>
      </section>

      <section id="validation" aria-labelledby="fsae-validation-heading">
        <h2 id="fsae-validation-heading">实车测试与数据复盘</h2>
        <p>通过悬架运动学与柔顺性（K&C）检查、四轮定位及赛道测试验证底盘设定，实车测试记录的<strong>峰值横向加速度达到 2.1g</strong>。对设定效果的评估结合操控一致性、轮胎状态及分段表现，不以单次峰值作为整车性能的唯一依据。</p>
        <div className="fsae-photo-grid">
          <Photo name="handling-test" caption="锥桶场地中的转向与操控测试。" />
          <Photo name="track-driving" caption="车辆动态行驶记录。" />
        </div>
        <figure className="fsae-driving">
          <DeferredVideo src="/research/optimized/formula-cover.mp4" poster="/research/optimized/formula-cover-poster.webp" width={400} height={226} label="方程式赛车在锥桶场地中的动态行驶演示" />
          <figcaption>场地动态测试。</figcaption>
        </figure>
        <h3>测试评价与参数修正</h3>
        <ul className="fsae-checklist">
          <li><strong>基准状态：</strong>以轮荷、车高、定位、胎压及传感器校准状态作为设定比较的前提。</li>
          <li><strong>工况区分：</strong>按入弯、弯心和出弯阶段分析调整效果，对照预期响应与实测趋势。</li>
          <li><strong>数据关联：</strong>结合速度、转向、制动及横摆数据，分析车手反馈中的转向不足、尾部稳定性与响应迟滞。</li>
        </ul>
      </section>

      <section id="team" aria-labelledby="fsae-team-heading">
        <h2 id="fsae-team-heading">开发协调与团队协作</h2>
        <p>在机械系统负责人及队长阶段，工作重点由单一子系统设计扩展至跨组接口协调、开发节点安排及赛事准备。统筹设计冻结、采购、装配与测试进度，协调性能目标与交付周期之间的关系。</p>
        <div className="fsae-photo-grid">
          <Photo name="competition-preparation" caption="赛事现场的车辆准备。" />
          <Photo name="competition-team" caption="比赛期间的团队协作。" />
        </div>
        <h3>2022—2024 赛季记录</h3>
        <div className="fsae-seasons">
          <Photo name="team-2022" caption="2022 年 · 车队与赛车合影" />
          <Photo name="team-2023" caption="2023 年 · 车队与赛车合影" />
          <Photo name="team-2024" caption="2024 年 · 车队与赛车合影" />
        </div>
        <p>多赛季开发经历表明，设计方案的实际收益受制造一致性、装配质量和测试充分性共同制约。关键部件检查、参数记录及技术交接，是维持车辆可靠性和后续迭代效率的重要环节。</p>
      </section>

      <section className="fsae-reading" aria-labelledby="fsae-reading-heading">
        <h2 id="fsae-reading-heading">参考阅读</h2>
        <ul>
          <li><a href="https://www.designjudges.com/articles/conceptual-and-objective-design-in-fsae" target="_blank" rel="noreferrer">整车概念与目标设计 · DesignJudges</a></li>
          <li><a href="https://www.designjudges.com/articles/simple-kinematic-philosophies" target="_blank" rel="noreferrer">悬架运动学设计思路 · DesignJudges</a></li>
          <li><a href="https://www.designjudges.com/articles/analyzing-driver-data" target="_blank" rel="noreferrer">车手数据分析 · DesignJudges</a></li>
          <li><a href="https://optimumg.com/claude-rouelles-101-tips-for-formula-student-competition-participants/" target="_blank" rel="noreferrer">Claude Rouelle 给大学生方程式参赛者的工程与管理建议 · OptimumG</a></li>
        </ul>
      </section>

      <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 10 月</p></footer>
    </main>
  );
}
