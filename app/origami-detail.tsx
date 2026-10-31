import { IconHeading } from "./icon-heading";
import { DeferredVideo } from "./deferred-video";

const assetRoot = "/research/origami-study/";

function Figure({ file, caption, eager = false, wide = false }: {
  file: string;
  caption: string;
  eager?: boolean;
  wide?: boolean;
}) {
  return <figure className={`origami-figure${wide ? " origami-figure-wide" : ""}`}>
    <a className="origami-frame" href={assetRoot + file} target="_blank" rel="noreferrer" aria-label={`查看大图：${caption}`}>
      <img src={assetRoot + file} alt={caption} loading={eager ? "eager" : "lazy"} />
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
      <p>将平面折叠结构、六足连杆机构与气动足垫集成到小型机器人中，探索机身制造、足端贴合与转向机构的协同设计。</p>
    </header>
    <nav className="evidence-nav" aria-label="本页目录">
      <a href="#overview">总体设计</a><a href="#origami-body">机身与装配</a><a href="#leg-and-ankle">腿部与踝部</a><a href="#steering">气动转向</a><a href="#attachment">吸附足端</a><a href="#contribution">工作与验证</a>
    </nav>

    <section id="overview" aria-labelledby="origami-overview">
      <IconHeading id="origami-overview" icon="fold">总体设计</IconHeading>
      <p>小型爬壁机器人的设计难点不仅在于附着力，还包括驱动部件的空间布置、足端接触姿态和制造装配。该方案以昆虫六足布局与三角步态为参考，用折纸结构形成机身和关节，六个微型电机驱动腿部，外置气压控制装置连接足垫及颈部转向机构。</p>
      <dl className="origami-dofs">
        <div><dt>63.46 × 79.84 × 32.33 mm</dt><dd>报告中的整机设计尺寸，宽、高含腿部</dd></div>
        <div><dt>6 个微型电机</dt><dd>独立腿部驱动，配合连杆机构传递运动</dd></div>
        <div><dt>PET 折叠机身</dt><dd>平面切割、折叠成形与插装式内骨架</dd></div>
      </dl>
      <div className="origami-hero"><Figure file="robot-cad.png" eager caption="整机 CAD：六足机构、前后机身与足端模块的空间布局。" /></div>
    </section>

    <section id="origami-body" aria-labelledby="origami-body-heading">
      <IconHeading id="origami-body-heading" icon="layers">机身与装配：从平面展开到空间结构</IconHeading>
      <p>机身采用 PET 平面材料切割后折叠成形，展开图中预留折痕、驱动安装孔和减重开口。内部通过平板插装构成支撑骨架，用于定位电机、控制板和外壳，便于分件加工与拆装。</p>
      <Figure file="body-flat-pattern.png" wide caption="机身二维展开图；黄色虚线为折痕，孔槽对应安装与连接位置。" />
      <div className="origami-grid">
        <Figure file="assembly-exploded.jpeg" caption="分层装配关系：外壳、内部支撑、控制板、腿部和足垫。" />
        <Figure file="internal-frame.png" caption="插装式内骨架及六个微型电机的布置。" />
      </div>
      <figure className="origami-animation">
        <DeferredVideo src="/research/optimized/origami-cover.mp4" poster="/research/optimized/origami-cover-poster.webp" width={540} height={404} label="折纸机身折叠与形变演示" />
        <figcaption>折纸机身样件的形变演示。</figcaption>
      </figure>
    </section>

    <section id="leg-and-ankle" aria-labelledby="origami-leg-heading">
      <IconHeading id="origami-leg-heading" icon="mechanism">腿部传动与足端姿态适应</IconHeading>
      <p>腿部采用四杆连杆机构传递电机输入，并围绕三角步态所需的足端轨迹进行构型设计。腿部末端延伸出三个折纸单元组成的柔性踝部，使足垫相对腿部具有被动调整接触姿态的能力。</p>
      <p>踝部设计以近似球铰的传力方式为目标：传递支撑力，同时减小腿部姿态变化对足垫贴合的影响。报告展示了展开结构和折叠样件，尚未提供关节刚度与转角范围的定量测试。</p>
      <div className="origami-grid">
        <Figure file="leg-flat-pattern.png" caption="腿部与末端折纸单元的二维展开设计。" />
        <Figure file="folded-leg.png" caption="折叠后的腿部构型，末端为被动适应踝部。" />
      </div>
    </section>

    <section id="steering" aria-labelledby="origami-steering-heading">
      <IconHeading id="origami-steering-heading" icon="cycle">气动颈部转向</IconHeading>
      <p>前后机身之间设置折纸颈部，利用三棱柱形气囊的充气与抽空改变构型，产生头部相对机身的偏转。该机构与足垫共用气压控制设备，并在方案中配合六足驱动完成转向。</p>
      <div className="origami-grid">
        <Figure file="neck-steering-layout.png" caption="颈部转向机构在前后机身之间的安装位置。" />
        <Figure file="steering-folded-sample.jpeg" caption="报告中的折纸转向结构样件。" />
      </div>
    </section>

    <section id="attachment" aria-labelledby="origami-attachment-heading">
      <IconHeading id="origami-attachment-heading" icon="droplet">气动足垫与连接框架</IconHeading>
      <p>足垫参考负压式黏附结构，采用带内部气路的硅橡胶柔性单元。按报告中的设计，气路充气引起足垫形变，通过接触区域内外的压差产生附着力；这一实现方式与蜜蜂足端的湿黏附机理不同。</p>
      <p>足垫上方设置刚性框架，将柔性单元连接到踝部，并为足垫变形保留空间，减少膨胀过程与腿部机构的干涉。整机方案包含外置气泵与电磁阀，气源并未集成在上述机身尺寸内。</p>
      <div className="origami-grid">
        <Figure file="pneumatic-footpad.jpeg" caption="柔性足垫、刚性框架及踝部连接关系。" />
        <Figure file="footpad-channel.png" caption="足垫内部气路的平面设计。" />
      </div>
      <details className="origami-supplement">
        <summary>查看整机气路布置</summary>
        <div className="origami-hero"><Figure file="pneumatic-system.png" caption="气管连接足垫与转向机构，外置气泵和电磁阀提供气压控制。" /></div>
      </details>
    </section>

    <section id="contribution" aria-labelledby="origami-contribution-heading">
      <IconHeading id="origami-contribution-heading" icon="check">个人工作与验证范围</IconHeading>
      <ul className="origami-work">
        <li><strong>机构设计与集成：</strong>负责整机构型，协调折纸机身、腿部连杆、被动踝部和气动足端的连接与空间布置。</li>
        <li><strong>加工与装配：</strong>开展零部件加工、折叠样件制作及整机装配，将展开设计转化为可装配结构。</li>
        <li><strong>团队协作：</strong>组织技术讨论、协调成员任务并整理作品报告与竞赛材料。</li>
      </ul>
      <p>现有材料展示了总体 CAD、展开设计、机构样件及装配工作。项目的主要成果是完成小型折纸机器人各机构的设计与集成探索；报告未提供连续壁面爬行、速度、负载和转向半径的量化结果。</p>
      <p className="origami-source-note">本页新增图示与设计尺寸来自《飞檐走壁——基于折纸理论的仿昆虫爬壁机器人设计》作品报告；样件动画沿用项目演示材料。</p>
    </section>

    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 11 月</p></footer>
  </main>;
}
