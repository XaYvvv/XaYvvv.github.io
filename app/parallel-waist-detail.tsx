const base = "/research/parallel-waist/";

function WaistFigure({ file, caption, eager = false }: { file: string; caption: string; eager?: boolean }) {
  return <figure className="waist-figure">
    <a href={base + file} target="_blank" rel="noreferrer" aria-label={`查看原图：${caption}`}>
      <img src={base + file} alt={caption} loading={eager ? "eager" : "lazy"} />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function ParallelWaistDetail() {
  return <main className="page project-page waist-page" lang="zh-CN">
    <nav className="back-nav" aria-label="返回主页"><a href="/#projects">← 项宇 / 项目</a></nav>
    <header className="project-header">
      <p className="project-category">机器人机构设计</p>
      <h1>WaistSimulator：腰部并联机构分析工具</h1>
      <p>针对机器人腰部机构的尺寸设计与驱动选型，分析几何参数对姿态可达域、传动性能及驱动载荷的影响。以下以小鹏 IRON 和智元 X2 的腰部机构作为结构参考。</p>
      <div className="waist-reference-grid">
        <WaistFigure file="xpeng-iron-reference.png" eager caption="结构参考：小鹏 IRON。" />
        <WaistFigure file="agibot-x2-reference.png" eager caption="结构参考：智元 X2。" />
      </div>
      <p>计算模型采用双电机驱动的 Roll / Pitch 两自由度并联构型：电机安装于动平台，通过曲柄与定长推拉杆连接底座，平台由中心十字铰支撑。模型使用示例尺寸，未针对上述机器人进行参数标定。</p>
      <p className="meta">Python / NumPy / SciPy / Tkinter · V6.2 · Windows</p>
    </header>

    <div className="waist-motion">
      <WaistFigure file="motion.gif" eager caption="运动仿真示例：机构姿态与左右曲柄角度。" />
    </div>

    <section aria-labelledby="waist-analysis">
      <h2 id="waist-analysis">分析功能</h2>
      <ul>
        <li>运动学：参数化调整机构尺寸，求解正逆运动学，计算姿态可达域并回放运动轨迹。</li>
        <li>载荷：根据质量、质心及运动状态，计算重力与惯性作用下的曲柄输出轴力矩、连杆轴力和十字铰合反力。</li>
        <li>传动分析：计算雅可比矩阵与奇异性指标，支持运动曲线、计算数据及图表导出。</li>
      </ul>
      <div className="waist-figure-grid">
        <WaistFigure file="workspace.png" caption="示例尺寸下的姿态可达域，未计入碰撞。" />
        <WaistFigure file="drive-loads.png" caption="20 kg 单质点负载下的仿真曲线。点击可查看大图。" />
      </div>
    </section>

    <section aria-labelledby="waist-development">
      <h2 id="waist-development">实现与适用范围</h2>
      <p>程序采用 Python、NumPy、SciPy 和 Tkinter，借助 AI 辅助开发，已打包为 Windows 单文件 EXE。批量计算在后台进程执行，结合绘制缓存与分频刷新改善交互响应。</p>
      <p>当前载荷分析采用理想运动副与单质点模型，不包含完整多刚体动力学及实机闭环控制。尺寸优化与运动平顺性优化为后续研究方向。</p>
    </section>
    <footer><a href="/#projects">← 返回项目列表</a><p>项宇 · 更新于 2026 年 10 月</p></footer>
  </main>;
}
