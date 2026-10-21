// Gate operator, opener and intercom models per brand, current and older.
//
// Why this file exists: homeowners (and ChatGPT / Bing on their behalf) search by the
// model number printed on the operator sticker, and they type it every possible way:
// "SL-150", "SL150", "SL 150", "sl150dc". Each model here is listed once, and
// modelVariants() derives the other common spellings so every page that shows a model
// also shows how else it is written. Model names are taken from the manufacturers'
// own product lists and manuals (see the sources note at the bottom of this file).
//
// Rules: no prices, no DIY steps, no BFT.

export type ModelEra = "current" | "older";

export interface GateModel {
  /** Display name, written the way the manufacturer writes it. */
  name: string;
  /** Short plain description: what it is. */
  kind: string;
  era: ModelEra;
  /** Optional extra spellings that the generator can't derive (e.g. "Ramset 3000"). */
  also?: string[];
}

export interface ModelGroup {
  title: string;
  models: GateModel[];
}

export interface BrandModels {
  /** Other ways people write the brand name itself. */
  brandAliases: string[];
  /** One sentence shown above the model list (factual, no claims we can't back). */
  note?: string;
  /** For brands whose models are plain numbers: words people put in front ("DKS 9050"). */
  numberPrefixes?: string[];
  groups: ModelGroup[];
}

const cur = (name: string, kind: string, also?: string[]): GateModel => ({ name, kind, era: "current", also });
const old = (name: string, kind: string, also?: string[]): GateModel => ({ name, kind, era: "older", also });

export const BRAND_MODELS: Record<string, BrandModels> = {
  "all-o-matic": {
    brandAliases: ["Allomatic", "All O Matic", "AllOMatic", "All-O-Matic Inc", "AOM"],
    groups: [
      {
        title: "Slide gate operators",
        models: [
          cur("SL-45DC PRO", "Residential DC slide gate operator"),
          cur("SL-90DC PRO", "DC slide gate operator"),
          cur("SL-100DC PRO", "DC slide gate operator"),
          cur("SL-100FP AC", "AC slide gate operator, front-pad mount"),
          cur("SL-150DC PRO", "Heavy-duty DC slide gate operator"),
          cur("SL-175DC PRO", "Heavy-duty DC slide gate operator"),
        ],
      },
      {
        title: "Swing gate operators",
        models: [
          cur("SW-300 AC", "AC swing gate operator"),
          cur("SW-300DC PRO", "DC swing gate operator"),
          cur("SW-320DC PRO", "DC swing gate operator"),
          cur("SW-325DC PRO", "DC swing gate operator"),
          cur("SW-350DC PRO", "Heavy-duty DC swing gate operator"),
          cur("SW-375DC PRO", "Heavy-duty DC swing gate operator"),
          cur("MACH-PRIME", "Swing gate operator"),
          cur("TORO24 Prime", "24V swing gate operator", ["Toro 24", "Toro-24"]),
        ],
      },
      {
        title: "Overhead and barrier operators",
        models: [
          cur("OH-200 AC", "Overhead (garage-style) gate operator"),
          cur("OH-200 DC PRO", "Overhead DC gate operator"),
          cur("MAGNA Q", "Barrier arm operator", ["Magna-Q", "MagnaQ"]),
        ],
      },
      {
        title: "Older and discontinued All-O-Matic models",
        models: [
          old("SL-100AC", "AC slide gate operator, discontinued"),
          old("SL-150AC", "AC slide gate operator, discontinued"),
          old("SL-150DC", "DC slide gate operator, before the PRO line"),
          old("SL-175DC", "DC slide gate operator, before the PRO line"),
          old("SL-100FP DC", "DC slide gate operator, front-pad mount"),
          old("SW-300DC", "DC swing gate operator, before the PRO line"),
          old("SW-350 AC", "AC swing gate operator, discontinued"),
          old("SW-350DC", "DC swing gate operator, before the PRO line"),
        ],
      },
      {
        title: "All-O-Matic control boards",
        models: [
          cur("ACPCB", "Circuit board for AC motors"),
          cur("ACPCB-UL", "UL circuit board for AC motors"),
          cur("BLDC-PCB", "Circuit board for DC motors"),
          cur("BLDC-ULPCB", "UL circuit board for DC motors"),
        ],
      },
    ],
  },

  liftmaster: {
    brandAliases: ["Lift Master", "Liftmaster", "Lift-Master", "Chamberlain LiftMaster"],
    note: "LiftMaster gate operators carry a letter at the end of the model that shows the generation: V or VDC (around 2014), U (2016) and UL (2018 and newer). We work on all of them.",
    groups: [
      {
        title: "Swing gate operators",
        models: [
          cur("LA400PKGUL", "Residential DC swing gate operator (LA400)", ["LA400UL", "LA400 UL"]),
          cur("LA412PKGUL", "Residential DC swing gate operator (LA412)", ["LA412UL"]),
          cur("LA500PKGUL", "Residential DC swing gate operator (LA500)", ["LA500UL"]),
          cur("RSW12UL", "Residential DC swing gate operator"),
          cur("CSW24UL", "Commercial DC swing gate operator"),
          cur("HDSW24UL", "Heavy-duty DC swing gate operator"),
          cur("CSW200UL", "Commercial AC swing gate operator (Elite heritage)"),
        ],
      },
      {
        title: "Slide gate operators",
        models: [
          cur("RSL12UL", "Residential DC slide gate operator"),
          cur("CSL24UL", "Commercial DC slide gate operator"),
          cur("HDSL24UL", "Heavy-duty DC slide gate operator"),
          cur("SL3000UL", "Commercial AC slide gate operator (Elite heritage)"),
          cur("SL585UL", "AC slide gate operator"),
          cur("SL595UL", "AC slide gate operator"),
          cur("IHSL24UL", "Industrial DC slide gate operator"),
          cur("INSL24UL", "Industrial DC slide gate operator"),
        ],
      },
      {
        title: "Overhead and barrier operators",
        models: [
          cur("HCTDCUL", "Overhead / trolley gate operator (Hercules)", ["HCT"]),
          cur("MA", "MegaArm barrier gate operator", ["Mega Arm", "MegaArm"]),
          cur("MAT", "MegaArm Tower barrier gate operator"),
          cur("MAS", "MegaArm barrier gate operator"),
          cur("MAST", "MegaArm Tower barrier gate operator"),
        ],
      },
      {
        title: "2016 generation (U models)",
        models: [
          old("LA400PKGU", "Swing gate operator, 2016 generation", ["LA400U"]),
          old("LA412PKGU", "Swing gate operator, 2016 generation", ["LA412U"]),
          old("LA500PKGU", "Swing gate operator, 2016 generation", ["LA500U"]),
          old("RSW12U", "Residential swing gate operator, 2016 generation"),
          old("RSL12U", "Residential slide gate operator, 2016 generation"),
          old("CSW24U", "Commercial swing gate operator, 2016 generation"),
          old("CSL24U", "Commercial slide gate operator, 2016 generation"),
          old("HCTDCU", "Overhead gate operator, 2016 generation"),
          old("CSW200", "Commercial swing gate operator, before UL 2018"),
          old("SL3000", "Commercial slide gate operator, before UL 2018"),
          old("SL585", "Slide gate operator, before UL 2018"),
          old("SL595", "Slide gate operator, before UL 2018"),
        ],
      },
      {
        title: "2014 and older LiftMaster gate operators",
        models: [
          old("LA4001PKGDC", "Swing gate operator, 2014 generation"),
          old("LA4121PKGDC", "Swing gate operator, 2014 generation"),
          old("LA5001PKGDC", "Swing gate operator, 2014 generation"),
          old("RSW12VDC", "Residential swing gate operator, 2014 generation"),
          old("RSL12VDC", "Residential slide gate operator, 2014 generation"),
          old("CSW24VDC", "Commercial swing gate operator, 2014 generation"),
          old("CSL24VDC", "Commercial slide gate operator, 2014 generation"),
          old("RSW12V", "Residential swing gate operator, older generation"),
          old("RSL12V", "Residential slide gate operator, older generation"),
          old("CSW24V", "Commercial swing gate operator, older generation"),
          old("CSL24V", "Commercial slide gate operator, older generation"),
          old("LA400", "Swing gate operator, original LA400"),
          old("LA412", "Swing gate operator, original LA412"),
          old("LA500", "Swing gate operator, original LA500"),
          old("LA100", "Swing gate operator, discontinued"),
          old("SW420", "Swing gate operator, discontinued"),
          old("SW470", "Swing gate operator, discontinued"),
          old("SW490", "Swing gate operator, discontinued"),
          old("SL575", "Slide gate operator, discontinued"),
          old("SL930", "Slide gate operator, discontinued"),
          old("VSL595", "Vertical lift gate operator, discontinued"),
          old("HS670", "Gate operator, discontinued"),
          old("MSW", "Swing gate operator, discontinued"),
          old("MSL", "Slide gate operator, discontinued"),
          old("MSLX", "Slide gate operator, discontinued"),
          old("Miracle One", "Residential swing gate operator, discontinued", ["MiracleOne", "Miracle-One", "Miracle 1"]),
        ],
      },
      {
        title: "LiftMaster garage door openers",
        models: [
          cur("84505R", "Belt drive garage door opener"),
          cur("87504", "Belt drive garage door opener"),
          cur("8500W", "Wall-mount garage door opener"),
          cur("3800", "Jackshaft (side-mount) garage door opener"),
        ],
      },
    ],
  },

  elite: {
    brandAliases: ["Elite Access", "Elite Access Systems", "Elite gate opener", "Elite Series", "Chamberlain Elite"],
    note: "Elite Access Systems is part of The Chamberlain Group, so several Elite models are now sold under the LiftMaster name (for example SL3000UL and CSW200UL). We work on both the older Elite-badged units and the newer ones.",
    groups: [
      {
        title: "Commercial slide and swing operators",
        models: [
          cur("SL3000UL", "Commercial AC slide gate operator", ["SL-3000", "SL3000"]),
          cur("SL3000ULDM", "Commercial slide gate operator, dual motor"),
          cur("CSW200UL", "Commercial AC swing gate operator", ["CSW-200", "CSW200"]),
          cur("CSW200UL1HP", "Commercial swing gate operator, 1 HP"),
          cur("CSW200ULDM", "Commercial swing gate operator, dual motor"),
          cur("CSW200ULST", "Commercial swing gate operator"),
        ],
      },
      {
        title: "Residential operators",
        models: [
          cur("RoboSlide", "Residential battery slide gate operator, solar or plug-in", ["Robo Slide", "Robo-Slide"]),
          cur("RoboSwing 900", "Residential DC swing gate operator, battery backup", ["Robo Swing", "Robo Swing 900", "RoboSwing"]),
          old("Miracle-One", "Residential DC swing gate operator, battery backup", ["Miracle One", "MiracleOne"]),
          old("Miracle-Two", "Residential 24V DC swing gate operator", ["Miracle Two", "MiracleTwo"]),
        ],
      },
      {
        title: "Overhead operators",
        models: [cur("Hercules HCT", "Overhead / trolley gate operator for garages and apartments", ["Hercules", "HCT"])],
      },
      {
        title: "Older Elite operators",
        models: [
          old("SL575", "Slide gate operator, discontinued"),
          old("SL585", "Slide gate operator"),
          old("SL595", "Slide gate operator"),
          old("SW470", "Swing gate operator, discontinued"),
          old("SW490", "Swing gate operator, discontinued"),
        ],
      },
    ],
  },

  viking: {
    brandAliases: ["Viking Access", "Viking Access Systems", "Viking gate opener", "Viking operator"],
    note: "Viking added NX and SPS versions of most models over the years. The model letter and number stay the same (for example K-2 and K-2SPS), and we work on every generation.",
    groups: [
      {
        title: "Swing gate operators",
        models: [
          cur("R-6", "Residential swing gate operator", ["R-6NX", "R6NX"]),
          cur("E-4", "Residential swing gate operator"),
          cur("G-5", "Linear actuator swing gate operator", ["G-5NX", "G5NX"]),
          cur("F-1", "Commercial swing gate operator", ["F-1NX", "F1NX"]),
          cur("T-21", "Heavy-duty commercial swing gate operator", ["T-21NX", "T21NX"]),
          cur("X-390", "Swing gate operator, replaced the X-9"),
        ],
      },
      {
        title: "Slide gate operators",
        models: [
          cur("K-2", "Residential slide gate operator", ["K-2SPS", "K2SPS"]),
          cur("L-3", "Commercial slide gate operator", ["L-3SPS", "L-3NX", "L3SPS"]),
          cur("H-10", "Heavy-duty slide gate operator", ["H-10SPS", "H10SPS", "H10NX"]),
        ],
      },
      {
        title: "Underground and barrier operators",
        models: [
          cur("I-770", "Underground swing gate operator"),
          cur("B-12", "Barrier gate operator"),
        ],
      },
      {
        title: "Older and discontinued Viking models",
        models: [
          old("X-9", "Swing gate operator, replaced by the X-390", ["X-9NX", "X9NX"]),
          old("Q-7", "Commercial slide gate operator, discontinued", ["Q-7NX", "Q7NX"]),
          old("Q-4", "Slide gate operator, first generation"),
          old("I-8", "Underground swing gate operator, first generation"),
          old("F-1 Gen 1", "First generation F-1"),
          old("G-5 Gen 1", "First generation G-5"),
          old("H-10 Gen 1", "First generation H-10"),
          old("K-2 Gen 1", "First generation K-2"),
          old("L-3 Gen 1", "First generation L-3"),
          old("R-6 Gen 1", "First generation R-6"),
          old("T-21 Gen 1", "First generation T-21"),
        ],
      },
    ],
  },

  ramset: {
    brandAliases: ["RamSet", "Ram Set", "Ram-Set", "Ramset Gate Openers", "RAM gate opener"],
    note: "Ramset model numbers are written as Ram 100, Ramset 100, RAM-100 or RAM100. They are all the same operator.",
    groups: [
      {
        title: "Swing gate operators",
        models: [
          cur("Ram 30", "Residential swing gate operator", ["Ramset 30", "RAM30"]),
          cur("Ram 30-30", "Heavy-duty swing gate operator", ["Ramset 30-30", "Ram 3030", "RAM3030"]),
          cur("Ram 300", "Residential swing gate operator", ["Ramset 300"]),
          cur("Ram 302", "Low-profile residential swing gate operator", ["Ramset 302"]),
          cur("Ram 3000", "Residential swing gate operator, AC or DC", ["Ramset 3000", "Ram 3000 DC"]),
          cur("Ram 3100", "Residential swing gate operator", ["Ramset 3100"]),
          cur("Ram 3200", "Heavy-duty swing gate operator", ["Ramset 3200"]),
        ],
      },
      {
        title: "Slide gate operators",
        models: [
          cur("Ram 50", "Residential slide gate operator", ["Ramset 50"]),
          cur("Ram 100", "Slide gate operator, AC or DC", ["Ramset 100", "Ram 100 DC", "Ram 101"]),
          cur("Ram 1000", "Heavy-duty slide gate operator, AC or DC", ["Ramset 1000", "Ram 1000 DC"]),
          cur("Ram 5000", "Commercial slide gate operator", ["Ramset 5000", "Ram 5000 UL"]),
          cur("Ram 5100", "Heavy commercial slide gate operator", ["Ramset 5100"]),
          cur("Ram 5200", "Heavy commercial slide gate operator", ["Ramset 5200"]),
          cur("Ram 5500", "DC industrial slide gate operator", ["Ramset 5500", "Ram 5500 DC"]),
          cur("Ram 5700", "DC industrial slide gate operator", ["Ramset 5700", "Ram 5700 DC"]),
          cur("All Secure", "Industrial rail drive slide gate operator", ["All-Secure", "AllSecure"]),
        ],
      },
    ],
  },

  doorking: {
    brandAliases: ["Door King", "DKS", "DoorKing Systems", "Door-King", "DK gate opener"],
    note: "DoorKing models are plain numbers, so people often add DKS or DoorKing in front (DKS 9050, DoorKing 9050). It is the same unit.",
    numberPrefixes: ["DKS", "DoorKing", "Door King", "DK"],
    groups: [
      {
        title: "Swing gate operators",
        models: [
          cur("6050", "Swing gate operator", ["DKS 6050"]),
          cur("6100", "Swing gate operator", ["DKS 6100"]),
          cur("6300", "Commercial swing gate operator", ["DKS 6300"]),
          cur("6500", "Heavy-duty swing gate operator", ["DKS 6500"]),
          cur("6524", "Continuous-duty swing gate operator", ["DKS 6524"]),
          cur("6550", "Industrial swing gate operator", ["DKS 6550"]),
          cur("6004", "Column-mount swing gate operator", ["DKS 6004"]),
          cur("6006", "Light-duty swing gate operator", ["DKS 6006"]),
          cur("6400", "In-ground swing gate operator", ["DKS 6400"]),
          cur("2160", "eVolve swing gate operator", ["DKS 2160", "eVolve 2160"]),
        ],
      },
      {
        title: "Slide gate operators",
        models: [
          cur("9000", "Slide gate operator", ["DKS 9000"]),
          cur("9024", "Slide gate operator", ["DKS 9024"]),
          cur("9050", "Slide gate operator", ["DKS 9050"]),
          cur("9100", "Commercial slide gate operator", ["DKS 9100"]),
          cur("9150", "Heavy-duty slide gate operator", ["DKS 9150"]),
          cur("2170", "eVolve slide gate operator", ["DKS 2170", "eVolve 2170"]),
          cur("9200 Series", "Maximum-security slide gate operators: 9210, 9220, 9230, 9235, 9240, 9245", ["DKS 9200", "9210", "9220", "9230"]),
          cur("9500 Series", "Maximum-security operators: 9530, 9550, 9555, 9575", ["DKS 9500", "9550"]),
        ],
      },
      {
        title: "Barrier and overhead operators",
        models: [
          cur("1601", "Parking barrier gate operator", ["DKS 1601"]),
          cur("1602", "Parking barrier gate operator", ["DKS 1602"]),
          cur("1175", "Vehicular overhead operator", ["DKS 1175"]),
        ],
      },
      {
        title: "Telephone entry and access control",
        models: [
          cur("1812", "Telephone entry system (Classic, Plus, Access Plus)", ["DKS 1812", "1812 Plus"]),
          cur("1833", "Telephone entry system", ["DKS 1833"]),
          cur("1834", "Telephone entry system", ["DKS 1834"]),
          cur("1835", "Telephone entry system", ["DKS 1835"]),
          cur("1837", "Telephone entry system", ["DKS 1837"]),
          cur("1838", "Access controller", ["DKS 1838"]),
          cur("2108", "eVolve video entry", ["DKS 2108"]),
          cur("2112", "eVolve video entry", ["DKS 2112"]),
          cur("2132", "eVolve video entry", ["DKS 2132"]),
          cur("2137", "eVolve video entry", ["DKS 2137"]),
        ],
      },
      {
        title: "Older DoorKing models",
        models: [
          old("6002", "Swing gate actuator", ["DKS 6002"]),
          old("6003", "Swing gate actuator", ["DKS 6003"]),
          old("1802", "Telephone entry system", ["DKS 1802"]),
          old("1808", "Telephone entry system", ["DKS 1808"]),
          old("1810", "Telephone entry system", ["DKS 1810"]),
        ],
      },
    ],
  },

  eagle: {
    brandAliases: ["Eagle Operators", "Eagle Access Control", "Eagle Access Control Systems", "Eagle gate opener"],
    groups: [
      {
        title: "Slide gate operators",
        models: [
          cur("Eagle I", "Slide gate operator", ["Eagle 1", "Eagle-I"]),
          cur("Eagle 1000", "Slide gate operator (FSC and FR versions)", ["Eagle 1000 FSC", "Eagle 1000 FR"]),
          cur("Eagle 2000", "Heavy-duty slide gate operator (FSC, FR, DM and APT versions)", ["Eagle 2000 APT", "Eagle 2000 DM", "Eagle 2000 FR", "Eagle 2000 FSC"]),
        ],
      },
      {
        title: "Swing and overhead operators",
        models: [
          cur("Eagle II", "Swing gate operator", ["Eagle 2", "Eagle-II"]),
          cur("Eagle 100", "Swing gate operator"),
          cur("Eagle 200", "Swing gate operator (1/2 HP, 1 HP and dual motor)", ["Eagle 200 DM"]),
          cur("Eagle X9", "Swing gate operator, AC or DC", ["Eagle X9 AC", "Eagle X9 DC"]),
          cur("Eagle OH", "Overhead gate operator"),
        ],
      },
      {
        title: "Eagle control boards",
        models: [
          cur("E555 Diamond", "Diamond control board", ["E555", "Diamond board"]),
          cur("EG002", "Replacement control board"),
        ],
      },
    ],
  },

  linear: {
    brandAliases: ["Linear OSCO", "OSCO", "Osco gate opener", "Nice Linear", "Linear gate opener"],
    note: "Linear took over the OSCO commercial gate operator line, so many Linear commercial operators still carry OSCO model names.",
    groups: [
      {
        title: "Swing gate operators",
        models: [
          cur("SWG", "Commercial swing gate operator"),
          cur("SWC", "Swing gate operator"),
          cur("SWD", "Swing gate operator"),
          cur("SWR", "Swing gate operator"),
          cur("VS-GSWG", "Swing gate operator"),
        ],
      },
      {
        title: "Slide gate operators",
        models: [
          cur("SLC", "Slide gate operator"),
          cur("SLD", "Slide gate operator"),
          cur("SLR", "Slide gate operator"),
          cur("GSLG-A", "Slide gate operator", ["GSLG"]),
          cur("HSLG", "Heavy-duty slide gate operator (OSCO)"),
          cur("VS-GSLG", "Slide gate operator"),
        ],
      },
      {
        title: "Linear garage door openers",
        models: [
          cur("LDCO800", "Chain drive garage door opener"),
          cur("LDCO850", "Belt drive garage door opener"),
          old("LDO50", "Chain drive garage door opener, older model"),
          old("LD050", "Chain drive garage door opener, older model"),
          old("LS050", "Screw drive garage door opener, older model"),
        ],
      },
    ],
  },

  genie: {
    brandAliases: ["Genie Company", "Genie opener", "Overhead Door Genie"],
    groups: [
      {
        title: "Genie garage door openers",
        models: [
          cur("ChainMax 1000", "Chain drive garage door opener"),
          cur("StealthDrive 750", "Belt drive garage door opener"),
          cur("PowerMax 1500", "Screw drive garage door opener"),
          cur("SilentMax 1000", "Belt drive garage door opener (3042-TKH)", ["3042-TKH"]),
          cur("7155-TKV", "StealthDrive Connect, Wi-Fi garage door opener"),
          old("2042-TKH", "Garage door opener"),
        ],
      },
    ],
  },

  chamberlain: {
    brandAliases: ["Chamberlain Group", "Chamberlain opener", "Chamberlain myQ"],
    groups: [
      {
        title: "Chamberlain garage door openers",
        models: [
          cur("B970", "Belt drive garage door opener"),
          cur("C870", "Chain drive garage door opener, Wi-Fi"),
          cur("B550", "Belt drive garage door opener"),
          cur("RJO70", "Wall-mount (jackshaft) garage door opener"),
          cur("WD832KEV", "Chain drive garage door opener"),
          cur("B2405", "Belt drive garage door opener"),
        ],
      },
    ],
  },

  doorbird: {
    brandAliases: ["Door Bird", "DoorBird intercom", "Bird Home Automation"],
    groups: [
      {
        title: "DoorBird video door stations",
        models: [
          cur("D101S", "Surface-mount video doorbell"),
          cur("D1101V", "Video door station"),
          cur("D2101V", "Video door station"),
          cur("D21DKV", "Video door station with keypad"),
        ],
      },
    ],
  },
};

/** "Viking Access Systems" -> "Viking", "Eagle Access Control Systems" -> "Eagle". */
export function shortBrandName(name: string): string {
  return name.replace(/\s+Access(\s+Control)?\s+Systems$/i, "");
}

// ---------------------------------------------------------------------------
// Spelling variants
// ---------------------------------------------------------------------------

/** Lowercase, letters and digits only: "SL-150DC PRO" -> "sl150dcpro". */
export function normalizeModel(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Other common ways a model is typed: with a hyphen, with a space, with nothing,
 * and the short core without the trailing letter suffix (LA400PKGUL -> LA400).
 * Returns spellings that differ from the display name, deduplicated case-insensitively.
 */
export function modelVariants(m: GateModel, numberPrefixes: string[] = []): string[] {
  const out: string[] = [];
  const seen = new Set<string>([m.name.toLowerCase()]);
  const add = (v: string) => {
    const t = v.trim();
    if (!t) return;
    const k = t.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    out.push(t);
  };

  // Only the first word is a model code ("SL-150DC PRO" -> "SL-150DC").
  const [first, ...rest] = m.name.split(" ");
  const tail = rest.length ? " " + rest.join(" ") : "";
  const compact = first.replace(/-/g, "");
  const hasCode = /[A-Za-z]/.test(compact) && /\d/.test(compact);

  if (hasCode) {
    const match = compact.match(/^([A-Za-z]+)(\d+)([A-Za-z0-9]*)$/);
    if (match) {
      const [, letters, digits, suffix] = match;
      add(`${letters}${digits}${suffix}${tail}`);
      add(`${letters}-${digits}${suffix}${tail}`);
      add(`${letters} ${digits}${suffix}${tail}`);
      if (suffix) {
        // The short core people usually type: "LA400", "LA-400", "SL150".
        add(`${letters}${digits}`);
        add(`${letters}-${digits}`);
        add(`${letters} ${digits}`);
      }
    } else {
      add(compact + tail);
    }
  } else if (/^\d+$/.test(first)) {
    // Plain-number models (DoorKing): "DKS 9050", "DKS9050", "DoorKing 9050".
    for (const p of numberPrefixes) {
      add(`${p} ${first}`);
      add(`${p}${first}`.replace(/\s+/g, ""));
    }
  } else if (/\s/.test(m.name) && /\d/.test(m.name)) {
    // "Ram 3000" -> "Ram3000", "Ram-3000"; "Eagle 1000" -> "Eagle1000", "Eagle-1000".
    add(m.name.replace(/\s+/g, ""));
    add(m.name.replace(/\s+/g, "-"));
  } else if (/-/.test(m.name)) {
    add(m.name.replace(/-/g, ""));
    add(m.name.replace(/-/g, " "));
  }

  for (const a of m.also ?? []) add(a);
  return out;
}

/** Every searchable key for a model (normalized), used by the model finder. */
export function modelKeys(m: GateModel, numberPrefixes: string[] = []): string[] {
  return Array.from(new Set([m.name, ...modelVariants(m, numberPrefixes)].map(normalizeModel))).filter(Boolean);
}

export interface FinderEntry {
  brand: string;
  brandSlug: string;
  name: string;
  kind: string;
  keys: string[];
}

/** Flat list for the client-side model finder (small: names and keys only). */
export function finderEntries(brands: { slug: string; name: string }[]): FinderEntry[] {
  const entries: FinderEntry[] = [];
  for (const b of brands) {
    const data = BRAND_MODELS[b.slug];
    if (!data) continue;
    for (const g of data.groups) {
      for (const m of g.models) {
        entries.push({ brand: b.name, brandSlug: b.slug, name: m.name, kind: m.kind, keys: modelKeys(m, data.numberPrefixes) });
      }
    }
  }
  return entries;
}

// Sources checked Oct 2026: allomatic.net product pages and elitegates.net All-O-Matic
// parts (All-O-Matic); LiftMaster gate operator radio compatibility chart and
// support.partner.liftmaster.com (LiftMaster, Elite heritage); gatesnfences.com Elite page;
// gateoperator.net, gatesnfences.com and elitegates.net Viking pages; gatesnfences.com and
// ramsetstore.com (Ramset); doorking.com owner's manuals and gate operator spec sheet
// (DoorKing); eagleoperators.com and elitegates.net (Eagle); lineargateopeners.com model
// information and Linear GDO brochure (Linear).
