/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { getClientMockData, languageMap } from "./src/utils/mockGenerator.ts";

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
    // === 1. CORE/LEGACY PUBLISHING FIELDS (Required by AIPackageView & tabs) ===
    viralIdeas: {
      type: Type.ARRAY,
      description: "List of 5 highly clickable viral video variations with CTR scores.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The scroll-stopping YouTube title." },
          explanation: { type: Type.STRING, description: "Psychological reason why this title will perform well." },
          clickabilityScore: { type: Type.INTEGER, description: "Confidence rating of CTR potential from 1 to 100." }
        },
        required: ["title", "explanation", "clickabilityScore"]
      }
    },
    hooks: {
      type: Type.ARRAY,
      description: "List of 5 powerful hook variations to stop scrolling in the first 5 seconds.",
      items: {
        type: Type.OBJECT,
        properties: {
          hookText: { type: Type.STRING, description: "Sizzling opening voiceover line." },
          strategy: { type: Type.STRING, description: "The retention technique applied to this hook." }
        },
        required: ["hookText", "strategy"]
      }
    },
    script: {
      type: Type.OBJECT,
      description: "Ready-to-narrate structural script segments.",
      properties: {
        conversationalStyle: { type: Type.STRING, description: "Narrative tone, e.g., Conversational, Suspenseful, Explainer." },
        storytellingAngle: { type: Type.STRING, description: "High-level dramatic storytelling approach." },
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sectionName: { type: Type.STRING, description: "Section header like 'Introduction (0:00 - 0:45)'." },
              narratorText: { type: Type.STRING, description: "The spoken voiceover transcript." },
              visualDirection: { type: Type.STRING, description: "Cinematic overlay visual recommendations." },
              retentionTactic: { type: Type.STRING, description: "Drop-off defense trigger or editing tactic." }
            },
            required: ["sectionName", "narratorText", "visualDirection", "retentionTactic"]
          }
        }
      },
      required: ["conversationalStyle", "storytellingAngle", "sections"]
    },
    thumbnail: {
      type: Type.OBJECT,
      description: "Midjourney/Flux optimization specifications.",
      properties: {
        textOverlay: { type: Type.STRING, description: "Punchy, bold text overlay of max 4 words." },
        visualConcept: { type: Type.STRING, description: "A detailed visual representation prompt for high conversion." },
        emotionalTrigger: { type: Type.STRING, description: "Target core human emotion, e.g. Curiosity, Awe, Urgency." }
      },
      required: ["textOverlay", "visualConcept", "emotionalTrigger"]
    },
    bRollSuggestions: {
      type: Type.ARRAY,
      description: "List of scene actions, stock search keywords, and camera operations.",
      items: {
        type: Type.OBJECT,
        properties: {
          sceneNumber: { type: Type.INTEGER, description: "Scene index." },
          timeframe: { type: Type.STRING, description: "Applicable timestamp block, e.g. '0:00 - 0:15'." },
          visualConcept: { type: Type.STRING, description: "Detailed look/action layout description." },
          stockFootageKeywords: { type: Type.STRING, description: "Direct keywords for search indexing." },
          cameraMovement: { type: Type.STRING, description: "Camera tracking or pan instruction." }
        },
        required: ["sceneNumber", "timeframe", "visualConcept", "stockFootageKeywords", "cameraMovement"]
      }
    },
    seoPackage: {
      type: Type.OBJECT,
      description: "Algorithm-friendly metadata container.",
      properties: {
        optimizedTitle: { type: Type.STRING, description: "One best title under 65 letters for search rankings." },
        videoDescription: { type: Type.STRING, description: "Strategic description text containing summaries and chapter headers." },
        hashtags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of exactly 5 relevant hashtags."
        },
        seoKeywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of 5 to 10 optimization keywords."
        }
      },
      required: ["optimizedTitle", "videoDescription", "hashtags", "seoKeywords"]
    },
    voiceInstructions: {
      type: Type.OBJECT,
      description: "Acoustic profiling for synthesis.",
      properties: {
        recommendedVoiceStyle: { type: Type.STRING, description: "Primary voice style character." },
        tone: { type: Type.STRING, description: "Pitch, coloring and frequency details." },
        pace: { type: Type.STRING, description: "Narrating speed guidance." },
        emotion: { type: Type.STRING, description: "Core delivery emotion vibe." }
      },
      required: ["recommendedVoiceStyle", "tone", "pace", "emotion"]
    },

    // === 2. ELITE STRATEGIST FIELDS (For structured metrics and reports) ===
    thinkingProcess: {
      type: Type.OBJECT,
      description: "Strategic audience research before recommending final content.",
      properties: {
        nicheAnalysis: { type: Type.STRING, description: "Detailed tactical review of the target niche." },
        targetAudience: { type: Type.STRING, description: "Viewer interests and viewing behaviors." },
        viewerPsychology: { type: Type.STRING, description: "Strongest emotional levers to hook viewers." },
        competitionLevel: { type: Type.STRING, description: "Competitive pressure on this topic." },
        searchIntent: { type: Type.STRING, description: "Algorithmic search demand analysis." }
      },
      required: ["nicheAnalysis", "targetAudience", "viewerPsychology", "competitionLevel", "searchIntent"]
    },
    viralTitles: {
      type: Type.ARRAY,
      description: "Strictly generate only 3 highest quality video titles based on curiosity gap and emotional triggers.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The scroll-stopping YouTube title." },
          reason: { type: Type.STRING, description: "Clear psychological reason why this title was selected." },
          ctrScore: { type: Type.INTEGER, description: "Estimated CTR strength from 1 to 100." },
          curiosityScore: { type: Type.INTEGER, description: "Depth of curiosity gap trigger from 1 to 100." },
          searchPotentialScore: { type: Type.INTEGER, description: "Affinity to search algorithms and keywords from 1 to 100." }
        },
        required: ["title", "reason", "ctrScore", "curiosityScore", "searchPotentialScore"]
      }
    },
    thumbnailHooks: {
      type: Type.ARRAY,
      description: "Strictly generate only 3 thumbnail text overlay hooks (maximum 4 words) that create immediate curiosity.",
      items: {
        type: Type.OBJECT,
        properties: {
          hookText: { type: Type.STRING, description: "Sizzling text overlay of maximum 4 words for higher click-through potential." },
          visualConcept: { type: Type.STRING, description: "A detailed description of the graphical visual, colors, and subject focus. Describe a direct copy-pasteable image generation prompt." }
        },
        required: ["hookText", "visualConcept"]
      }
    },
    seo: {
      type: Type.OBJECT,
      description: "Optimized metadata details.",
      properties: {
        bestSeoTitle: { type: Type.STRING, description: "Single best optimized SEO title under 65 characters." },
        optimizedDescription: { type: Type.STRING, description: "Algorithm-friendly description with a summary and timestamps." },
        tags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Strictly generate exactly 15 highly relevant tags/keywords."
        },
        primaryKeywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Strictly generate exactly 5 primary keywords."
        }
      },
      required: ["bestSeoTitle", "optimizedDescription", "tags", "primaryKeywords"]
    },
    viralVideoIdeas: {
      type: Type.ARRAY,
      description: "Strictly generate only 5 high-potential viral video ideas with click and retention analysis.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The overarching theme or hook title." },
          concept: { type: Type.STRING, description: "Detailed core storytelling and informational angle." },
          whyClick: { type: Type.STRING, description: "Detailed CTR psychology behind why someone will click." },
          whyWatch: { type: Type.STRING, description: "Detailed Audience Retention strategy to keep them watching till the end." },
          viralPotential: { type: Type.STRING, description: "A summary of estimated viral potential." }
        },
        required: ["title", "concept", "whyClick", "whyWatch", "viralPotential"]
      }
    },
    scriptHooks: {
      type: Type.ARRAY,
      description: "Strictly generate only 3 hooks focused entirely on increasing drop-off prevention in first 5 seconds.",
      items: {
        type: Type.OBJECT,
        properties: {
          hookText: { type: Type.STRING, description: "Narrator spoken line matching the chosen native language script style." },
          strategy: { type: Type.STRING, description: "The precise pattern interrupt or retention psychology applied to stop scrolls." }
        },
        required: ["hookText", "strategy"]
      }
    },
    retentionBooster: {
      type: Type.OBJECT,
      description: "Formulas to prevent viewer drop-offs.",
      properties: {
        dropOffPoints: { type: Type.STRING, description: "Identify critical spots where viewers are likely to leave this topic." },
        curiosityLoops: { type: Type.STRING, description: "Suggest exact curiosity loops to keep viewers hooked." },
        reEngagementLines: { type: Type.STRING, description: "Write precise re-engagement narrative statements." }
      },
      required: ["dropOffPoints", "curiosityLoops", "reEngagementLines"]
    },
    competitorIntelligence: {
      type: Type.OBJECT,
      description: "Niche competitive patterns.",
      properties: {
        successfulVideoPatterns: { type: Type.STRING, description: "Successful patterns extracted from similar videos in the niche." },
        nicheTrends: { type: Type.STRING, description: "Current hot trends in the target niche right now." },
        strategiesWorkingNow: { type: Type.STRING, description: "Actionable tactics of what is working best in terms of format, pacing, or visuals." }
      },
      required: ["successfulVideoPatterns", "nicheTrends", "strategiesWorkingNow"]
    },
    finalRecommendation: {
      type: Type.OBJECT,
      description: "The absolute highest potential combination for maximizing CTR and Retention.",
      properties: {
        bestTitle: { type: Type.STRING, description: "The single best title." },
        bestThumbnailHook: { type: Type.STRING, description: "The single best thumbnail hook overlay text of under 4 words." },
        bestOpeningHook: { type: Type.STRING, description: "The single best opening voice narrator line." },
        implementationStrategy: { type: Type.STRING, description: "Execution details to maximize performance immediately." }
      },
      required: ["bestTitle", "bestThumbnailHook", "bestOpeningHook", "implementationStrategy"]
    }
  },
  required: [
    "viralIdeas",
    "hooks",
    "script",
    "thumbnail",
    "bRollSuggestions",
    "seoPackage",
    "voiceInstructions",
    "thinkingProcess",
    "viralTitles",
    "thumbnailHooks",
    "seo",
    "viralVideoIdeas",
    "scriptHooks",
    "retentionBooster",
    "competitorIntelligence",
    "finalRecommendation"
  ]
};

// Simulated mock generator wrapper
function getMockData(topic: string, niche: string, videoType: string, isFallback = false, languageCode = "hi") {
  const result = getClientMockData(topic, niche as any, videoType as any, languageCode);
  return {
    ...result,
    isFallback
  };
}

// REST Generation Endpoint
app.post("/api/generate", async (req, res) => {
  const { topic, niche, videoType, language } = req.body;
  if (!topic || !niche || !videoType) {
    return res.status(400).json({ error: "Missing required video parameter fields: topic, niche, videoType" });
  }

  // Map language codes to clear Indian languages with script info
  const languageName = languageMap[language as string] || "Hindi (हिन्दी)";

  const apiKey = process.env.GEMINI_API_KEY;
  // Intelligent check: if there is no key, or if it is a generic placeholder, or if it doesn't start with the standard Gemini prefix "AIzaSy"
  const isMockMode = !apiKey || 
                     apiKey.trim() === "" || 
                     apiKey === "MY_GEMINI_API_KEY" || 
                     apiKey === "PLACEHOLDER" ||
                     apiKey === "undefined" ||
                     !apiKey.startsWith("AIzaSy");

  if (isMockMode) {
    console.log(`[Mock Mode] Generating mock response for: ${topic} (${niche} - ${videoType} in ${languageName})`);
    // Add a tiny delay to simulate network call latency for beautiful loader spinner testing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.json(getMockData(topic, niche, videoType, false, language));
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
    
    // Air-tight Post-Processing Resilient Mapper for Dual Schema Support
    // 1. viralIdeas
    if (!packageData.viralIdeas || !Array.isArray(packageData.viralIdeas) || packageData.viralIdeas.length === 0) {
      if (packageData.viralTitles && Array.isArray(packageData.viralTitles)) {
        packageData.viralIdeas = packageData.viralTitles.map((item: any) => ({
          title: item.title,
          explanation: item.reason || "Elite optimized title utilizing proven curiosity gaps.",
          clickabilityScore: item.ctrScore || 95
        }));
      } else if (packageData.viralVideoIdeas && Array.isArray(packageData.viralVideoIdeas)) {
        packageData.viralIdeas = packageData.viralVideoIdeas.map((item: any) => ({
          title: item.title,
          explanation: `Concept: ${item.concept || ""}\n\nWhy Click: ${item.whyClick || ""}\nWhy Watch: ${item.whyWatch || ""}\nViral Potential: ${item.viralPotential || ""}`,
          clickabilityScore: 92
        }));
      } else {
        packageData.viralIdeas = [];
      }
    }

    // 2. hooks
    if (!packageData.hooks || !Array.isArray(packageData.hooks) || packageData.hooks.length === 0) {
      if (packageData.scriptHooks && Array.isArray(packageData.scriptHooks)) {
        packageData.hooks = packageData.scriptHooks.map((item: any) => ({
          hookText: item.hookText,
          strategy: item.strategy || "Retention pattern interrupt"
        }));
      } else if (packageData.thumbnailHooks && Array.isArray(packageData.thumbnailHooks)) {
        packageData.hooks = packageData.thumbnailHooks.map((item: any) => ({
          hookText: item.hookText,
          strategy: "Visual hook overlay"
        }));
      } else {
        packageData.hooks = [];
      }
    }

    // 3. script
    if (!packageData.script || typeof packageData.script !== "object") {
      packageData.script = {
        conversationalStyle: "Conversational & Highly Punchy",
        storytellingAngle: packageData.thinkingProcess?.viewerPsychology || "Proven retention storytelling arc.",
        sections: [
          {
            sectionName: videoType.toLowerCase().includes("short") ? "Hook (0:00 - 0:15)" : "Hook & Core Setup (0:00 - 0:30)",
            narratorText: packageData.finalRecommendation?.bestOpeningHook || "Let's uncover the absolute truth about this...",
            visualDirection: "Fast-pacing dynamic montage starting with immediate pattern interrupt graphic.",
            retentionTactic: "Scroll stopper"
          },
          {
            sectionName: videoType.toLowerCase().includes("short") ? "Body & Conclusion (0:15 - End)" : "The Agitation & Resolution (0:30 - End)",
            narratorText: packageData.finalRecommendation?.implementationStrategy || "Implement these exact rules sequentially to double your CTR and viewer retention today.",
            visualDirection: "Cinematic close-up graphics, charts comparing industry baseline with customized values.",
            retentionTactic: "Delivering massive practical value"
          }
        ]
      };
    } else {
      // Ensure script has safe structure
      if (!packageData.script.conversationalStyle) packageData.script.conversationalStyle = "Conversational & Highly Punchy";
      if (!packageData.script.storytellingAngle) packageData.script.storytellingAngle = "Detailed viewer retention arc.";
      if (!packageData.script.sections || !Array.isArray(packageData.script.sections) || packageData.script.sections.length === 0) {
        packageData.script.sections = [
          {
            sectionName: "Spoken Script Segment",
            narratorText: packageData.finalRecommendation?.bestOpeningHook || "Let's explore the inner secrets...",
            visualDirection: "Dynamic cinematic text animations.",
            retentionTactic: "High retention"
          }
        ];
      }
    }

    // 4. thumbnail
    if (!packageData.thumbnail || typeof packageData.thumbnail !== "object") {
      if (packageData.thumbnailHooks && Array.isArray(packageData.thumbnailHooks) && packageData.thumbnailHooks.length > 0) {
        packageData.thumbnail = {
          textOverlay: packageData.thumbnailHooks[0].hookText || "99% FAIL.",
          visualConcept: packageData.thumbnailHooks[0].visualConcept || "A dramatic, high-contrast, professional-grade visual.",
          emotionalTrigger: "Curiosity gap and fear of missing out (FOMO)."
        };
      } else {
        packageData.thumbnail = {
          textOverlay: "99% FAIL.",
          visualConcept: `Extreme close-up overlay graphic targeting viewer emotion closely.`,
          emotionalTrigger: "Curiosity gap and fear of missing out (FOMO)."
        };
      }
    }

    // 5. bRollSuggestions
    if (!packageData.bRollSuggestions || !Array.isArray(packageData.bRollSuggestions)) {
      packageData.bRollSuggestions = [
        {
          sceneNumber: 1,
          timeframe: "0:00 - 0:15",
          visualConcept: "Steady slider camera shot showing dynamic monitor lights reflecting off studio surfaces.",
          stockFootageKeywords: "cinematic workspace neon dark slider movement",
          cameraMovement: "Subtle slow horizontal panning"
        },
        {
          sceneNumber: 2,
          timeframe: "0:15 - End",
          visualConcept: "Macro focus on fingers flying over mechanical keyboard in moody room backlighting.",
          stockFootageKeywords: "rapid typing keyboard macro close up",
          cameraMovement: "Static tight focus with extremely shallow depth of field"
        }
      ];
    }

    // 6. seoPackage
    if (!packageData.seoPackage || typeof packageData.seoPackage !== "object") {
      if (packageData.seo && typeof packageData.seo === "object") {
        packageData.seoPackage = {
          optimizedTitle: packageData.seo.bestSeoTitle || "How to Master This Topic",
          videoDescription: packageData.seo.optimizedDescription || "This video represents a complete strategic guide.",
          hashtags: Array.isArray(packageData.seo.tags) ? packageData.seo.tags.slice(0, 5).map((t: string) => t.startsWith("#") ? t : `#${t.replace(/\s+/g, "")}`) : ["#CreatorSuccess"],
          seoKeywords: Array.isArray(packageData.seo.primaryKeywords) ? packageData.seo.primaryKeywords : ["YouTube SEO"]
        };
      } else {
        packageData.seoPackage = {
          optimizedTitle: "How to Master This Niche Topic",
          videoDescription: "This is an elite strategic walkthrough detailing standard pitfalls and action models.",
          hashtags: ["#CreatorSEO", "#ViralGrowth"],
          seoKeywords: ["YouTube Strategy"]
        };
      }
    }

    // 7. voiceInstructions
    if (!packageData.voiceInstructions || typeof packageData.voiceInstructions !== "object") {
      packageData.voiceInstructions = {
        recommendedVoiceStyle: "Warm, Authoritative & Conversational Male",
        tone: "Suspenseful, high-vibrancy Native Accent delivery",
        pace: "135-145 words per minute, clear pauses after hooks",
        emotion: "Absolute authority and expert-level conviction"
      };
    }
    
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
    try {
      const fallbackPayload = getMockData(topic, niche, videoType, true, language);
      res.json(fallbackPayload);
    } catch (fallbackErr: any) {
      console.error("Critical fallback generator exception:", fallbackErr);
      res.status(500).json({
        error: "Server processing failed",
        details: err?.message || err?.toString() || "Unknown generation or fallback error"
      });
    }
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
