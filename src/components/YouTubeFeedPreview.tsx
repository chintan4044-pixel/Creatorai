/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  Search, 
  ExternalLink, 
  ThumbsUp, 
  Eye, 
  Sliders, 
  TrendingUp, 
  Play, 
  CheckCircle,
  X,
  AlertCircle
} from "lucide-react";
import { NicheType, VideoType } from "../types";

interface YouTubeFeedPreviewProps {
  niche: string;
  topic: string;
  selectedTitle: string;
  thumbnailOverlayText: string;
  thumbnailConcept: string;
  onClose: () => void;
}

interface CompetitorVideo {
  id: string;
  title: string;
  channelName: string;
  views: string;
  published: string;
  duration: string;
  likes: string;
  subscribers: string;
  ctrBonus: number;
}

export default function YouTubeFeedPreview({
  niche,
  topic,
  selectedTitle,
  thumbnailOverlayText,
  thumbnailConcept,
  onClose
}: YouTubeFeedPreviewProps) {
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [editedTitle, setEditedTitle] = useState(selectedTitle);
  const [editedThumbnailOverlay, setEditedThumbnailOverlay] = useState(thumbnailOverlayText);
  const [competitors, setCompetitors] = useState<CompetitorVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState(selectedTitle);

  // Sync edits
  useEffect(() => {
    setEditedTitle(selectedTitle);
    setSearchQuery(selectedTitle);
  }, [selectedTitle]);

  useEffect(() => {
    setEditedThumbnailOverlay(thumbnailOverlayText);
  }, [thumbnailOverlayText]);

  // Generate niche-specific competitors
  useEffect(() => {
    const fetchNicheCompetitors = (): CompetitorVideo[] => {
      const parsedNiche = niche.toLowerCase();
      
      let channels = ["GlobalNiche", "CreatorHub", "MindsetMedia"];
      let competitorTitles = [
        `The Ultimate Blueprint to Master ${topic} Fast`,
        `Why I Stopped Doing ${topic} After 1 Year`,
        `The Dark Truth of ${topic} Secretly Exposed`,
        `A Beginner's Step-by-Step Guide for ${topic}`
      ];

      if (parsedNiche.includes("finance") || parsedNiche.includes("wealth")) {
        channels = ["Graham Stephan", "Andrei Jikh", "Ali Abdaal", "Financial Diet"];
        competitorTitles = [
          `How to Make $10,000/Month Passive Income with ${topic}`,
          `Why 99% of People Stay Broke Trying ${topic}`,
          `My Honest 30-Day ${topic} Results (Shocking)`,
          `Passive Income Secrets of the 1%: ${topic}`
        ];
      } else if (parsedNiche.includes("tech") || parsedNiche.includes("ai")) {
        channels = ["Fireship", "Marques Brownlee", "TechLead", "Lex Fridman"];
        competitorTitles = [
          `The Terrifying Future of ${topic} (Must Watch)`,
          `I Built a Custom AI to Automate ${topic}`,
          `Why ${topic} is Quietly Changing Everything`,
          `This Simple ${topic} Hack Saved Me 100 Hours`
        ];
      } else if (parsedNiche.includes("space") || parsedNiche.includes("science")) {
        channels = ["Kurzgesagt", "Neil deGrasse Tyson", "Melodysheep", "Vsauce"];
        competitorTitles = [
          `What Actually Happens if You Push ${topic} to its Limit?`,
          `The Cosmic Secrets Behind ${topic} Spectrums`,
          `How Modern Science Solved the Mystery of ${topic}`,
          `The Universe is Screaming About ${topic}`
        ];
      } else if (parsedNiche.includes("horror") || parsedNiche.includes("reddit")) {
        channels = ["Mr. Nightmare", "Wendtworth", "Be. Busta", "Lazy Masquerade"];
        competitorTitles = [
          `5 Creepy ${topic} Stories You Should Never Watch Alone`,
          `The Deep Web Secret Known as ${topic}`,
          `Something is Very Wrong with ${topic}`,
          `I Regret Searching Up ${topic} at 3 AM`
        ];
      } else if (parsedNiche.includes("historical") || parsedNiche.includes("chronology")) {
        channels = ["The Infographics Show", "Timeline Tracker", "Kings and Generals", "Biographics"];
        competitorTitles = [
          `The Brutal Historical Truth of ${topic} Decoded`,
          `How One Secret Order Controlled the Flow of ${topic}`,
          `The 10-Minute Dark History of ${topic}`,
          `What Did Ancient Civilizations Know About ${topic}?`
        ];
      } else if (parsedNiche.includes("health") || parsedNiche.includes("biohacking")) {
        channels = ["Andrew Huberman", "Thomas DeLauer", "Diaries of a CEO", "Dr. Berg"];
        competitorTitles = [
          `The Scientific Way to Supercharge ${topic} (Instantly)`,
          `Stop Doing ${topic} Like This! It's Ruining Your Mitochondria`,
          `What 15 Minutes of ${topic} Daily Does to Your Brain`,
          `Why This One Hidden ${topic} Sleep Molecule Changes Everything`
        ];
      } else if (parsedNiche.includes("mystery") || parsedNiche.includes("conspiracy")) {
        channels = ["Lemmino", "Vsauce", "BuzzFeed Unsolved", "The Why Files"];
        competitorTitles = [
          `The Infinite Search for ${topic} (The Full Story)`,
          `Is ${topic} the Greatest Cover-Up of Our Generation?`,
          `No One is Allowed to talk about ${topic}... Here is why`,
          `The Unbelievable Mystery of ${topic} Explained`
        ];
      }

      return competitorTitles.map((titleStr, index) => {
        const viewsCount = (Math.random() * 8.5 + 0.2).toFixed(1);
        const subCount = (Math.random() * 5 + 0.1).toFixed(1);
        const days = Math.floor(Math.random() * 25) + 2;
        
        return {
          id: `competitor-${index}-${Math.random().toString(36).substring(3, 7)}`,
          title: titleStr,
          channelName: channels[index % channels.length],
          views: `${viewsCount}M views`,
          published: `${days} days ago`,
          duration: `${Math.floor(Math.random() * 7) + 5}:${Math.floor(Math.random() * 45) + 10}`,
          likes: `${Math.floor(Math.random() * 450) + 50}K`,
          subscribers: `${subCount}M subscribers`,
          ctrBonus: index === 0 ? 1.2 : 0.8
        };
      });
    };

    setCompetitors(fetchNicheCompetitors());
  }, [niche, topic]);

  // Handle direct YouTube search verification links
  const getYouTubeSearchURL = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  };

  // Clickability analysis calculation
  const calculateSimulatedCTR = () => {
    let score = 82;
    // Word multipliers
    const length = editedTitle.length;
    if (length > 40 && length < 75) score += 8; // Optimal length range
    else if (length >= 75) score -= 4; // Too long
    else if (length <= 25) score -= 6; // Too brief

    // Check for powerful visual psychological trigger structures
    const hooks = ["shocker", "truth", "why", "secret", "reveal", "tried", "cheat", "formula", "lie", "!", "$", "%"];
    hooks.forEach((word) => {
      if (editedTitle.toLowerCase().includes(word)) {
        score += 2;
      }
    });

    if (editedThumbnailOverlay.length > 2 && editedThumbnailOverlay.length < 20) {
      score += 4;
    } else if (editedThumbnailOverlay.length >= 25) {
      score -= 5;
    }

    return Math.min(99.6, Math.max(45, score));
  };

  const getCTRQualityDescriptor = (ctr: number) => {
    if (ctr >= 92) return { text: "Outstanding (Top 1% Potential)", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    if (ctr >= 85) return { text: "Very Strong (High Velocity Feed Rank)", color: "text-indigo-400 border-indigo-505/30 bg-indigo-500/10" };
    if (ctr >= 70) return { text: "Average Retention Competency", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    return { text: "Low Capture Rate (Optimize overlays)", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" };
  };

  const simulatedCTR = calculateSimulatedCTR();
  const ctrMeta = getCTRQualityDescriptor(simulatedCTR);

  return (
    <div id="youtube-feed-dialog" className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between items-stretch outline-none animate-fade-in sm:p-4">
      
      {/* Top utility Control Hub */}
      <div className="bg-zinc-950 border-b border-zinc-900 px-6 py-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white text-sm font-bold flex items-center gap-1.5">
              Live YouTube Search Engine Simulator
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest hidden sm:block">
              Niche Target: <span className="text-zinc-300 font-bold">{niche}</span>
            </p>
          </div>
        </div>

        {/* Viewport toggles */}
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 flex items-center">
            <button
              id="switch-viewport-desktop"
              onClick={() => setViewportMode("desktop")}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                viewportMode === "desktop"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Desktop View
            </button>
            <button
              id="switch-viewport-mobile"
              onClick={() => setViewportMode("mobile")}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                viewportMode === "mobile"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile Feed
            </button>
          </div>

          <button
            id="close-youtube-feed-modal"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main container grid splits controls & previews */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 p-4 sm:p-6">
        
        {/* Left Side: Real-time Modifier controls */}
        <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 sm:p-6 space-y-6 h-fit backdrop-blur-md">
          <div className="space-y-1.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Optimize Search Placement
            </h4>
            <p className="text-zinc-400 text-xs">
              Directly edit your candidate metadata here. The feed on the right will react dynamically to reflect updates.
            </p>
          </div>

          <div className="space-y-4">
            {/* Title Editing widget */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-zinc-500 uppercase block font-bold">Video Title Formulation</label>
              <input
                id="feed-input-title"
                type="text"
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Ex. 5 Secret Tools That Feel Illegal to Know"
                className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <span className="text-[10px] text-zinc-650 font-mono block text-right">{editedTitle.length} / 100 characters</span>
            </div>

            {/* Thumbnail Overlay Text Box */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-zinc-500 uppercase block font-bold font-sans">Active Thumbnail text Overlay</label>
              <input
                id="feed-input-overlay"
                type="text"
                value={editedThumbnailOverlay}
                onChange={(e) => setEditedThumbnailOverlay(e.target.value)}
                placeholder="Ex. DON'T MISSOUT!"
                className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <span className="text-[10px] text-orange-400/80 block leading-relaxed leading-[1.3] pt-0.5">
                Note: Aim for 1-4 short uppercase words in high saturation yellow or red neon to capture focus in tight feeds.
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-850" />

          {/* Real-time calculated CTR Predictor */}
          <div className="bg-zinc-950/60 border border-zinc-850 rounded-xl p-4 space-y-3">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">In-App CTR Competitive Prediction</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-white tracking-tight">{simulatedCTR.toFixed(1)}%</span>
              <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Rank high
              </span>
            </div>
            
            <div className={`p-2 rounded border text-[11px] font-medium ${ctrMeta.color}`}>
              {ctrMeta.text}
            </div>
          </div>

          {/* Live verify button link */}
          <div className="space-y-3 pt-2">
            <h5 className="text-[10px] font-mono text-zinc-500 uppercase font-black">Verify in Real World</h5>
            <a
              id="external-verify-youtube-link"
              href={getYouTubeSearchURL(searchQuery)}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-white font-bold text-xs flex items-center justify-center gap-2 group transition-all"
            >
              Search "{searchQuery.slice(0, 20)}..." on Live YouTube
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-[10px] text-zinc-600 font-mono leading-relaxed leading-[1.3] text-center">
              Opens active YouTube in a new tab with your exact target title to spy on your real-world competitor landscape directly!
            </p>
          </div>

        </div>

        {/* Right Side: Responsive YouTube Feed Display Stage */}
        <div className="lg:col-span-8 flex flex-col items-center bg-zinc-950 border border-zinc-905 rounded-3xl p-4 sm:p-6 overflow-hidden min-h-[500px]">
          
          {/* Simulated Search bar header */}
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-6 flex items-center gap-3 shrink-0">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={searchQuery}
              className="bg-transparent text-xs text-white focus:outline-none flex-1 border-none cursor-default font-normal"
            />
            <span className="text-[11px] py-1 px-2.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-full font-bold select-none cursor-not-allowed">
              Search
            </span>
          </div>

          {/* Rendering the simulated search result listings */}
          <div className={`w-full max-w-2xl overflow-y-auto space-y-6 flex-1 pr-1.5 ${
            viewportMode === "mobile" ? "max-w-[360px] border-x border-zinc-900 px-3 py-1 bg-zinc-950 rounded-2xl" : ""
          }`}>
            <div className="pb-2 border-b border-zinc-900 font-mono text-[10px] text-zinc-500 tracking-wider flex items-center justify-between">
              <span>About 4,120,000 results</span>
              <span>FILTER BY RELEVANCY</span>
            </div>

            {/* List entries */}
            <div className="space-y-6">
              
              {/* === ENTRY 1: YOUR PROPOSED VIDEO MOCKUP (RANKED #1 IN SEARCH SEED!) === */}
              <div className={`flex gap-4 group cursor-help transition-opacity ${
                viewportMode === "mobile" ? "flex-col gap-2" : "flex-row"
              }`}>
                {/* Proposed mock thumbnail card */}
                <div className={`relative bg-zinc-900 h-fit rounded-xl border border-indigo-500/30 overflow-hidden shrink-0 shadow-lg shadow-indigo-500/5 ${
                  viewportMode === "mobile" ? "w-full aspect-video" : "w-60 aspect-video"
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-zinc-900/60" />
                  
                  {/* Dynamic mock visual text */}
                  {editedThumbnailOverlay && (
                    <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center p-3 z-10">
                      <span className="px-2.5 py-1.5 bg-yellow-400 text-black text-[11px] sm:text-xs font-black tracking-tighter uppercase font-sans border border-black shadow-md shadow-black inline-block rotate-[-3deg]">
                        {editedThumbnailOverlay}
                      </span>
                    </div>
                  )}

                  {/* Thumbnail background conceptual guide info */}
                  <div className="absolute bottom-2 left-2 p-1.5 bg-black/70 rounded border border-zinc-800 backdrop-blur-sm">
                    <p className="text-[8px] leading-tight text-indigo-300 font-semibold max-w-[150px] line-clamp-1">
                      Concept: {thumbnailConcept}
                    </p>
                  </div>

                  {/* Timestamp bubble */}
                  <span className="absolute bottom-1 right-1.5 bg-black/85 text-[10px] font-mono text-white px-1.5 py-0.5 rounded font-bold">
                    8:44
                  </span>
                </div>

                {/* Proposed Mock info text content */}
                <div className="flex-1 space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5 inline-block font-bold mb-1">
                    🎯 YOUR SIMULATED HIGH-CTR CANDIDATE (EST. RANK #1)
                  </span>

                  <h3 className="text-white font-bold leading-snug text-sm sm:text-base group-hover:text-indigo-400 transition-colors pr-4 line-clamp-2">
                    {editedTitle || "Your Selected Optimized Title"}
                  </h3>

                  <div className="text-[11px] text-zinc-500 font-medium flex flex-wrap items-center gap-1.5">
                    <span className="text-zinc-300 font-bold flex items-center gap-1">
                      @{niche.trim().replace(/\s+/g, "") || "CreatorAI"}
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 fill-blue-500 text-[1px]" />
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-700" />
                    <span className="text-emerald-400 font-bold">High Potential</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-700" />
                    <span>0 hours ago (Pre-publish)</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 hidden sm:block">
                    {topic}. Automated faceless publishing kit. Generates tag-optimized SEO keywords, ElevenLabs voice scripts, viral title ideas, and high-CTR thumbnail prompts.
                  </p>
                </div>
              </div>

              {/* === ENTRY 2 & ONWARDS: COMPETITORS MOCKED REALISTICALLY BY NICHE INDICES === */}
              {competitors.map((comp) => (
                <div key={comp.id} className={`flex gap-4 group ${
                  viewportMode === "mobile" ? "flex-col gap-2" : "flex-row"
                }`}>
                  
                  {/* Competitor Thumbnail Mock */}
                  <div className={`relative bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shrink-0 ${
                    viewportMode === "mobile" ? "w-full aspect-video" : "w-60 aspect-video"
                  }`}>
                    {/* Simulated random thumbnail graphic backdrop color block */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 flex items-center justify-center">
                      <span className="text-[10px] text-zinc-650 uppercase font-mono font-bold tracking-widest text-center">
                        Competitor Video Asset
                      </span>
                    </div>

                    {/* Competitor overlay tag */}
                    <div className="absolute bottom-2.5 left-2 px-1.5 py-0.5 bg-black/75 rounded text-[8px] font-mono text-zinc-400 tracking-wider">
                      ESTABLISHED CHANNEL
                    </div>

                    {/* Duration timestamp */}
                    <span className="absolute bottom-1 right-1.5 bg-black/85 text-[10px] font-mono text-white px-1.5 py-0.5 rounded font-bold">
                      {comp.duration}
                    </span>
                  </div>

                  {/* Competitor Description */}
                  <div className="flex-1 space-y-1.5">
                    <h3 className="text-zinc-200 font-bold leading-snug text-sm sm:text-base group-hover:text-red-500 transition-colors pr-4 line-clamp-2">
                      {comp.title}
                    </h3>

                    <div className="text-[11px] text-zinc-500 font-medium flex flex-wrap items-center gap-1.5">
                      <span className="text-zinc-300 font-semibold">{comp.channelName}</span>
                      <CheckCircle className="w-3 h-3 text-zinc-500 shrink-0 fill-zinc-650 text-[1px]" />
                      <span className="h-1 w-1 rounded-full bg-zinc-700" />
                      <span>{comp.views}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-700" />
                      <span>{comp.published}</span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 hidden sm:block">
                      Discover the advanced parameters and step-by-step systems to rank higher. Join us as we evaluate the real mechanics of {topic} in this exclusive tutorial.
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Quick tips footer */}
          <div className="w-full max-w-2xl bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl mt-6 flex items-start gap-3 text-[11px] text-zinc-400 shrink-0 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p>
              <strong>Interactive Hack:</strong> Try editing the title overlay parameters in the left panel. Shorter titles with high-urgency triggers (like <i>"Shocking truth"</i>, <i>"Formula"</i>, <i>"Secret"</i>) lower user cognitive resistance and optimize simulated feed positions!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
