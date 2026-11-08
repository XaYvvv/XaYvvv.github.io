export type Figure = { src: string; caption: string };
export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  role: string;
  period: string;
  summary: string;
  question: string;
  work: { label: string; text: string }[];
  outcome: string;
  funding?: string;
  authors?: string;
  venue?: string;
  image?: Figure;
  animatedCover?: { src: string; poster: string; alt: string; type: "video" | "image" };
  figures: Figure[];
  paper?: string;
  team?: string;
  related?: string[];
  video?: { src: string; poster: string; caption: string; description: string };
  download?: { src: string; label: string };
};

const base = "/research/ppt/";

export const projects: Project[] = [
  {
    id: "parallel-waist",
    title: "WaistSimulator: Parallel Robotic Waist Design & Analysis",
    shortTitle: "WaistSimulator: Parallel Waist Design & Analysis",
    category: "Robotics · Analysis tool",
    role: "Mechanism definition & AI-assisted development",
    period: "",
    summary: "A Python tool for parallel-waist kinematics, workspace and load analysis.",
    question: "How can a compact parallel waist balance orientation range, transmission quality and actuator loads?",
    work: [],
    outcome: "WaistSimulator V6.2 supports kinematic and load analysis, data export and Windows single-file packaging. Geometry and smoothness optimization remain future directions.",
    image: { src: "/research/parallel-waist/reference-schematic.png", caption: "Original two-DoF parallel waist schematic" },
    animatedCover: { src: "/research/optimized/waist-cover.mp4", poster: "/research/optimized/waist-cover-poster.webp", alt: "Animated parallel waist mechanism with complete three-dimensional coordinate axes", type: "video" },
    figures: [],
  },
  {
    id: "honeybee-adhesion",
    title: "Controllable Adhesion in Extreme Environments & Honeybee Footpad Interface Mechanics",
    shortTitle: "Extreme-Environment Adhesion & Honeybee Footpad Mechanics",
    category: "Research project",
    role: "Project lead",
    period: "January 2024–Present",
    funding: "National Natural Science Foundation of China (No. 5237052667) and Beijing Nova Program (No. 20240484712)",
    summary: "Study insect attachment mechanisms and develop reversible adhesive interfaces and rigid-flexible grippers for irregular surfaces and extreme environments.",
    question: "How can the coupling of tarsal structures, secretions and motion support strong attachment, dexterous grasping and controlled release?",
    work: [
      { label: "Mechanisms and architecture", text: "Lead literature review, experiments and structural design. Use cryo-SEM, AFM and high-speed kinematic analysis to investigate the synergy between tarsal microstructures, secretions and motion. Develop a mechano-chemical adhesion model and rigid-flexible coupling principles for reversible adhesive surfaces, soft grippers and extravehicular attachment devices." },
      { label: "Dexterous attachment", text: "Design coupled rigid-flexible end effectors for irregular curved surfaces and non-cooperative targets. Translate multiscale tarsal contact, directional adhesion and active detachment into bioinspired fingertip units for compliant contact, load-bearing attachment and sequential low-force release." },
      { label: "Validation and translation", text: "Develop highly permeable adhesive patches for low-noise ECG/EMG monitoring, with results published in Advanced Science and related journals." },
    ],
    outcome: "Demonstrated wet-skin attachment, moisture transport and ECG/sEMG monitoring with bioinspired adhesive patches.",
    image: { src: base + "honeybee-hierarchy.png", caption: "Honeybee arolium and hierarchical surface structures" },
    animatedCover: { src: "/research/optimized/honeybee-cover.mp4", poster: "/research/optimized/honeybee-poster.webp", alt: "Microscope recording of honeybee footpad contact and deformation", type: "video" },
    figures: [{ src: base + "honeybee-interface.png", caption: "Microscopy of the contact interface, liquid film and interfacial air pockets" }],
    related: ["sweat-managing-patch", "space-adhesion"],
    video: {
      src: "/research/optimized/honeybee-full.mp4",
      poster: "/research/optimized/honeybee-poster.webp",
      caption: "Honeybee footpad observation",
      description: "Microscope footage accompanying the study of deformable footpad contact.",
    },
  },
  {
    id: "formula-student",
    title: "Design and Fabrication of Formula Student Racing Car (FSAE)",
    shortTitle: "Formula Student Racing Car",
    category: "Engineering project",
    role: "Chassis lead (years 1–2) · Mechanical systems lead (year 3) · Team captain (year 4)",
    period: "2020–2024",
    summary: "Design and validate suspension, steering and vehicle structures, connecting simulation with manufacturing, alignment and track testing.",
    question: "How can suspension kinematics, tire performance and manufacturing constraints be balanced to improve vehicle performance and reliability?",
    work: [
      { label: "Kinematics and vehicle dynamics", text: "Design suspension hardpoints, wheel-travel and steering kinematics, roll center, camber and toe. Iterate geometry, stiffness and damping in ADAMS and MATLAB, then validate through K&C checks, four-wheel alignment and track tests." },
      { label: "Structural design and DFA/DFM", text: "Perform load analysis, finite-element analysis and topology optimization. Account for machining and welding access, assembly sequence, tool clearance, standard parts and tolerance chains in engineering drawings and manufacturing follow-up." },
      { label: "Team leadership", text: "Progress from chassis lead to mechanical systems lead and team captain, coordinating subsystem interfaces and the team's design, manufacturing and testing schedule." },
    ],
    outcome: "Track tests achieved 2.1g peak lateral acceleration.",
    image: { src: base + "vehicle-subsystems.png", caption: "Subsystem designs, structural analysis and manufactured components" },
    animatedCover: { src: "/research/optimized/formula-cover.mp4", poster: "/research/optimized/formula-cover-poster.webp", alt: "Formula Student race car driving demonstration from presentation slide 13", type: "video" },
    figures: [
      { src: base + "suspension-model.png", caption: "Suspension and steering model for kinematic analysis" },
      { src: base + "tire-characteristics.png", caption: "Tire force characteristics used in vehicle performance analysis" },
    ],
    team: "https://www.bitfsae.com/",
  },
  {
    id: "sweat-managing-patch",
    title: "Bioinspired Hierarchical Architecture with Water Transport Channels for Strong Adhesion at the Sweating Interface",
    shortTitle: "Sweat-Managing Adhesive Patch",
    category: "Paper project · Published",
    role: "First student author · Co-first author",
    period: "2026",
    authors: "Jieliang Zhao†,*, Yu Xiang†, et al.",
    venue: "Advanced Science, 2026 · CAS Zone 1 Top · JCR Q1 · IF 14.1",
    summary: "Combine hierarchical adhesive structures with directional water-transport channels to maintain attachment and ECG/EMG monitoring on sweating skin.",
    question: "Can a skin patch remove sweat through its thickness while preserving adhesion and stable electrical contact?",
    work: [
      { label: "Interface architecture", text: "Integrate bioinspired adhesive microstructures with tapered transport channels to balance conformal skin contact and sweat drainage." },
      { label: "Transport mechanism", text: "Analyze capillary transport and compare smooth, single-groove and double-groove channels through modelling and liquid-flow observations." },
      { label: "Wearable validation", text: "Validate attachment on curved and wet skin, permeability and ECG/EMG monitoring during motion and under applied loads." },
    ],
    outcome: "Published in Advanced Science (2026), with Yu Xiang as first student author and co-first author.",
    image: { src: base + "patch-architecture.png", caption: "Cross-species structural design for adhesion and water transport" },
    figures: [
      { src: base + "channel-flow.png", caption: "Liquid transport in channels with different groove structures" },
      { src: base + "patch-on-skin.png", caption: "Wet-skin attachment during wrist rotation and a 200 g load test" },
      { src: base + "ecg-validation.png", caption: "ECG recordings and signal comparison under wet conditions" },
      { src: base + "emg-validation.png", caption: "EMG recordings during lifting at different loads" },
    ],
    paper: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202524043",
    related: ["honeybee-adhesion", "hybrid-wet-adhesive"],
    download: { src: base + "channel-transport.mov", label: "Liquid-transport comparison video (.mov, 11.2 MB)" },
  },
  {
    id: "space-adhesion",
    title: "Insect Tarsus-Inspired Variable-Stiffness Adhesion for Extreme Space Manipulation",
    shortTitle: "Variable-Stiffness Adhesion for Space Manipulation",
    category: "Paper project · In preparation",
    role: "First author",
    period: "Manuscript in preparation",
    authors: "Yu Xiang, et al.",
    funding: "Beijing Nova Program (No. 20240484712)",
    summary: "Develop insect-tarsus-inspired variable-stiffness attachment for conformal contact, load transfer and controlled release in extreme environments.",
    question: "How can an adhesive end effector combine compliant contact and load-bearing stiffness while tolerating thermal cycling and radiation?",
    work: [
      { label: "Adhesive mechanism", text: "Investigate tarsal attachment and detachment to guide rigid-flexible coupling, directional adhesion and active release." },
      { label: "Design and validation", text: "Develop the adhesive structures and evaluate performance under extreme-environment conditions as part of the broader controllable-adhesion project." },
      { label: "Manuscript", text: "Prepare a paper on the insect-inspired variable-stiffness mechanism and its application to extreme space manipulation." },
    ],
    outcome: "Manuscript in preparation.",
    image: { src: "/research/gallery/PDF-22-Im0-preview.webp", caption: "Insect tarsal attachment and detachment sequence" },
    figures: [{ src: "/research/space-adhesion-slide.png", caption: "Earlier research-plan slide: biological inspiration and planned environmental validation; The current project status is described above" }],
    related: ["honeybee-adhesion"],
  },
  {
    id: "hybrid-wet-adhesive",
    title: "Honeybee–Tree-Frog Wet Adhesive Surface",
    shortTitle: "Honeybee–Tree-Frog Wet Adhesive Surface",
    category: "Research project · Published",
    role: "Collaborative research · Co-author",
    period: "2025",
    summary: "Combine tree-frog-inspired pillars and honeybee-inspired frames into a self-draining interface for robust biosignal monitoring.",
    question: "How can a textured surface maintain contact when liquid accumulates between an adhesive and the skin?",
    work: [
      { label: "Surface design", text: "Contribute to wet-adhesion research combining tree-frog-inspired pillars with honeybee-inspired frames in a micro-nano hierarchical surface." },
      { label: "Interface mechanics", text: "Investigate liquid-film splitting and confined wetting to connect surface geometry with normal and shear adhesion." },
    ],
    outcome: "Published as “Bionic Wet Adhesive Surface with Micronano Hierarchical Structure for Robust Biosignal Monitoring” in ACS Applied Materials & Interfaces (2025).",
    image: { src: base + "hybrid-adhesive-design.png", caption: "Biological inspiration, surface architecture and wearable application" },
    figures: [{ src: base + "hybrid-adhesive-tests.png", caption: "Surface characterization and comparative adhesion measurements" }],
    paper: "https://pubs.acs.org/doi/10.1021/acsami.5c02890",
    related: ["sweat-managing-patch"],
  },
  {
    id: "insect-dexterous-grasping",
    title: "Dexterous Grasping via Insect Wet Adhesion",
    shortTitle: "Insect-Inspired Dexterous Grasping (Ongoing)",
    category: "Research project · In progress",
    role: "Independent research",
    period: "In progress",
    summary: "Investigate insect-inspired wet adhesion and segmented, tendon-driven fingertips for conformal contact, load transfer and controlled release.",
    question: "Can insect footpad adhesion and leg trajectories guide fingertip contact and release in a robotic hand?",
    work: [
      { label: "Research direction", text: "Study wet-adhesion mechanisms and insect leg trajectories to inform bioinspired fingertip structures and grasping motions." },
      { label: "Planned integration", text: "Plan to integrate adhesive fingertips and insect-inspired motion with the externally developed open-source ORCA platform, followed by gait planning and feedback-based coordination. The hand platform itself is not my work." },
    ],
    outcome: "Ongoing research direction. Adhesive-fingertip integration and coordinated grasping validation remain planned work.",
    image: { src: "/research/gallery/PDF-23-Im0-preview.webp", caption: "Insect leg trajectories used to study contact and release strategies" },
    animatedCover: { src: "/research/optimized/insect-cover.mp4", poster: "/research/optimized/insect-cover-poster.webp", alt: "Insect contact and grasping motion from presentation slide 22", type: "video" },
    figures: [{ src: "/research/dexterous-grasping-slide.png", caption: "Research-plan slide covering adhesive fingertip design, ORCA integration and insect leg trajectories" }],
    related: ["honeybee-adhesion"],
  },
  {
    id: "worm-like-soft-robot",
    title: "A Worm-like Soft Robot Based on Adhesion-Controlled Electrohydraulic Actuators",
    shortTitle: "Electrohydraulic Worm-Like Soft Robot",
    category: "Collaborative research · Published",
    role: "Co-author · Bioinspired friction pads",
    period: "July–October 2024",
    summary: "Fabricate bioinspired contact pads combining tree-frog and honeybee footpad textures to improve the crawling performance of an electrohydraulic soft robot.",
    question: "How can bioinspired surface textures improve frictional contact during electrohydraulic crawling?",
    work: [
      { label: "Bioinspired surface design", text: "Combine tree-frog and honeybee footpad textures to create friction pads for the crawling platform." },
      { label: "Fabrication", text: "Produce the contact structures through photolithography and replica molding as part of the collaborative robot project." },
    ],
    outcome: "The collaborative work was published in Biomimetics, 9(12), 776 (2024), with Yu Xiang as third author.",
    image: { src: "/research/gallery/PDF-16-Im0-preview.webp", caption: "Electrohydraulic actuator structure and bioinspired friction-pad design" },
    figures: [],
    paper: "https://www.mdpi.com/2313-7673/9/12/776",
    related: ["hybrid-wet-adhesive"],
  },
  {
    id: "origami-wall-climbing-robot",
    title: "Origami-Based Insect-Inspired Wall-Climbing Robot",
    shortTitle: "Origami-Based Insect-Inspired Wall-Climbing Robot",
    category: "Collaborative engineering project",
    role: "Team leader",
    period: "November 2020–September 2021",
    summary: "Design and assemble an insect-inspired climbing robot combining an origami body, four-bar linkage legs, adaptive ankles and negative-pressure suction cups.",
    question: "How can a lightweight folding body and insect-inspired leg mechanisms provide locomotion and adaptable surface contact for a wall-climbing robot?",
    work: [
      { label: "Overall robot design", text: "Design the robot architecture around an origami body, four-bar linkage legs, tarsus-like adaptive ankles and negative-pressure suction cups. The 13-DoF design includes six active leg degrees of freedom for walking, one active neck-yaw degree of freedom and six passive foot degrees of freedom for surface adaptation." },
      { label: "Manufacturing and assembly", text: "Carry out component fabrication and complete robot assembly, connecting the structural design with the physical prototype." },
      { label: "Team coordination", text: "Lead team members, organize regular technical discussions and prepare competition materials." },
    ],
    outcome: "Completed the overall robot design and full assembly as team leader in a collaborative undergraduate project.",
    image: { src: base + "wall-climbing-robot.png", caption: "Overall design of the origami-based insect-inspired wall-climbing robot" },
    animatedCover: { src: "/research/optimized/origami-cover.mp4", poster: "/research/optimized/origami-cover-poster.webp", alt: "Origami body deformation demonstration from presentation slide 14", type: "video" },
    figures: [
      { src: base + "wall-climbing-origami-body.png", caption: "Flat body pattern for the origami structure" },
      { src: base + "wall-climbing-leg-linkage.png", caption: "Four-bar linkage leg mechanism and its connection to the foot" },
      { src: base + "wall-climbing-assembled-body.png", caption: "Fabricated and assembled body structure" },
    ],
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

// These studies are introduced under Publications rather than listed twice.
export const publicationProjectIds = new Set([
  "sweat-managing-patch",
  "space-adhesion",
  "hybrid-wet-adhesive",
  "worm-like-soft-robot",
]);
