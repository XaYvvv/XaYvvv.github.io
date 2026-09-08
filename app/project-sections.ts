type EvidenceFigure = { id: string; caption: string; wide?: boolean };
export type EvidenceSection = {
  id: string;
  title: string;
  description: string;
  figures: EvidenceFigure[];
  video?: string;
};

export const projectSections: Record<string, EvidenceSection[]> = {
  "honeybee-adhesion": [
    { id: "footpad-structure", title: "Footpad structure and wet contact", description: "Microscopy connects the pad's hierarchical structure with its liquid-mediated contact interface.", figures: [
      { id: "PPT-image113", caption: "Microscopy of the arolium, contact region and interfacial air pockets.", wide: true },
      { id: "PPT-image112", caption: "AFM topography of the first-order surface structure." },
      { id: "PPT-image111", caption: "Height profile across the first-order surface structure." },
    ] },
    { id: "dynamic-contact", title: "Attachment and deformation", description: "The experimental recording shows the footpad during contact. It accompanies the study of deformation and reversible attachment.", figures: [], video: "PPT-media2" },
    { id: "interface-chemistry", title: "Interface chemistry", description: "The presentation brings compositional analysis into the study of coupled mechanical and chemical adhesion.", figures: [
      { id: "PDF-21-Im0", caption: "Amino-acid composition plots included in the interface-chemistry study." },
      { id: "PDF-21-Im4", caption: "Chromatographic traces shown in the presentation." },
    ] },
  ],
  "orca-hand": [
    { id: "mechanism-study", title: "Mechanism and tendon transmission", description: "The platform reference identifies the mechanical features examined during reproduction, including the tendon path, joint arrangement and tensioning mechanisms.", figures: [
      { id: "PDF-23-Im1", caption: "Reference diagram of the open-source ORCA hand. This is the platform illustration used for the design study, not a photograph of the reproduced hand.", wide: true },
    ] },
  ],
  "formula-student": [
    { id: "vehicle-dynamics", title: "Tire response and suspension kinematics", description: "Tire modelling and suspension analysis inform the geometry and setup taken into vehicle testing.", figures: [
      { id: "PPT-image58", caption: "Tire response curves used in vehicle-performance modelling." },
      { id: "PPT-image59", caption: "Comparison of tire force characteristics." },
      { id: "PPT-image69", caption: "Suspension and steering kinematic model.", wide: true },
      { id: "PPT-image71", caption: "Roll-angle calculations and comparison plots.", wide: true },
    ] },
    { id: "manufacturing-design", title: "Engineering drawings and manufacturing", description: "The drawings connect structural decisions with machining, assembly and vehicle integration.", figures: [
      { id: "PPT-image60", caption: "Vehicle component engineering drawing." },
      { id: "PPT-image61", caption: "Assembly drawing and component interfaces." },
    ] },
    { id: "vehicle-testing", title: "Vehicle and track work", description: "Physical vehicle records complement the simulation and design work.", figures: [
      { id: "PDF-10-Im1", caption: "Formula Student vehicle during outdoor work." },
      { id: "PPT-image56", caption: "Track-test recording. Open the image to view the original animation." },
    ] },
    { id: "project-delivery", title: "Team delivery", description: "As team captain, I coordinated the schedule across design, manufacturing and testing.", figures: [
      { id: "PPT-image75", caption: "Development schedule used to coordinate project work.", wide: true },
    ] },
  ],
  "sweat-managing-patch": [
    { id: "channel-design", title: "Capillary channel design", description: "Tapered channels and internal grooves guide liquid away from the adhesive interface.", figures: [
      { id: "PPT-image139", caption: "Force balance and meniscus geometry in a tapered channel." },
      { id: "PPT-image140", caption: "Channel-angle comparison and liquid-transport simulation." },
      { id: "PPT-image141", caption: "Transport comparison for smooth, single-groove and double-groove channels.", wide: true },
    ] },
    { id: "skin-attachment", title: "Conformal contact and wet-skin adhesion", description: "Tests examine attachment on curved skin and under movement and applied load.", figures: [
      { id: "PPT-image143", caption: "Curvature-adaptive contact and adhesion measurements." },
      { id: "PPT-image144", caption: "Attachment on wet skin during wrist rotation and a 200 g load test." },
    ] },
    { id: "permeability", title: "Permeability and skin response", description: "Thermal imaging and water-loss measurements assess the effect of transport channels on the skin interface.", figures: [
      { id: "PPT-image146", caption: "Thermal-image comparison between sealed PDMS and the adhesive patch." },
      { id: "PPT-image148", caption: "Water-loss measurements for the compared interfaces." },
    ] },
    { id: "biosignal-validation", title: "ECG and EMG validation", description: "The patch is evaluated as a wearable interface for biosignal recording under wet conditions and different physical loads.", figures: [
      { id: "PPT-image151", caption: "ECG recordings under dry, wet and sweating conditions.", wide: true },
      { id: "PPT-image153", caption: "EMG traces during lifting at different loads.", wide: true },
    ], video: "PPT-media3" },
  ],
  "space-adhesion": [
    { id: "tarsal-mechanisms", title: "Tarsal structure and attachment mechanisms", description: "The research uses insect tarsi as a model for conformal contact, load transfer and controlled detachment.", figures: [
      { id: "PDF-22-Im2", caption: "Biological model shown in the research presentation." },
      { id: "PDF-22-Im1", caption: "Tarsal anatomy illustrating the structures relevant to contact and attachment." },
    ] },
    { id: "material-approach", title: "Adhesive material approach", description: "These chemical-structure figures document the material approach in the earlier research plan. They are not measurements of thermal or radiation performance.", figures: [
      { id: "PDF-22-Im5", caption: "Silicone modification schemes included in the material study." },
      { id: "PDF-22-Im7", caption: "Additional chemical structures used as supporting material references." },
    ] },
  ],
  "hybrid-wet-adhesive": [
    { id: "hierarchical-design", title: "Hierarchical surface design", description: "Honeybee-inspired concavities and tree-frog-inspired pillars form the textured wet adhesive interface.", figures: [
      { id: "PPT-image120", caption: "Contact-interface design with confined liquid bridges." },
      { id: "PPT-image122", caption: "Geometry and dimensions of the hierarchical surface." },
    ] },
    { id: "liquid-observation", title: "Liquid-film observation", description: "Interface observations show how liquid distributes around the microstructures during contact.", figures: [
      { id: "PPT-image121", caption: "Liquid-film observations at the patterned interface.", wide: true },
    ] },
    { id: "adhesion-response", title: "Normal and shear adhesion", description: "Mechanical comparisons connect microstructure geometry and wetting conditions to adhesive performance.", figures: [
      { id: "PPT-image119", caption: "Surface characterization and comparative adhesion measurements.", wide: true },
      { id: "PPT-image128", caption: "Normal adhesion model across different liquid-bridge regimes." },
      { id: "PPT-image127", caption: "Shear response as a function of liquid-bridge height." },
    ] },
  ],
  "insect-dexterous-grasping": [
    { id: "motion-analysis", title: "Insect motion and contact sequence", description: "Leg trajectories and contact observations guide the ongoing study of attachment and release motions.", figures: [
      { id: "PDF-23-Im2", caption: "Motion-tracking frames and the associated trajectory plot." },
      { id: "PDF-23-Im3", caption: "Trajectory curves used to study the motion sequence." },
    ] },
    { id: "fingertip-concept", title: "Bioinspired fingertip concept", description: "The biological foot structure motivates the proposed fingertip mechanism.", figures: [
      { id: "PDF-23-Im6", caption: "Insect foot contact shown in the presentation." },
      { id: "PDF-23-Im7", caption: "Kinematic representation of the leg and foot mechanism." },
    ] },
    { id: "integration-plan", title: "Integration plan", description: "The proposed workflow combines adhesive-fingertip design with motion control. Integration and coordinated-grasping validation remain ongoing work.", figures: [
      { id: "PDF-23-Im5", caption: "Research workflow for adhesive fingertips and dexterous-grasping integration.", wide: true },
    ] },
  ],
  "worm-like-soft-robot": [
    { id: "crawling-experiments", title: "Crawling experiments", description: "The collaborative study compares crawling behaviour using the bioinspired contact structures.", figures: [
      { id: "PDF-16-Im1", caption: "Crawling sequences and performance plots from the published robot study.", wide: true },
    ] },
  ],
  "origami-wall-climbing-robot": [
    { id: "body-design", title: "Origami body and robot architecture", description: "The folding body connects the leg mechanisms within the robot's active and passive degree-of-freedom arrangement.", figures: [
      { id: "PDF-15-Im1", caption: "Schematic of the robot's degree-of-freedom arrangement." },
      { id: "PDF-15-Im3", caption: "Flat pattern used to construct the origami body." },
    ] },
    { id: "leg-mechanism", title: "Leg linkage and adaptive ankle", description: "The four-bar leg mechanism provides motion, while the adaptive ankle accommodates changes in surface orientation.", figures: [
      { id: "PDF-15-Im4", caption: "Four-bar leg mechanism and its connection to the foot." },
      { id: "PDF-15-Im2", caption: "Kinematic representation of the linkage." },
      { id: "PDF-15-Im14", caption: "Folded adaptive-ankle mechanism during manual manipulation." },
      { id: "PDF-15-Im15", caption: "Rotational directions of the folded ankle mechanism." },
    ] },
    { id: "prototype-assembly", title: "Fabrication and assembly", description: "Physical models document the transition from the flat pattern and linkage design to assembled components.", figures: [
      { id: "PDF-15-Im5", caption: "Fabricated body structure.", wide: true },
      { id: "PDF-15-Im23", caption: "Folding-body prototype during handling." },
      { id: "PDF-15-Im24", caption: "Assembled leg-linkage prototype." },
    ] },
  ],
};
