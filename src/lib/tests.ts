export interface TestRead {
  label: string;
  body: string;
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
    questions: [
      "I finish things other people abandon, even after I've stopped caring about them.",
      "I decide faster than I can explain the decision, and I resent being asked to justify it.",
      "I would rather be respected by people I dislike than liked by people I don't respect.",
      "I keep a private ledger of who pulls their weight, and I never show anyone the ledger.",
      "When an argument starts to matter, I go quiet rather than escalate.",
      "Within a week of things being calm, I start looking for something at stake.",
      "I dislike being managed even when the manager is good at it.",
      "I hide how much effort something took so the result looks effortless.",
      "I trust my read of a person over anything they tell me about themselves.",
      "When I cut someone off, I don't revisit it, and I don't explain it to them.",
      "I would rather carry a task badly than hand it to someone who might.",
      "I notice within minutes who in a room has actual authority.",
      "I answer the question I think was meant rather than the one that was asked.",
      "I have kept doing something long past the point of believing in it.",
      "I measure a week by what got shipped, not by how it felt.",
      "I find praise slightly embarrassing and slightly necessary.",
      "I let people assume I'm fine because correcting them takes longer.",
      "I'd rather be the one who leaves the party first.",
      "When I fail, my first instinct is to look busy, not to look at it.",
      "There is a version of me my closest people have never met.",
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
    questions: [
      "I need something to push against before I feel fully awake.",
      "I respect a person more once I've seen them take a hit and stay standing.",
      "I'd rather act early and be wrong than wait and be right.",
      "Two days of genuine rest and I start feeling like I'm decaying.",
      "I test people quietly before I trust them, and they usually don't know it happened.",
      "My worst thoughts stay entirely with me — not from discipline, from habit.",
      "I read softness in another man as something to be corrected.",
      "When someone tells me a problem, I start solving before they've finished speaking.",
      "I want authority more than I want to be liked, and I've paid for that.",
      "I have picked a fight I did not need to win and enjoyed it anyway.",
      "I keep something in reserve in every relationship, in case I need to walk.",
      "I measure myself against specific men, by name, without telling them.",
      "Being protected by someone else makes me deeply uncomfortable.",
      "I'd take pain over humiliation without thinking about it.",
      "I have used work as a legitimate-looking place to hide.",
      "When I'm afraid, I get louder or colder, never slower.",
      "I decide what I am willing to feel, and then I feel that.",
      "I want to be told I did well by someone whose opinion I can't dismiss.",
      "I have confused being hard on people with holding a standard.",
      "There is something I would not survive being seen doing badly.",
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
    questions: [
      "I'd rather do it myself than explain it twice and watch it done badly.",
      "I know what people in a room need before they've worked it out themselves.",
      "I can't accept help without immediately planning how to repay it.",
      "I keep a quiet exit in mind in most relationships, including good ones.",
      "I feel responsible for the mood of people I didn't upset.",
      "When I'm hurt I go cool and courteous rather than say it.",
      "Being seen as needing something feels worse than not getting it.",
      "I hold standards for myself that nobody asked me to hold and nobody sees.",
      "I would leave first rather than be left.",
      "I routinely take on more than I was asked to, then resent the size of it.",
      "I am the one who remembers the dates, the details and the debts.",
      "I apologise to move things along, not because I think I was wrong.",
      "I find rest easier to justify when I've earned it visibly.",
      "I have stayed somewhere too long because leaving would have cost someone else.",
      "I can tell within a minute whether a person is safe to be honest with.",
      "I edit myself down to fit the room and call it being easy-going.",
      "My anger arrives late, in private, and out of proportion.",
      "I want to be chosen without having had to audition.",
      "I keep a version of my life that no one has the full map of.",
      "If I stopped holding it, I'm not sure who would.",
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
    questions: [
      "I know what to say to get what I want, and I can say it warmly.",
      "Guilt arrives, does very little, and leaves faster than it should.",
      "I enjoy being underestimated more than I enjoy being credited.",
      "I hold information back because holding it is worth something.",
      "Most people are easy to predict once you know what they're afraid of.",
      "I can turn warmth on deliberately and it reads as real.",
      "I keep options open longer than is fair to the people in them.",
      "I apologise when it's useful, and I know the difference.",
      "I remember slights for years with the specifics intact.",
      "I have let someone believe something untrue simply by staying quiet.",
      "I test what I can get away with in small, deniable ways.",
      "I keep a mental price on what each relationship is worth to me.",
      "I've made someone doubt their own account of an argument.",
      "I find other people's need for approval easy to use.",
      "I'd rather be feared a little than dismissed at all.",
      "I don't fully believe anyone acts without self-interest.",
      "I have punished someone slowly instead of confronting them once.",
      "I'm more honest with strangers than with people who can leave.",
      "Being caught would bother me more than having done it.",
      "There is a thing I do that I would defend publicly and not defend alone.",
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
    questions: [
      "After real closeness I need a stretch of distance to feel normal again.",
      "Reassurance conversations exhaust me even when I love the person asking.",
      "I plan for a relationship ending while it is going well.",
      "I share less than my partner wants and I've decided that's the correct amount.",
      "I feel crowded some time before I feel loved.",
      "When someone brings me a feeling, I hand back a plan.",
      "I keep a private interior life running inside the relationship.",
      "I don't ask for comfort; I wait to be offered it and often decline.",
      "I describe myself as low-maintenance and mean it as a warning.",
      "I have ended something early to avoid being the one ended on.",
      "I feel most affectionate slightly after the moment has passed.",
      "Being needed is easier for me than being wanted.",
      "I notice myself narrating the relationship to an imagined audience.",
      "I get irritated by affection that arrives without warning.",
      "I'd rather be misunderstood than have the long conversation.",
      "I keep a mental list of what I've given, in case it's ever disputed.",
      "Silence after a fight suits me better than repair.",
      "I've stayed physically present and completely gone.",
      "I assume I will eventually be too much or not enough.",
      "If they knew how little I ask for, they'd understand less, not more.",
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
    questions: [
      "My best work happens uncomfortably close to the deadline.",
      "When a group stalls, I take over rather than ask who should.",
      "I skip process the moment it feels slower than my own judgement.",
      "I'd rather own something outright than share credit for it.",
      "Under pressure my tone goes sharp before I notice it has.",
      "I ignore instructions I've decided are wrong, without saying so.",
      "I stay late rather than admit I need another pair of hands.",
      "Once something is basically done, my interest falls off a cliff.",
      "I judge colleagues almost entirely by what they produce.",
      "I have hit a date by spending goodwill I hadn't earned.",
      "I volunteer for the visibly hard thing over the useful boring one.",
      "I don't read the feedback carefully if the outcome was good.",
      "I let a problem grow because raising it early looked like fussing.",
      "I work best when someone might be disappointed in me.",
      "I keep a running estimate of whether I'm the best person here.",
      "Small talk before a hard meeting feels like a tax.",
      "I have hidden the true state of something until I could fix it.",
      "Being bored at work feels like a threat, not a break.",
      "I'd take a harder job over a calmer one at the same pay.",
      "If I stopped delivering, I don't know what I'd be worth here.",
    ],
  },
];

export const TRAIT_NOTES: Record<string, string> = {
  Dominance: "You take the wheel by default, including in rooms where nobody handed it to you.",
  Volatility: "Your temper is quiet but your patience is finite, and people can feel the meter running.",
  Detachment: "You process alone first. By the time you speak, the feeling is already filed.",
  Drive: "Output is how you regulate. Idleness reads as decline rather than rest.",
  Warmth: "You are loyal in action and stingy in words, and you expect that to be understood.",
};

export function getTest(id: string): Test | undefined {
  return TESTS.find((t) => t.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
