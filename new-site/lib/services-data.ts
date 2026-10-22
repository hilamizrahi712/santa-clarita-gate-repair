import { BUSINESS } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  heroH1: string;
  heroSubtitle: string;
  heroImg: string;
  intro: string;
  features: { icon: string; title: string; desc: string }[];
  howItWorks: string[];
  symptoms: string[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  isInstallation: boolean;
  isEmergency?: boolean;
}

const P = BUSINESS.phone;
const N = BUSINESS.name;

// heroImg is filled from lib/images.ts below so image paths stay in one place.
const RAW: Omit<ServiceData, "heroImg">[] = [
  // ── GATES ──────────────────────────────────────────────
  {
    slug: "gate-repair",
    title: "Gate Repair",
    metaTitle: `Gate Repair Santa Clarita & Antelope Valley | ${N}`,
    metaDescription: `Driveway, slide and swing gate repair from Valencia to Lancaster. Local technicians, free on-site quote, 24/7 emergency dispatch. Call or text ${P}.`,
    primaryKeyword: "gate repair santa clarita",
    heroH1: "Gate Repair Across the Santa Clarita and Antelope Valleys",
    heroSubtitle: "Slide gates, swing gates, HOA entries and ranch gates. Call or text a photo and a local tech heads your way.",
    isInstallation: false,
    intro: `Gates out here work harder than most. Summer heat bakes the operators in Canyon Country and Saugus, the wind off the high desert shoves swing leaves around in Palmdale and Lancaster, and the dust gets into every roller and track. When yours quits, we come to you, find the real cause and fix it on the spot whenever the part is on the truck.

We handle every kind of residential gate first, from a single swing leaf on a Newhall bungalow to a long slide gate at the bottom of a hillside driveway, and we take care of [commercial gates](/services/commercial-gate-repair) too. If the trouble is in the motor or control board, see [gate opener repair](/services/gate-opener-repair).`,
    features: [
      { icon: "🧭", title: "Local Dispatch", desc: "Technicians who drive these valleys every day, from Castaic to Pearblossom." },
      { icon: "🔩", title: "Every Gate Style", desc: "Slide, swing, cantilever, wrought iron, wood, aluminum and chain link." },
      { icon: "📋", title: "Quote Before Work", desc: "You get a free on-site quote and decide before anything is replaced." },
    ],
    howItWorks: [
      "Call or text us a photo of the gate and tell us what it is doing.",
      "We set a time that works for you and send a technician with common parts.",
      "The tech inspects the gate, explains what failed and gives you a free quote.",
      "Once you say yes, we repair it and run the gate through full cycles with you watching.",
    ],
    symptoms: [
      "Gate stops halfway and backs up",
      "Leaf sags and drags on the driveway",
      "Loud grinding or clunking on every cycle",
      "Remote works from close up only",
      "Gate stuck open and won't latch",
    ],
    faqs: [
      { q: "Which gate types do you work on?", a: "Slide gates, single and double swing gates, cantilever gates, pedestrian gates and the operators that drive them. Wrought iron, steel, wood and aluminum are all fine." },
      { q: "Do you come out to the Antelope Valley?", a: `Yes. We cover Palmdale, Lancaster, Quartz Hill, Littlerock, Sun Village, Pearblossom and the other Antelope Valley communities, plus the whole Santa Clarita Valley. Call ${P} with your address and we will give you a time.` },
      { q: "How do I know what my repair will involve?", a: "A technician looks at the gate in person and tells you what broke and what the fix is. You get a free on-site quote first, and nothing is replaced until you approve it." },
      { q: "Can I send a picture instead of describing it?", a: `Please do. Text a photo or short video to ${P}. It helps us bring the right parts the first time.` },
    ],
    relatedSlugs: ["automatic-gate-repair", "gate-opener-repair", "driveway-gate-repair"],
  },
  {
    slug: "automatic-gate-repair",
    title: "Automatic Gate Repair",
    metaTitle: `Automatic Gate Repair Santa Clarita | ${N}`,
    metaDescription: `Automatic gate not opening or closing? We repair operators, safety sensors, keypads and remotes across SCV and the Antelope Valley. Call or text ${P}.`,
    primaryKeyword: "automatic gate repair santa clarita",
    heroH1: "Automatic Gate Repair for SCV Homes",
    heroSubtitle: "When the gate that is supposed to run itself won't, we sort out the operator, sensors and controls so it works on the first click again.",
    isInstallation: false,
    intro: `An automatic gate is a small system: a motor, a control board, safety sensors, limit settings and whatever you open it with. In master-planned neighborhoods like Valencia and Stevenson Ranch, a lot of these systems were installed around the same time and are now wearing out together. One weak part can make the whole gate act up.

Our technicians test each piece instead of guessing, so you pay for the part that actually failed. If the operator itself is finished, we will talk through [gate motor replacement](/services/gate-motor-replacement) with you on the spot.`,
    features: [
      { icon: "🔌", title: "Full System Check", desc: "Motor, board, sensors, limits and access controls tested one by one." },
      { icon: "📡", title: "Remotes and Keypads", desc: "New remotes coded, keypads and intercom triggers brought back online." },
      { icon: "🛑", title: "Safety First", desc: "Photo eyes and edge sensors set so the gate stops for cars, kids and pets." },
    ],
    howItWorks: [
      "Tell us by phone or text what the gate does and when it started.",
      "A technician arrives and tests the operator, sensors and controls.",
      "You get a plain explanation and a free on-site quote.",
      "We repair it and check that it opens, closes and reverses the way it should.",
    ],
    symptoms: [
      "Gate opens but won't close by itself",
      "Operator hums and nothing moves",
      "Gate reverses with nothing in the way",
      "Keypad lights up but gate ignores it",
      "Gate opens on its own",
    ],
    faqs: [
      { q: "My gate opens fine but refuses to close. What causes that?", a: "Most often it is a safety sensor that is blocked, misaligned or failing, which tells the operator something is in the way. It can also be a board or limit fault. A tech can pin it down quickly on site." },
      { q: "Can you add more remotes to my existing gate?", a: "Yes. We can code new remotes to most operators and set up keypads for family members, gardeners or pool service." },
      { q: "Is it safe to keep using a gate that reverses randomly?", a: `It is better to leave it closed or open and call us at ${P}. Random reversing means the safety system is getting bad signals, and that is worth fixing before someone gets hurt.` },
      { q: "Do you work on HOA community gates?", a: "Yes. We service entry gates for HOAs and private streets and can work with your management company on access and scheduling." },
    ],
    relatedSlugs: ["gate-opener-repair", "electric-gate-repair", "gate-motor-replacement"],
  },
  {
    slug: "driveway-gate-repair",
    title: "Driveway Gate Repair",
    metaTitle: `Driveway Gate Repair Santa Clarita & Palmdale | ${N}`,
    metaDescription: `Driveway gate sagging, dragging or off its track? We repair slide and swing driveway gates on hillside, canyon and ranch properties. Call or text ${P}.`,
    primaryKeyword: "driveway gate repair",
    heroH1: "Driveway Gate Repair, Hillside to High Desert",
    heroSubtitle: "Long driveways, steep grades and heavy gates. We get yours rolling or swinging straight again.",
    isInstallation: false,
    intro: `Driveway gates in this area see a lot. On hillside lots in Castaic and Val Verde, a gate often sits on a slope that pulls it out of line over time. On horse properties in Agua Dulce and Acton, gates are wide and heavy and get opened many times a day for trailers and trucks. Out in the Antelope Valley, sand and wind wear down wheels and tracks faster than you would expect.

We repair the gate itself: hinges, wheels, tracks, guide rollers, posts and frames, and if it is automated we check the operator while we are there. For bent or rusted ironwork, see [iron gate repair](/services/iron-gate-repair).`,
    features: [
      { icon: "⛰️", title: "Slopes and Grades", desc: "Gates realigned on uneven and hillside driveways so they stop binding." },
      { icon: "🐎", title: "Ranch-Width Gates", desc: "Wide, heavy gates on horse and rural properties put back in service." },
      { icon: "🛞", title: "Tracks and Rollers", desc: "Worn wheels, guide rollers and damaged track sections replaced." },
    ],
    howItWorks: [
      "Send a photo of the gate and the driveway so we can see the setup.",
      "We schedule a visit and bring wheels, hinges and rollers for common sizes.",
      "The technician finds what is pulling the gate out of line and quotes the fix.",
      "After the repair, we cycle the gate end to end and check it from both sides.",
    ],
    symptoms: [
      "Gate scrapes the concrete or gravel",
      "Slide gate jumps off the track",
      "Swing leaf won't line up with the other",
      "Gate post leaning",
      "Gate needs a shove to finish moving",
    ],
    faqs: [
      { q: "My gate drags on our sloped driveway. Can that be fixed without replacing it?", a: "Usually, yes. Most dragging comes from worn hinges, a shifted post or a frame that has dropped. We can often correct it with new hardware and adjustment rather than a new gate." },
      { q: "Do you work on gravel or dirt driveways?", a: "Yes. A lot of the ranch and canyon properties we visit have gravel or dirt. We set the gate up so it clears the surface the way it is today." },
      { q: "Can you repair a gate that a car backed into?", a: `Often. It depends on how badly the frame and operator are damaged. Text a photo to ${P} and we can tell you what to expect before we come out.` },
    ],
    relatedSlugs: ["gate-repair", "iron-gate-repair", "automatic-gate-repair"],
  },
  {
    slug: "electric-gate-repair",
    title: "Electric Gate Repair",
    metaTitle: `Electric Gate Repair Santa Clarita Valley | ${N}`,
    metaDescription: `Electric gate dead or acting erratic? We trace power, wiring, boards and controls on residential and HOA gates across SCV and the AV. Call or text ${P}.`,
    primaryKeyword: "electric gate repair",
    heroH1: "Electric Gate Repair and Power Troubleshooting",
    heroSubtitle: "No power, tripped breakers, burnt boards or chewed wires. We trace the fault and get current back where it belongs.",
    isInstallation: false,
    intro: `When an electric gate goes completely dead, the cause can be anywhere between the breaker and the motor. Summer storms and power flickers can take out control boards, rodents chew low-voltage wire, and irrigation water finds its way into buried conduit. Gates near open land in Leona Valley, Green Valley and Lake Hughes see more of this than most.

We trace the problem from power to operator so the fix is the right one. Electrical work on gates should be done by someone who does it every day, so this is one to leave to us.`,
    features: [
      { icon: "⚡", title: "Power Tracing", desc: "Breakers, transformers, wiring and connections checked from the source." },
      { icon: "🧩", title: "Control Boards", desc: "Failed or surge-damaged boards diagnosed and replaced." },
      { icon: "🐿️", title: "Damaged Wiring", desc: "Chewed, corroded or water-damaged wire runs repaired." },
    ],
    howItWorks: [
      "Call or text and let us know if anything at the gate still lights up.",
      "A technician comes out and works through the power path step by step.",
      "We show you what failed and give you a free on-site quote.",
      "With your OK, we repair it and confirm the gate runs and the safety devices respond.",
    ],
    symptoms: [
      "Gate totally dead, no lights or sounds",
      "Gate died after a storm or outage",
      "Breaker trips when the gate runs",
      "Works some days, dead on others",
      "Burning smell from the operator box",
    ],
    faqs: [
      { q: "Our gate stopped after a power outage. Is the motor ruined?", a: "Not necessarily. Outages and surges often damage the control board or a fuse rather than the motor. A technician can tell which part failed." },
      { q: "Can rodents really stop a gate?", a: "Yes. Mice and squirrels chew low-voltage wire, especially in operator boxes near brush and open land. We repair the damage and can suggest ways to protect the wiring." },
      { q: "Should I keep resetting the breaker?", a: `If the breaker trips again, leave it off and call ${P}. Repeated trips point to a real electrical fault that needs a look.` },
    ],
    relatedSlugs: ["automatic-gate-repair", "gate-opener-repair", "emergency-gate-repair"],
  },
  {
    slug: "gate-opener-repair",
    title: "Gate Opener Repair",
    metaTitle: `Gate Opener Repair Santa Clarita & Lancaster | ${N}`,
    metaDescription: `Gate opener repair for slide and swing operators from LiftMaster, All-O-Matic, DoorKing, Elite and more. SCV and Antelope Valley. Call or text ${P}.`,
    primaryKeyword: "gate opener repair",
    heroH1: "Gate Opener Repair for Slide and Swing Operators",
    heroSubtitle: "Gears, chains, arms, limits and boards. We repair the operator so you don't have to replace the whole unit.",
    isInstallation: false,
    intro: `The opener is the part of the gate that does the heavy lifting, and in triple-digit Santa Clarita summers and gusty Antelope Valley winters it takes a beating. Swing arms work loose, slide operator chains stretch, gears wear, and limit settings drift until the gate stops short or slams.

We service the major operator brands, including LiftMaster, All-O-Matic, DoorKing, Elite, Viking, Ramset, Linear and Eagle. If a repair no longer makes sense for an older unit, we will say so and quote a [replacement operator](/services/gate-motor-replacement) instead.`,
    features: [
      { icon: "⚙️", title: "Drive Parts", desc: "Gears, chains, sprockets and swing arms replaced on site." },
      { icon: "🎯", title: "Limits Set Right", desc: "Open and close points set so the gate stops where it should." },
      { icon: "🏷️", title: "Major Brands", desc: "LiftMaster, All-O-Matic, DoorKing, Elite, Viking, Linear and others." },
    ],
    howItWorks: [
      "Tell us the opener brand if you know it, or text a photo of the unit.",
      "We bring parts for that operator and schedule a visit.",
      "The technician inspects the opener and quotes the repair at no charge.",
      "We fix it and run the gate through repeated cycles before we leave.",
    ],
    symptoms: [
      "Opener runs but gate doesn't move",
      "Chain slapping or hanging loose",
      "Swing arm bent or popping off",
      "Gate overshoots or stops short",
      "Clicking from the box, no movement",
    ],
    faqs: [
      { q: "Our operator is old. Repair it or replace it?", a: "Often it is, when the problem is a gear, chain or board. If the unit has several worn parts or parts are no longer available, we will recommend a replacement and explain why." },
      { q: "Which opener brands do you service?", a: "LiftMaster, All-O-Matic, DoorKing, Elite, Viking, Ramset, Linear, Eagle and other common operators. If you are not sure what you have, text us a photo." },
      { q: "Can you fix a solar-powered gate opener?", a: `Yes. We work on solar and battery backup setups as well as standard AC operators. Call ${P} and tell us what is on site.` },
    ],
    relatedSlugs: ["automatic-gate-repair", "gate-motor-replacement", "electric-gate-repair"],
  },
  {
    slug: "gate-motor-replacement",
    title: "Gate Motor Replacement",
    metaTitle: `Gate Motor Replacement Santa Clarita Valley | ${N}`,
    metaDescription: `Worn-out gate motor? We size and install the right replacement operator for your slide or swing gate across SCV and the AV. Free on-site quote: ${P}.`,
    primaryKeyword: "gate motor replacement",
    heroH1: "Gate Motor Replacement, Sized for Your Gate",
    heroSubtitle: "When the old operator is done, we match a new one to your gate's weight, width and daily use.",
    isInstallation: false,
    intro: `Some operators reach the point where another repair just buys a few more months. That is common in neighborhoods built in the same era, where many original motors around Valencia, Saugus and Canyon Country are now at the end of their life. Heat and constant cycling on busy driveways speed that up.

We look at the gate, how often it runs and how it is powered, then recommend an operator that fits. We reconnect your existing remotes and access controls where they are compatible, and set up the safety sensors so the new motor works safely from day one.`,
    features: [
      { icon: "📏", title: "Right-Sized Operator", desc: "Chosen for your gate's weight, length and how often it cycles." },
      { icon: "🔁", title: "Controls Reconnected", desc: "Remotes, keypads and intercoms tied back in where compatible." },
      { icon: "🔋", title: "Backup Options", desc: "Battery backup available so an outage doesn't trap you in or out." },
    ],
    howItWorks: [
      "Call or text and tell us about the gate and the current operator.",
      "A technician measures the gate and checks power and mounting.",
      "You get a free on-site quote with the operator options that fit.",
      "We install the new motor, set limits and sensors and show you how it works.",
    ],
    symptoms: [
      "Motor has been repaired again and again",
      "Operator overheats in summer",
      "Parts for the unit no longer available",
      "Motor struggles to move a heavy gate",
      "Motor housing cracked or rusted through",
    ],
    faqs: [
      { q: "How do I know it is time to replace the motor rather than repair it?", a: "Repeat failures, parts that are hard to get and a motor that struggles with the gate's weight are the usual signs. Our technician will lay out both options so you can choose." },
      { q: "Will my current remotes work with a new motor?", a: "Many will, and we test them during installation. If they are not compatible, we can supply new ones and code them for you." },
      { q: "Can you add battery backup?", a: `Yes. Battery backup keeps the gate usable during outages, which matters on properties with only one way in. Ask about it when you call ${P}.` },
    ],
    relatedSlugs: ["gate-opener-repair", "automatic-gate-repair", "gate-installation"],
  },
  {
    slug: "iron-gate-repair",
    title: "Iron Gate Repair",
    metaTitle: `Iron Gate Repair Santa Clarita | Wrought Iron Gates | ${N}`,
    metaDescription: `Wrought iron gate repair: bent pickets, broken hinges, rust damage and welds. Driveway and walk gates across SCV and the Antelope Valley. Call ${P}.`,
    primaryKeyword: "iron gate repair",
    heroH1: "Iron Gate Repair and Welding",
    heroSubtitle: "Bent bars, cracked welds, rusted bottoms and worn hinges on wrought iron and steel gates.",
    isInstallation: false,
    intro: `Wrought iron and steel gates are built to last, but sprinkler overspray, monsoon moisture and years of sun eventually show up as rust at the bottom rail, cracked welds and hinges that wear out of round. On ornate gates in Stevenson Ranch and Newhall, a sagging leaf can also throw off the look of the whole entry.

We repair the metal itself: welding, straightening, hinge and post work and rust repair, then make sure the gate opens and closes cleanly. If your iron gate is automated, we check the [gate opener](/services/gate-opener-repair) while we are on site.`,
    features: [
      { icon: "🔥", title: "Welding", desc: "Cracked joints, broken pickets and failed welds repaired." },
      { icon: "🪝", title: "Hinges and Posts", desc: "Worn hinges replaced and leaning posts brought back to plumb." },
      { icon: "🧱", title: "Rust Damage", desc: "Rotted bottom rails and rusted sections cut out and replaced." },
    ],
    howItWorks: [
      "Text a photo of the damage so we can see what kind of iron work it needs.",
      "We schedule a visit with the right welding and hardware on the truck.",
      "The technician looks it over and gives you a free on-site quote.",
      "We make the repair and check the gate's swing, latch and finish.",
    ],
    symptoms: [
      "Leaf sagging and hard to latch",
      "Cracked or broken weld at a joint",
      "Bent bars from a vehicle or impact",
      "Rust eating the bottom rail",
      "Hinge worn and squealing",
    ],
    faqs: [
      { q: "Can a rusted iron gate be saved?", a: "In most cases, yes. If the rust is limited to the lower rails or a few sections, we can cut it out and weld in new metal instead of replacing the whole gate." },
      { q: "Do you repair decorative or scrollwork gates?", a: "Yes. We work on ornate gates and try to match the existing pattern as closely as possible." },
      { q: "Do you weld on site?", a: `Most iron repairs are done right at your property. Larger rebuilds may need shop time, and we will tell you up front. Call ${P} to set a visit.` },
    ],
    relatedSlugs: ["driveway-gate-repair", "gate-repair", "gate-installation"],
  },
  {
    slug: "commercial-gate-repair",
    title: "Commercial Gate Repair",
    metaTitle: `Commercial Gate Repair Santa Clarita & Palmdale | ${N}`,
    metaDescription: `Commercial and HOA gate repair: heavy slide gates, access control and parking lot gates in SCV and the Antelope Valley. 24/7 emergency dispatch: ${P}.`,
    primaryKeyword: "commercial gate repair santa clarita",
    heroH1: "Commercial and HOA Gate Repair",
    heroSubtitle: "Business lots, industrial yards, apartment entries and HOA gates kept running for the people who depend on them.",
    isInstallation: false,
    intro: `Commercial gates cycle all day and a failure affects everyone at once: tenants, employees, deliveries and residents. We service business parks and industrial yards around Santa Clarita and Valencia, apartment and condo entries, and community gates across the Santa Clarita and Antelope Valleys, including properties in Palmdale and Lancaster.

We work on heavy-duty slide and swing operators, access control and safety devices, and we can coordinate with property managers so repairs fit around your traffic. For roll-up and sectional doors at the same property, see [commercial garage doors](/services/commercial-garage-door).`,
    features: [
      { icon: "🏢", title: "High-Cycle Gates", desc: "Heavy-duty operators that run all day, repaired and tuned." },
      { icon: "🪪", title: "Access Control", desc: "Keypads, card readers, telephone entry and exit loops brought back online." },
      { icon: "🚨", title: "Off-Hours Dispatch", desc: "24/7 emergency help when a gate fails open or locks people out." },
    ],
    howItWorks: [
      "Call or text with the property address and what the gate is doing.",
      "We set a time, or dispatch right away if the gate is a security problem.",
      "The technician diagnoses it and gives the property contact a free quote.",
      "We repair the gate and confirm access devices and safety sensors work.",
    ],
    symptoms: [
      "Entry gate stuck open after hours",
      "Card reader or keypad not triggering",
      "Exit loop not sensing vehicles",
      "Heavy slide gate jerking or stalling",
      "Gate struck by a vehicle",
    ],
    faqs: [
      { q: "Do you work with property managers and HOAs?", a: "Yes. We can coordinate access, scheduling and approvals with your management company or board." },
      { q: "Can you come at night if our gate is stuck open?", a: `Yes. Emergency dispatch runs 24/7. Call ${P} and tell us it is a commercial gate that won't secure.` },
      { q: "Do you repair access control as well as the gate?", a: "We service keypads, telephone entry units, card readers and vehicle loops that open the gate, along with the operator itself." },
    ],
    relatedSlugs: ["emergency-gate-repair", "electric-gate-repair", "commercial-garage-door"],
  },
  {
    slug: "emergency-gate-repair",
    title: "Emergency Gate Repair",
    metaTitle: `24/7 Emergency Gate Repair Santa Clarita | ${N}`,
    metaDescription: `Gate stuck open, stuck shut or hit by a car? 24/7 emergency gate repair across the Santa Clarita and Antelope Valleys. Call ${P} now.`,
    primaryKeyword: "emergency gate repair",
    heroH1: "24/7 Emergency Gate Repair",
    heroSubtitle: "Gate stuck open overnight or car trapped inside? Call now and we dispatch a technician, any day of the week.",
    isInstallation: false,
    isEmergency: true,
    intro: `Some gate problems can't wait until morning. A gate stuck open leaves your home or lot exposed, a gate stuck shut can keep you from getting to work, and a gate hit by a vehicle can be unsafe to touch. Our emergency line runs around the clock, including Saturdays, for homes and businesses from Castaic to Lake Elizabeth.

When you call, tell us what is happening and we get a technician moving. The first job is to make the gate safe and secure. If a full repair needs parts, we will lock things down and come back with them.`,
    features: [
      { icon: "🕐", title: "Around the Clock", desc: "Emergency dispatch 24/7, including Saturdays and holidays." },
      { icon: "🔒", title: "Secure First", desc: "We get the property closed and safe before anything else." },
      { icon: "📞", title: "A Real Person", desc: "Call and talk to someone who can send a technician." },
    ],
    howItWorks: [
      `Call ${P} and tell us the gate is an emergency.`,
      "We confirm the address and dispatch the nearest available technician.",
      "On site, the tech secures the gate and explains the repair options.",
      "We fix it on the spot when possible, or schedule the return with parts.",
    ],
    symptoms: [
      "Gate stuck open overnight",
      "Vehicle trapped behind a closed gate",
      "Gate knocked off its track or hinges",
      "Sparking or smoke from the operator",
      "Gate moving on its own",
    ],
    faqs: [
      { q: "Are you really available on Saturdays?", a: "Routine appointments are Sunday to Friday, but emergency dispatch runs 24/7, Saturdays included." },
      { q: "What counts as a gate emergency?", a: "Anything that leaves the property unsecured, traps a vehicle or person, or makes the gate unsafe. If you are not sure, call and we will help you decide." },
      { q: "Should I try to force the gate open?", a: `No. Forcing a gate can damage the operator or hurt someone. Keep people and cars clear and call ${P}.` },
    ],
    relatedSlugs: ["gate-repair", "commercial-gate-repair", "electric-gate-repair"],
  },
  {
    slug: "gate-installation",
    title: "Gate Installation",
    metaTitle: `Gate Installation Santa Clarita & Antelope Valley | ${N}`,
    metaDescription: `New driveway gates and gate operators installed across SCV and the AV. Slide, swing, iron and wood-and-steel designs. Free on-site quote: ${P}.`,
    primaryKeyword: "gate installation santa clarita",
    heroH1: "Driveway Gate and Operator Installation",
    heroSubtitle: "A new gate planned around your driveway, your slope and how you actually use the entrance.",
    isInstallation: true,
    intro: `A good gate install starts with the property. A slide gate needs room to travel; a swing gate needs space to clear the driveway and a grade it can handle. Hillside homes in Castaic, ranch entries in Acton and Agua Dulce, and windy lots in Lancaster and Quartz Hill all call for different choices.

We walk the site with you, talk through styles like wrought iron, wood and steel, and horizontal slat, and pair the gate with an operator that suits its size and use. Remotes, keypads, safety sensors and battery backup can all be part of the plan.`,
    features: [
      { icon: "📐", title: "Planned On Site", desc: "Layout based on your driveway width, slope and clearance." },
      { icon: "🎨", title: "Style Options", desc: "Wrought iron, horizontal slat, wood and steel and more." },
      { icon: "🔐", title: "Complete Setup", desc: "Operator, safety sensors and access controls installed together." },
    ],
    howItWorks: [
      "Call or text to set up a free on-site visit.",
      "We measure, look at slope and power, and talk through styles.",
      "You get a written quote with the gate and operator options.",
      "We install, test and walk you through the finished system.",
    ],
    symptoms: [
      "Old gate past the point of repair",
      "Adding a gate to an open driveway",
      "Manual gate you want automated",
      "Want a different style or material",
      "Gate too small for trucks or trailers",
    ],
    faqs: [
      { q: "Slide or swing: which is better for my driveway?", a: "It depends on space and slope. Slide gates suit tight or sloped driveways with room along the fence line; swing gates need clear space to open. We will recommend what fits after seeing the site." },
      { q: "Can you automate my existing manual gate?", a: "Often, yes, if the gate is in good shape and sized for an operator. We check the frame and hinges during the visit." },
      { q: "How do I get a quote?", a: `Call or text ${P} and we will set up a free on-site quote. We need to see the property to quote accurately.` },
    ],
    relatedSlugs: ["gate-motor-replacement", "iron-gate-repair", "driveway-gate-repair"],
  },

  // ── GARAGE DOORS ───────────────────────────────────────
  {
    slug: "garage-door-repair",
    title: "Garage Door Repair",
    metaTitle: `Garage Door Repair Santa Clarita & Palmdale | ${N}`,
    metaDescription: `Garage door stuck, noisy or off track? Garage door repair across the Santa Clarita and Antelope Valleys. Free on-site quote. Call or text ${P}.`,
    primaryKeyword: "garage door repair santa clarita",
    heroH1: "Garage Door Repair for SCV and Antelope Valley Homes",
    heroSubtitle: "Springs, cables, openers, rollers and panels. We fix the door you use every day so it opens without a fight.",
    isInstallation: false,
    intro: `For most homes here, the garage is the front door. When it won't open, the car is stuck and the day gets complicated. Heat in Saugus and Canyon Country dries out rollers and weatherseal, and desert wind in Palmdale and Lancaster can push a door off its track or bend a panel.

Our technicians repair sectional and one-piece doors and the openers that drive them. Broken springs and loose cables are under heavy tension and are dangerous to handle, so that is work for a trained tech. See [spring repair](/services/garage-door-spring-repair) and [cable repair](/services/garage-door-cable-repair) for those.`,
    features: [
      { icon: "🚗", title: "Back on the Road", desc: "We aim to get the car out the same visit whenever the part is on hand." },
      { icon: "🔧", title: "Whole Door", desc: "Springs, cables, rollers, tracks, hinges, panels and openers." },
      { icon: "📋", title: "Free Quote", desc: "Free on-site quote and your OK before any work starts." },
    ],
    howItWorks: [
      "Call or text a photo of the door and tell us what happened.",
      "We schedule a visit and bring springs, cables and rollers for common doors.",
      "The technician inspects the door and gives you a free quote.",
      "We repair and balance the door and test it with the opener.",
    ],
    symptoms: [
      "Door won't open, opener just hums",
      "Loud bang from the garage",
      "Door crooked or off the track",
      "Door shakes or grinds when moving",
      "Door won't stay closed",
    ],
    faqs: [
      { q: "There was a loud bang and now the door won't open. What happened?", a: "That is usually a torsion spring breaking. Don't try to lift the door or use the opener. Call us and a technician will replace the spring safely." },
      { q: "Do you work on all garage door types?", a: "We repair sectional, one-piece, steel, wood-look and insulated doors and the major opener brands, including LiftMaster, Chamberlain and Genie." },
      { q: "Do you service garage doors in Lancaster and Palmdale?", a: `Yes. We cover the whole Antelope Valley and Santa Clarita Valley. Call ${P} with your address.` },
    ],
    relatedSlugs: ["garage-door-spring-repair", "garage-door-opener-repair", "garage-door-cable-repair"],
  },
  {
    slug: "garage-door-spring-repair",
    title: "Garage Door Spring Repair",
    metaTitle: `Garage Door Spring Repair Santa Clarita | ${N}`,
    metaDescription: `Broken garage door spring? Torsion and extension spring replacement across SCV and the Antelope Valley. Don't lift the door, call or text ${P}.`,
    primaryKeyword: "garage door spring repair",
    heroH1: "Garage Door Spring Repair",
    heroSubtitle: "Snapped torsion spring or stretched extension springs. We replace them safely and balance the door.",
    isInstallation: false,
    intro: `Springs do the real lifting on a garage door, and every open and close wears them a little. Big temperature swings, from cold Antelope Valley mornings to hot afternoons, add to that stress. When one breaks it usually goes with a loud bang, and the door suddenly feels like it weighs a few hundred pounds, because it does.

Springs hold dangerous tension. Replacing them takes the right tools and training, which is why it is a job for a technician. We match springs to your door's weight and size, replace them and balance the door so the [opener](/services/garage-door-opener-repair) isn't strained.`,
    features: [
      { icon: "🌀", title: "Torsion and Extension", desc: "Both spring systems replaced and matched to your door." },
      { icon: "⚖️", title: "Balanced Door", desc: "Door balanced after the swap so it lifts evenly." },
      { icon: "🦺", title: "Done Safely", desc: "Trained techs with proper winding tools handle the tension." },
    ],
    howItWorks: [
      "Call or text and let us know the door won't lift or a spring is broken.",
      "We dispatch a technician with springs for common door sizes.",
      "The tech confirms the spring size and gives you a free quote.",
      "We replace the springs, balance the door and test it with the opener.",
    ],
    symptoms: [
      "Visible gap in the spring above the door",
      "Door feels very heavy",
      "Opener strains and door lifts a few inches",
      "Door slams down when closing",
      "Cables hanging loose after a bang",
    ],
    faqs: [
      { q: "The spring snapped. Can I still lift the door to get my car out?", a: "We don't recommend it. Without the spring, the door is extremely heavy and can fall. Leave it closed and call us." },
      { q: "Should both springs be replaced at once?", a: "On doors with two springs, they usually wear at the same rate, so replacing both keeps the door balanced and avoids a second visit soon after. The technician will go over it with you." },
      { q: "My car is stuck in the garage. Can you come today?", a: `Call ${P}. Spring calls are a priority and we will get a technician to you as soon as we can.` },
    ],
    relatedSlugs: ["garage-door-cable-repair", "garage-door-repair", "emergency-garage-door-repair"],
  },
  {
    slug: "garage-door-opener-repair",
    title: "Garage Door Opener Repair",
    metaTitle: `Garage Door Opener Repair Santa Clarita | ${N}`,
    metaDescription: `Garage door opener repair and replacement for LiftMaster, Chamberlain, Genie and more in SCV and the Antelope Valley. Call or text ${P}.`,
    primaryKeyword: "garage door opener repair",
    heroH1: "Garage Door Opener Repair and Replacement",
    heroSubtitle: "Opener humming, remotes dead or door reversing for no reason? We repair it or put in a new one that fits.",
    isInstallation: false,
    intro: `Openers have gears, boards, sensors and a motor, and garage heat in the summer is hard on all of them. A door that reverses for no reason, remotes that only work up close, or an opener that runs without moving the door are all signs something inside has worn out.

We repair LiftMaster, Chamberlain, Genie and other common openers. When an opener is too worn to be worth fixing, we install a new one, code your remotes and keypad, and set the safety sensors. If the door itself is heavy or stuck, the real problem may be the [springs](/services/garage-door-spring-repair).`,
    features: [
      { icon: "🔊", title: "Drive Repairs", desc: "Stripped gears, belts, chains and trolleys replaced." },
      { icon: "👁️", title: "Safety Sensors", desc: "Photo eyes aligned and tested so the door stops for obstacles." },
      { icon: "📱", title: "Remotes and Keypads", desc: "Remotes, wall buttons and keypads coded and working." },
    ],
    howItWorks: [
      "Call or text with the opener brand, or send a photo of it.",
      "A technician comes out with drive parts and sensors for common models.",
      "We check the door and opener together and give you a free quote.",
      "We repair or replace the opener and test it with every remote.",
    ],
    symptoms: [
      "Motor runs but door doesn't move",
      "Door reverses before it closes",
      "Remotes stopped working",
      "Opener lights blinking",
      "Grinding or rattling from the motor",
    ],
    faqs: [
      { q: "Why does my garage door go back up right before it closes?", a: "The usual cause is the safety sensors at the bottom of the track being bumped out of line or getting dirty. It can also be the force settings or the door itself. A technician will find which." },
      { q: "Do you install new openers?", a: "Yes. If repair doesn't make sense, we install a new opener matched to your door and set it up with your remotes and keypad." },
      { q: "Which opener brands do you repair?", a: `LiftMaster, Chamberlain, Genie and other common brands. Text a photo of the motor head to ${P} if you are not sure.` },
    ],
    relatedSlugs: ["garage-door-repair", "garage-door-spring-repair", "garage-door-installation"],
  },
  {
    slug: "garage-door-cable-repair",
    title: "Garage Door Cable Repair",
    metaTitle: `Garage Door Cable Repair Santa Clarita | ${N}`,
    metaDescription: `Garage door cable snapped or off the drum? Cable repair and replacement across the Santa Clarita and Antelope Valleys. Call or text ${P}.`,
    primaryKeyword: "garage door cable repair",
    heroH1: "Garage Door Cable Repair",
    heroSubtitle: "Frayed, snapped or unwound lift cables replaced so the door rises level again.",
    isInstallation: false,
    intro: `Lift cables work with the springs to raise the door evenly. When one frays or comes off its drum, the door goes crooked, jams in the track or drops on one side. Cables are under spring tension, so this is a repair to leave to a trained technician.

We replace worn or broken cables, check the drums and bottom brackets they attach to, and balance the door afterward. Since cables and springs work as a team, we check the [springs](/services/garage-door-spring-repair) at the same visit.`,
    features: [
      { icon: "🪢", title: "New Cables", desc: "Lift cables replaced in matched pairs." },
      { icon: "🥁", title: "Drums and Brackets", desc: "Cable drums and bottom brackets inspected and replaced if worn." },
      { icon: "📏", title: "Level Door", desc: "Door set to lift evenly on both sides." },
    ],
    howItWorks: [
      "Call or text a photo showing the cable and how the door is sitting.",
      "We schedule a technician with cables for standard door sizes.",
      "The tech secures the door, inspects the system and gives you a free quote.",
      "We replace the cables, balance the door and test it.",
    ],
    symptoms: [
      "Door hanging crooked",
      "Cable dangling beside the door",
      "Frayed cable near the bottom bracket",
      "Door jammed partway up",
      "One side lifts before the other",
    ],
    faqs: [
      { q: "My door is hanging crooked. Is it safe to use?", a: "No. A crooked door often means a cable has failed and the door could drop. Leave it where it is and call us." },
      { q: "Why do cables wear out?", a: "Age, rust at the bottom bracket, a door that is out of balance and worn drums all wear cables down. The tech will look for the cause so the new cables last." },
      { q: "Can you come out the same day?", a: `Often, yes. Call ${P} and let us know a cable is down.` },
    ],
    relatedSlugs: ["garage-door-spring-repair", "garage-door-repair", "garage-door-panel-repair"],
  },
  {
    slug: "garage-door-panel-repair",
    title: "Garage Door Panel Repair",
    metaTitle: `Garage Door Panel Repair Santa Clarita | ${N}`,
    metaDescription: `Dented or cracked garage door panels replaced to match your door. Serving SCV and the Antelope Valley. Free on-site quote: call or text ${P}.`,
    primaryKeyword: "garage door panel repair",
    heroH1: "Garage Door Panel Repair and Replacement",
    heroSubtitle: "Dents, cracks and wind damage repaired so the door looks right and runs straight.",
    isInstallation: false,
    intro: `A dented panel is more than cosmetic. Bent sections can pull hinges loose, bind in the track and strain the opener. We see a lot of panels damaged by cars, basketballs and, in the Antelope Valley, strong wind pushing on a door that was left partly open.

We assess whether the damaged section can be repaired or should be replaced, and work to match your door's style and color as closely as available parts allow. If the damage is widespread, a [new door](/services/garage-door-installation) may make more sense, and we will tell you honestly.`,
    features: [
      { icon: "🧰", title: "Section Replacement", desc: "Damaged sections swapped without replacing the whole door." },
      { icon: "🎯", title: "Style Match", desc: "Replacement panels matched as closely as parts allow." },
      { icon: "🔗", title: "Hardware Check", desc: "Hinges, rollers and struts on the damaged section inspected." },
    ],
    howItWorks: [
      "Text a photo of the damage and a picture of the whole door.",
      "We check panel availability for your door model.",
      "A technician inspects it on site and gives you a free quote.",
      "We repair or replace the section and test the door through full travel.",
    ],
    symptoms: [
      "Dented or creased panel",
      "Cracked section",
      "Door binds where the panel is bent",
      "Hinge pulled loose from a panel",
      "Wind pushed the door inward",
    ],
    faqs: [
      { q: "Can you replace just one panel?", a: "Often, yes, as long as matching sections are still made for your door. We check availability before the visit when possible." },
      { q: "My car backed into the door. Is it safe to open?", a: "Not until someone looks at it. Bent panels can jam in the track or stress the springs and cables. Call us first." },
      { q: "Will the new panel match?", a: `We match style and color as closely as available parts allow. Text a photo to ${P} and we can tell you what to expect.` },
    ],
    relatedSlugs: ["garage-door-repair", "garage-door-installation", "garage-door-cable-repair"],
  },
  {
    slug: "emergency-garage-door-repair",
    title: "Emergency Garage Door Repair",
    metaTitle: `24/7 Emergency Garage Door Repair Santa Clarita | ${N}`,
    metaDescription: `Garage door stuck open, car trapped inside or door off track? 24/7 emergency garage door repair in SCV and the Antelope Valley. Call ${P}.`,
    primaryKeyword: "emergency garage door repair",
    heroH1: "24/7 Emergency Garage Door Repair",
    heroSubtitle: "Door stuck open at night or car locked inside before work? Call now, any day of the week.",
    isInstallation: false,
    isEmergency: true,
    intro: `A garage door that won't close leaves the house open to anyone. One that won't open can trap the only car you have. Our emergency line is staffed around the clock, Saturdays included, for homes from Stevenson Ranch to Sun Village.

When you call, we get a technician on the way. The first goal is to make the door safe and get it closed or get your car out. If a full repair needs parts we don't have on the truck, we secure everything and come back to finish.`,
    features: [
      { icon: "🌙", title: "Nights and Weekends", desc: "24/7 emergency dispatch, including Saturdays and holidays." },
      { icon: "🏠", title: "House Secured", desc: "We get the door closed and the home secure first." },
      { icon: "🚙", title: "Car Out", desc: "We work to free a trapped vehicle as quickly as possible." },
    ],
    howItWorks: [
      `Call ${P} and tell us it is a garage door emergency.`,
      "We confirm your address and send the nearest available technician.",
      "On site, the tech makes the door safe and explains the repair.",
      "We finish the repair then, or secure it and return with parts.",
    ],
    symptoms: [
      "Door stuck open overnight",
      "Car trapped inside",
      "Door off the track and hanging",
      "Spring broke with the door half open",
      "Door fell or slammed shut",
    ],
    faqs: [
      { q: "Is a garage door stuck open an emergency?", a: "If the garage leads into your house, yes. It leaves the home unsecured. Call us and we will send someone." },
      { q: "Should I try to pull the door down by hand?", a: `No. A door stuck open often has a broken spring or cable, and it can fall. Keep clear and call ${P}.` },
      { q: "Do you come out on Saturdays?", a: "Emergency calls are answered 24/7, Saturdays included. Routine appointments run Sunday to Friday." },
    ],
    relatedSlugs: ["garage-door-spring-repair", "garage-door-cable-repair", "garage-door-repair"],
  },
  {
    slug: "commercial-garage-door",
    title: "Commercial Garage Doors",
    metaTitle: `Commercial Garage Door Repair Santa Clarita & Palmdale | ${N}`,
    metaDescription: `Commercial roll-up and sectional door repair for shops, warehouses and service bays in SCV and the Antelope Valley. Call or text ${P}.`,
    primaryKeyword: "commercial garage door repair",
    heroH1: "Commercial Garage Door Repair",
    heroSubtitle: "Roll-up and sectional doors for shops, warehouses and service bays, repaired so work keeps moving.",
    isInstallation: false,
    intro: `A loading or service bay door that won't open can stop a business for the day. We work on commercial roll-up and sectional doors at warehouses, auto shops, storage facilities and service businesses around Santa Clarita, Valencia, Palmdale and Lancaster.

We repair springs, cables, operators, tracks and damaged sections, and we can schedule around your hours. If your property also has a vehicle gate, we can look at it on the same trip; see [commercial gate repair](/services/commercial-gate-repair).`,
    features: [
      { icon: "🏭", title: "Roll-Up and Sectional", desc: "Commercial door systems and their operators repaired." },
      { icon: "🕒", title: "Around Your Hours", desc: "Visits scheduled to keep downtime low." },
      { icon: "🚚", title: "Impact Damage", desc: "Doors and tracks hit by trucks or forklifts repaired." },
    ],
    howItWorks: [
      "Call or text with the business address and the door problem.",
      "We schedule a visit, or dispatch right away if the bay can't be secured.",
      "The technician diagnoses it and gives you a free on-site quote.",
      "We repair the door and test it under normal use.",
    ],
    symptoms: [
      "Roll-up door stuck halfway",
      "Door hit by a truck or forklift",
      "Operator won't respond",
      "Door won't lock at the bottom",
      "Loud strain when lifting",
    ],
    faqs: [
      { q: "Do you work on roll-up doors?", a: "Yes. We repair commercial roll-up and sectional doors and the operators that run them." },
      { q: "Can you come after business hours?", a: `For a door that won't secure, yes. Emergency dispatch runs 24/7. Call ${P}.` },
      { q: "Can you handle our gate and doors in one visit?", a: "Yes. If your property has both, we can schedule them together." },
    ],
    relatedSlugs: ["commercial-gate-repair", "garage-door-opener-repair", "emergency-garage-door-repair"],
  },
  {
    slug: "garage-door-installation",
    title: "Garage Door Installation",
    metaTitle: `Garage Door Installation Santa Clarita & Antelope Valley | ${N}`,
    metaDescription: `New garage doors and openers installed across SCV and the AV. Insulated, steel and wood-look styles. Free on-site quote: call or text ${P}.`,
    primaryKeyword: "garage door installation santa clarita",
    heroH1: "New Garage Door and Opener Installation",
    heroSubtitle: "A new door picked for your home's style and the local climate, installed with the opener to match.",
    isInstallation: true,
    intro: `A new garage door changes how a house looks from the street and how the garage feels on a 105-degree afternoon. Insulated doors help in hot Santa Clarita summers and cold high desert winters, and a sturdier door holds up better against Antelope Valley wind.

We measure your opening, help you choose a style that suits the house, from clean modern panels in Valencia to carriage-style looks on ranch homes, and install the door with springs, hardware and an [opener](/services/garage-door-opener-repair) sized for it.`,
    features: [
      { icon: "🌡️", title: "Insulated Options", desc: "Doors that help with heat and cold in the garage." },
      { icon: "🏡", title: "Style Choices", desc: "Modern, raised panel, carriage-style and wood-look doors." },
      { icon: "🔧", title: "Full Install", desc: "Door, springs, tracks and opener installed together." },
    ],
    howItWorks: [
      "Call or text to book a free on-site visit.",
      "We measure the opening and go over styles, colors and insulation.",
      "You get a written quote for the door and opener.",
      "We install, test and show you how everything works.",
    ],
    symptoms: [
      "Door past the point of repair",
      "Several panels damaged",
      "Garage too hot or too cold",
      "Want a new look for the house",
      "Old door noisy and heavy",
    ],
    faqs: [
      { q: "Is an insulated door worth it here?", a: "For attached garages and garages used as workshops or gyms, insulation makes a noticeable difference in both summer heat and winter cold." },
      { q: "Can you install a new opener at the same time?", a: "Yes. We often install the door and opener together so they are matched and set up in one visit." },
      { q: "How do I get a quote?", a: `Call or text ${P} for a free on-site quote. We measure the opening so the quote is accurate.` },
    ],
    relatedSlugs: ["garage-door-opener-repair", "garage-door-panel-repair", "garage-door-repair"],
  },
];

export const SERVICES: ServiceData[] = RAW.map((s) => ({
  ...s,
  heroImg: IMAGES.services[s.slug] ?? IMAGES.serviceFallback,
}));

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getGateServices(): ServiceData[] {
  return SERVICES.filter((s) =>
    ["gate-repair", "automatic-gate-repair", "driveway-gate-repair", "electric-gate-repair", "gate-opener-repair", "gate-motor-replacement", "iron-gate-repair", "commercial-gate-repair", "gate-installation"].includes(s.slug)
  );
}

export function getGarageDoorServices(): ServiceData[] {
  return SERVICES.filter((s) =>
    ["garage-door-repair", "garage-door-spring-repair", "garage-door-opener-repair", "garage-door-cable-repair", "garage-door-panel-repair", "emergency-garage-door-repair", "commercial-garage-door", "garage-door-installation"].includes(s.slug)
  );
}
