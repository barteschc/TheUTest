export interface TestRead {
  label: string;
  body: string;
}

export interface Dimension {
  name: string;
  note: string;
}

export interface Test {
  id: string;
  kicker: string;
  name: string;
  meta: string;
  blurb: string;
  archetype: string;
  priceCents: number;
  para: string;
  reads: [TestRead, TestRead];
  /** Short citation-style label for what the 5 dimensions below are grounded in. */
  framework: string;
  /**
   * Exactly 5 dimensions. Question i (0-indexed) loads on dimensions[i % 5] —
   * the 20 questions are written in 4 interleaved blocks of 5 so every quiz
   * screen samples all 5 dimensions once, rather than clustering one
   * construct per screen. See scoring.ts.
   */
  dimensions: [Dimension, Dimension, Dimension, Dimension, Dimension];
  questions: string[];
}

export const SINGLE_PRICE_CENTS = 1199; // $11.99
export const BUNDLE_PRICE_CENTS = 3299; // $32.99

export const SCALE = ["Never me", "Rarely", "Often", "That's me"] as const;

export const TESTS: Test[] = [
  {
    id: "core",
    kicker: "Foundation",
    name: "Core Personality",
    meta: "20 statements · 9 min",
    blurb: "Five factors, scored without the flattery layer most instruments bolt on.",
    archetype: "The Operator",
    priceCents: SINGLE_PRICE_CENTS,
    para: "You run on execution, not reflection. You are the person a group quietly relies on when a plan collapses, and you have built an identity on being unbothered — which is why you rarely notice how much of your calm is avoidance rather than strength.",
    reads: [
      { label: "Where it works", body: "In a crisis you are the most useful person in the room, because you act while the group is still deciding whose fault it is." },
      { label: "Where it costs you", body: "You confuse being needed with being close. People rely on you and still don't know you, and you read that distance as their failure." },
    ],
    framework: "Big Five (OCEAN)",
    dimensions: [
      { name: "Openness", note: "You're pulled toward the untested idea over the proven one, and boredom hits you faster than most people will admit to." },
      { name: "Conscientiousness", note: "You run on follow-through. Once something's committed to, it gets finished — whether or not you still care." },
      { name: "Extraversion", note: "Other people recharge you more than solitude does, and a quiet room starts to feel like a waiting room." },
      { name: "Agreeableness", note: "You default to cooperation and give people the benefit of the doubt, sometimes past the point it's earned." },
      { name: "Volatility", note: "Your mood tracks the situation closely — maybe too closely — and calm takes longer to return than it does for most people." },
    ],
    questions: [
      "I get restless doing the same task the same way twice.",
      "I finish things other people abandon, even after I've stopped caring about them.",
      "A weekend with no plans and no people feels like a loss, not a rest.",
      "I give people the benefit of the doubt even after they've let me down once.",
      "A small setback can rattle me for longer than it logically deserves.",
      "I'd rather take an untested approach than repeat one that already worked.",
      "I keep a private ledger of who pulls their weight, and I never show anyone the ledger.",
      "I think out loud, in front of people, better than I think alone.",
      "I go along with the group's choice even when I privately disagree, to keep things smooth.",
      "I replay conversations after they're over, editing what I should have said.",
      "I get bored of ideas faster than most people seem to.",
      "I decide faster than I can explain the decision, and I resent being asked to justify it.",
      "Silence in a group makes me want to fill it, even with nothing to say.",
      "I find it hard to stay angry at someone who apologizes, even badly.",
      "I notice my own physical tension — jaw, shoulders, stomach — before I notice what caused it.",
      "I ask 'why does it have to be this way' more than the people around me.",
      "I hide how much effort something took so the result looks effortless.",
      "Being the center of attention energizes me more than it embarrasses me.",
      "I'd rather absorb a cost myself than start a conflict over who owes what.",
      "A single piece of criticism can outweigh five pieces of praise in my head.",
    ],
  },
  {
    id: "male",
    kicker: "Archetype",
    name: "Male Archetype",
    meta: "20 statements · 9 min",
    blurb: "King, Warrior, Magician, Lover — which one runs you, and which one you're faking.",
    archetype: "The Warrior",
    priceCents: SINGLE_PRICE_CENTS,
    para: "You mistake motion for meaning. Conflict organises you: given an enemy, a deadline or a rival, you become clear, useful and almost happy — and in the absence of one you invent friction, usually with the people closest to you, because peace feels like drift.",
    reads: [
      { label: "Where it works", body: "Given a real enemy — a deadline, a rival, a threat to someone you love — you are focused, brave and genuinely good to have around." },
      { label: "Where it costs you", body: "With no enemy available you manufacture one, and the nearest candidate is usually the person who trusts you most." },
    ],
    framework: "Moore & Gillette's King / Warrior / Magician / Lover",
    dimensions: [
      { name: "King", note: "You take responsibility for outcomes other people won't own, and you expect the room to organize around that." },
      { name: "Warrior", note: "You act under pressure instead of freezing, and you'd rather lose a fight than avoid one." },
      { name: "Magician", note: "You step outside a situation to read its structure while people inside it are still reacting to the feeling." },
      { name: "Lover", note: "You register what's happening in a room — in your body, not just your head — before you can name it." },
      { name: "Shadow Intensity", note: "How much of your behavior comes from the immature form of these patterns: control instead of order, cruelty instead of confrontation, distance instead of insight." },
    ],
    questions: [
      "I take responsibility for outcomes even when nobody assigns it to me.",
      "I need something to push against before I feel fully awake.",
      "I can step back from a situation I'm in and see it the way an outsider would.",
      "I notice a shift in someone's mood in my body before I notice it in my head.",
      "When I take charge, I sometimes bulldoze people I didn't need to.",
      "I feel responsible for a group's outcome even when I didn't ask to lead it.",
      "I'd rather act early and be wrong than wait and be right.",
      "I can watch my own anger arrive without being run by it.",
      "Touch, food, weather, music — physical sensation moves me more than most people I know.",
      "I've used my position to get away with something a peer couldn't.",
      "People bring me decisions that aren't technically mine to make.",
      "I've picked a fight I did not need to win and enjoyed it anyway.",
      "I can explain why I feel something almost as soon as I feel it.",
      "I can tell when someone near me is suppressing how they actually feel.",
      "I go cold and punishing rather than direct when someone crosses me.",
      "I set the standard in a room without announcing that I'm doing it.",
      "I'd take pain over humiliation without thinking about it.",
      "I trust a pattern I've noticed over what everyone around me insists is true.",
      "I stay present with someone's pain instead of trying to fix it immediately.",
      "I've mistaken control over people for care for them.",
    ],
  },
  {
    id: "female",
    kicker: "Archetype",
    name: "Female Archetype",
    meta: "20 statements · 9 min",
    blurb: "Mother, Maiden, Huntress, Sage — the pattern you lead with and the one you starve.",
    archetype: "The Huntress",
    priceCents: SINGLE_PRICE_CENTS,
    para: "You are self-sufficient to a fault and you call it independence. You track what everyone in a room needs and give it to them before they ask, then resent the silence when nobody tracks you — because you have made yourself very hard to help.",
    reads: [
      { label: "Where it works", body: "You see what a room needs before anyone says it, and you can hold a family, a team or a friend together on competence alone." },
      { label: "Where it costs you", body: "You have made yourself so hard to help that being unseen now feels like proof of the story rather than a result of it." },
    ],
    framework: "the Maiden / Mother / Huntress / Queen / Sage quaternity",
    dimensions: [
      { name: "Maiden", note: "You still meet new situations without pre-deciding how they'll go — a kind of openness that gets harder to keep as life adds evidence." },
      { name: "Mother", note: "You track what the people around you need and tend to it, often before they've named it themselves." },
      { name: "Huntress", note: "You move toward what you want directly, on your own timeline, without waiting for permission or company." },
      { name: "Queen", note: "You know where your boundary is and you hold it, even when holding it costs you something socially." },
      { name: "Sage", note: "You draw on what you've already lived through rather than reacting fresh to everything, which can read as calm or as distance." },
    ],
    questions: [
      "I can walk into a new situation without already deciding how it'll go.",
      "I know what people in a room need before they've worked it out themselves.",
      "I'd rather do it myself than explain it twice and watch it done badly.",
      "I can say no to something I want to say yes to, if it crosses a line I've set.",
      "I've stopped being surprised by the same mistake happening a different way.",
      "I get genuinely curious about people instead of sizing them up first.",
      "I feel responsible for the mood of people I didn't upset.",
      "I keep a quiet exit in mind in most relationships, including good ones.",
      "I tell people directly when they've crossed a line instead of letting it slide.",
      "I can watch a younger version of a mistake I made without needing to intervene.",
      "I take a risk on something new more easily than most people my age.",
      "I routinely take on more than I was asked to, then resent the size of it.",
      "I would leave first rather than be left.",
      "I don't apologize for taking up space in a room.",
      "I've made peace with something I used to be furious about.",
      "I still ask 'what if' about my own life more than 'what's realistic.'",
      "I am the one who remembers the dates, the details and the debts.",
      "I can tell within a minute whether a person is safe to be honest with.",
      "I decide the terms I'm available on, and I don't renegotiate them under pressure.",
      "People come to me for perspective more than for sympathy.",
    ],
  },
  {
    id: "shadow",
    kicker: "Dark side",
    name: "Shadow Profile",
    meta: "20 statements · 8 min",
    blurb: "The traits you'd never list on a dating profile, measured anyway.",
    archetype: "The Strategist",
    priceCents: SINGLE_PRICE_CENTS,
    para: "You are more calculating than you let on, and you've convinced yourself it's just competence. You manage impressions the way other people manage money — carefully, constantly, and with a running account of what each relationship is worth.",
    reads: [
      { label: "Where it works", body: "You stay calm in rooms where other people are emotional, and you can see three moves ahead while they're still reacting to the first." },
      { label: "Where it costs you", body: "Everything you win this way is slightly counterfeit, and some part of you keeps the receipt." },
    ],
    framework: "dark-personality research (Machiavellianism, narcissism, psychopathy, spite, impression management)",
    dimensions: [
      { name: "Machiavellianism", note: "You treat information and relationships as instruments — useful for something — more than most people are willing to admit doing." },
      { name: "Narcissism", note: "Your sense of your own importance runs a notch above what your track record alone would justify, and you expect that to be recognized." },
      { name: "Psychopathy", note: "Guilt shows up late, does little, and leaves fast — which makes you harder to control through conscience than most people." },
      { name: "Spitefulness", note: "You'll pay a real cost yourself if it guarantees the other person pays one too — a documented, studied trait, not just a bad mood." },
      { name: "Impression Management", note: "The version of you other people meet is curated, sometimes significantly, from the version that exists when no one's evaluating you." },
    ],
    questions: [
      "I know what to say to get what I want, and I can say it warmly.",
      "I expect to be treated as more important than I can currently justify.",
      "Guilt arrives, does very little, and leaves faster than it should.",
      "I'd take a loss myself to make sure someone who wronged me takes one too.",
      "I manage how I come across more deliberately than most people I know.",
      "I hold information back because holding it is worth something.",
      "I get quietly resentful when credit goes to someone else for something I contributed to.",
      "I test what I can get away with in small, deniable ways.",
      "I've sabotaged something I didn't even want, just so someone else couldn't have it.",
      "I've let someone believe something untrue simply by staying quiet.",
      "I keep options open longer than is fair to the people in them.",
      "I assume people are thinking about me more than they probably are.",
      "I don't fully believe anyone acts without self-interest.",
      "Watching someone lose matters more to me than whether I gain anything.",
      "The way I present online is noticeably better-edited than how I actually live.",
      "I can turn warmth on deliberately and it reads as real.",
      "I get disproportionately irritated by people who don't recognize what I bring to a room.",
      "Being caught would bother me more than having done it.",
      "I've kept a grudge going past the point it benefited me, on principle.",
      "I say the version of a story that makes me look better, even to people who were there.",
    ],
  },
  {
    id: "attach",
    kicker: "Relationships",
    name: "Attachment Style",
    meta: "20 statements · 8 min",
    blurb: "How you behave when someone gets close enough to matter.",
    archetype: "The Withdrawer",
    priceCents: SINGLE_PRICE_CENTS,
    para: "Closeness reads to you as a demand. You are steady, dependable and present right up until someone needs reassurance, at which point you go administrative — solving the logistics of the feeling instead of sitting in it with them.",
    reads: [
      { label: "Where it works", body: "You are steady, undramatic and reliable in the practical parts of love — the logistics, the money, the hard week." },
      { label: "Where it costs you", body: "Your partner is well managed and under-met, and they've stopped saying so, which you have quietly filed as things improving." },
    ],
    framework: "adult attachment theory (Bowlby, Ainsworth, Hazan & Shaver)",
    dimensions: [
      { name: "Anxiety", note: "You track the relationship for signs it's cooling, and reassurance helps less than you'd expect and less than you need it to." },
      { name: "Avoidance", note: "Closeness registers as pressure before it registers as comfort, and distance is where you regulate." },
      { name: "Deactivation", note: "You manage attachment needs by muting them rather than voicing them — a documented strategy, not just being 'low-maintenance.'" },
      { name: "Compulsive Self-Reliance", note: "Needing something from another person feels like a liability, so you minimize the asking even when help is genuinely available." },
      { name: "Trust", note: "Your baseline expectation is that a partner will actually show up when it counts — which shapes everything else in how you attach." },
    ],
    questions: [
      "I plan for a relationship ending while it is going well.",
      "After real closeness I need a stretch of distance to feel normal again.",
      "I share less than my partner wants and I've decided that's the correct amount.",
      "I don't ask for comfort; I wait to be offered it and often decline.",
      "I generally expect the people I'm close to will actually be there when it matters.",
      "I read a slow reply as a signal, even when I know it probably isn't one.",
      "I feel crowded some time before I feel loved.",
      "When someone brings me a feeling, I hand back a plan.",
      "I describe myself as low-maintenance and mean it as a warning.",
      "I can be the one who's uncertain in a relationship without assuming it's already over.",
      "I need more reassurance than I ask for out loud.",
      "I keep a private interior life running inside the relationship.",
      "Silence after a fight suits me better than repair.",
      "I have ended something early to avoid being the one ended on.",
      "I let someone see me at a low point without immediately managing their reaction to it.",
      "I look for reasons a partner might be pulling away, even without clear evidence.",
      "I've stayed physically present and completely gone.",
      "I keep a mental list of what I've given, in case it's ever disputed.",
      "Being needed is easier for me than being wanted.",
      "It doesn't take much evidence for me to believe someone's actually on my side.",
    ],
  },
  {
    id: "work",
    kicker: "Work",
    name: "Work Under Pressure",
    meta: "20 statements · 8 min",
    blurb: "Who you become on the worst week of a quarter — not in the interview.",
    archetype: "The Closer",
    priceCents: SINGLE_PRICE_CENTS,
    para: "You are excellent in the last twenty percent and unreliable in the first eighty. Deadlines don't stress you, they focus you, which is why you keep engineering emergencies and calling the result work ethic.",
    reads: [
      { label: "Where it works", body: "In the last stretch before a deadline you are worth three people, and everyone knows to put you there." },
      { label: "Where it costs you", body: "You are paid for the finish and remembered for the wreckage, and the goodwill you spend getting there doesn't restock." },
    ],
    framework: "occupational stress and workaholism research",
    dimensions: [
      { name: "Urgency Bias", note: "You don't fully mobilize until the deadline is close enough to feel — a real, studied pattern, not just bad planning." },
      { name: "Control-Seeking", note: "You take over rather than wait for a slower process to arrive at the same place, even when waiting would cost you nothing." },
      { name: "Boundary Erosion", note: "You keep extending your own limits to cover a gap, and the goodwill you spend doing it doesn't automatically refill." },
      { name: "Stress Reactivity", note: "Your tone shifts before you notice the load has increased — a documented stress-response pattern, not a character flaw, but one people around you feel." },
      { name: "Recovery Deficit", note: "You struggle to actually disengage once the work stops — a specific, measurable failure to psychologically detach, distinct from just being tired." },
    ],
    questions: [
      "My best work happens uncomfortably close to the deadline.",
      "When a group stalls, I take over rather than ask who should.",
      "I stay late rather than admit I need another pair of hands.",
      "Under pressure my tone goes sharp before I notice it has.",
      "Once something is basically done, my interest falls off a cliff.",
      "I do my sharpest thinking when there's real time pressure, not before it.",
      "I skip process the moment it feels slower than my own judgement.",
      "I've hit a date by spending goodwill I hadn't earned.",
      "I snap at small things when I'm carrying something bigger.",
      "I check on work after hours even when nothing requires it.",
      "A project with no real deadline is the one I'm most likely to neglect.",
      "I ignore instructions I've decided are wrong, without saying so.",
      "I let a problem grow because raising it early looked like fussing.",
      "People can tell how loaded I am by my tone before I've said anything.",
      "I have trouble being fully off, even on a day I've planned to rest.",
      "I've turned a calm week into an urgent one because I work better that way.",
      "I'd rather own something outright than share credit for it.",
      "I volunteer for the visibly hard thing over the useful boring one, even when I'm stretched.",
      "I've hidden the true state of something until I could fix it, to avoid the reaction.",
      "Being bored feels like a threat to me, not a break.",
    ],
  },
];

export function getTest(id: string): Test | undefined {
  return TESTS.find((t) => t.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
