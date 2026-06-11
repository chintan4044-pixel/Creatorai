/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { 
  Share2, 
  Youtube, 
  Instagram, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  MessageCircle, 
  Heart, 
  ThumbsUp, 
  ThumbsDown, 
  Bookmark, 
  Send, 
  Layers, 
  User, 
  Flame, 
  Info,
  CheckCircle,
  MoreHorizontal
} from "lucide-react";
import { YouTubePublishingPackage } from "../types";

interface SocialSharePreviewProps {
  packageData: YouTubePublishingPackage;
}

type PlatformType = "community" | "instagram";
type TemplateStyle = "teaser" | "breakdown" | "seo";

export default function SocialSharePreview({ packageData }: SocialSharePreviewProps) {
  const [platform, setPlatform] = useState<PlatformType>("community");
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>("teaser");
  const [postText, setPostText] = useState("");
  const [customName, setCustomName] = useState("Creator Architect");
  const [customHandle, setCustomHandle] = useState("creator_pro");
  const [copied, setCopied] = useState(false);

  // Suggested preset values
  const firstTitle = packageData.viralIdeas?.[0]?.title || "My Script Title";
  const primaryHook = packageData.hooks?.[0]?.hookText || "I failed 100 times before figuring this out...";
  const optimizedTitle = packageData.seoPackage?.optimizedTitle || firstTitle;
  const rawDescription = packageData.seoPackage?.videoDescription || "";
  const nicheName = packageData.niche || "Content Creator";
  const hashtags = packageData.seoPackage?.hashtags || ["#youtube", "#contentcreator"];

  // Generates different prefilled texts based on chosen styles
  const templates = useMemo(() => {
    const formattedHashtags = hashtags.map(h => h.startsWith("#") ? h : `#${h}`).join(" ");
    
    return {
      teaser: `🚨 NEW VIDEO DROPPING SOON 🚨\n\nI'm publishing a raw video about "${packageData.topic}" within the ${nicheName} space.\n\nHere is the hook we're opening with:\n"${primaryHook}"\n\nThis is designed to break retention baselines. What do you think of this angle? 👇\n\n${formattedHashtags}`,
      breakdown: `How I structured my next ${packageData.videoType} about "${packageData.topic}":\n\n1️⃣ Hook Strategy: ${packageData.hooks?.[0]?.strategy || "Curiosity Gap"}\n2️⃣ Proposed Title: "${firstTitle}"\n3️⃣ Recommended Voice Tone: ${packageData.voiceInstructions?.tone || "Authoritative"}\n\nBuilt entirely with algorithmic precision inside creatorAI. Ready for production! 🎬\n\n${formattedHashtags}`,
      seo: `📈 Video SEO Analysis: ${optimizedTitle}\n\nJust completed an in-depth video planning blueprint for our ${packageData.language || "Hindi"} audience, optimizing for low competitive organic search volumes.\n\nDescription summary:\n"${rawDescription.slice(0, 110)}..."\n\nKeyword targeting is live! 🚀\n\n${formattedHashtags}`
    };
  }, [packageData, firstTitle, primaryHook, optimizedTitle, rawDescription, nicheName, hashtags]);

  // Handle template or change effects
  useEffect(() => {
    setPostText(templates[templateStyle]);
  }, [templateStyle, templates]);

  const handleCopyPost = () => {
    navigator.clipboard.writeText(postText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentLength = postText.length;

  return (
    <div id="social-share-preview-widget" className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
      
      {/* Widget Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-4 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <Share2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-tight flex items-center gap-1.5">
              Creator Distribution Lab
              <span className="text-[10px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-medium">
                Distribution Suite
              </span>
            </h3>
            <p className="text-zinc-400 text-xs mt-0.5">
              Test promotional draft hooks on social channels before taking video into rendering rooms.
            </p>
          </div>
        </div>

        {/* Platform selection pills */}
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-850 self-start sm:self-auto">
          <button
            id="tab-toggle-community"
            onClick={() => setPlatform("community")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              platform === "community"
                ? "bg-zinc-800 text-white border border-zinc-700/50"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            YouTube Community
          </button>
          <button
            id="tab-toggle-instagram"
            onClick={() => setPlatform("instagram")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              platform === "instagram"
                ? "bg-zinc-800 text-white border border-zinc-700/50"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            Instagram Feed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Post Composer / Customizers */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Header Title */}
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              Draft Post Settings
            </span>

            {/* Template selector */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-mono">Select Feed Template Style</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="template-teaser-btn"
                  onClick={() => setTemplateStyle("teaser")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center ${
                    templateStyle === "teaser"
                      ? "bg-indigo-600/10 border-indigo-500 text-indigo-300"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Hook Teaser
                </button>
                <button
                  id="template-breakdown-btn"
                  onClick={() => setTemplateStyle("breakdown")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center ${
                    templateStyle === "breakdown"
                      ? "bg-indigo-600/10 border-indigo-500 text-indigo-300"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Script Arc
                </button>
                <button
                  id="template-seo-btn"
                  onClick={() => setTemplateStyle("seo")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center ${
                    templateStyle === "seo"
                      ? "bg-indigo-600/10 border-indigo-500 text-indigo-300"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  SEO Focus
                </button>
              </div>
            </div>

            {/* Custom identity fields */}
            <div className="grid grid-cols-2 gap-3 pb-1">
              <div className="space-y-1">
                <label className="text-zinc-400 text-xs font-mono">Channel Name</label>
                <input
                  id="social-custom-name-input"
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-zinc-600 transition-colors/20 font-semibold"
                  placeholder="E.g. Creator Architect"
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-400 text-xs font-mono">Social Handle</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-zinc-500 font-mono">@</span>
                  <input
                     id="social-custom-handle-input"
                    type="text"
                    value={customHandle}
                    onChange={(e) => setCustomHandle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-6 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-zinc-600 transition-colors/20 font-semibold"
                    placeholder="creator_pro"
                  />
                </div>
              </div>
            </div>

            {/* Live Text Area editor */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-zinc-400">Edit Promotion Copy</label>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">
                    {currentLength} chars
                  </span>
                </div>
              </div>
              <textarea
                id="social-draft-textarea"
                rows={6}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-zinc-200 outline-none resize-none font-sans leading-relaxed transition-colors"
                placeholder="Write your promo text here..."
              />
            </div>
          </div>

          {/* Call-to-actions controls */}
          <div className="space-y-3 pt-3 lg:border-t lg:border-zinc-800/60 mt-4 lg:mt-0">
            <div className="flex items-center gap-3">
              <button
                id="btn-copy-social-post"
                onClick={handleCopyPost}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white select-none transition-all cursor-pointer shadow-lg shadow-indigo-600/15 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-indigo-100" />
                    Copied Draft!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Formatted Draft
                  </>
                )}
              </button>

              <button
                id="btn-regen-social-copy"
                onClick={() => setPostText(templates[templateStyle])}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer active:scale-95"
                title="Reset/Regenerate Draft"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live High-Fidelity Mock Card Preview (YouTube & Instagram) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Feed Rendering Simulation
            </span>

            {/* Switch on layout mode */}
            {platform === "community" ? (
              
              /* ====== YOUTUBE COMMUNITY RENDERER CARD ====== */
              <div className="bg-[#0f0f0f] border border-zinc-850 rounded-2xl p-4 sm:p-5 text-white text-sm font-sans space-y-4">
                
                {/* Channel Header (YouTube Style) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-white shrink-0 shadow-lg">
                      {customName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="leading-tight">
                      <div className="flex items-center gap-1 font-bold text-[14px] hover:text-zinc-250 cursor-pointer">
                        {customName}
                        <CheckCircle className="w-3.5 h-3.5 fill-current text-zinc-400 text-[#0f0f0f]" />
                      </div>
                      <div className="text-zinc-450 text-[11px] font-mono">@{customHandle} • 12 hours ago</div>
                    </div>
                  </div>
                  
                  <button className="text-zinc-400 hover:text-white p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Post Body text */}
                <div className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-zinc-200 pl-1">
                  {postText || "Start typing in the composer to draft your social announcement card!"}
                </div>

                {/* Simulated YouTube Video card attachment */}
                <div className="border border-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-900/30 transition-colors cursor-pointer group">
                  <div className="aspect-video bg-zinc-950 relative flex items-center justify-center border-b border-zinc-800">
                    <div className="absolute inset-0 bg-cover bg-center brightness-50 opacity-40 filter blur-sm" style={{ backgroundColor: "#1c1c1f" }} />
                    <div className="z-10 text-center p-4 max-w-sm space-y-2">
                      <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none shadow">
                        Upcoming Video Preview
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight drop-shadow-md">
                        {packageData.thumbnail?.textOverlay || firstTitle}
                      </h4>
                      <p className="text-[9px] text-zinc-450">
                        Niche Concept: {nicheName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-zinc-900/60 flex items-center justify-between">
                    <div>
                      <div className="text-zinc-200 text-xs font-bold line-clamp-1 group-hover:text-red-400 transition-colors">
                        {optimizedTitle}
                      </div>
                      <p className="text-zinc-550 text-[11px] font-mono mt-0.5">
                        Blueprint Target: Language {packageData.language || "Hindi"}
                      </p>
                    </div>
                    <span className="text-[10px] bg-red-600/10 border border-red-500/20 text-red-400 font-bold px-2 py-1 rounded">
                      GO STUDY
                    </span>
                  </div>
                </div>

                {/* YouTube community style toolbar action metrics */}
                <div className="flex items-center gap-6 text-zinc-400 text-xs border-t border-zinc-900 pt-3.5 select-none pl-1">
                  <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>234</span>
                  </span>
                  
                  <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </span>

                  <span className="flex items-center gap-1.5 hover:text-red-400 cursor-pointer transition-colors">
                    <Heart className="w-4.5 h-4.5 text-red-500/80 fill-current" />
                  </span>

                  <span className="flex items-center gap-2 ml-auto hover:text-white cursor-pointer transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>42 Comments</span>
                  </span>
                </div>

              </div>
              
            ) : (
              
              /* ====== INSTAGRAM PROFILE RENDERER CARD ====== */
              <div className="bg-[#000000] border border-zinc-850 rounded-2xl p-4 text-white font-sans space-y-3.5 shadow-xl relative overflow-hidden">
                
                {/* Insta profile header line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Ring border simulation for Instagram stories */}
                    <div className="p-[2.3px] bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-600 rounded-full">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center font-bold text-xs shrink-0 text-zinc-350">
                        {customName.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="leading-tight">
                      <div className="flex items-center gap-1 font-bold text-xs hover:text-zinc-250 cursor-pointer">
                        {customHandle}
                        <CheckCircle className="w-3.5 h-3.5 fill-current text-sky-400 text-[#000000]" />
                      </div>
                      <p className="text-zinc-500 text-[9px] font-mono mt-0.5">Algorithmic Studio Space</p>
                    </div>
                  </div>

                  <button className="text-zinc-400 hover:text-white p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Aspect-square Instagram High-Fidelity preview square */}
                <div className="aspect-square bg-gradient-to-br from-indigo-950 via-zinc-950 to-purple-950 rounded-xl relative overflow-hidden border border-zinc-900 flex flex-col justify-between p-6 shadow-2xl relative select-none">
                  
                  {/* Absolute subtle background ambient grid pattern */}
                  <div className="absolute inset-x-0 top-0 h-full w-full opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* Brand header */}
                  <div className="flex items-center justify-between z-10 w-full">
                    <span className="text-[10px] bg-white/10 text-white border border-white/20 font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {nicheName} Target
                    </span>
                    <span className="text-[10px] text-fuchsia-400 font-mono font-bold uppercase tracking-wider">
                      creatorAI v3
                    </span>
                  </div>

                  {/* Dynamic centered concept text */}
                  <div className="z-10 text-center space-y-2 py-4">
                    <span className="text-[9px] text-[#A5B4FC] uppercase tracking-widest font-mono font-bold block">CONCEPT THUMBNAIL OVERLAY</span>
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight filter drop-shadow-md px-1 select-all">
                      "{packageData.thumbnail?.textOverlay || firstTitle}"
                    </h4>
                    <span className="text-[10px] text-zinc-400 max-w-xs mx-auto block leading-normal italic px-4">
                      Emotional target point: {packageData.thumbnail?.emotionalTrigger || "Curiosity Peak"}
                    </span>
                  </div>

                  {/* Lower visual context bar */}
                  <div className="z-10 bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/5 w-full flex items-center justify-between flex-wrap gap-2">
                    <div className="text-left">
                      <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold block leading-none">TARGET LANGUAGE</span>
                      <span className="text-xs font-bold text-white font-mono">{packageData.language || "Hindi"}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold block leading-none">PRIMARY ANGLE</span>
                      <span className="text-xs font-bold text-amber-400">{packageData.hooks?.[0]?.strategy || "Open-Loop Link"}</span>
                    </div>
                  </div>

                </div>

                {/* Insta Like, comment, DM, Bookmark action buttons */}
                <div className="flex items-center justify-between text-zinc-200 text-xs px-1 select-none">
                  <div className="flex items-center gap-4">
                    <button className="hover:text-pink-500 transition-colors">
                      <Heart className="w-5 h-5 hover:scale-[1.1] transition-transform" />
                    </button>
                    <button className="hover:text-white transition-colors">
                      <MessageCircle className="w-5 h-5 hover:scale-[1.1] transition-transform" />
                    </button>
                    <button className="hover:text-white transition-colors">
                      <Send className="w-5 h-5 hover:scale-[1.1] transition-transform" />
                    </button>
                  </div>

                  <button className="hover:text-white transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                {/* Caption display starting with bold handle */}
                <div className="text-[12.5px] leading-relaxed text-zinc-100 px-1 space-y-1">
                  <p>
                    <strong className="text-white mr-1.5 hover:underline cursor-pointer">@{customHandle}</strong>
                    {postText || "Draft your announcement in the composer to view the Instagram simulation."}
                  </p>
                  
                  <div className="text-[10px] uppercase font-semibold text-zinc-500 font-mono pt-1">
                    View all 14 comments
                  </div>
                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}
