import { YouTubePublishingPackage, VideoType, NicheType } from "../types";

const languageMap: Record<string, string> = {
  "hi": "Hindi (हिन्दी)",
  "en-IN": "English (Hinglish/Indian Accent Style)",
  "mr": "Marathi (मराठी)",
  "gu": "Gujarati (गुजराती)",
  "ben": "Bengali (বাংলা)",
  "ta": "Tamil (தமிழ்)",
  "te": "Telugu (తెలుగు)",
  "kn": "Kannada (ಕನ್ನಡ)",
  "ml": "Malayalam (മലയാളം)",
  "pa": "Punjabi (ਪੰਜਾਬੀ)",
  "ur": "Urdu (اردو)",
  "or": "Odia (ଓଡ଼ିଆ)",
  "as": "Assamese (অসমीया)"
};

export function getClientMockData(
  topic: string,
  niche: NicheType,
  videoType: VideoType,
  languageCode: string
): YouTubePublishingPackage {
  const languageName = languageMap[languageCode] || "Hindi (हिन्दी)";

  const titleFormulas = [
    `The Shocking Truth About ${topic} (That No Creator Tells You)`,
    `Why 99% of People Fail With ${topic} Instantly`,
    `I Tried ${topic} for 30 Days. Here's What Happened...`,
    `The $10,000 ${topic} Secret Hidden in Plain Sight`,
    `Only 1% of Creators Know This ${topic} Hack`,
    `Stop Doing ${topic} the Old Way (Do This Instead)`,
    `The Dark Side of ${topic} We Need to Talk About`,
    `Is ${topic} Actually a Huge Lie?`,
    `How to Master ${topic} as a Beginner in 2026`,
    `Steal My 3-Step ${topic} Formula for Quick Results`,
    `The Lazy Creator's Guide to ${topic} Mastery`,
    `Before You Start ${topic}... Watch This Video!`,
    `What the Experts Won't Tell You About ${topic}`,
    `The Simple ${topic} Plan That Never Fails`,
    `How One Small Shift in ${topic} Quadrupled My Views`,
    `Is ${topic} Dead in 2026?`,
    `Top 5 ${topic} Mistakes You Are Still Making`,
    `This Crazy ${topic} Trick is Breaking the Algorithm`,
    `The Ultimate ${topic} Blueprint (Zero to Hero)`,
    `Why I Regret Not Learning ${topic} Sooner`
  ];

  const genericExplanations = [
    `Confrontational hook that leverages negativity and FOMO. Drives click-through rate by targeting systemic insecurities in the ${niche} space.`,
    `Introduces high urgency and leverages the 'us-vs-them' dynamic. Perfect for capturing high retention in ${niche}.`,
    `Case study format which builds prompt credibility and instant authority. Highly effective for deep viewer investment.`,
    `Capitalizes on financial/status ambition triggers. Prompts clicks by offering a tangible, high-value result.`,
    `Exclusivity trigger. Makes the viewer feel like they are accessing an elite circle of ${niche} secrets.`,
    `Pattern interrupt that challenges traditional wisdom. Forces viewers to re-evaluate their current setups.`,
    `Curiosity-gap title raising stakes around an otherwise uncontroversial topic. Triggers immediate interest.`,
    `Provocative skepticism archetype. Destabilizes standard beliefs to invite the click.`,
    `Low-barrier-to-entry framing that appeals to new subscribers eager for structured fast learning.`,
    `Actionable blueprint framing. Guarantees value delivery and drives premium subscriber retention.`,
    `High appeal to human efficiency. Offers a shortcut which lowers cognitive friction for the final viewer.`,
    `High-stakes warning trigger. Activates protective loss-aversion behaviors in the viewer.`,
    `Undermines authoritative competition, making the creator look like an ultimate truth-teller.`,
    `Simplicity framing that contrasts with the exhausting complexity found in typical tutorials.`,
    `Before-and-after narrative structure. Validates dramatic growth potential using social-proof levers.`,
    `Urgent zeitgeist hook. Provokes active discussion and high comment density arguing about relevancy.`,
    `Self-diagnostic framing. Compels viewers to check if they are committing costly hidden blunders.`,
    `Novelty pattern-interrupt. Signals a hidden breach in standard rules to capture hyper-frequent clicks.`,
    `Sleek, comprehensive compilation framing that promises to be the single source of truth.`,
    `Compelling hindsight narrative which triggers regret or relief psychology in the user's audience.`
  ];

  const hookTemplates = [
    `99% of people fail with ${topic} because of this one single lie...`,
    `If you are still doing ${topic} the traditional way, stop immediately...`,
    `This simple ${topic} strategy took me from zero to millions of views...`,
    `The absolute dark side of ${topic} is something no one wants to say out loud...`,
    `Here is the exact blueprint for mastering ${topic} without spending a single dollar...`,
    `I spent three years testing ${topic}, and the results were unexpected...`,
    `Most people think ${topic} is hard, but it actually takes less than 5 minutes...`,
    `If you ignore this one ${topic} rule, your channel's growth will freeze...`,
    `What if I told you everything you knew about ${topic} was completely wrong?`,
    `The elite 1% of ${niche} creators are hiding this one trick from you...`
  ];

  const hookStrategies = [
    "Loss Aversion & Negative Framing",
    "Pattern Interrupt & Immediate Warning",
    "Social Proof & Metric Leverage",
    "Mystery & Dark Curiosity Loop",
    "High-Value Resource Framing",
    "Experience Leverage & Curiosity",
    "Cognitive Ease & Simplicity Contrast",
    "Fear of Consequences & Loss Aversion",
    "Cognitive Dissonance & Intrigue",
    "Insider Secrecy & Us-vs-Them Loop"
  ];

  // Let's randomized the indexes slightly to give variation
  const shuffledIdeas = [...titleFormulas].sort(() => 0.5 - Math.random());
  const shuffledHooks = [...hookTemplates].sort(() => 0.5 - Math.random());

  return {
    topic,
    niche,
    videoType,
    generatedAt: new Date().toISOString(),
    isFallback: true, // Tagged so app knows it resolved gracefully
    language: languageName,
    viralIdeas: shuffledIdeas.slice(0, 5).map((title, idx) => ({
      title,
      explanation: genericExplanations[idx] || `Specifically optimized for ${niche} viewers looking to expand their expertise on ${topic}.`,
      clickabilityScore: 99 - idx - Math.floor(Math.random() * 3)
    })),
    hooks: shuffledHooks.slice(0, 5).map((hookText, idx) => ({
      hookText,
      strategy: hookStrategies[idx] || "Curiosity Loop"
    })),
    script: {
      conversationalStyle: "Direct, visual, conversational storytelling style, filled with punchy statements and dramatic rhetorical pauses.",
      storytellingAngle: `The classic 'David vs Goliath' struggle where the secrets of ${topic} are finally unveiled for the average viewer.`,
      sections: [
        {
          sectionName: videoType === VideoType.SHORTS ? "Hook (0:00 - 0:10)" : "Hook & Core Setup (0:00 - 0:30)",
          narratorText: `You've been lied to about ${topic}. Most experts make it sound incredibly complicated, but today, we are stripping back the layers of deceit.`,
          visualDirection: "Fast-paced cinematic montage with glitch overlay text, ending on a high contrast close-up graphic.",
          retentionTactic: "Instant scroll stopper addressing viewers directly."
        },
        {
          sectionName: videoType === VideoType.SHORTS ? "The Twist (0:10 - 0:30)" : "The Agitation & Shock Truth (0:30 - 2:00)",
          narratorText: `Here is what actually happens: we are conditioned to believe that this is reserved for a select elite. But if you look at the statistics, the real culprit is a lack of focus.`,
          visualDirection: "Zoomed charts showing historical graphs with neon red trend lines. Stock clips of people looking confused.",
          retentionTactic: "Stakes elevation. Agitates the viewer's current pain point."
        },
        {
          sectionName: videoType === VideoType.SHORTS ? "The Solution (0:30 - 0:50)" : "Step-by-Step Resolution Pattern (2:00 - 4:15)",
          narratorText: `But it doesn't have to be this way. By implementing three basic shifts tomorrow morning, you instantly jump ahead of 90% of the competition on YouTube.`,
          visualDirection: "Clean 3D list icons sliding onto the screen with crisp audio sound effects. Upbeat background music transitions in.",
          retentionTactic: "Delivering practical high value sequentially so they do not click away."
        },
        {
          sectionName: videoType === VideoType.SHORTS ? "Outro & Loop (0:50 - 1:00)" : "The Algorithmic Call to Action (4:15 - End)",
          narratorText: `If this opened your eyes, hit that subscribe button. We reveal YouTube creator cheats every week. Leave a comment below with your thoughts!`,
          visualDirection: "Dynamic subscribe hover card graphic, on-screen text arrow pointing to the actual follow buttons.",
          retentionTactic: "Micro-commitment conversion loop without sounding desperate."
        }
      ]
    },
    thumbnail: {
      textOverlay: "DO NOT SKIP!",
      visualConcept: `CRITICAL HIGH-CTR COMPOSITION: A split screen with extreme visual contrast (>20:1 ratio). On the left side: A highly detailed, hyper-saturated mockup demonstrating the wrong, failing methodology for "${topic}" with a giant, glowing red 'X' graphic overlay. On the right side: A deep, dark cobalt blue gradient presenting a mysterious black-sieve silhouette of the creator looking forward with a stunning neon yellow glowing question mark centered over their chest. Use cinematic volumetric fog, sharp rim-lighting to define edges, and clean, high-clarity assets optimized for mobile feeds. The text overlay is layered in a bold, slanted impact font with thick hand-drawn black outlines, slanted at -5 degrees.`,
      emotionalTrigger: "Sincere curiosity, intense pattern interruption, and fear of missing out (FOMO)."
    },
    bRollSuggestions: [
      {
        sceneNumber: 1,
        timeframe: videoType === VideoType.SHORTS ? "0:00 - 0:15" : "0:00 - 1:00",
        visualConcept: "A dark studio with backlighting, camera slowly sliding horizontally across neon screens.",
        stockFootageKeywords: "cinematic workspace neon dark slider movement",
        cameraMovement: "Subtle slow horizontal dolly slider track"
      },
      {
        sceneNumber: 2,
        timeframe: videoType === VideoType.SHORTS ? "0:15 - 0:40" : "1:00 - 3:30",
        visualConcept: "Upclose focus of fingers typing rapidly on high-end computer terminal keys in low light.",
        stockFootageKeywords: "rapid coding keyboard dark room programmer macro",
        cameraMovement: "Tight macro zoom with very low depth of field"
      },
      {
        sceneNumber: 3,
        timeframe: videoType === VideoType.SHORTS ? "0:40 - End" : "3:30 - End",
        visualConcept: "Successful looking creator smiling subtly at the camera in a modern sleek studio setup.",
        stockFootageKeywords: "cheerful youth host podcast studio dynamic lighting",
        cameraMovement: "Steady tripod focus with minimal slow push-in"
      }
    ],
    seoPackage: {
      optimizedTitle: `The Hidden ${topic} Secrets (What Creators Keep Hidden)`,
      videoDescription: `Discover the absolute shocking truth about ${topic} in this breakdown. We cover how faceless channels and expert creators leverage this psychology, detailed layout strategies, and our step-by-step resolution.\n\nTimestamps:\n0:00 - Introduction\n0:15 - The Core Trap\n1:15 - The Secret Shift\n2:30 - Ultimate Action Call\n\nHope this publishing kit accelerates your channel growth!`,
      hashtags: ["#YouTubeSecrets", `#${topic.replace(/\s+/g, "")}`, "#FacelessChannel", `#${niche.toLowerCase()}`, "#CreatorAcademy"],
      seoKeywords: [`how to start a ${topic} channel`, `${niche} tube growth hacks`, `faceless ${topic} ideas`, "video script storyteller formula", "high retention youtube shorts"]
    },
    voiceInstructions: {
      recommendedVoiceStyle: `Premium ${niche} Specialist (Optimized for native Indian ${languageName} accent voice synthesis)`,
      tone: `Gravelly, suspenseful, high-conviction delivery in custom native ${languageName}`,
      pace: "135-145 words per minute, incorporating 1.5-second dramatic pauses after rhetorical hooks",
      emotion: "Intense understated urgency, total confidence, and authentic local authority"
    }
  };
}
