import type { CalibrePerspectiveId, CaseFinishId } from '../engine/motionBridge';

export const ATELIER_INFO = {
  name: 'Watch Care Centre Ltd',
  brandTitle: 'WATCH CARE CENTRE',
  brandCity: 'LONDON',
  editionLabel: 'Cosmic Twilight Edition',
  addressShort: 'Shop G105, 13–25 Church St, NW8 8DT',
  addressLine1: 'Shop G105, 13–25 Church Street',
  addressLine2: 'London NW8 8DT, United Kingdom',
  nearestStations: 'Nearest Stations: Marylebone · Edgware Road · Baker Street',
  phoneDisplay: '+44 7737 364429',
  phoneHref: 'tel:+447737364429',
  whatsappHref:
    'https://wa.me/447737364429?text=Hello%20Watch%20Care%20Centre%20London%2C%20I%20would%20like%20to%20arrange%20a%20timepiece%20assessment.',
  email: 'wccltd24@hotmail.com',
  emailHref: 'mailto:wccltd24@hotmail.com',
  hoursWeekday: 'Monday – Saturday: 10:00 – 18:00',
  hoursSunday: 'Sunday: By Prior Appointment Only',
  existingSiteUrl: 'https://www.google.com/maps/search/?api=1&query=Watch+Care+Centre+Ltd+13-25+Church+Street+London+NW8+8DT',
};

export const MEDIA_PATHS = {
  heroVideo: '/assets/videos/FULL%20BACKGROUND%20.mp4',
  heroShowcaseWatch: '/assets/videos/hero-showcase-watch.mp4',
  heroShowcaseWatchPoster: '/assets/images/hero-showcase-watch-poster.jpg',
  studioSuspendedCalibre: '/assets/videos/studio-suspended-calibre.mp4',
  studioSuspendedCalibrePoster: '/assets/images/studio-suspended-calibre-poster.jpg',
  macroReelPrimary: '/assets/videos/macro-celestial-horology.mp4',
  macroReelPrimaryPoster: '/assets/images/macro-celestial-horology-poster.jpg',
  macroReelSecondary: '/assets/videos/Recording%202026-11-04%20120114.mp4',
  watchmakerPortrait: '/assets/images/watchmaker-poster.jpg',
  atelierBenchwork: '/assets/images/atelier-benchwork.jpg',
  brandRolexMacro: '/assets/images/calibre-macro-rolex.jpg',
  brandPatekMacro: '/assets/images/calibre-macro-patek.jpg',
  brandRmMacro: '/assets/images/calibre-macro-rm.jpg',
};

export interface CinematicWatchChapter {
  id: string;
  code: string;
  title: string;
  timestampSec: number;
  zoneLabel: string;
  description: string;
  apparatus: string;
  tolerance: string;
  recommendedService: string;
}

export const CINEMATIC_3D_CHAPTERS: CinematicWatchChapter[] = [
  {
    id: 'crown-pusher',
    code: '01',
    title: 'Crown Tube & Chronograph Pusher Seating',
    timestampSec: 0.6,
    zoneLabel: 'UPPER CASE ARCHITECTURE',
    description:
      'Micro-calibration of screw-down winding stems, twin chronograph pushers, and Viton tube gaskets for crisp tactile engagement and 10 ATM hermetic sealing.',
    apparatus: 'Bergeon Torque Drivers · Vacuum & 10 ATM Chamber',
    tolerance: '100m – 300m Hermetic Seal',
    recommendedService: 'Water Resistance & Hyperbaric Reseal',
  },
  {
    id: 'dauphine-hands',
    code: '02',
    title: 'Central Hands & Cannon Pinion Alignment',
    timestampSec: 2.8,
    zoneLabel: 'DIAL & HAND CLEARANCE',
    description:
      'Scratch-free seating of faceted gold chronograph and hour/minute hands to strict axial height tolerances beneath cambered sapphire crystal.',
    apparatus: 'Bergeon Hand-Pressing Micrometer · Brass Levers',
    tolerance: '±0.02 mm Axial Clearance',
    recommendedService: 'Complete Mechanical Overhaul',
  },
  {
    id: 'gear-train',
    code: '03',
    title: 'Mainspring Barrel & Going-Train Tribology',
    timestampSec: 5.0,
    zoneLabel: 'TORQUE TRANSMISSION',
    description:
      'Complete ultrasonic decontamination and micro-dosing of five viscosity-graded Swiss Moebius synthetic epilame lubricants across wheel pivots and ruby jewels.',
    apparatus: 'Elma 4-Bath Ultrasonic · Moebius 9010 / HP-1300',
    tolerance: '270° – 310° Horizontal Amplitude',
    recommendedService: 'Complete Mechanical Overhaul',
  },
  {
    id: 'escapement-reg',
    code: '04',
    title: '4Hz Balance Wheel & Escapement Poising',
    timestampSec: 7.2,
    zoneLabel: 'ISOCHRONISM & CHRONOMETRY',
    description:
      'Precision regulation of 28,800 vph Swiss lever escapements across six spatial positions to eliminate beat error and daily positional drift.',
    apparatus: 'Witschi Chronoscope X1 · Acoustic Laser Pickup',
    tolerance: '-1 to +2 sec / day Swiss Standard',
    recommendedService: 'Witschi Electronic Regulation',
  },
];

export const HERO_RIBBON_ITEMS: string[] = [
  'ROLEX OYSTER PERPETUAL & DAYTONA',
  'PATEK PHILIPPE COMPLICATIONS',
  'RICHARD MILLE TITANIUM CALIBRES',
  'WITSCHI 6-AXIS CHRONOMETRY',
  '10 ATM HYPERBARIC SEAL PROOF',
  '904L LASER MICRO-WELDING',
  'SHOP G105 · CHURCH STREET LONDON NW8',
];

export interface FinishOption {
  id: CaseFinishId;
  label: string;
  alloyNote: string;
  swatchHex: string;
}

export const CALIBRE_FINISHES: FinishOption[] = [
  {
    id: 'everose-gold',
    label: '18K Everose Gold',
    alloyNote: 'Warm copper-platinum stabilized 18K rose gold alloy',
    swatchHex: '#d5937b',
  },
  {
    id: 'steel-904l',
    label: '904L Steel',
    alloyNote: 'High-chromium corrosion-resistant surgical Oystersteel',
    swatchHex: '#dce3ee',
  },
  {
    id: 'grade5-titanium',
    label: 'Grade 5 Titanium',
    alloyNote: 'Ti-6Al-4V micro-blasted aerospace bridge & case finish',
    swatchHex: '#9ba3b2',
  },
  {
    id: 'stealth-ceramic',
    label: 'Stealth Ceramic',
    alloyNote: 'Sintered zirconium-oxide monobloc with mirror bevels',
    swatchHex: '#252136',
  },
];

export interface PerspectiveOption {
  id: CalibrePerspectiveId;
  label: string;
}

export const CALIBRE_PERSPECTIVES: PerspectiveOption[] = [
  { id: 'angled', label: 'Angled' },
  { id: 'dial-face', label: 'Dial Face' },
  { id: 'escapement', label: 'Escapement' },
  { id: 'crown-profile', label: 'Crown Profile' },
];

export interface StudioMetricCard {
  id: string;
  eyebrow: string;
  value: string;
  detail: string;
  iconKey: 'gauge' | 'shield' | 'sparkles' | 'compass';
}

export const STUDIO_METRIC_CARDS: StudioMetricCard[] = [
  {
    id: 'escapement',
    eyebrow: 'Escapement Frequency',
    value: '28,800 vph (4 Hz)',
    detail: 'Multi-position electronic regulation to ±2 sec/day',
    iconKey: 'gauge',
  },
  {
    id: 'seal',
    eyebrow: 'Atmospheric Seal',
    value: '100m / 10 ATM',
    detail: 'Vacuum and hydrostatic dual-chamber testing',
    iconKey: 'shield',
  },
  {
    id: 'finish',
    eyebrow: 'Finish Restoration',
    value: 'Lapping Machine Precision',
    detail: 'Factory chamfers, mirror bevels & satin grain',
    iconKey: 'sparkles',
  },
  {
    id: 'atelier',
    eyebrow: 'London Atelier',
    value: 'Church Street NW8',
    detail: 'Independent master watchmaker bench service',
    iconKey: 'compass',
  },
];

export interface DiagnosticSymptom {
  id: string;
  symptomTitle: string;
  telemetryTag: string;
  observedSigns: string;
  recommendedService: string;
  benchApparatus: string;
  estimatedTurnaround: string;
  urgencyNote: string;
}

export const DIAGNOSTIC_SYMPTOMS: DiagnosticSymptom[] = [
  {
    id: 'timing-drift',
    symptomTitle: 'Losing or Gaining Time (> ±5s/day)',
    telemetryTag: 'AMPLITUDE / ISOCHRONISM',
    observedSigns:
      'Noticeable daily drift, low power reserve overnight, or hairspring magnetization from everyday electronics.',
    recommendedService: 'Witschi Electronic Regulation',
    benchApparatus: 'Witschi Chronoscope X1 + Elma Demagnetizer',
    estimatedTurnaround: '1 – 2 Working Days',
    urgencyNote: 'If amplitude reads below 230°, dried synthetic oils indicate a full overhaul.',
  },
  {
    id: 'condensation',
    symptomTitle: 'Crystal Condensation or Water Ingress',
    telemetryTag: '10 ATM HERMETIC ALERT',
    observedSigns:
      'Fine mist beneath sapphire crystal after temperature change, swimming, or crown impact.',
    recommendedService: 'Water Resistance & Hyperbaric Reseal',
    benchApparatus: 'Dry Vacuum + 10–30 ATM Wet Hyperbaric Chamber',
    estimatedTurnaround: '1 – 3 Working Days',
    urgencyNote: 'Immediate bench drying prevents irreversible dial lacquer and steel pinion oxidation.',
  },
  {
    id: 'winding-stiffness',
    symptomTitle: 'Stiff Winding Crown or Stopping Movement',
    telemetryTag: 'MAINSPRING & GEAR TRAIN',
    observedSigns:
      'Gritty manual crown feedback, rotor noise, or chronograph seconds hand stalling on reset.',
    recommendedService: 'Complete Mechanical Overhaul',
    benchApparatus: 'Elma 4-Stage Ultrasonic + 5 Moebius Epilame Oils',
    estimatedTurnaround: '7 – 14 Working Days',
    urgencyNote: 'Avoid forcing a stiff winding stem to protect keyless works and barrel teeth.',
  },
  {
    id: 'case-trauma',
    symptomTitle: 'Lug Bevel Ding, Scratched Crystal or Loose Bracelet',
    telemetryTag: 'CASE & OPTICS RESTORATION',
    observedSigns:
      'Deep lug nick on 904L steel/gold chamfer, chipped cyclops edge, or stretched Jubilee/Oyster links.',
    recommendedService: 'Laser Case & Bevel Refinishing',
    benchApparatus: 'Micro-Laser Welder + Swiss Diamond Lapping Wheel',
    estimatedTurnaround: '3 – 7 Working Days',
    urgencyNote: 'Laser micro-welding adds matching alloy before lapping so factory geometry is never rounded.',
  },
];

export interface MacroReelItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  markers: { timeSec: number; label: string; detail: string }[];
}

export const MACRO_REELS: MacroReelItem[] = [
  {
    id: 'celestial-horology',
    title: 'Celestial Roman Bezel & Escapement Architecture',
    subtitle: '360° cinematic inspection of illuminated Roman numeral chapter rings, golden skeleton hands, and high-energy escapement dynamics.',
    src: MEDIA_PATHS.macroReelPrimary,
    badge: 'REEL 01 · CELESTIAL HOROLOGY ARCHITECTURE',
    markers: [
      {
        timeSec: 0,
        label: 'Atelier Marker: 00:00s',
        detail: 'Illuminated Roman numeral chapter ring & concentric bezel relief',
      },
      {
        timeSec: 1.8,
        label: 'Atelier Marker: 00:02s',
        detail: 'Central skeletonized hand torque & golden escapement core alignment',
      },
      {
        timeSec: 3.6,
        label: 'Atelier Marker: 00:04s',
        detail: 'Full-aperture radial balance inspection & peripheral casework geometry',
      },
    ],
  },
  {
    id: 'chronograph-bench',
    title: 'Calibre Train & Bevel Lapping Study',
    subtitle: 'Close-range horological inspection capturing metallic bridge reflections, crown knurling, and mirror-polished chamfers.',
    src: MEDIA_PATHS.macroReelSecondary,
    badge: 'REEL 02 · MICRO-MECHANICAL BENCH STUDY',
    markers: [
      {
        timeSec: 0,
        label: 'Atelier Marker: 00:00s',
        detail: 'Specular bevel transition and radial dial aperture alignment',
      },
      {
        timeSec: 5.5,
        label: 'Atelier Marker: 00:05s',
        detail: 'Escapement wheel clearance and jewel bearing lubrication check',
      },
      {
        timeSec: 11.0,
        label: 'Atelier Marker: 00:11s',
        detail: 'Multi-angle optical inspection under studio LED illumination',
      },
    ],
  },
];

export interface HorologicalService {
  id: string;
  title: string;
  turnaround: string;
  tagline: string;
  description: string;
  iconKey: 'watch' | 'activity' | 'sparkles' | 'droplet' | 'shield' | 'layers';
  protocolSteps: string[];
  apparatus: string;
  qualityStandard: string;
}

export const HOROLOGICAL_SERVICES: HorologicalService[] = [
  {
    id: 'complete-overhaul',
    title: 'Complete Mechanical Overhaul',
    turnaround: '7 – 14 Working Days',
    tagline: 'Full Stripdown, Ultrasonic Clean & Moebius Lubrication',
    description:
      'Comprehensive disassembly of manual, automatic, and grand complication calibres down to the bare mainplate. Every wheel, jewel, and escapement component is ultrasonically cleaned, epilame-treated, and regulated across 6 positions.',
    iconKey: 'watch',
    protocolSteps: [
      'Complete de-casing and mechanical stripdown to individual components',
      '4-stage ultrasonic cleaning in specialized chemical baths',
      'Inspection of pivots, jewels, and escapement teeth for microscopic wear',
      'Reassembly with 5 distinct grades of Moebius synthetic horological lubricants',
      'Final 72-hour power reserve and multi-position timing verification',
    ],
    apparatus: 'Stereoscopic microscope, Bergeon micro-screwdrivers, Elma ultrasonic cleaner',
    qualityStandard:
      '100% genuine replacement seals & factory-specified lubricants. Multi-positional verification before handover.',
  },
  {
    id: 'witschi-regulation',
    title: 'Witschi Electronic Regulation',
    turnaround: '1 – 2 Working Days',
    tagline: '6-Position Chronometric Timing & Beat-Error Calibration',
    description:
      'Precision acoustic and optical chronometry diagnosing daily rate deviation, balance wheel amplitude, and beat error. Includes full hairspring demagnetization and Microstella or Gyromax inertia fine-tuning.',
    iconKey: 'activity',
    protocolSteps: [
      'Initial 6-position acoustic baseline capture on Witschi Chronoscope X1',
      'Residual magnetic field neutralization across balance spring and escapement',
      'Microscopic hairspring centering and stud/curb-pin or free-sprung inertia tuning',
      'Isochronism verification at 100% and 24-hour simulated power reserve states',
      'Printed chronometric timing certificate issued upon workshop collection',
    ],
    apparatus: 'Witschi Chronoscope X1, Microstella torque wrench, pulse demagnetizer',
    qualityStandard:
      'Regulated within ±2 seconds/day Superlative & Geneva chronometric tolerances where calibre condition permits.',
  },
  {
    id: 'laser-bevel-refinishing',
    title: 'Laser Case & Bevel Refinishing',
    turnaround: '3 – 7 Working Days',
    tagline: 'Micro-Welding Alloy Restoration & Lapping Wheel Chamfers',
    description:
      'Restoring dented lugs, deep scratches, and rounded edges on 904L Oystersteel, 18K Everose/Yellow Gold, Platinum, and Grade 5 Titanium cases without sacrificing crisp factory case geometry.',
    iconKey: 'sparkles',
    protocolSteps: [
      'Complete removal of movement, bezel assembly, sapphire crystal, and gaskets',
      'Micro-fusion laser welding using matched 904L steel, 18K gold, or titanium wire',
      'Flat-plane diamond lapping to reconstruct razor-sharp lug chamfers and bevels',
      'Directional satin graining juxtaposed against mirror-polished case flanks',
      'Ultrasonic degreasing and full hyperbaric waterproof resealing',
    ],
    apparatus: 'Nd:YAG horological micro-laser welder, Swiss diamond lapping machine',
    qualityStandard:
      'Zero over-polishing policy — original lug thickness, hallmarks, and crisp bevel transitions strictly preserved.',
  },
  {
    id: 'water-resistance-reseal',
    title: 'Water Resistance & Hyperbaric Reseal',
    turnaround: '1 – 3 Working Days',
    tagline: 'Dual-Stage Pressure & Vacuum Verification',
    description:
      'Thorough inspection and renewal of all internal gaskets—caseback, crystal, crown tube, and chronograph pushers. Tested in specialized dry vacuum and wet hyperbaric chambers up to 300m.',
    iconKey: 'droplet',
    protocolSteps: [
      'Dry vacuum deformation test to identify compromised seal interfaces safely',
      'Ultrasonic cleaning of caseback threads, bezel seat, and Twinlock/Triplock crown tube',
      'Installation of fresh fluorinated FKM / Viton seals dressed in Swiss silicone grease',
      'Calibrated torque closure of screw-down caseback and pusher collars',
      '10 ATM – 30 ATM hyperbaric wet condensation test with printed pressure slip',
    ],
    apparatus: 'Swiss dry-vacuum tester, 30 ATM hydrostatic pressure chamber, torque-limiting dies',
    qualityStandard:
      'Certified to manufacturer ATM rating with printed pass telemetry provided on collection.',
  },
  {
    id: 'sapphire-crystal-replacement',
    title: 'Sapphire Crystal & Cyclops Replacement',
    turnaround: '2 – 5 Working Days',
    tagline: 'Scratch-Proof Optical Precision',
    description:
      'Replacement of scratched or cracked mineral and sapphire crystals. Fitted with anti-reflective coatings and factory-specification magnification cyclops lenses for effortless date legibility.',
    iconKey: 'shield',
    protocolSteps: [
      'Safe uncasing and microscopic inspection of dial surface for micro-shards',
      'Precision measurement of crystal seat diameter, dome profile, and gasket compression',
      'Press-fitting of optical-grade synthetic corundum (9 Mohs) sapphire crystal',
      'Alignment of 2.5x AR-coated date cyclops over the 3 o’clock aperture',
      'Vacuum and hydrostatic pressure verification to guarantee hermetic crystal seating',
    ],
    apparatus: 'Bergeon precision crystal press, Delrin dies, dust-free laminar hood',
    qualityStandard:
      'Optical clarity, double-sided anti-reflective fidelity, and full waterproof seal integrity.',
  },
  {
    id: 'bracelet-restoration',
    title: 'Bracelet Restoration & Link Tightening',
    turnaround: '4 – 8 Working Days',
    tagline: 'Stretch Removal & Clasp Recalibration',
    description:
      'Restoring stability and comfort to stretched or loose metal bracelets. Pins and friction sleeves are renewed, link play is tightened, and deployment clasps are recalibrated for crisp lock engagement.',
    iconKey: 'layers',
    protocolSteps: [
      'Link-by-link ultrasonic decontamination removing abrasive carbonized debris',
      'Press extraction of worn internal pins, ceramic sleeves, and fatigued springbars',
      'Precision re-bushing and laser pin reconstruction across Oyster, Jubilee & Royal Oak links',
      'Dual-finish satin brushing and center-link mirror buffing per marque specification',
      'Clasp blade tension calibration and safety flip-lock engagement verification',
    ],
    apparatus: 'Hydraulic link press, ceramic-sleeve tooling, ultrasonic bath',
    qualityStandard:
      'Eliminates lateral bracelet sag while maintaining supple wrist articulation and secure clasp retention.',
  },
];

export interface SpecialistBrandTab {
  id: 'rolex' | 'patek' | 'richard-mille';
  tabLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  highlights: { bold: string; text: string }[];
  calibres: string;
  ctaLabel: string;
  imageSrc: string;
  imageCaption: string;
  watchBrandSelectValue: string;
}

export const SPECIALIST_BRAND_TABS: SpecialistBrandTab[] = [
  {
    id: 'rolex',
    tabLabel: 'ROLEX',
    eyebrow: 'SPECIALIST ROLEX CALIBRATION & OVERHAUL',
    headline: 'Submariner, Daytona & Oyster Perpetual Care',
    summary:
      'Rolex movements are celebrated for their unyielding robustness and chronometric precision. Our workshop is equipped to service modern and vintage references, from Calibre 3135 workhorses to modern Calibre 3235 with Chronergy escapements and the Calibre 4130 Daytona chronograph.',
    highlights: [
      {
        bold: 'Microstella Inertia Regulation:',
        text: 'Direct tuning of rim balance weights for precision timing within superlative chronometer tolerances.',
      },
      {
        bold: '904L Oystersteel Refinishing:',
        text: 'Precise satin graining on lug tops and mirror-polished case flanks while maintaining original sharp chamfers.',
      },
      {
        bold: 'Twinlock & Triplock Waterproof Seals:',
        text: 'Microscopic inspection of tube gaskets and crown seating to ensure absolute waterproof integrity.',
      },
    ],
    calibres: '3135 · 3235 · 4130 · 3186 · 3285',
    ctaLabel: 'ROLEX ENQUIRY',
    imageSrc: MEDIA_PATHS.brandRolexMacro,
    imageCaption: 'Rolex Chronometer & Sports References · Church Street London',
    watchBrandSelectValue: 'Rolex',
  },
  {
    id: 'patek',
    tabLabel: 'PATEK PHILIPPE',
    eyebrow: 'GENEVA HAUTE HORLOGERIE & COMPLICATIONS',
    headline: 'Calatrava, Nautilus & Annual Calendar Mastery',
    summary:
      'Patek Philippe calibres demand extraordinary delicacy—from ultra-thin micro-rotor dress movements to intricate Annual Calendar and Moonphase modules. Every bridge screw, Geneva stripe, and hand-bevelled anglage edge is handled with scratch-free wooden and brass dressing tools.',
    highlights: [
      {
        bold: 'Gyromax Free-Sprung Balance Tuning:',
        text: 'Rotational Poising of slotted inertia weights on Spiromax and Breguet overcoil balance assemblies.',
      },
      {
        bold: 'Complication Module Sequencing:',
        text: 'Methodical lubrication and midnight-jump synchronization across Annual Calendar and Moonphase star wheels.',
      },
      {
        bold: 'Nautilus & Aquanaut Case Architecture:',
        text: 'Octagonal porthole satin bezel graining juxtaposed with razor-clean mirror bevel transitions.',
      },
    ],
    calibres: '240 · 324 S C · 26-330 · CH 28-520 · 215 PS',
    ctaLabel: 'PATEK PHILIPPE ENQUIRY',
    imageSrc: MEDIA_PATHS.brandPatekMacro,
    imageCaption: 'Geneva Complication & Ultra-Thin Calibres · Church Street London',
    watchBrandSelectValue: 'Patek Philippe',
  },
  {
    id: 'richard-mille',
    tabLabel: 'RICHARD MILLE',
    eyebrow: 'AVANT-GARDE SKELETONIZED CHRONOGRAPHS',
    headline: 'Tonneau Titanium, Carbon TPT & Skeleton Care',
    summary:
      'Engineered like miniature Formula 1 chassis, Richard Mille timepieces combine Grade 5 titanium baseplates, PVD-treated openwork bridges, and curved multi-part tonneau cases requiring specialized spline drivers and calibrated torque protocols.',
    highlights: [
      {
        bold: 'Grade 5 Spline Screw Torque Control:',
        text: 'Non-marring spline engagement across curved tonneau bezel, caseband, and skeleton bridge fasteners.',
      },
      {
        bold: 'Variable-Geometry Rotor Servicing:',
        text: 'Precision ceramic ball-bearing inspection and winding inertia calibration tailored to wearer activity.',
      },
      {
        bold: 'Curved Tripartite Nitril Seal Renewal:',
        text: 'Custom seating of perimeter O-rings across Carbon TPT, Quartz TPT, and titanium case housings.',
      },
    ],
    calibres: 'RMAC1 · RMAC3 · RMUL2 · RM005 · RM011',
    ctaLabel: 'RICHARD MILLE ENQUIRY',
    imageSrc: MEDIA_PATHS.brandRmMacro,
    imageCaption: 'Skeletonized Titanium & Tonneau Architecture · Church Street London',
    watchBrandSelectValue: 'Richard Mille',
  },
];

export type ReviewFilterCategory = 'all' | 'rolex' | 'patek' | 'overhauls';

export interface VerifiedReview {
  id: string;
  author: string;
  location: string;
  timepiece: string;
  service: string;
  date: string;
  quote: string;
  categories: ReviewFilterCategory[];
}

export const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'james-h',
    author: 'James H.',
    location: 'Mayfair, London',
    timepiece: 'Rolex Submariner Date',
    service: 'Timing Regulation & Hyperbaric Reseal',
    date: 'February 2026',
    quote:
      'Brought my Submariner in after noticing it was losing 15 seconds a day. The team placed it directly on their electronic chronometer, diagnosed an amplitude drop, and regulated it to +1 second/day within 48 hours. Pressure test certificate provided upon collection. First-rate service on Church Street.',
    categories: ['all', 'rolex'],
  },
  {
    id: 'alexander-m',
    author: 'Alexander M.',
    location: "St John's Wood, London",
    timepiece: 'Patek Philippe Annual Calendar',
    service: 'Full Mechanical Overhaul',
    date: 'January 2026',
    quote:
      'Finding independent horologists with the touch for Patek grand complications is difficult in Central London. Watch Care Centre handled my annual calendar with exceptional transparency, explaining each step of the disassembly and lubrication. The movement is now ticking silently and smoothly.',
    categories: ['all', 'patek', 'overhauls'],
  },
  {
    id: 'tariq-k',
    author: 'Tariq K.',
    location: 'Kensington, London',
    timepiece: 'Audemars Piguet Royal Oak Chrono',
    service: 'Laser Casing & Bevel Lapping',
    date: 'December 2025',
    quote:
      'Had an unfortunate ding on the lower bevel of my Royal Oak case. The lapping wheel refinishing and micro-welding completely erased the damage while preserving the razor-sharp factory chamfer. Remarkable skill.',
    categories: ['all'],
  },
  {
    id: 'eleanor-s',
    author: 'Eleanor S.',
    location: 'Marylebone, London',
    timepiece: 'Cartier Santos de Cartier',
    service: 'Gasket Renewal & Diagnostic Check',
    date: 'November 2025',
    quote:
      'Honest advice, polite communication, and very fair turnaround time. Dropped off my watch during lunch and received a thorough explanation of its waterproof integrity. So glad to have a trustworthy local workshop in NW8.',
    categories: ['all'],
  },
  {
    id: 'marcus-v',
    author: 'Marcus V.',
    location: 'Westminster, London',
    timepiece: 'Omega Speedmaster Professional',
    service: 'Calibre Overhaul & Mainspring Renewal',
    date: 'October 2025',
    quote:
      'Older manual-wind Speedmaster needed attention after sitting in a safe for years. Watch Care Centre stripped it down, replaced the tired mainspring, and returned all worn parts in a sealed container alongside the timing printout. Outstanding craftsmanship.',
    categories: ['all', 'overhauls'],
  },
];

export const FORM_WATCH_BRANDS = [
  'Rolex',
  'Patek Philippe',
  'Richard Mille',
  'Audemars Piguet',
  'Omega',
  'Cartier',
  'Vacheron Constantin',
  'A. Lange & Söhne',
  'Jaeger-LeCoultre',
  'Breitling',
  'IWC Schaffhausen',
  'Tudor',
  'TAG Heuer',
  'Other Fine Timepiece',
];
