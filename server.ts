/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialization of GoogleGenAI as recommended to avoid start crashes 
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("⚠️ Warning: GEMINI_API_KEY is not defined or is placeholder. Using simulated mock responses for local testing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

app.use(express.json());

// JSON response schema matching types.ts perfectly
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    viralIdeas: {
      type: Type.ARRAY,
      description: "Strictly provide exactly 5 highly clickable YouTube video ideas related to the topic. Do not provide more or fewer than 5.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Highly clickable, curiosity-driven YouTube title." },
          explanation: { type: Type.STRING, description: "Detailed strategy on why this idea will perform well." },
          clickabilityScore: { type: Type.INTEGER, description: "Estimated clickability score from 1 to 100 based on psychological triggers." }
        },
        required: ["title", "explanation", "clickabilityScore"]
      }
    },
    hooks: {
      type: Type.ARRAY,
      description: "Strictly provide 10 incredible retention hooks designed to stop scrolls instantly.",
      items: {
        type: Type.OBJECT,
        properties: {
          hookText: { type: Type.STRING, description: "The exact line the narrator speaks in the first 1-5 seconds of the video." },
          strategy: { type: Type.STRING, description: "The psychological trigger used, e.g. Open Loop, Shocking Fact, Negativity Bias." }
        },
        required: ["hookText", "strategy"]
      }
    },
    script: {
      type: Type.OBJECT,
      description: "A complete script formatted for maximum retention.",
      properties: {
        conversationalStyle: { type: Type.STRING, description: "Brief description of the spoken style recommended (e.g. fast-paced, highly conversational, storytelling-focused)." },
        storytellingAngle: { type: Type.STRING, description: "The human-interest angle or narrative arc used." },
        sections: {
          type: Type.ARRAY,
          description: "Chronological sections of the scripts. Under 60s for Shorts, longer segmentations for long-form.",
          items: {
            type: Type.OBJECT,
            properties: {
              sectionName: { type: Type.STRING, description: "Header like 'Introduction (0:00-0:15)', 'Body Part 1: The Trap', etc." },
              narratorText: { type: Type.STRING, description: "The exact words spoken. Avoid formal jargon, keep sentences punchy and conversational." },
              visualDirection: { type: Type.STRING, description: "Visual guide, graphic overlay overlays, or motion style cues." },
              retentionTactic: { type: Type.STRING, description: "Psychological reason why this section is structured this way." }
            },
            required: ["sectionName", "narratorText", "visualDirection", "retentionTactic"]
          }
        }
      },
      required: ["conversationalStyle", "storytellingAngle", "sections"]
    },
    thumbnail: {
      type: Type.OBJECT,
      description: "The visual design guide for an clickable thumbnail pack.",
      properties: {
        textOverlay: { type: Type.STRING, description: "Ultra-clickable 2-5 words text overlay. Never use the full title." },
        visualConcept: { type: Type.STRING, description: "A detailed description of the graphical visual, colors, and subject focus. Must describe split-screen configurations, dark cinematic gradients, glowing neon focal points, sharp rim lighting, and a visual trigger optimized to grab viewers' attention instantly in crowded feeds." },
        emotionalTrigger: { type: Type.STRING, description: "The exact core human emotion target, such as curiosity, outrage, greed, or relief." }
      },
      required: ["textOverlay", "visualConcept", "emotionalTrigger"]
    },
    bRollSuggestions: {
      type: Type.ARRAY,
      description: "Scene-by-scene B-Roll matching script timeline.",
      items: {
        type: Type.OBJECT,
        properties: {
          sceneNumber: { type: Type.INTEGER },
          timeframe: { type: Type.STRING, description: "Approximate time or part marker in the script." },
          visualConcept: { type: Type.STRING, description: "What visual to show on screen (be very specific, for stock libraries)." },
          stockFootageKeywords: { type: Type.STRING, description: "Search query tags for stock databases (e.g., 'stressed analyst charts dark office')." },
          cameraMovement: { type: Type.STRING, description: "Recommended motion: Slow push forward, subtle pan right, or snap zoom." }
        },
        required: ["sceneNumber", "timeframe", "visualConcept", "stockFootageKeywords", "cameraMovement"]
      }
    },
    seoPackage: {
      type: Type.OBJECT,
      description: "The complete search and recommendation metadata set.",
      properties: {
        optimizedTitle: { type: Type.STRING, description: "Click-optimized title under 65 characters." },
        videoDescription: { type: Type.STRING, description: "Algorithm-friendly description with timestamps, contextual summary, and call-to-actions." },
        hashtags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Up to 5 highly relevant publishing hashtags."
        },
        seoKeywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "High-volume, low-competition tags and terms."
        }
      },
      required: ["optimizedTitle", "videoDescription", "hashtags", "seoKeywords"]
    },
    voiceInstructions: {
      type: Type.OBJECT,
      description: "Guide for configuring professional voice synthesizers.",
      properties: {
        recommendedVoiceStyle: { type: Type.STRING, description: "The ultimate recommended voice profile (e.g. premium ElevenLabs voice recommendations or custom vocal personas)." },
        tone: { type: Type.STRING, description: "Specific premium voice tone directives." },
        pace: { type: Type.STRING, description: "Precise reading speed, including strategic dramatic pause intervals." },
        emotion: { type: Type.STRING, description: "Unified high-retention core emotion to guide synthesis." }
      },
      required: ["recommendedVoiceStyle", "tone", "pace", "emotion"]
    }
  },
  required: ["viralIdeas", "hooks", "script", "thumbnail", "bRollSuggestions", "seoPackage", "voiceInstructions"]
}// Simulated mock generator for testing without an API key or when API fails
function getMockData(topic: string, niche: string, videoType: string, isFallback = false, languageName = "Hindi") {
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

  return {
    topic,
    niche,
    videoType,
    generatedAt: new Date().toISOString(),
    isFallback,
    viralIdeas: titleFormulas.slice(0, 5).map((title, idx) => ({
      title,
      explanation: genericExplanations[idx] || `Specifically optimized for ${niche} viewers looking to expand their expertise on ${topic}.`,
      clickabilityScore: 99 - idx - Math.floor(Math.random() * 3)
    })),
    hooks: hookTemplates.map((hookText, idx) => ({
      hookText,
      strategy: hookStrategies[idx] || "Curiosity Loop"
    })),
    script: {
      conversationalStyle: "Direct, visual, conversational storytelling style, filled with punchy statements and dramatic rhetorical pauses.",
      storytellingAngle: `The classic 'david vs goliath' struggle where the secrets of ${topic} are finally unveiled for the average viewer.`,
      sections: [
        {
          sectionName: "Hook (0:00 - 0:15)",
          narratorText: `You've been lied to about ${topic}. Most experts make it sound incredibly complicated, but today, we are stripping back the layers of deceit.`,
          visualDirection: "Fast-paced cinematic montage with glitch overlay text, ending on a high contrast close-up graphic.",
          retentionTactic: "Instant scroll stopper addressing viewers directly."
        },
        {
          sectionName: "The Problem (0:15 - 1:15)",
          narratorText: `Here is what actually happens: we are conditioned to believe that this is reserved for a select elite. But if you look at the statistics, the real culprit is a lack of focus.`,
          visualDirection: "Zoomed charts showing historical graphs with neon red trend lines. Stock clips of people looking confused.",
          retentionTactic: "Stakes elevation. Agitates the viewer's current pain point."
        },
        {
          sectionName: "The Resolution & Action (1:15 - 2:30)",
          narratorText: `But it doesn't have to be this way. By implementing three basic shifts tomorrow morning, you instantly jump ahead of 90% of the competition on YouTube.`,
          visualDirection: "Clean 3D list icons sliding onto the screen with crisp audio sound effects. Upbeat background music transitions in.",
          retentionTactic: "Delivering practical high value value sequentially so they do not click away."
        },
        {
          sectionName: "Outro & Call To Action (2:30 - End)",
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
        timeframe: "0:00 - 0:15",
        visualConcept: "A dark studio with backlighting, camera slowly sliding horizontally across neon screens.",
        stockFootageKeywords: "cinematic workspace neon dark slider movement",
        cameraMovement: "Subtle slow horizontal dolly slider track"
      },
      {
        sceneNumber: 2,
        timeframe: "0:15 - 1:15",
        visualConcept: "Upclose focus of fingers typing rapidly on high-end computer terminal keys in low light.",
        stockFootageKeywords: "rapid coding keyboard dark room programmer macro",
        cameraMovement: "Tight macro zoom with very low depth of field"
      },
      {
        sceneNumber: 3,
        timeframe: "1:15 - End",
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

// REST Generation Endpoint
app.post("/api/generate", async (req, res) => {
  const { topic, niche, videoType, language } = req.body;
  if (!topic || !niche || !videoType) {
    return res.status(400).json({ error: "Missing required video parameter fields: topic, niche, videoType" });
  }

  // Map language codes to clear Indian languages with script info
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
    "as": "Assamese (অসমীয়া)"
  };
  const languageName = languageMap[language as string] || "Hindi (हिन्दी)";

  const apiKey = process.env.GEMINI_API_KEY;
  const isMockMode = !apiKey || apiKey === "MY_GEMINI_API_KEY";

  if (isMockMode) {
    console.log(`[Mock Mode] Generating mock response for: ${topic} (${niche} - ${videoType} in ${languageName})`);
    // Add a tiny delay to simulate network call latency for beautiful loader spinner testing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.json({
      language: languageName,
      ...getMockData(topic, niche, videoType, false, languageName)
    });
  }

  try {
    const ai = getAiClient();
    
    const systemPrompt = `You are an elite, multi-million subscriber YouTube strategist, viral content scriptwriter, and video production expert. Your job is to transform any video topic into a complete high-retention publishing package tailored for different niches.
Niche selected: ${niche}
Video format: ${videoType} (YouTube Shorts are usually under 60 seconds with hyperfast pacing and maximum 2 script sections; Long-form videos are usually 5-15 minutes with 4-5 structural script sections).

CRITICAL LANGUAGE REQUIREMENT:
You MUST compile and deliver all user-facing content (such as: title ideas inside "viralIdeas", the scroll-stopping hook sentences in "hooks", the narrated spoken text inside "script.sections", and details inside the "seoPackage" including "optimizedTitle" and "videoDescription") directly in the chosen Indian language: ${languageName}.
Ensure you use the traditional native script format of this language for optimal presentation (e.g. write in Devanagari for Hindi, Gujarati script for Gujarati, Gurmukhi for Punjabi, Urdu script for Urdu, Tamil for Tamil, etc.). If the choice is Hinglish or Indian English, present naturally spoken words using the Latin alphabet (Hinglish style conversation).

CRITICAL QUALITY DIRECTIVES (NO AI SLOP, NO TEMPLATES, DO NOT BE LAZY):
1. USE PROFOUND DOMAIN INTELLIGENCE: Do not write surface-level descriptions or generic advice. If the selected niche is Finance, include specific assets, strategies, or realistic concepts. If Technology, write about actual technical mechanisms, real APIs, AI architectures, or developer pain points. If Motivation, use high-fidelity historical scenarios or profound psychological mechanics.
2. NO ROBOTIC AI CLICHÉS: Absolutely forbid standard AI intro loops like "In this video, we're going to dive deep...", "Welcome back guys...", "embark on a journey", "uncover the truth", "delve into", "crucial", or "tap into". Write exactly how an organic, top-tier human creator (e.g., Ali Abdaal, MrBeast, Veritasium, Jake Tran) scriptwriter actually talks—conversational, punchy, sometimes cynical, highly relatable, and starting immediately with the hook without saying hello or introducing the channel name.
3. WORKABLE & READABLE SCRIPTS: The script sections MUST display full, ready-to-narrate, natural spoken prose with practical advice, specific examples, real storytelling logic, and concrete hooks.
4. MIDJOURNEY/FLUX OPTIMIZED THUMBNAIL PROMPTS: The "visualConcept" inside "thumbnail" must be a direct, highly descriptive, copy-pasteable image generation prompt. It must describe a complete cinematic, high-contrast, high-CTR scene detailing specific lighting (e.g., volumetric fog, harsh rim-light, chiaroscuro), lens characteristics, subject's facial expressions, precise colors (e.g., warm gold/neon teal contrast on modern matte space-gray background), and key visual focal points, while completely omitting any "b-roll" or storyboard references. Ensure it is purely about the main thumbnail visual.
5. NO OUT-OF-CHARACTER OUTLINE FORMALISM: All outputs must be 100% creator-ready, professional-grade, and logically dense. Give actionable advice that has deep substance.`;

    const userPrompt = `Topic: "${topic}"
Format: ${videoType}
Niche: ${niche}`;

    // Define multi-model fallback path and retry mechanism
    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    const maxRetriesPerModel = 2;
    let outputText = "";
    let lastError: any = null;

    for (const model of modelsToTry) {
      for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
        try {
          console.log(`[Gemini API] Requesting content via model ${model} (Attempt ${attempt}/${maxRetriesPerModel})...`);
          const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: "application/json",
              responseSchema: responseSchema,
              temperature: 0.82
            }
          });

          if (response && response.text) {
            outputText = response.text;
            console.log(`[Gemini API] Success using model ${model}`);
            break; // Exit the attempt loop
          }
          throw new Error(`Empty response text received from model ${model}`);
        } catch (err: any) {
          lastError = err;
          const statusVal = err?.status || err?.code || "UNAVAILABLE";
          console.log(`[Gemini API Info] Model ${model} busy with status ${statusVal}. Relying on fallback mechanism (attempt ${attempt}/${maxRetriesPerModel}).`);
          
          if (attempt < maxRetriesPerModel) {
            const waitMs = attempt * 1200;
            console.log(`[Gemini API] Retrying model ${model} in ${waitMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitMs));
          }
        }
      }
      
      if (outputText) {
        break; // Exit the model loop
      }
    }

    if (!outputText) {
      throw lastError || new Error("All Gemini generation attempts and fallback models failed.");
    }

    const packageData = JSON.parse(outputText);
    
    // Inject original prompt details to return the fully typed model
    res.json({
      topic,
      niche,
      videoType,
      language: languageName,
      generatedAt: new Date().toISOString(),
      ...packageData
    });
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    // Graceful automatic fallback instead of returning 500 error!
    // The user experiences a beautiful, seamless layout instead of a broken error view.
    console.log(`[Emergency Fallback] Activating custom fallback generator for topic "${topic}"`);
    res.json({
      language: languageName,
      ...getMockData(topic, niche, videoType, true, languageName)
    });
  }
});

// Setup Vite & static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting development server with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production server. Serving static files from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 CreatorAI Server running on http://localhost:${PORT}`);
  });
}

startServer();
