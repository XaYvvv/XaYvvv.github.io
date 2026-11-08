import { IconHeading } from "./icon-heading";
import photos from "./formula-photos.json";
import { DeferredVideo } from "./deferred-video";
const assetRoot = "/research/formula-student/";

function Photo({ name, caption, eager = false, crop }: {
  name: keyof typeof photos;
  caption: string;
  eager?: boolean;
  crop?: { x: number; y: number; width: number; height: number };
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
        style={{ aspectRatio: crop ? crop.width / crop.height : photo.width / photo.height }}
      >
        <img
          src={`/research/optimized/formula-${name}.webp`}
          alt={caption}
          width={photo.width}
          height={photo.height}
          loading={eager ? "eager" : "lazy"}
          style={crop ? {
            position: "absolute",
            width: `${photo.width / crop.width * 100}%`,
            maxWidth: "none",
            left: `${-crop.x / crop.width * 100}%`,
            top: `${-crop.y / crop.height * 100}%`,
          } : undefined}
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
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const sections = [
  ["overview", "项目概述"],
  ["design-goals", "整车与底盘设计"],
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
        <div className="fsae-seasons" aria-label="2022—2024 赛季赛车">
          <Photo name="team-2022" eager crop={{ x: 0, y: 250, width: 2070, height: 1035 }} caption="2022 · Silver Shark X" />
          <Photo name="team-2023" eager crop={{ x: 0, y: 250, width: 2070, height: 1035 }} caption="2023 · Silver Shark XII" />
          <Photo name="team-2024" eager crop={{ x: 0, y: 250, width: 2070, height: 1035 }} caption="2024 · Silver Shark XIII" />
        </div>
        <p className="meta">2020—2024 · 北京理工大学方程式车队</p>
        <p>悬架与转向设计、车辆动力学、结构轻量化、轮端集成与整车测试。</p>
        <p><a href="https://www.bitfsae.com/" target="_blank" rel="noreferrer">车队官网 ↗</a></p>
      </header>

      <nav className="evidence-nav fsae-nav" aria-label="本页目录">
        {sections.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}
      </nav>

      <section id="overview" aria-labelledby="fsae-overview-heading">
        <IconHeading id="fsae-overview-heading" icon="car">项目概述</IconHeading>
        <p>2020—2024 年参与北京理工大学方程式赛车的设计、制造与赛事准备，先后担任底盘负责人、机械系统负责人及车队队长。工作涵盖悬架与转向运动学设计、车辆动力学分析、结构校核、制造装配和实车测试，并逐步扩展至机械子系统接口协调与整车开发进度管理。</p>
        <dl className="fsae-roles">
          <div><dt>第 1—2 年 · 底盘负责人</dt><dd>悬架几何、转向运动学与结构设计</dd></div>
          <div><dt>第 3 年 · 机械系统负责人</dt><dd>子系统匹配、制造装配与整车调试</dd></div>
          <div><dt>第 4 年 · 车队队长</dt><dd>跨组协作、开发计划与测试安排</dd></div>
        </dl>
        <div className="fsae-campus-simulation">
          <Photo name="campus-car" eager caption="北京理工大学方程式赛车，校园测试现场" />
          <figure className="fsae-simulation">
            <DeferredVideo src={assetRoot + "adams-suspension.mp4"} poster={assetRoot + "adams-suspension-poster.jpg"} width={832} height={898} label="ADAMS 悬架运动及载荷矢量仿真演示" />
            <figcaption>ADAMS 悬架仿真：车轮运动、推杆与弹簧阻尼单元响应，以及载荷矢量变化</figcaption>
          </figure>
        </div>
      </section>

      <section id="design-goals" aria-labelledby="fsae-goals-heading">
        <IconHeading id="fsae-goals-heading" icon="mechanism">整车目标、悬架设计与车辆动力学</IconHeading>
        <div className="fsae-design-grid fsae-overview-grid" id="suspension">
          <TechnicalFigure file="engineering-objectives.png" caption="整车性能目标分解及子系统与轮胎性能的关联" />
          <TechnicalFigure file="tire-suspension-workflow.png" caption="轮胎机理、悬架仿真与实车验证流程" />
        </div>
        <p className="fsae-source-note">橡胶摩擦机理示意来源：Continental AG（见原图标注）。</p>
        <p>以赛事规则、预算及制造周期为约束，结合整车质量、重心位置、轮胎特性和赛道工况，将性能目标分解为悬架运动学、侧倾刚度分配、转向及制动要求。基于轮胎载荷敏感性，分析簧上、簧下质量及几何、弹性因素对横向载荷转移的贡献，评估前后轴刚度分配与操控平衡。</p>
        <p>开展悬架硬点、轮跳与转向运动学设计，分析侧倾中心、外倾角和前束随行程的变化。结合刚度梯度计算及 ADAMS、MATLAB 仿真，迭代悬架几何、弹簧刚度与阻尼设定，并以实车定位和动态测试修正参数，综合评估性能、质量、结构刚度与制造成本。</p>
        <ol className="fsae-process" aria-label="工程开发流程">
          <li>目标分解</li><li>机理分析</li><li>设计仿真</li><li>制造调试</li><li>赛道验证</li>
        </ol>
      </section>

      <section id="lightweight" aria-labelledby="fsae-lightweight-heading">
        <IconHeading id="fsae-lightweight-heading" icon="layers">结构轻量化</IconHeading>
        <p className="meta">2022 · 摇臂轻量化研究，报告第一作者；2024 · Silver Shark XIII 零部件优化，团队技术指导</p>
        <p>围绕悬架摇臂、后立柱和转向支架，结合载荷、连接接口、设计空间与制造条件，采用 Fusion 360 衍生式设计和 Altair Inspire 拓扑优化，完成方案生成、几何重构与静力分析。摇臂以推杆实测约 2500 N 峰值为载荷参考，并与 ADAMS 转向制动工况的 2311 N 仿真结果对照；立柱和转向支架保留关键安装接口，结合金属增材制造条件比较质量、位移与应力，评估轻量化收益。</p>
        <div className="fsae-design-grid">
          <TechnicalFigure file="rocker-generative.png" caption="Fusion 360 衍生式设计的摇臂方案" />
          <TechnicalFigure file="rocker-topology.png" caption="Inspire 拓扑优化及 PolyNURBS 重构方案" />
          <TechnicalFigure file="upright-optimized.png" caption="后立柱优化与重构方案" />
          <TechnicalFigure file="steering-bracket-optimized.png" caption="转向支架衍生式设计方案" />
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
        <details className="fsae-load-record">
          <summary>推杆载荷采集记录 · 2022《基于 FSAE 的结构件衍生式轻量化设计》</summary>
          <TechnicalFigure file="pushrod-load-trace.png" caption="报告中的推杆受力记录，作为摇臂设计的载荷输入参考" />
        </details>
      </section>

      <section id="manufacturing" aria-labelledby="fsae-manufacturing-heading">
        <IconHeading id="fsae-manufacturing-heading" icon="tools">结构设计、制造与装配</IconHeading>
        <p>围绕制动、转弯及路面冲击等载荷工况开展载荷分析、有限元校核与拓扑优化，检查杆件、轴承、摇臂支座和车架安装点的受力与变形，评估连接柔度对车轮定位参数的影响。</p>
        <p>将加工基准、焊接可达性、装配顺序、工具间隙、标准件选型及公差链纳入工程图纸与制造跟进，兼顾结构性能、定位调节范围和维修空间。机械系统统筹阶段进一步协调悬架、传动、制动及电气系统的布置与接口。</p>
        <div className="fsae-wheel-cad">
          <TechnicalFigure file="wheel-end-cad.png" caption="轮端总成 CAD 模型：齿轮传动、壳体与制动部件的空间布置" />
        </div>
        <div className="fsae-photo-grid">
          <Photo name="rear-assembly" caption="后部悬架、传动系统及周边总成布置" />
          <Photo name="wheel-assembly" caption="轮端总成与制动、传动接口" />
          <Photo name="workshop-tuning" caption="整车装配与工位调试" />
          <Photo name="system-integration" caption="机械与电气系统集成检查" />
        </div>
      </section>

      <section id="validation" aria-labelledby="fsae-validation-heading">
        <IconHeading id="fsae-validation-heading" icon="chart">实车测试与数据复盘</IconHeading>
        <p>通过悬架运动学与柔顺性（K&C）检查、四轮定位及赛道测试验证底盘设定，实车测试记录的<strong>峰值横向加速度达到 2.1g</strong>。对设定效果的评估结合操控一致性、轮胎状态及分段表现，不以单次峰值作为整车性能的唯一依据。</p>
        <div className="fsae-photo-grid">
          <Photo name="handling-test" caption="锥桶场地中的转向与操控测试" />
          <Photo name="track-driving" caption="车辆动态行驶记录" />
        </div>
        <figure className="fsae-driving">
          <DeferredVideo src="/research/optimized/formula-cover.mp4" poster="/research/optimized/formula-cover-poster.webp" width={400} height={226} label="方程式赛车在锥桶场地中的动态行驶演示" />
          <figcaption>场地动态测试</figcaption>
        </figure>
        <h3>测试评价与参数修正</h3>
        <ul className="fsae-checklist">
          <li><strong>基准状态：</strong>以轮荷、车高、定位、胎压及传感器校准状态作为设定比较的前提。</li>
          <li><strong>工况区分：</strong>按入弯、弯心和出弯阶段分析调整效果，对照预期响应与实测趋势。</li>
          <li><strong>数据关联：</strong>结合速度、转向、制动及横摆数据，分析车手反馈中的转向不足、尾部稳定性与响应迟滞。</li>
        </ul>
      </section>

      <section id="team" aria-labelledby="fsae-team-heading">
        <IconHeading id="fsae-team-heading" icon="team">开发协调与团队协作</IconHeading>
        <p>在机械系统负责人及队长阶段，工作重点由单一子系统设计扩展至跨组接口协调、开发节点安排及赛事准备。统筹设计冻结、采购、装配与测试进度，协调性能目标与交付周期之间的关系。</p>
        <div className="fsae-photo-grid">
          <Photo name="competition-preparation" caption="赛事现场的车辆准备" />
          <Photo name="competition-team" caption="比赛期间的团队协作" />
        </div>
        <p>多赛季开发经历表明，设计方案的实际收益受制造一致性、装配质量和测试充分性共同制约。关键部件检查、参数记录及技术交接，是维持车辆可靠性和后续迭代效率的重要环节。</p>
      </section>

      <section className="fsae-reading" aria-labelledby="fsae-reading-heading">
        <IconHeading id="fsae-reading-heading" icon="book">参考阅读</IconHeading>
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
