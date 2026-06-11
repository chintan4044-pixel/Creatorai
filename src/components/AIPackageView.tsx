/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Copy, 
  Check, 
  Download, 
  Bookmark, 
  Sparkles, 
  Tv, 
  ListOrdered, 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  Search, 
  Mic, 
  ChevronRight, 
  ExternalLink,
  Save,
  CheckCircle2,
  ListRestart,
  Info,
  Play,
  Square,
  Volume2,
  ArrowRight
} from "lucide-react";
import { YouTubePublishingPackage } from "../types";
import YouTubeFeedPreview from "./YouTubeFeedPreview";
import ViralPotentialScore from "./ViralPotentialScore";
import SocialSharePreview from "./SocialSharePreview";

interface AIPackageViewProps {
  packageData: YouTubePublishingPackage;
  onSaveToLibrary: () => void;
  isSaved: boolean;
}

type TabType = "ideas" | "script" | "thumbnail" | "seo" | "voice";

export default function AIPackageView({ 
  packageData, 
  onSaveToLibrary, 
  isSaved 
}: AIPackageViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ideas");
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [selectedFeedTitle, setSelectedFeedTitle] = useState<string | null>(null);
  const [isFeedPreviewOpen, setIsFeedPreviewOpen] = useState(false);

  // States for Built-in Speech Synthesis (Free Alternative)
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [voicesList, setVoicesList] = useState<SpeechSynthesisVoice[]>([]);
  const [playingSegment, setPlayingSegment] = useState<string | null>(null); // 'all' or section index

  // Load browser voices
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        // Gather standard english/local voices
        setVoicesList(allVoices);
        const defaultVoice = allVoices.find(v => v.lang.startsWith("en-") || v.lang.startsWith("hi-") || v.lang.includes("en")) || allVoices[0] || null;
        setSelectedVoice(defaultVoice);
      };
      
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
    // Stop speaking on unmount
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayScript = (text: string, segmentKey: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Text-to-Speech is not fully supported in this browser environment. Try opening in a New Tab!");
      return;
    }

    if (isPlaying && playingSegment === segmentKey) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setPlayingSegment(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Remove video directions, brackets and metadata for clean pronunciation
    const cleanText = text.replace(/\[.*?\]/g, "").replace(/\(.*?\)/g, "").replace(/scene:\s*/gi, "").trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    utterance.onend = () => {
      setIsPlaying(false);
      setPlayingSegment(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setPlayingSegment(null);
    };

    setIsPlaying(true);
    setPlayingSegment(segmentKey);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopScript = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setPlayingSegment(null);
  };

  // Stop speaking when user changes tabs
  React.useEffect(() => {
    handleStopScript();
  }, [activeTab]);

  // Helper function to handle individual text copies with simple feedback
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // Build a summary text file download matching YouTube scripts
  const downloadScriptFile = () => {
    let content = `===========================================
 creatorAI: ${packageData.topic.toUpperCase()}
 niche: ${packageData.niche} | format: ${packageData.videoType}
 generated: ${new Date(packageData.generatedAt).toLocaleDateString()}
 ===========================================\n\n`;

    content += `[A] SEO PACK\n`;
    content += `Title Suggestion: ${packageData.seoPackage.optimizedTitle}\n\n`;
    content += `Description:\n${packageData.seoPackage.videoDescription}\n\n`;
    content += `Hashtags: ${packageData.seoPackage.hashtags.join(" ")}\n`;
    content += `Keywords: ${packageData.seoPackage.seoKeywords.join(", ")}\n\n`;

    content += `[B] VOICE INSTUCTIONS\n`;
    content += `Style: ${packageData.voiceInstructions.recommendedVoiceStyle}\n`;
    content += `Tone: ${packageData.voiceInstructions.tone}\n`;
    content += `Pace: ${packageData.voiceInstructions.pace}\n`;
    content += `Emotion: ${packageData.voiceInstructions.emotion}\n\n`;

    content += `[C] 5 VIRAL IDEAS\n`;
    packageData.viralIdeas.forEach((idea, i) => {
      content += `${i + 1}. ${idea.title} (Clickability: ${idea.clickabilityScore}/100)\n   Why: ${idea.explanation}\n\n`;
    });

    content += `[D] 10 POWERFUL RETENTION HOOKS\n`;
    packageData.hooks.forEach((hook, i) => {
      content += `Hook #${i + 1} (${hook.strategy}): "${hook.hookText}"\n\n`;
    });

    content += `[E] FULL NARRATIVE SCRIPT\n`;
    content += `Recommended Style: ${packageData.script.conversationalStyle}\n`;
    content += `Story Arc: ${packageData.script.storytellingAngle}\n\n= SCRIPT BODY =\n\n`;
    packageData.script.sections.forEach((sec) => {
      content += `=== ${sec.sectionName} ===\n`;
      content += `Retention tactic: ${sec.retentionTactic}\n`;
      content += `Visual Direction: ${sec.visualDirection}\n\n`;
      content += `NARRATOR (ElevenLabs Voice suggested):\n"${sec.narratorText}"\n\n`;
    });

    content += `[F] THUMBNAIL CONCEPT\n`;
    content += `Text overlay: "${packageData.thumbnail.textOverlay}"\n`;
    content += `Graphic Guide: ${packageData.thumbnail.visualConcept}\n`;
    content += `Trigger Target: ${packageData.thumbnail.emotionalTrigger}\n\n`;

    content += `[G] B-ROLL SCENE LIST\n`;
    packageData.bRollSuggestions.forEach((b) => {
      content += `Scene #${b.sceneNumber} (${b.timeframe})\n`;
      content += `Visual: ${b.visualConcept}\n`;
      content += `Stock library tags: "${b.stockFootageKeywords}"\n`;
      content += `Movement suggestions: ${b.cameraMovement}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CreatorAI_${packageData.topic.trim().replace(/\s+/g, "_")}_publishing_pack.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Downloads the complete clean narration script (spoken lines only)
  const downloadCleanNarrationTxt = () => {
    const cleanLines = packageData.script.sections.map((sec, i) => {
      return `=== SECTION ${i + 1}: ${sec.sectionName.toUpperCase()} ===\n[Tactic: ${sec.retentionTactic}]\n\nNARRATOR WORDS:\n"${sec.narratorText}"\n\n[Visual Cue: ${sec.visualDirection}]\n`;
    }).join("\n--------------------------------------------------\n\n");
    
    const blob = new Blob([cleanLines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Clean_Narration_Script_${packageData.topic.trim().replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Downloads a single section script as a txt file
  const downloadSectionTxt = (sectionName: string, narratorText: string, index: number) => {
    const cleanSectionContent = `==================================================
SECTION ${index + 1}: ${sectionName.toUpperCase()}
==================================================

Vocal Guidance Parameters:
  - Format placement: ${packageData.videoType}
  - Delivery style: ${packageData.script.conversationalStyle}
  - Recommended Tone: ${packageData.voiceInstructions.tone}

=== SPOKEN VOICE LINES ===
"${narratorText}"

=== VISUAL HUD DIRECTIVES ===
${packageData.script.sections[index]?.visualDirection || "Stock raw movement patterns"}
`;
    
    const blob = new Blob([cleanSectionContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Section_${index + 1}_Script_Draft_${sectionName.trim().replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Build a highly-professional, print-styled PDF publication roadmap
  const handleExportPDF = () => {
    const printContainer = document.createElement("div");
    printContainer.className = "print-all-container";

    // Escape code text safely for raw insertion
    const escapeHtml = (text: string) => {
      if (!text) return "";
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const ideasHtml = packageData.viralIdeas.map((idea, idx) => `
      <div style="padding: 12px 14px; background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 4px; margin-bottom: 12px;" class="avoid-break">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-size: 13.5px; color: #010409;">Idea #${idx + 1}: ${escapeHtml(idea.title)}</strong>
          <span style="font-family: monospace; font-size: 11px; background-color: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
            Score: ${idea.clickabilityScore}/100
          </span>
        </div>
        <p style="font-size: 12px; color: #334155; margin: 0; line-height: 1.5;"><strong>Rationale:</strong> ${escapeHtml(idea.explanation)}</p>
      </div>
    `).join("");

    const hooksHtml = packageData.hooks.map((hook, idx) => `
      <tr style="border-bottom: 1px solid #e1e8f0;">
        <td style="padding: 8px 10px; font-weight: bold; color: #4338ca; font-family: monospace; font-size: 11px; vertical-align: top; text-transform: uppercase;">
          ${escapeHtml(hook.strategy)}
        </td>
        <td style="padding: 8px 10px; color: #0f172a; line-height: 1.5; font-size: 12px;">
          "${escapeHtml(hook.hookText)}"
        </td>
      </tr>
    `).join("");

    const sectionsHtml = packageData.script.sections.map((sec, idx) => `
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 18px;" class="avoid-break">
        <div style="background-color: #f8fafc; padding: 10px 14px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span style="font-weight: 800; font-size: 11.5px; color: #1e3a8a; text-transform: uppercase;">
            SECTION ${idx + 1}: ${escapeHtml(sec.sectionName)}
          </span>
          <span style="font-size: 10.5px; background-color: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; font-family: monospace;">
            Retention strategy: ${escapeHtml(sec.retentionTactic)}
          </span>
        </div>
        
        <div style="padding: 14px; display: flex; flex-direction: column; gap: 10px; font-size: 12px; line-height: 1.6;">
          <div style="padding: 12px; background-color: #fdfdfd; border-left: 3px solid #10b981; border-radius: 4px;">
            <span style="font-family: monospace; font-size: 9.5px; color: #4b5563; font-weight: bold; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">SPOKEN VOICE LINES:</span>
            <p style="margin: 0; color: #0f172a; font-weight: 500; font-size: 12.5px;">
              ${escapeHtml(sec.narratorText)}
            </p>
          </div>
          
          <div style="font-size: 11.5px; color: #475569;">
            <strong>Screen Overlay & Action directives:</strong> ${escapeHtml(sec.visualDirection)}
          </div>
        </div>
      </div>
    `).join("");

    const bRollHtml = packageData.bRollSuggestions.map((b, idx) => `
      <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; background-color: #fdfdfd; margin-bottom: 10px;" class="avoid-break">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px;">
          <strong style="font-size: 11.5px; color: #0f172a;">Scene #${b.sceneNumber} (${escapeHtml(b.timeframe)})</strong>
          <span style="font-family: monospace; font-size: 10.5px; background-color: #f1f5f9; color: #475569; padding: 1px 5px; border-radius: 4px;">
            Motion: ${escapeHtml(b.cameraMovement)}
          </span>
        </div>
        <p style="font-size: 11.5px; color: #334155; margin: 0 0 4px 0; line-height: 1.5;">
          <strong>Concept:</strong> ${escapeHtml(b.visualConcept)}
        </p>
        <div style="background-color: #eff6ff; padding: 4px 8px; border-radius: 3px; font-size: 10px; color: #1e40af; font-family: monospace;">
          <strong>Stock search terms:</strong> ${escapeHtml(b.stockFootageKeywords)}
        </div>
      </div>
    `).join("");

    printContainer.innerHTML = `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #0f172a; max-width: 800px; margin: 0 auto; background-color: #ffffff; line-height: 1.5;">
        <!-- printable-header -->
        <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 15px; margin-bottom: 25px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
            <div>
              <h1 style="font-size: 24px; font-weight: 800; color: #1e1b4b; margin: 0; text-transform: uppercase; letter-spacing: -0.5px;">creatorAI</h1>
              <p style="font-size: 10px; text-transform: uppercase; font-family: monospace; color: #4b5563; margin: 2px 0 0 0; letter-spacing: 0.5px;">YouTube Content Publishing Roadmap</p>
            </div>
            <div style="text-align: right; font-size: 10px; font-family: monospace; color: #6b7280;">
              <div>COMPILED AT: ${new Date(packageData.generatedAt).toLocaleDateString()}</div>
              <div style="margin-top: 2px; color: #10b981; font-weight: bold;">PLAN STATUS: PRODUCTION ACTIVE</div>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 10px 12px; background-color: #f1f5f9; border-radius: 6px; font-size: 11.5px; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; border: 1px solid #e2e8f0;">
            <div><strong>Topic:</strong> <span style="color: #4f46e5; font-weight: bold;">"${escapeHtml(packageData.topic)}"</span></div>
            <div><strong>Niche Stream:</strong> ${escapeHtml(packageData.niche)}</div>
            <div><strong>Format:</strong> ${escapeHtml(packageData.videoType)}</div>
            ${packageData.language ? `<div><strong>Language:</strong> <span style="background-color: #fae8ff; color: #86198f; padding: 1px 5px; border-radius: 4px; font-size: 10px; font-weight: bold;">${escapeHtml(packageData.language)}</span></div>` : ""}
          </div>
        </div>

        <!-- Section 1 -->
        <div style="margin-bottom: 25px;" class="avoid-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            1. 5 High-CTR Title Proposals
          </h2>
          <div>${ideasHtml}</div>
        </div>

        <!-- Section 2 -->
        <div style="margin-bottom: 25px; page-break-before: always; break-before: page;" class="page-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            2. 10 High-Retention Audience Hooks
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
            <thead>
              <tr style="background-color: #f8fafc; text-align: left; border-bottom: 2px solid #cbd5e1;">
                <th style="padding: 8px; font-weight: bold; width: 130px; text-transform: uppercase; font-family: monospace; font-size: 10px; color: #475569;">Strategy</th>
                <th style="padding: 8px; font-weight: bold; text-transform: uppercase; font-family: monospace; font-size: 10px; color: #475569;">Exact Headline / Retention Hook</th>
              </tr>
            </thead>
            <tbody>
              ${hooksHtml}
            </tbody>
          </table>
        </div>

        <!-- Section 3 -->
        <div style="margin-bottom: 25px; page-break-before: always; break-before: page;" class="page-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            3. Storyboard Content Script
          </h2>
          <div style="margin-bottom: 14px; padding: 8px 12px; background-color: #eff6ff; border-radius: 4px; font-size: 11.5px; border: 1px solid #bfdbfe; display: flex; gap: 16px; flex-wrap: wrap;">
            <div><strong>Style:</strong> ${escapeHtml(packageData.script.conversationalStyle)}</div>
            <div><strong>Angle:</strong> ${escapeHtml(packageData.script.storytellingAngle)}</div>
          </div>
          <div>${sectionsHtml}</div>
        </div>

        <!-- Section 4 -->
        <div style="margin-bottom: 25px; page-break-before: always; break-before: page;" class="page-break avoid-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            4. Thumbnail Concept & Graphics Guide
          </h2>
          <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; background-color: #fffdfa; border-left: 4px solid #f59e0b;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #b45309; font-weight: bold; font-family: monospace; text-transform: uppercase;">Image Prompt (Ideal for Flux.1 or Midjourney v6):</p>
            <p style="font-size: 11.5px; color: #1e293b; line-height: 1.5; margin: 0; background-color: #faf5eb; padding: 10px; border-radius: 4px; font-style: italic; border: 1px dashed #fcd34d;">
              ${escapeHtml(packageData.thumbnail.visualConcept)}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 10px; font-size: 11px;">
              <div><strong>Focal Text Overlay:</strong> <span style="color: #dc2626; font-weight: bold;">"${escapeHtml(packageData.thumbnail.textOverlay)}"</span></div>
              <div><strong>Core Emotional Trigger:</strong> ${escapeHtml(packageData.thumbnail.emotionalTrigger)}</div>
            </div>
          </div>
        </div>

        <!-- Section 5 -->
        <div style="margin-bottom: 25px; page-break-before: always; break-before: page;" class="page-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            5. B-Roll Footage Choreography
          </h2>
          <div>${bRollHtml}</div>
        </div>

        <!-- Section 6 -->
        <div style="margin-bottom: 25px; page-break-before: always; break-before: page;" class="page-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            6. Search Engine Optimization (SEO) Pack
          </h2>
          <div style="display: flex; flex-direction: column; gap: 12px;" class="avoid-break">
            <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
              <span style="font-size: 8.5px; font-family: monospace; color: #4338ca; font-weight: bold; display: block; margin-bottom: 2px; text-transform: uppercase;">Growth-Optimized Raw Title:</span>
              <strong style="font-size: 13px; color: #0f172a;">${escapeHtml(packageData.seoPackage.optimizedTitle)}</strong>
            </div>

            <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
              <span style="font-size: 8.5px; font-family: monospace; color: #4338ca; font-weight: bold; display: block; margin-bottom: 2px; text-transform: uppercase;">Video Description Blueprint:</span>
              <pre style="margin: 0; font-family: inherit; font-size: 11px; color: #334155; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(packageData.seoPackage.videoDescription)}</pre>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; font-size: 10.5px;">
              <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
                <strong>Growth Hashtags:</strong>
                <p style="margin: 2px 0 0 0; color: #2563eb; font-weight: 600;">${escapeHtml(packageData.seoPackage.hashtags.join(" "))}</p>
              </div>
              <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
                <strong>LSI & Semantic Metadata Keywords:</strong>
                <p style="margin: 2px 0 0 0; color: #475569; font-family: monospace; font-size: 10px;">${escapeHtml(packageData.seoPackage.seoKeywords.join(", "))}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 7 -->
        <div style="margin-bottom: 25px; page-break-before: always; break-before: page;" class="page-break avoid-break">
          <h2 style="font-size: 15.5px; font-weight: bold; color: #1e1b4b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; uppercase;">
            7. AI Voice Synthesis Parameters & Directives
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; font-size: 11px;">
            <div style="background-color: #fafafa; padding: 8px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span style="color: #6b7280; font-size: 9.5px; display: block; margin-bottom: 2px;">SUGGESTED PROFILE:</span>
              <strong style="color: #0f172a;">${escapeHtml(packageData.voiceInstructions.recommendedVoiceStyle)}</strong>
            </div>
            <div style="background-color: #fafafa; padding: 8px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span style="color: #6b7280; font-size: 9.5px; display: block; margin-bottom: 2px;">VOCAL TONE GUIDE:</span>
              <strong style="color: #0f172a;">${escapeHtml(packageData.voiceInstructions.tone)}</strong>
            </div>
            <div style="background-color: #fafafa; padding: 8px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span style="color: #6b7280; font-size: 9.5px; display: block; margin-bottom: 2px;">PACING & DURATION METRIC:</span>
              <strong style="color: #0f172a;">${escapeHtml(packageData.voiceInstructions.pace)}</strong>
            </div>
            <div style="background-color: #fafafa; padding: 8px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span style="color: #6b7280; font-size: 9.5px; display: block; margin-bottom: 2px;">EMOTIONAL CONVICTION LEVEL:</span>
              <strong style="color: #0f172a;">${escapeHtml(packageData.voiceInstructions.emotion)}</strong>
            </div>
          </div>
        </div>

        <!-- footer -->
        <div style="margin-top: 35px; border-top: 1px solid #cbd5e1; padding-top: 10px; text-align: center; font-size: 8.5px; color: #9ca3af;">
          <p>This YouTube Content Production Blueprint was dynamically compiled using creatorAI platform.</p>
          <p style="font-family: monospace; font-size: 8px; margin-top: 2px;">REF PATH: ${escapeHtml(packageData.topic.toUpperCase().replace(/\s+/g, "_"))}_PUBLISHING_PACK</p>
        </div>
      </div>
    `;

    document.body.appendChild(printContainer);
    document.body.classList.add("ready-to-print");
    
    // Tiny timeout to ensure the browser has parsed and painted the container, then trigger pdf
    setTimeout(() => {
      window.print();
      document.body.classList.remove("ready-to-print");
      document.body.removeChild(printContainer);
    }, 150);
  };


  const tabs = [
    { id: "ideas", label: "5 Viral Ideas", icon: ListOrdered },
    { id: "script", label: "Hooks & Scripts", icon: FileText },
    { id: "thumbnail", label: "Thumbnail Prompt", icon: ImageIcon },
    { id: "seo", label: "SEO Package", icon: Search },
    { id: "voice", label: "AI Voice", icon: Mic },
  ];

  return (
    <div id="ai-package-view" className="space-y-6">
      
      {/* Surge Fallback Optimization Banner */}
      {packageData.isFallback && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3.5 backdrop-blur-md">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              Peak Traffic Fallback Optimization Mode
            </h4>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Google Gemini models are currently experiencing extremely high demand. To keep your workflow seamless and uninterrupted, CreatorAI's offline compiler immediately compiled this custom high-retention publishing pack centered specifically on your requested topic. You were not charged any daily credits for this generation!
            </p>
          </div>
        </div>
      )}
      
      {/* Package Header Panel */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {packageData.videoType}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              {packageData.niche} Content
            </span>
            {packageData.language && (
              <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center gap-1 font-bold">
                🌐 {packageData.language}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Topic: <span className="text-indigo-400">"{packageData.topic}"</span>
          </h2>
          <p className="text-xs text-zinc-500 font-mono">
            Successfully compiled at {new Date(packageData.generatedAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            id="save-to-library-btn"
            onClick={onSaveToLibrary}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold select-none transition-all cursor-pointer ${
              isSaved
                ? "bg-zinc-800 border border-emerald-500/40 text-emerald-400"
                : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved in Library
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                Save to Library
              </>
            )}
          </button>
          
          <button
            id="download-creative-pack-btn"
            onClick={downloadScriptFile}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white select-none transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            Export TXT Pack
          </button>

          <button
            id="export-pdf-pack-btn"
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white select-none transition-all cursor-pointer shadow-lg shadow-indigo-600/15 active:scale-95"
          >
            <FileText className="w-4 h-4 text-indigo-100" />
            Export PDF Blueprint
          </button>
        </div>
      </div>

      {/* Predictive Viral Score Analysis Chart Section */}
      <ViralPotentialScore packageData={packageData} />

      {/* Social Media Share Preview Component */}
      <SocialSharePreview packageData={packageData} />

      {/* Segmented Tab Controls */}
      <div className="flex overflow-x-auto bg-zinc-900/40 p-1.5 rounded-xl border border-zinc-800/80 gap-1 scrollbar-none">
        {tabs.map((tab) => {
          const tabActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          return (
            <button
              id={`tab-control-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                tabActive
                  ? "bg-zinc-800 border border-zinc-700/60 text-white font-bold text-shadow shadow-md shadow-zinc-950/40"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <TabIcon className={`w-3.5 h-3.5 ${tabActive ? "text-indigo-400" : "text-zinc-500"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Tab Panels */}
      <div className="min-h-[400px]">
        {/* Panel A: 5 Viral Ideas */}
        {activeTab === "ideas" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  5 Clickable Video Title Variations
                </h3>
                <p className="text-zinc-400 text-xs">
                  Engineered with massive high-retention psychological hooks.
                </p>
              </div>
              <button
                id="copy-all-ideas-btn"
                onClick={() => handleCopy(
                  packageData.viralIdeas.map((idea, i) => `${i + 1}. ${idea.title}\nWhy: ${idea.explanation}`).join("\n\n"),
                  "all-ideas"
                )}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
              >
                {copiedStates["all-ideas"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedStates["all-ideas"] ? "Copied All!" : "Copy All Ideas"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packageData.viralIdeas.map((idea, i) => (
                <div key={i} className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 text-[10px] font-mono select-none text-zinc-700 font-bold">
                    IDEA #{String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {/* Clickability Rating metrics */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        idea.clickabilityScore >= 90 
                          ? "bg-rose-500/15 border border-rose-500/25 text-rose-400" 
                          : "bg-emerald-500/15 border border-emerald-500/25 text-emerald-400"
                      }`}>
                        CTR Potential: {idea.clickabilityScore}%
                      </span>
                      <button
                        id={`copy-idea-btn-${i}`}
                        onClick={() => handleCopy(`Title: ${idea.title}\nStrategy: ${idea.explanation}`, `idea-${i}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-indigo-400 p-1"
                        title="Copy Idea"
                      >
                        {copiedStates[`idea-${i}`] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <h4 className="text-white font-bold leading-snug pr-8 text-base">
                      {idea.title}
                    </h4>

                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {idea.explanation}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        id={`preview-feed-btn-${i}`}
                        onClick={() => {
                          setSelectedFeedTitle(idea.title);
                          setIsFeedPreviewOpen(true);
                        }}
                        className="text-[10px] font-bold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-indigo-500/15 transition-all flex items-center gap-1 cursor-pointer select-none"
                      >
                        <Search className="w-3 h-3" />
                        Preview CTR Feed
                      </button>
                      <a
                        id={`external-search-btn-${i}`}
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(idea.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none"
                        title="View live search results on YouTube"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Results
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Panel B: Hooks & Script Content */}
        {activeTab === "script" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Scroll hooks list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-sm">10 Retention Hook Variations (0:00 - 0:05)</h3>
                  <p className="text-zinc-400 text-xs">Speak these in the first 5 seconds to minimize early-second audience dropoff.</p>
                </div>
                <button
                  id="copy-all-hooks-btn"
                  onClick={() => handleCopy(
                    packageData.hooks.map((hook, i) => `Hook #${i + 1} [${hook.strategy}]: "${hook.hookText}"`).join("\n\n"),
                    "all-hooks"
                  )}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                >
                  {copiedStates["all-hooks"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy All Hooks
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageData.hooks.map((hook, i) => (
                  <div key={i} className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-4 flex items-start gap-3 group">
                    <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div className="space-y-1.5 flex-1 pr-4">
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                        PSYCHOLOGICAL STRATEGY: <span className="text-orange-400">{hook.strategy}</span>
                      </span>
                      <blockquote className="text-zinc-200 text-xs font-medium italic">
                        "{hook.hookText}"
                      </blockquote>
                    </div>
                    <button
                      id={`copy-hook-btn-${i}`}
                      onClick={() => handleCopy(hook.hookText, `hook-${i}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-zinc-300 p-1 mt-1 shrink-0"
                    >
                      {copiedStates[`hook-${i}`] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrator Full Script */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4 gap-4">
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Full Video Narration Script
                  </h3>
                  <p className="text-zinc-400 text-xs">
                    Style: <span className="text-indigo-400">{packageData.script.conversationalStyle}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    id="copy-entire-script-btn"
                    onClick={() => handleCopy(
                      packageData.script.sections.map((sec) => `=== ${sec.sectionName} ===\nNarrator: "${sec.narratorText}"\nVisual Direction: ${sec.visualDirection}`).join("\n\n"),
                      "full-script"
                    )}
                    className="flex items-center gap-1.5 bg-indigo-600/15 border border-indigo-500/20 text-indigo-400 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600/25 transition-all cursor-pointer select-none"
                  >
                    {copiedStates["full-script"] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Entire Script
                  </button>

                  <button
                    id="download-clean-narration-btn"
                    onClick={downloadCleanNarrationTxt}
                    className="flex items-center gap-1.5 bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600/25 transition-all cursor-pointer select-none"
                    title="Download script containing only spoken voice narrative lines"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    Download Clean Script (.txt)
                  </button>
                </div>
              </div>

              {/* Narrative Angle Block */}
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Narrative Core/Storytelling Arc</span>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{packageData.script.storytellingAngle}"
                </p>
              </div>

              {/* Chronological Script Sections */}
              <div className="space-y-6">
                {packageData.script.sections.map((sec, i) => (
                  <div key={i} className="border-l-2 border-indigo-500/40 pl-5 space-y-3 relative">
                    {/* Small Dot */}
                    <div className="absolute top-1.5 -left-[6px] h-2.5 w-2.5 rounded-full bg-indigo-500" />

                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {sec.sectionName}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                        {sec.retentionTactic}
                      </span>
                    </div>

                    {/* Speech narrator bubble */}
                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 relative group">
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          id={`play-sec-narration-btn-${i}`}
                          onClick={() => handlePlayScript(sec.narratorText, `sec-${i}`)}
                          className={`p-1 rounded bg-zinc-900 border border-zinc-800 transition-colors ${
                            isPlaying && playingSegment === `sec-${i}`
                              ? "text-rose-400 border-rose-500/40"
                              : "text-emerald-400 border-emerald-500/40 hover:text-emerald-300"
                          }`}
                          title={isPlaying && playingSegment === `sec-${i}` ? "Stop voice draft" : "Listen to free voice draft"}
                        >
                          {isPlaying && playingSegment === `sec-${i}` ? <Square className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> : <Play className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />}
                        </button>
                        <button
                          id={`copy-sec-narration-btn-${i}`}
                          onClick={() => handleCopy(sec.narratorText, `sec-${i}`)}
                          className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white"
                          title="Copy Voice Text"
                        >
                          {copiedStates[`sec-${i}`] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          id={`download-sec-narration-btn-${i}`}
                          onClick={() => downloadSectionTxt(sec.sectionName, sec.narratorText, i)}
                          className="p-1 rounded bg-zinc-900 border border-zinc-805 text-zinc-400 hover:text-white"
                          title="Download Section Script (.txt)"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-600 tracking-wider block uppercase mb-1">
                        Voiceover / Spoken Text
                      </span>
                      <p className="text-zinc-100 text-xs sm:text-sm leading-relaxed pr-16 font-sans">
                        {sec.narratorText}
                      </p>
                      
                      {/* Interactive inline play help line */}
                      <div className="mt-2.5 flex items-center flex-wrap gap-1.5 text-[10px] text-zinc-500 select-none border-t border-zinc-930 pt-2.5">
                        <button
                          id={`play-sec-inline-btn-${i}`}
                          onClick={() => handlePlayScript(sec.narratorText, `sec-${i}`)}
                          className="text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {isPlaying && playingSegment === `sec-${i}` ? (
                            <>
                              <Square className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />
                              Stop (Free Player)
                            </>
                          ) : (
                            <>
                              <Play className="w-2.5 h-2.5 fill-indigo-400 text-indigo-400" />
                              Listen Free Draft
                            </>
                          )}
                        </button>
                        <span>• Standard local speech synthesizer</span>
                        <span>•</span>
                        <button
                          id={`download-sec-inline-btn-${i}`}
                          onClick={() => downloadSectionTxt(sec.sectionName, sec.narratorText, i)}
                          className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-2.5 h-2.5 text-emerald-400" />
                          Download Section Script (.txt)
                        </button>
                      </div>
                    </div>

                    {/* visual command */}
                    <div className="text-xs text-zinc-400 flex items-start gap-2 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/40">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase mt-0.5 shrink-0">
                        Visual Cue:
                      </span>
                      <p className="leading-relaxed">
                        {sec.visualDirection}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Panel C: Thumbnail Prompt */}
        {activeTab === "thumbnail" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Thumbnail Guide Card */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/5 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-fuchsia-400" />
                    YouTube Thumbnail Generator Concept
                  </h3>
                  <p className="text-zinc-400 text-xs">High-converting concept based on CTR visual feedback arrays.</p>
                </div>
                <button
                  id="copy-thumbnail-concept-btn"
                  onClick={() => handleCopy(`Text Overlay: "${packageData.thumbnail.textOverlay}"\nConcept: ${packageData.thumbnail.visualConcept}\nTrigger: ${packageData.thumbnail.emotionalTrigger}`, "thumb")}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800"
                >
                  {copiedStates["thumb"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy Thumbnail Prompt
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Visual mockup card overlay */}
                <div className="bg-zinc-950 aspect-video rounded-xl border border-zinc-800 p-5 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-950/20 to-indigo-950/20" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive Mockup</span>
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  </div>

                  {/* Simulated Thumbnail Bold Text */}
                  <div className="relative z-10 my-4 text-center">
                    <span className="px-3 py-1.5 bg-yellow-400 text-black text-xs font-black tracking-tighter uppercase font-sans border-2 border-black inline-block rotate-[-2deg] shadow-lg">
                      {packageData.thumbnail.textOverlay}
                    </span>
                  </div>

                  <div className="relative z-10 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                    <span>1280 x 720 (16:9)</span>
                    <span className="text-fuchsia-400 uppercase">HIGH SATURATION</span>
                  </div>
                </div>

                {/* Concept and details */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 md:col-span-2 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Thumbnail Text Overlay (Use 2-5 words strictly)</span>
                    <p className="text-sm font-bold text-white">
                      "{packageData.thumbnail.textOverlay}"
                    </p>
                  </div>

                  <div className="space-y-1 border-t border-zinc-900 pt-3">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Visual Concept / Image Generator Prompt</span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {packageData.thumbnail.visualConcept}
                    </p>
                  </div>

                  <div className="space-y-1 border-t border-zinc-900 pt-3">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Emotional CTR Trigger Target</span>
                    <p className="text-xs text-emerald-400 font-mono italic">
                      🎯 Triggering: {packageData.thumbnail.emotionalTrigger}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* Panel D: SEO Metadata tags package */}
        {activeTab === "seo" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Optimized title card */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-white font-bold text-sm">Suggested Optimized YouTube Publishing Title</h3>
                <button
                  id="copy-seo-title-btn"
                  onClick={() => handleCopy(packageData.seoPackage.optimizedTitle, "seotitle")}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800"
                >
                  {copiedStates["seotitle"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy Title
                </button>
              </div>

              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80">
                <p className="text-base sm:text-xl font-bold font-sans text-indigo-400">
                  {packageData.seoPackage.optimizedTitle}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <button
                    id="seo-page-preview-feed-btn"
                    onClick={() => {
                      setSelectedFeedTitle(packageData.seoPackage.optimizedTitle);
                      setIsFeedPreviewOpen(true);
                    }}
                    className="text-xs font-bold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-3.5 py-2 rounded-lg border border-indigo-500/15 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Preview in Creator CTR Feed Simulator
                  </button>
                  <a
                    id="seo-page-external-search-btn"
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(packageData.seoPackage.optimizedTitle)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 hover:text-white px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-zinc-800 select-none"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live YouTube Results
                  </a>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 block mt-3 text-right">
                  Length: {packageData.seoPackage.optimizedTitle.length} characters (Perfect for CTR click-through ranking on all screen layouts)
                </span>
              </div>
            </div>

            {/* Optimized Description */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-white font-bold text-sm">Algorithmic optimized video Description text</h3>
                <button
                  id="copy-seo-desc-btn"
                  onClick={() => handleCopy(packageData.seoPackage.videoDescription, "seodesc")}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800"
                >
                  {copiedStates["seodesc"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy Description
                </button>
              </div>

              <textarea
                id="seo-description-view-textarea"
                readOnly
                value={packageData.seoPackage.videoDescription}
                rows={8}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 leading-relaxed focus:outline-none resize-none"
              />
            </div>

            {/* Keyword tags and hashtags collections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Hashtags collection */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm">Hashtags (#)</h3>
                  <button
                    id="copy-seo-hashtags-btn"
                    onClick={() => handleCopy(packageData.seoPackage.hashtags.join(" "), "seohash")}
                    className="text-zinc-500 hover:text-indigo-400 text-xs flex items-center gap-1"
                  >
                    {copiedStates["seohash"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy tags list
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {packageData.seoPackage.hashtags.map((h, idx) => (
                    <span key={idx} className="bg-zinc-950 border border-zinc-800/80 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-200">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keywords list */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm">SEO Search Keywords</h3>
                  <button
                    id="copy-seo-keywords-btn"
                    onClick={() => handleCopy(packageData.seoPackage.seoKeywords.join(", "), "seokey")}
                    className="text-zinc-500 hover:text-indigo-400 text-xs flex items-center gap-1"
                  >
                    {copiedStates["seokey"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy Keywords List
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {packageData.seoPackage.seoKeywords.map((k, idx) => (
                    <span key={idx} className="bg-indigo-950/20 text-indigo-400 border border-indigo-500/10 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Panel E: TTS synthesis guidelines */}
        {activeTab === "voice" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Split Grid for Free Local Player and Paid ElevenLabs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Option A: 100% Free Live AI Voice Synthesizer */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Option A (Free & Unlimited)
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                      No Login required
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Free Built-in Voice Player (Browser TTS)
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Generate narration instantly inside your web browser. Perfect for testing and draft video scripts without signing up for paid APIs.
                    </p>
                  </div>

                  {/* Settings selectors */}
                  <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-zinc-500 block">Select Voice Profile</label>
                      {voicesList.length > 0 ? (
                        <select
                          id="free-voice-profile-select"
                          value={selectedVoice?.name || ""}
                          onChange={(e) => {
                            const voice = voicesList.find(v => v.name === e.target.value);
                            if (voice) setSelectedVoice(voice);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          {voicesList.map((v, idx) => (
                            <option key={idx} value={v.name}>
                              {v.name} ({v.lang})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-zinc-400 font-mono italic block">Loading browser voices...</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-zinc-500 flex justify-between">
                          <span>Speed/Pace</span>
                          <span className="text-indigo-400">{speechRate}x</span>
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                          value={speechRate}
                          onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-zinc-500 flex justify-between">
                          <span>Voice Pitch</span>
                          <span className="text-indigo-400">{speechPitch}x</span>
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="1.5"
                          step="0.1"
                          value={speechPitch}
                          onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Player buttons */}
                <div className="pt-4 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      id="play-full-script-btn"
                      onClick={() => {
                        const fullScriptText = packageData.script.sections.map(s => s.narratorText).join(" ");
                        handlePlayScript(fullScriptText, "all-script");
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isPlaying && playingSegment === "all-script"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 font-extrabold"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/10 active:scale-95 cursor-pointer"
                      }`}
                    >
                      {isPlaying && playingSegment === "all-script" ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-rose-400" />
                          Stop Narration
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white text-white" />
                          Read Full Script (Free)
                        </>
                      )}
                    </button>

                    <button
                      id="download-voice-script-btn"
                      onClick={downloadCleanNarrationTxt}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-md shadow-black/25"
                      title="Download the entire voice narration script as a clean text file"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      Download Clean Script (.txt)
                    </button>

                    {isPlaying && (
                      <button
                        id="player-stop-all-btn"
                        onClick={handleStopScript}
                        className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white rounded-xl text-xs font-medium cursor-pointer"
                        title="Stop all playback"
                      >
                        Stop
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono block text-center leading-relaxed">
                    💡 If speech doesn't start, please click "Open in New Tab" at the top page layout to allow iFrame speech permissions.
                  </span>
                </div>
              </div>

              {/* Option B: Premium Professional ElevenLabs AI Voice */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      Option B (Premium Professional)
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                      Industry standard
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <Mic className="w-4 h-4 text-indigo-400 shrink-0" />
                      Professional ElevenLabs Guide
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Best for final production with high emotional range, realistic micro-breaths, and flawless pacing. Free tiers are available directly on ElevenLabs.
                    </p>
                  </div>

                  {/* Settings guidelines parameters mapping */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 block">Recommended Voice</span>
                      <p className="text-xs font-bold text-white">
                        {packageData.voiceInstructions.recommendedVoiceStyle}
                      </p>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 block">Vocal Tone Color</span>
                      <p className="text-xs font-bold text-white">
                        {packageData.voiceInstructions.tone}
                      </p>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 block">Reading Speed Profile</span>
                      <p className="text-xs font-bold text-white">
                        {packageData.voiceInstructions.pace}
                      </p>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 block">Emotional Delivery</span>
                      <p className="text-xs font-bold text-white">
                        {packageData.voiceInstructions.emotion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <a
                    id="elevenlabs-outbound-link"
                    href="https://elevenlabs.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/10 cursor-pointer select-none"
                  >
                    ElevenLabs Website (Paid/Free tiers)
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  
                  <div className="flex items-center justify-between">
                    <button
                      id="copy-elevenlabs-voice-spec-btn"
                      onClick={() => handleCopy(`Voice Style: ${packageData.voiceInstructions.recommendedVoiceStyle}\nTone: ${packageData.voiceInstructions.tone}\nPace: ${packageData.voiceInstructions.pace}\nEmotion: ${packageData.voiceInstructions.emotion}`, "voice")}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-850"
                    >
                      {copiedStates["voice"] ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Parameters
                    </button>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase">
                      Clarity Rating: 95%
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* General Narration Tips card */}
            <div className="bg-zinc-950 rounded-xl border border-zinc-800/80 p-5 space-y-3">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Advanced Creator Narration Tips
              </span>
              <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-4 font-sans leading-relaxed">
                <li><strong className="text-indigo-400">Draft Mode Integration:</strong> First play each section inside our free draft player to make sure the rhythm flows perfectly, before spending professional voice synthesis quota.</li>
                <li><strong className="text-indigo-400">ElevenLabs Cohesion settings:</strong> Standardize with Clarity/Similarity set to <strong>85%</strong> and Stability at <strong>50%</strong> for modern podcasting/commentary narration colors.</li>
                <li><strong className="text-indigo-400 font-bold">Ambient Background Audio:</strong> Always overlay copyright-free cinematic instrumental ambient music at -24db behind the vocal levels inside CapCut or Premiere Pro for maximum user attention span.</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {isFeedPreviewOpen && selectedFeedTitle && (
        <YouTubeFeedPreview
          niche={packageData.niche}
          topic={packageData.topic}
          selectedTitle={selectedFeedTitle}
          thumbnailOverlayText={packageData.thumbnail.textOverlay}
          thumbnailConcept={packageData.thumbnail.visualConcept}
          onClose={() => {
            setIsFeedPreviewOpen(false);
            setSelectedFeedTitle(null);
          }}
        />
      )}

    </div>
  );
}
