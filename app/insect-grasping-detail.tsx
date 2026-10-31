import { IconHeading } from "./icon-heading";
import { DeferredVideo } from "./deferred-video";

const root = "/research/insect-grasping/";

function Figure({ file, caption, wide = false }: { file: string; caption: string; wide?: boolean }) {
  return <figure className={`grasping-figure${wide ? " grasping-wide" : ""}`}>
    <a href={root + file} target="_blank" rel="noreferrer" aria-label={`查看大图：${caption}`}>
      <img src={root + file} alt={caption} loading="lazy" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function InsectGraspingDetail() {
  return <main className="page project-page grasping-page" lang="zh-CN">
    <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
    <header className="project-header">
      <p className="project-category">仿生抓附 · 在研项目</p>
      <h1>昆虫足端启发的灵巧抓取</h1>
      <p className="meta">Insect-Inspired Dexterous Grasping · Ongoing</p>
      <p>以马岛蟑螂足端为主要研究对象，将分段跗节、柔顺足垫与分泌液调控结合，研究固液耦合湿黏附及其在灵巧抓取中的应用。</p>
    </header>
    <nav className="evidence-nav" aria-label="本页目录">
      <a href="#question">抓取问题</a><a href="#contact">足端结构</a><a href="#wet-adhesion">湿黏附设计</a><a href="#release">接触与释放</a><a href="#mechanism">机构设计</a>
    </nav>

    <section id="question" aria-labelledby="grasping-question">
      <IconHeading id="grasping-question" icon="target">异形目标的贴合、承载与释放</IconHeading>
      <p>异形目标抓取涉及曲面贴合、接触载荷分配与脱附控制。昆虫足端通过分段跗节适应局部曲率，利用爪、摩擦垫和黏附垫承担不同方向的接触载荷。</p>
      <p>研究内容包括足端结构与行为表征、固液耦合黏附建模、仿生足垫设计及多关节执行机构集成，重点分析节间载荷传递、界面附着和释放顺序之间的关系。</p>
      <div className="grasping-grid">
        <Figure file="grasping-observations.png" caption="不同形状目标的抓持实验与接近、接触、抓持动作序列。" />
        <figure className="grasping-figure grasping-motion">
          <div><DeferredVideo src="/research/optimized/insect-cover.mp4" poster="/research/optimized/insect-cover-poster.webp" width={540} height={318} label="昆虫足端接触与抓取动作演示" /></div>
          <figcaption>昆虫足端接触与抓取动作。</figcaption>
        </figure>
      </div>
    </section>

    <section id="contact" aria-labelledby="grasping-contact">
      <IconHeading id="grasping-contact" icon="gripper">爪、摩擦垫与黏附垫的分工</IconHeading>
      <p>末端爪通过机械锁合提供附着，跗节垫结构参与摩擦与黏附，各接触单元的作用受表面粗糙度和加载方向影响。跗节分段、足垫纹理及接触边缘形貌是仿生指端设计的主要结构参数。</p>
      <p>通过抓取与攀爬行为记录、足垫显微观察及跗节显微 CT，分析接触姿态、壳体形态与关节连接关系。截面和三维重建用于辨识内部传动路径，为跗节链构型建模提供几何依据。</p>
      <div className="grasping-grid">
        <Figure file="tarsus-contact-modes.png" caption="跗节的分段结构，以及机械锁合、黏附与摩擦三种接触方式。" />
        <Figure file="tarsus-microct.png" caption="跗节显微 CT 截面与三维重建：内部结构及节间连接关系。" />
      </div>
      <div className="grasping-grid">
        <Figure file="pad-microstructure.png" caption="足垫局部微结构与表面纹理。" />
        <Figure file="pad-edge-geometry.png" caption="跗节垫结构的前缘、后缘形貌及角度比较。" />
      </div>
    </section>

    <section id="wet-adhesion" aria-labelledby="grasping-wet-adhesion">
      <IconHeading id="grasping-wet-adhesion" icon="droplet">柔顺结构与分泌液协同的湿黏附设计</IconHeading>
      <p>足垫由柔顺支撑、表面织构和液体输运通道组成，分别调节局部变形、接触状态与界面供液。建模拟结合接触力学与液桥力，分析结构变形和液体分布对附着、脱附过程的影响。</p>
      <div className="grasping-anatomy"><Figure file="fluid-coupled-pad-concept.png" wide caption="仿生足垫设计方案：PDMS 微结构与进液、储液、分泌通道的集成构型。" /></div>
      <p>材料方案包括 PDMS 微结构与定向冷冻水凝胶纤维。氨基酸分析和 GC-MS 用于表征足垫及分泌液成分，为材料选择和人工分泌液配制提供依据。材料、供液方式与加载运动的匹配关系仍需通过接触力测试评估。</p>
    </section>

    <section id="release" aria-labelledby="grasping-release">
      <IconHeading id="grasping-release" icon="cycle">从贴合到顺序脱附</IconHeading>
      <p>足端运动呈现末端接触、近端贴合、末端回弹和完全脱离的顺序变化。仿生指端设计据此考察接触顺序、弯曲方向与载荷分配，研究抓持承载与逐段脱附之间的协调关系。</p>
      <Figure file="contact-release-sequence.png" wide caption="接近、末端接触、近端贴合、末端回弹与完全脱离的图像序列及示意。" />
    </section>

    <section id="mechanism" aria-labelledby="grasping-mechanism">
      <IconHeading id="grasping-mechanism" icon="mechanism">分段柔顺指端与腱驱动构型</IconHeading>
      <p>机构采用主动关节与分段柔顺单元串联的构型。主动关节调整指端位置和姿态，被动单元适应局部曲率，腱传动调节跗节链的弯曲与接触状态。关节柔顺性、腱路布置及传动关系是机构设计的主要变量。</p>
      <div className="grasping-grid">
        <Figure file="tendon-joint-anatomy.png" caption="跗节及末端爪垫的结构关系：壳体、腱、柔性连接与接触垫。" />
        <Figure file="finger-mechanism-concept.png" caption="主动关节与被动跗节串联的机构抽象，以及分段柔顺、腱驱动指端构型。" />
      </div>
      <p>后续工作包括单足端控制、多足端协同及接触反馈集成，围绕不同形状目标开展抓持与释放测试。固液耦合足垫与多关节机构的协同性能仍待样机集成验证。</p>
    </section>
    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 11 月</p></footer>
  </main>;
}
