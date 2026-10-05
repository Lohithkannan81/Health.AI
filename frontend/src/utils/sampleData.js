// SVG Base64 Medical Image Presets for Instant Testing

const SAMPLE_CHEST_XRAY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23090d16"/><g opacity="0.85"><path d="M 300 120 C 240 120 180 160 160 250 C 140 340 170 480 280 500 C 290 502 310 502 320 500 C 430 480 460 340 440 250 C 420 160 360 120 300 120 Z" fill="none" stroke="%2338bdf8" stroke-width="2" stroke-dasharray="4 4"/><path d="M 180 200 Q 220 220 280 240 Q 220 360 200 450 Q 150 380 180 200 Z" fill="%231e293b" opacity="0.7" stroke="%230284c7" stroke-width="1.5"/><path d="M 420 200 Q 380 220 320 240 Q 380 360 400 450 Q 450 380 420 200 Z" fill="%231e293b" opacity="0.7" stroke="%230284c7" stroke-width="1.5"/><circle cx="370" cy="380" r="45" fill="%23e0f2fe" opacity="0.45" filter="blur(6px)"/><circle cx="370" cy="380" r="25" fill="%23ffffff" opacity="0.6"/><g stroke="%2394a3b8" stroke-width="12" stroke-linecap="round"><line x1="300" y1="140" x2="300" y2="480"/><line x1="280" y1="180" x2="320" y2="180"/><line x1="270" y1="220" x2="330" y2="220"/><line x1="260" y1="260" x2="340" y2="260"/><line x1="250" y1="300" x2="350" y2="300"/><line x1="240" y1="340" x2="360" y2="340"/><line x1="240" y1="380" x2="360" y2="380"/><line x1="250" y1="420" x2="350" y2="420"/></g><text x="40" y="560" fill="%2338bdf8" font-family="sans-serif" font-size="20" font-weight="bold">CHEST RADIOGRAPH (PA VIEW)</text><text x="40" y="585" fill="%2394a3b8" font-family="sans-serif" font-size="14">Focal opacification right lower zone</text></g></svg>`;

const SAMPLE_SKIN_LESION_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23c28d75"/><g opacity="0.95"><path d="M 240 220 Q 340 180 390 260 Q 440 340 360 400 Q 280 440 220 360 Q 180 280 240 220 Z" fill="%23261209" stroke="%23451e0e" stroke-width="6"/><path d="M 280 240 Q 320 220 350 280 Q 380 320 320 360 Q 260 380 240 320 Z" fill="%23572813"/><circle cx="310" cy="290" r="30" fill="%237c3a1d" opacity="0.8"/><circle cx="340" cy="330" r="15" fill="%239a3412" opacity="0.9"/><circle cx="330" cy="310" r="12" fill="%23ffffff" opacity="0.3"/><rect x="50" y="50" width="120" height="120" fill="none" stroke="%2338bdf8" stroke-width="3" stroke-dasharray="6 6"/><text x="60" y="190" fill="%23ffffff" font-family="sans-serif" font-size="14" font-weight="bold">DERMOSCOPY FIELD</text><text x="40" y="560" fill="%23ffffff" font-family="sans-serif" font-size="20" font-weight="bold">CUTANEOUS DERMOSCOPY SCAN</text><text x="40" y="585" fill="%23f1f5f9" font-family="sans-serif" font-size="14">Asymmetric pigmented dermal lesion</text></g></svg>`;

const SAMPLE_LUMBAR_MRI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23020617"/><g opacity="0.9"><rect x="220" y="80" width="90" height="65" rx="8" fill="%23334155" stroke="%2364748b" stroke-width="2"/><rect x="220" y="160" width="90" height="65" rx="8" fill="%23334155" stroke="%2364748b" stroke-width="2"/><rect x="220" y="240" width="90" height="65" rx="8" fill="%23334155" stroke="%2364748b" stroke-width="2"/><rect x="220" y="320" width="90" height="65" rx="8" fill="%23334155" stroke="%2364748b" stroke-width="2"/><rect x="220" y="400" width="90" height="65" rx="8" fill="%23334155" stroke="%2364748b" stroke-width="2"/><path d="M 330 70 Q 345 250 330 480" fill="none" stroke="%23e2e8f0" stroke-width="12" opacity="0.8"/><path d="M 310 335 Q 355 350 330 365" fill="%2306b6d4" opacity="0.9"/><circle cx="340" cy="350" r="14" fill="%23ef4444" opacity="0.85" filter="blur(2px)"/><text x="365" y="355" fill="%23ef4444" font-family="sans-serif" font-size="15" font-weight="bold">L4-L5 Disc Protrusion</text><text x="40" y="560" fill="%2338bdf8" font-family="sans-serif" font-size="20" font-weight="bold">LUMBAR SPINE SAGITTAL T2 MRI</text></g></svg>`;

export const SAMPLE_PRESETS = [
  {
    id: "pneumonia-xray",
    title: "Chest X-Ray (Pneumonia Suspect)",
    modality: "X-Ray",
    patient: {
      full_name: "Eleanor Vance",
      age: "54",
      gender: "Female",
      height: "165 cm",
      weight: "68 kg",
      blood_group: "A+",
      medical_history: "Mild asthma, Non-smoker",
      current_medication: "Albuterol inhaler PRN",
      severity: "Moderate"
    },
    symptoms: "High fever (102.4°F) for 4 days, persistent productive cough with yellowish sputum, sharp right-sided chest pain when breathing deeply, shortness of breath upon exertion, and severe fatigue.",
    image: SAMPLE_CHEST_XRAY_SVG,
    imageName: "chest_xray_pa_view.svg"
  },
  {
    id: "melanoma-skin",
    title: "Dermoscopy (Skin Lesion)",
    modality: "Skin",
    patient: {
      full_name: "Marcus Brody",
      age: "42",
      gender: "Male",
      height: "180 cm",
      weight: "82 kg",
      blood_group: "O+",
      medical_history: "Frequent sun exposure, history of sunburns",
      current_medication: "Daily multivitamin",
      severity: "Moderate"
    },
    symptoms: "Noticed a new dark mole on upper left shoulder over the last 3 months. It has irregular borders, varying shades of brown and dark tan, mild itching, and slight increase in diameter to ~5mm.",
    image: SAMPLE_SKIN_LESION_SVG,
    imageName: "cutaneous_dermoscopy.svg"
  },
  {
    id: "lumbar-mri",
    title: "Lumbar Spine (Disc Herniation)",
    modality: "MRI",
    patient: {
      full_name: "David Sterling",
      age: "38",
      gender: "Male",
      height: "178 cm",
      weight: "79 kg",
      blood_group: "B+",
      medical_history: "Heavy lifting at work, occasional lower back tightness",
      current_medication: "Ibuprofen 400mg PRN",
      severity: "Severe"
    },
    symptoms: "Sharp lower back pain radiating down the left leg past the knee (sciatica), tingling and numbness in left calf and foot. Pain worsens when sitting or bending forward.",
    image: SAMPLE_LUMBAR_MRI_SVG,
    imageName: "lumbar_mri_t2.svg"
  }
];

export const IMAGE_MODALITIES = [
  { name: "X-Ray", desc: "Chest, Skeletal, Dental Radiographs", icon: "Activity" },
  { name: "MRI", desc: "Brain, Spine, Joint Magnetic Imaging", icon: "Radio" },
  { name: "CT Scan", desc: "Abdominal, Thoracic 3D Scans", icon: "Layers" },
  { name: "Ultrasound", desc: "Abdominal, Vascular Sonography", icon: "Waves" },
  { name: "Skin", desc: "Cutaneous & Dermoscopic Scans", icon: "Maximize" },
  { name: "Eye", desc: "Fundus & Ophthalmic Imaging", icon: "Eye" },
  { name: "Medical Reports", desc: "Lab Results, Blood Panels, ECG", icon: "FileText" }
];
