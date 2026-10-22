import { IMAGES } from "@/lib/images";
import { BUSINESS } from "@/lib/constants";

export interface BrandFAQ {
  q: string;
  a: string;
}

export interface BrandData {
  slug: string;
  name: string;
  // Logo file path; every brand has one (IMAGE-GAPS.md).
  logo: string;
  type: "gate" | "garage-door" | "both" | "access-control";
  tagline: string;
  intro: string;
  services: string[];
  // "Common reasons people call": symptoms only, no DIY steps, no prices.
  callReasons: string[];
  whyUs: string;
  // Short paragraph naming real Santa Clarita / Antelope Valley cities from the brief.
  localParagraph: string;
  faqs: BrandFAQ[];
  metaTitle: string;
  metaDescription: string;
}

// Gate-type and access-control brands get "gate repair" anchors; garage-door-only
// brands (Genie, Chamberlain) get "opener repair" anchors. "Both" brands default to
// gate repair, since gates are this business's main work.
export function anchorVerb(type: BrandData["type"]) {
  return type === "garage-door" ? "opener repair" : "gate repair";
}

const P = BUSINESS.phone;
const N = BUSINESS.name;
const logo = (slug: string) => IMAGES.brandLogos[slug] ?? "";

// Model names in this file must exist in lib/brand-models.ts (REAL's verified list).
export const BRANDS: BrandData[] = [
  {
    slug: "liftmaster",
    name: "LiftMaster",
    logo: logo("liftmaster"),
    type: "both",
    tagline: "Gate operators and garage door openers on more SCV homes than any other name.",
    intro:
      "Walk any street in Valencia or Stevenson Ranch and you will pass LiftMaster equipment: the LA400 and LA412 arms on swing gates, RSL12UL and CSL24UL units on slide gates, and the 84505R or 8500W wall-mount opener in the garage. LiftMaster also took over the Elite commercial line, so many community entries in the valley run on SL3000UL and CSW200UL operators that carry the LiftMaster name. We work on the current UL models, the 2016 U generation and the older VDC and original LA-series units still hanging on hillside gates in Canyon Country and Castaic.",
    services: [
      "Swing and slide gate operator repair",
      "Control board and receiver replacement",
      "Battery backup and solar charging problems",
      "Garage door opener repair, belt and wall-mount",
      "Safety sensor and photo eye faults",
      "Remote, keypad and myQ setup",
    ],
    callReasons: [
      "Gate opens partway, then stops and reverses",
      "Operator beeps or shows an error code and will not move",
      "Remotes stopped working on the gate or the garage",
      "Gate dead after a power outage, battery not holding",
      "Swing arm grinding or jerking near the end of travel",
      "Garage door reverses before it touches the floor",
    ],
    whyUs:
      "LiftMaster is the brand we see most from Valencia to Lancaster, so the boards, arms and sensors that fail most often ride on our trucks. We tell you plainly whether your unit is worth fixing.",
    localParagraph:
      "LiftMaster calls come from every part of our area: HOA entries in Valencia and Stevenson Ranch, hillside swing gates in Canyon Country and Castaic, ranch gates on solar power in Agua Dulce and Acton, and garage door openers in Palmdale and Lancaster homes that take a beating from desert heat.",
    faqs: [
      { q: "My LiftMaster gate operator is an older LA400. Can it still be repaired?", a: "Often it can. Many older LA400, LA412 and LA500 units still take available arms, boards and batteries. If a part is no longer made, we explain the current model that fits your gate." },
      { q: "Do you work on the LiftMaster entry gate at our community?", a: "Yes. We service the commercial LiftMaster and former Elite operators used on HOA and community gates, including loops, keypads and telephone entry tied into them." },
      { q: "Can you fix both my LiftMaster gate and my LiftMaster garage door opener in one visit?", a: `Yes. Tell us about both when you call ${P} and the technician will plan for the gate and the garage.` },
    ],
    metaTitle: `LiftMaster Gate Repair Santa Clarita & Antelope Valley | ${N}`,
    metaDescription: `LiftMaster gate operator and garage door opener repair in Santa Clarita, Valencia, Palmdale and Lancaster. Current and older models. Free on-site quote: ${P}.`,
  },
  {
    slug: "all-o-matic",
    name: "All-O-Matic",
    logo: logo("all-o-matic"),
    type: "gate",
    tagline: "Heavy-duty slide and swing operators for long, wide and hillside gates.",
    intro:
      "All-O-Matic operators are a common pick for the heavier gates in our area. The SL-150DC PRO and SL-175DC PRO move long slide gates on ranch and estate lots, while the SW-300DC PRO and SW-350DC PRO arms handle double swing gates. We also see plenty of pre-PRO units, like the SL-150DC, SW-350DC and the AC SL-100AC, that have been running for years. We repair the motors, gearboxes and both the ACPCB and BLDC-PCB control boards.",
    services: [
      "Slide gate operator repair, DC and AC",
      "Swing gate arm and gearbox repair",
      "ACPCB and BLDC-PCB control board replacement",
      "Limit and travel problems",
      "Battery backup replacement on DC models",
      "Older pre-PRO operator repair or replacement",
    ],
    callReasons: [
      "Slide gate hums but does not move",
      "Gate stops short of fully open or closed",
      "Operator runs on battery only, then dies",
      "Loud clunking from the gearbox",
      "Board lights on but nothing responds",
    ],
    whyUs:
      "Heavy All-O-Matic gates are routine for us on ranch and hillside lots. We work on both the PRO line and the older units it replaced.",
    localParagraph:
      "We service All-O-Matic operators on long slide gates in Agua Dulce and Acton, hillside swing gates in Castaic and Val Verde, and larger driveway gates in Newhall, Quartz Hill and Leona Valley.",
    faqs: [
      { q: "Is my older All-O-Matic SL-150DC worth repairing?", a: "Usually it is worth checking first. Motors, boards and batteries for many older DC units can still be replaced. If the unit is worn through, we quote a current PRO model instead." },
      { q: "Do you repair All-O-Matic swing gate operators?", a: "Yes. We work on the SW-300, SW-320, SW-325, SW-350 and SW-375 arms, AC and DC, plus older swing units." },
      { q: "Can you tell which control board my All-O-Matic has?", a: "Yes. The technician identifies the board on site, whether it is an AC or DC version, and replaces it if that is the fault." },
    ],
    metaTitle: `All-O-Matic Gate Operator Repair Santa Clarita Valley | ${N}`,
    metaDescription: `All-O-Matic slide and swing gate operator repair across Santa Clarita & Antelope Valley. PRO and older models. Call or text ${P} for a free on-site quote.`,
  },
  {
    slug: "elite",
    name: "Elite",
    logo: logo("elite"),
    type: "gate",
    tagline: "Commercial and residential operators found on community entries and estate gates.",
    intro:
      "Elite built its name on commercial gate operators, and the SL3000UL slide and CSW200UL swing operators are still common on community entries and larger homes in our area. Elite is now part of the LiftMaster family, but plenty of gates still carry Elite labels. On homes we also see the RoboSlide and RoboSwing 900, and older Miracle-One and Miracle-Two swing units, along with discontinued SL575 and SW470 operators.",
    services: [
      "SL3000UL and CSW200UL repair",
      "Dual motor operator service",
      "RoboSlide and RoboSwing repair",
      "Hercules overhead operator repair",
      "Control board and limit repair",
      "Replacement of discontinued Elite models",
    ],
    callReasons: [
      "Community gate stuck open or closed",
      "Operator trips the overload and stops",
      "Gate drifts past its stop point",
      "Older Miracle-One swing unit stopped responding",
      "Chain or drive noise on a slide operator",
    ],
    whyUs:
      "Elite operators are built for heavy use, and we keep them running for HOAs and homeowners alike. When a model is no longer supported, we show you the current replacement.",
    localParagraph:
      "Elite operators turn up on HOA entries in Valencia, Stevenson Ranch and Castaic, on estate gates in Newhall and Canyon Country, and on commercial and community gates in Palmdale and Lancaster.",
    faqs: [
      { q: "Are Elite gate operators still supported?", a: "Elite's commercial line continues under LiftMaster, so many parts are still available. Some older models like the SL575 and SW470 are discontinued, and we explain replacement options when that is the case." },
      { q: "Do you repair Elite operators on HOA gates?", a: "Yes. We regularly service Elite slide and swing operators on community entries and can coordinate with your property manager." },
      { q: "Can you repair an Elite RoboSlide on solar power?", a: "Yes. We check the panel, batteries and operator together, since a solar RoboSlide can fail from any of the three." },
    ],
    metaTitle: `Elite Gate Operator Repair Santa Clarita & Palmdale | ${N}`,
    metaDescription: `Elite gate operator repair in Valencia, Stevenson Ranch, Palmdale and across the SCV and AV. SL3000, CSW200, RoboSlide and older models. Free on-site quote: ${P}.`,
  },
  {
    slug: "viking",
    name: "Viking Access Systems",
    logo: logo("viking"),
    type: "gate",
    tagline: "DC operators with battery backup, common on residential and commercial gates.",
    intro:
      "Viking operators are easy to spot by their letter-and-number names. On homes we usually find the R-6 or E-4 on swing gates and the K-2 on slide gates; heavier and commercial gates use the F-1, T-21, L-3 and H-10. We also service the I-770 underground operator, the B-12 barrier and first-generation units, plus older models like the X-9 and Q-7 that are no longer made.",
    services: [
      "R-6, E-4 and K-2 residential repair",
      "F-1, T-21, L-3 and H-10 commercial repair",
      "I-770 underground operator service",
      "Battery and charging faults",
      "Control board and diagnostic repair",
      "Replacement of discontinued Viking models",
    ],
    callReasons: [
      "Gate will not open after a power outage",
      "Operator keeps reversing for no clear reason",
      "Alarm sounding at the gate",
      "Underground swing operator stopped working",
      "First-generation unit getting less reliable",
    ],
    whyUs:
      "We work on every current Viking operator and the first-generation units still in service. You get a straight answer on repair versus replacement.",
    localParagraph:
      "We repair Viking operators on swing gates in Valencia and Saugus, slide gates in Canyon Country and Castaic, and residential and commercial gates in Palmdale, Lancaster and Quartz Hill.",
    faqs: [
      { q: "My Viking gate has a first-generation R-6. Can you repair it?", a: "Often, yes. We service first-generation Viking units and tell you if a part is no longer made, in which case we quote the current model." },
      { q: "Do you work on the Viking I-770 underground operator?", a: "Yes. Underground operators sit below the gate in a buried housing, and we repair and replace them." },
      { q: "What replaced the Viking X-9?", a: "Viking's X-390 replaced the X-9. If your X-9 cannot be repaired, the X-390 is the usual replacement." },
    ],
    metaTitle: `Viking Gate Operator Repair Santa Clarita & AV | ${N}`,
    metaDescription: `Viking Access Systems gate operator repair across Santa Clarita, Canyon Country, Palmdale and Lancaster. R-6, K-2, F-1 and more. Call or text ${P} for a free on-site quote.`,
  },
  {
    slug: "ramset",
    name: "Ramset",
    logo: logo("ramset"),
    type: "gate",
    tagline: "Swing and slide operators, from the Ram 30 to the Ram 5000 series.",
    intro:
      "Ramset operators carry the Ram name and a number, which makes them easy to identify on the gate. On homes we usually find the Ram 300, Ram 302 or Ram 3000 on swing gates and the Ram 50, Ram 100 or Ram 1000 on slide gates. Heavier and commercial gates run the Ram 30-30, Ram 3200 and the Ram 5000 series. We repair motors, boards and drive parts on all of them.",
    services: [
      "Ram swing operator repair",
      "Ram slide operator repair",
      "Ram 5000 series commercial service",
      "AC and DC motor repair",
      "Control board and limit repair",
      "Operator replacement when needed",
    ],
    callReasons: [
      "Swing gate opens one leaf but not the other",
      "Slide gate stops halfway",
      "Motor hums while the gate sits still",
      "Gate closes too fast or slams",
      "Remote range has dropped",
    ],
    whyUs:
      "We know Ramset's model range and work on residential and commercial units. We carry common parts for one-visit repairs.",
    localParagraph:
      "Ramset operators show up on swing gates in Newhall and Saugus, slide gates in Lancaster and Palmdale, and larger ranch gates in Agua Dulce, Littlerock and Pearblossom.",
    faqs: [
      { q: "How do I know which Ramset model I have?", a: "Most Ramset operators have the Ram name and number on a label. If it is worn off, our technician identifies it on site." },
      { q: "Do you repair Ramset slide gate operators?", a: "Yes. We service the Ram 50, Ram 100, Ram 1000 and the Ram 5000 series." },
      { q: "Can a Ramset operator be replaced with a different brand?", a: "Yes, if that is the better option. We size the replacement to your gate and explain the choices on site." },
    ],
    metaTitle: `Ramset Gate Operator Repair Santa Clarita & Lancaster | ${N}`,
    metaDescription: `Ramset swing and slide gate operator repair in Santa Clarita & Antelope Valley. Ram 300, Ram 3000, Ram 1000 and more. Free on-site quote: call or text ${P}.`,
  },
  {
    slug: "doorking",
    name: "DoorKing",
    logo: logo("doorking"),
    type: "access-control",
    tagline: "Gate operators and telephone entry systems for homes and gated communities.",
    intro:
      "DoorKing makes both the operators that move the gate and the entry systems that decide who gets through. At community entries we often find a DoorKing 1812, 1834 or 1838 telephone entry panel paired with a 9050 or 9100 slide operator or a 6050 or 6300 swing operator. We also see the newer eVolve operators and video entry units, and older 1802 and 1810 telephone entry panels still in service.",
    services: [
      "Telephone entry system repair",
      "Slide and swing operator repair",
      "eVolve operator and video entry service",
      "Barrier gate operator repair",
      "Keypad and card reader issues",
      "Resident directory and code updates",
    ],
    callReasons: [
      "Callbox not dialing residents",
      "Visitors cannot get through the entry panel",
      "Gate does not respond to codes",
      "Slide operator stops partway",
      "Entry panel screen or keypad dead",
    ],
    whyUs:
      "We service the whole DoorKing setup, the entry panel and the operator, so you do not have to call two companies.",
    localParagraph:
      "We service DoorKing entry systems and operators at gated communities in Valencia, Stevenson Ranch and Castaic, apartment and condo gates in Palmdale and Lancaster, and private gates in Canyon Country and Saugus.",
    faqs: [
      { q: "Can you fix our DoorKing callbox?", a: "Yes. We repair DoorKing telephone entry systems, including the 1812, 1833, 1834, 1835 and 1837 panels." },
      { q: "Do you repair older DoorKing entry panels?", a: "Yes. We service older units like the 1802, 1808 and 1810, and explain replacement options if one is beyond repair." },
      { q: "Can you work on both the DoorKing panel and the gate operator?", a: `Yes. We handle the full system. Call or text ${P} and describe what is happening at the gate.` },
    ],
    metaTitle: `DoorKing Gate & Callbox Repair Santa Clarita | ${N}`,
    metaDescription: `DoorKing gate operator and telephone entry repair in Valencia, Stevenson Ranch, Palmdale and across the SCV and AV. Free on-site quote: call or text ${P}.`,
  },
  {
    slug: "doorbird",
    name: "DoorBird",
    logo: logo("doorbird"),
    type: "access-control",
    tagline: "Video door stations that let you see and let in visitors from your phone.",
    intro:
      "DoorBird video door stations put a camera, intercom and gate release at the front entry, and connect to an app on your phone. We install and repair DoorBird units such as the D101S, D1101V, D2101V and the D21DKV with keypad, and wire them to open driveway and pedestrian gates. It is a popular upgrade on ranch and hillside homes where the gate is far from the front door.",
    services: [
      "DoorBird installation at gates and entries",
      "Wiring to gate operators and strikes",
      "App and network connection problems",
      "Video and audio issues",
      "Keypad station setup",
      "Replacement of damaged stations",
    ],
    callReasons: [
      "App no longer shows the gate camera",
      "Gate does not open from the app",
      "No audio or video from the station",
      "Station offline after a router change",
      "Keypad codes stopped working",
    ],
    whyUs:
      "We connect DoorBird to the gate operator itself, so the whole system works together.",
    localParagraph:
      "DoorBird installs are popular with homeowners in Agua Dulce, Acton and Leona Valley, where the gate is far from the house, and in Valencia, Stevenson Ranch and Canyon Country homes that want video at the entry.",
    faqs: [
      { q: "Can DoorBird open my driveway gate?", a: "Yes. We wire the DoorBird station to your gate operator so you can open the gate from the app." },
      { q: "Do you install DoorBird on a gate far from the house?", a: "Yes. We plan the wiring or network connection to reach the gate, which is common on ranch properties." },
      { q: "Can you repair a DoorBird that went offline?", a: "Yes. We check the station, power and network connection and get it back online." },
    ],
    metaTitle: `DoorBird Intercom Installation Santa Clarita & AV | ${N}`,
    metaDescription: `DoorBird video intercom installation and repair at gates and entries across Santa Clarita & Antelope Valley. Free on-site quote: call or text ${P}.`,
  },
  {
    slug: "linear",
    name: "Linear",
    logo: logo("linear"),
    type: "both",
    tagline: "Gate operators and garage door openers on homes, condos and commercial gates.",
    intro:
      "Linear makes both gate operators and garage door openers. On gates we see the SWC, SWD and SWR swing operators, the SLC, SLD and SLR slide operators, and the heavier HSLG for commercial use. In garages we work on the LDCO800 chain and LDCO850 belt openers, as well as older LDO50 and LS050 units.",
    services: [
      "Linear swing and slide operator repair",
      "HSLG heavy-duty operator service",
      "LDCO800 and LDCO850 opener repair",
      "Older Linear opener replacement",
      "Receiver and remote programming",
      "Safety sensor faults",
    ],
    callReasons: [
      "Gate operator not responding",
      "Garage door opener runs but door does not move",
      "Remote works only up close",
      "Opener reverses for no reason",
      "Grinding noise from the operator",
    ],
    whyUs:
      "We service Linear gate operators and garage door openers alike, so one call covers both.",
    localParagraph:
      "We service Linear operators and openers in Saugus, Newhall and Canyon Country homes, condo gates in Valencia, and homes across Palmdale, Lancaster and Quartz Hill.",
    faqs: [
      { q: "Do you repair Linear gate operators?", a: "Yes. We work on Linear swing and slide operators, including the SWC, SWD, SLC, SLD and HSLG." },
      { q: "My Linear garage door opener is an older LDO50. Can it be fixed?", a: "Sometimes. If parts are no longer available, we recommend a current opener that suits your door." },
      { q: "Can you service both my Linear gate and garage opener?", a: `Yes. Mention both when you call ${P}.` },
    ],
    metaTitle: `Linear Gate & Garage Door Opener Repair Santa Clarita | ${N}`,
    metaDescription: `Linear gate operator and garage door opener repair across Santa Clarita, Valencia, Palmdale and Lancaster. Free on-site quote: call or text ${P}.`,
  },
  {
    slug: "eagle",
    name: "Eagle Access Control Systems",
    logo: logo("eagle"),
    type: "gate",
    tagline: "Slide and swing operators built for frequent use on busy gates.",
    intro:
      "Eagle operators are common on gates that open many times a day. We see the Eagle 1000 and Eagle 2000 on slide gates, and the Eagle 100, Eagle 200 and Eagle X9 on swing gates. We also service the Eagle OH overhead operator and replace Eagle control boards like the E555 Diamond and EG002.",
    services: [
      "Eagle slide operator repair",
      "Eagle swing operator repair",
      "Control board replacement",
      "Overhead operator service",
      "Limit and travel faults",
      "Operator replacement when needed",
    ],
    callReasons: [
      "Gate stuck open at a busy entry",
      "Operator overheating and stopping",
      "Gate not closing after vehicles pass",
      "Board fault after a storm",
      "Unusual noise from the drive",
    ],
    whyUs:
      "Eagle operators often run busy gates, so we work to get them back in service on the first visit.",
    localParagraph:
      "Eagle operators run commercial and community gates in Valencia, Santa Clarita and Castaic, and busy entries across Palmdale and Lancaster.",
    faqs: [
      { q: "Do you repair Eagle 1000 and 2000 operators?", a: "Yes. We repair both, including the FSC and FR versions." },
      { q: "Can you replace an Eagle control board?", a: "Yes. We replace boards such as the E555 Diamond and EG002." },
      { q: "Do you work on Eagle swing operators?", a: "Yes. We service the Eagle 100, Eagle 200 and Eagle X9." },
    ],
    metaTitle: `Eagle Gate Operator Repair Santa Clarita & Palmdale | ${N}`,
    metaDescription: `Eagle Access Control Systems gate operator repair in Santa Clarita, Valencia, Palmdale and Lancaster. Slide, swing and board repair. Free on-site quote: ${P}.`,
  },
  {
    slug: "genie",
    name: "Genie",
    logo: logo("genie"),
    type: "garage-door",
    tagline: "Chain, belt and screw drive openers on garages from Valencia to Lancaster.",
    intro:
      "Genie openers are a common sight in garages across Santa Clarita & Antelope Valley. We work on the ChainMax 1000, StealthDrive 750, PowerMax 1500 screw drive and the SilentMax 1000 belt drive, plus the Wi-Fi StealthDrive Connect 7155-TKV and older units like the 2042-TKH.",
    services: [
      "Genie opener repair, chain, belt and screw drive",
      "Circuit board and travel module replacement",
      "Safety sensor faults",
      "Remote and keypad programming",
      "Wi-Fi and app setup",
      "Opener replacement",
    ],
    callReasons: [
      "Opener light blinks and the door will not close",
      "Motor runs but the door does not move",
      "Door reverses before closing",
      "Remote stopped working",
      "Screw drive making a loud grinding sound",
    ],
    whyUs:
      "Genie openers are a regular repair for us, and we carry common parts on the truck.",
    localParagraph:
      "We repair Genie openers in Saugus, Newhall and Canyon Country homes, newer houses in Valencia and Stevenson Ranch, and garages across Palmdale, Lancaster and Quartz Hill.",
    faqs: [
      { q: "Do you repair Genie screw drive openers?", a: "Yes. We service the PowerMax 1500 and other Genie screw drive openers." },
      { q: "Can you set up my Genie StealthDrive Connect app?", a: "Yes. We connect the 7155-TKV to your Wi-Fi and the app." },
      { q: "Is my older Genie opener worth fixing?", a: "We check it first. If the repair does not make sense, we explain the current Genie options." },
    ],
    metaTitle: `Genie Garage Door Opener Repair Santa Clarita | ${N}`,
    metaDescription: `Genie garage door opener repair in Santa Clarita, Valencia, Palmdale and Lancaster. Chain, belt and screw drive. Free on-site quote: call or text ${P}.`,
  },
  {
    slug: "chamberlain",
    name: "Chamberlain",
    logo: logo("chamberlain"),
    type: "garage-door",
    tagline: "Belt, chain and wall-mount openers with myQ app control.",
    intro:
      "Chamberlain openers are in many garages in our area, especially newer homes. We repair the B970, B550 and B2405 belt drives, the C870 and WD832KEV chain drives, and the RJO70 wall-mount opener. Most of these connect to the myQ app, and we sort out Wi-Fi and app problems too.",
    services: [
      "Chamberlain opener repair",
      "Belt and chain drive service",
      "RJO70 wall-mount repair",
      "myQ Wi-Fi and app setup",
      "Safety sensor faults",
      "Remote and keypad programming",
    ],
    callReasons: [
      "Door goes up but will not come down",
      "myQ shows the opener offline",
      "Opener clicks but the motor does not run",
      "Door stops partway",
      "Loud chain or belt noise",
    ],
    whyUs:
      "We repair Chamberlain openers and their myQ connection in the same visit.",
    localParagraph:
      "We repair Chamberlain openers in Valencia, Stevenson Ranch and Castaic homes, older garages in Saugus and Newhall, and homes across Palmdale, Lancaster and Sun Village.",
    faqs: [
      { q: "Do you repair Chamberlain wall-mount openers?", a: "Yes. We service the RJO70 wall-mount opener." },
      { q: "My Chamberlain myQ app says the opener is offline. Can you fix it?", a: "Yes. We check the opener and its Wi-Fi connection and get it back online." },
      { q: "Do you repair Chamberlain belt drive openers?", a: "Yes. We service the B970, B550 and B2405." },
    ],
    metaTitle: `Chamberlain Garage Door Opener Repair Santa Clarita | ${N}`,
    metaDescription: `Chamberlain garage door opener repair in Santa Clarita, Valencia, Palmdale and Lancaster. Belt, chain, wall-mount and myQ. Free on-site quote: ${P}.`,
  },
];

export function getBrandBySlug(slug: string): BrandData | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
