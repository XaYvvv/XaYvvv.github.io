type EvidenceFigure = { id: string; caption: string; wide?: boolean };
export type EvidenceSection = {
  id: string;
  title: string;
  description: string;
  figures: EvidenceFigure[];
  video?: string;
};

export const projectSections: Record<string, EvidenceSection[]> = {
  "sweat-managing-patch": [
    { id: "channel-design", title: "Capillary channel design", description: "Tapered channels and internal grooves guide liquid away from the adhesive interface.", figures: [
      { id: "PPT-image139", caption: "Force balance and meniscus geometry in a tapered channel" },
      { id: "PPT-image140", caption: "Channel-angle comparison and liquid-transport simulation" },
      { id: "PPT-image141", caption: "Transport comparison for smooth, single-groove and double-groove channels", wide: true },
    ] },
    { id: "skin-attachment", title: "Conformal contact and wet-skin adhesion", description: "Tests examine attachment on curved skin and under movement and applied load.", figures: [
      { id: "PPT-image143", caption: "Curvature-adaptive contact and adhesion measurements" },
      { id: "PPT-image144", caption: "Attachment on wet skin during wrist rotation and a 200 g load test" },
    ] },
    { id: "permeability", title: "Permeability and skin response", description: "Thermal imaging and water-loss measurements assess the effect of transport channels on the skin interface.", figures: [
      { id: "PPT-image146", caption: "Thermal-image comparison between sealed PDMS and the adhesive patch" },
      { id: "PPT-image148", caption: "Water-loss measurements for the compared interfaces" },
    ] },
    { id: "biosignal-validation", title: "ECG and EMG validation", description: "The patch is evaluated as a wearable interface for biosignal recording under wet conditions and different physical loads.", figures: [
      { id: "PPT-image151", caption: "ECG recordings under dry, wet and sweating conditions", wide: true },
      { id: "PPT-image153", caption: "EMG traces during lifting at different loads", wide: true },
    ], video: "PPT-media3" },
  ],
  "space-adhesion": [
    { id: "tarsal-mechanisms", title: "Tarsal structure and attachment mechanisms", description: "The research uses insect tarsi as a model for conformal contact, load transfer and controlled detachment.", figures: [
      { id: "PDF-22-Im2", caption: "Biological model shown in the research presentation" },
      { id: "PDF-22-Im1", caption: "Tarsal anatomy illustrating the structures relevant to contact and attachment" },
    ] },
    { id: "material-approach", title: "Adhesive material approach", description: "These chemical-structure figures document the material approach in the earlier research plan. They are not measurements of thermal or radiation performance.", figures: [
      { id: "PDF-22-Im5", caption: "Silicone modification schemes included in the material study" },
      { id: "PDF-22-Im7", caption: "Additional chemical structures used as supporting material references" },
    ] },
  ],
  "hybrid-wet-adhesive": [
    { id: "hierarchical-design", title: "Hierarchical surface design", description: "Honeybee-inspired concavities and tree-frog-inspired pillars form the textured wet adhesive interface.", figures: [
      { id: "PPT-image120", caption: "Contact-interface design with confined liquid bridges" },
      { id: "PPT-image122", caption: "Geometry and dimensions of the hierarchical surface" },
    ] },
    { id: "liquid-observation", title: "Liquid-film observation", description: "Interface observations show how liquid distributes around the microstructures during contact.", figures: [
      { id: "PPT-image121", caption: "Liquid-film observations at the patterned interface", wide: true },
    ] },
    { id: "adhesion-response", title: "Normal and shear adhesion", description: "Mechanical comparisons connect microstructure geometry and wetting conditions to adhesive performance.", figures: [
      { id: "PPT-image119", caption: "Surface characterization and comparative adhesion measurements", wide: true },
      { id: "PPT-image128", caption: "Normal adhesion model across different liquid-bridge regimes" },
      { id: "PPT-image127", caption: "Shear response as a function of liquid-bridge height" },
    ] },
  ],
  "worm-like-soft-robot": [
    { id: "crawling-experiments", title: "Crawling experiments", description: "The collaborative study compares crawling behaviour using the bioinspired contact structures.", figures: [
      { id: "PDF-16-Im1", caption: "Crawling sequences and performance plots from the published robot study", wide: true },
    ] },
  ],
};
