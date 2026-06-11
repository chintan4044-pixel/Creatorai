/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  DollarSign, 
  Flame, 
  Lightbulb, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Compass, 
  Layers, 
  Play, 
  Video, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Smile,
  Tv
} from "lucide-react";
import { NicheType, VideoType, SubscriptionPlan, UserProfile } from "../types";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const INDIAN_LANGUAGES: LanguageOption[] = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "en-IN", name: "English (Indian / Hinglish Accent)", nativeName: "Hinglish / English" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "गुजराती" },
  { code: "ben", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼િଆ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" }
];

interface SaasDashboardProps {
  user: UserProfile;
  onGenerate: (topic: string, niche: NicheType, videoType: VideoType, language: string) => Promise<void>;
  isGenerating: boolean;
  onUpgradeClick: () => void;
}

// Fun engaging tips that rotate during generation
const LOADING_CREATOR_TIPS = [
  "Analyzing trend velocity and retention matrices...",
  "Drafting a hook designed to prevent early doom-scrolling...",
  "Structuring conversational storytelling arc for high audience retention...",
  "Molding clickable thumbnail concept with high psychological trigger elements...",
  "Molding perfect voice characteristics for your selected niche...",
  "Injecting keyword SEO multipliers for the YouTube recommendation engine...",
  "Calculating voice synthesizer tone instructions for ElevenLabs..."
];

export default function SaasDashboard({ 
  user, 
  onGenerate, 
  isGenerating, 
  onUpgradeClick 
}: SaasDashboardProps) {
  const [topic, setTopic] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<NicheType | null>(null);
  const [selectedType, setSelectedType] = useState<VideoType>(VideoType.LONG_FORM);
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate tips
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_CREATOR_TIPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    if (!selectedNiche) return;

    onGenerate(topic.trim(), selectedNiche, selectedType, selectedLanguage);
  };

  const niches = [
    { type: NicheType.FINANCE, label: "Finance & Wealth", icon: DollarSign, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40" },
    { type: NicheType.MOTIVATION, label: "Motivation & Mind", icon: Flame, color: "text-orange-400 bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40" },
    { type: NicheType.FACTS, label: "Curiosity & Facts", icon: Lightbulb, color: "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40" },
    { type: NicheType.BUSINESS, label: "Business Strategy", icon: Briefcase, color: "text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40" },
    { type: NicheType.RELIGION, label: "Religion & Spiritual", icon: Compass, color: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40" },
    { type: NicheType.TECHNOLOGY, label: "Future Tech", icon: Cpu, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40" },
    { type: NicheType.EDUCATION, label: "Deep Education", icon: GraduationCap, color: "text-pink-400 bg-pink-500/10 border-pink-500/20 hover:border-pink-500/40" },
    { type: NicheType.COMEDY, label: "Comedy & Entertainment", icon: Smile, color: "text-rose-400 bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40" },
    { type: NicheType.CARTOON, label: "Children Cartoon", icon: Tv, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40" },
    { type: NicheType.OTHER, label: "Other / Creative", icon: Layers, color: "text-slate-400 bg-slate-500/10 border-slate-500/20 hover:border-slate-500/40" },
  ];

  const hasRemainingCredits = user.plan !== SubscriptionPlan.FREE || user.creditsRemaining > 0;

  return (
    <div id="saas-dashboard-container" className="max-w-4xl mx-auto space-y-8">
      {/* SaaS Welcome Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome Back, Creator <span className="animate-pulse">✨</span>
          </h2>
          <p className="text-zinc-400 text-sm">
            What is your channel ranking today? Enter any topic below to command CreatorAI.
          </p>
        </div>

        {/* Dynamic Credit Center widget */}
        <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase block">
              Daily Credits Remaining
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-zinc-100">
                {user.plan === SubscriptionPlan.FREE ? user.creditsRemaining : "∞"}
              </span>
              <span className="text-zinc-500 text-xs">/ {user.plan === SubscriptionPlan.FREE ? user.creditsMax : "∞"}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-white bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                {user.plan} Plan
              </span>
            </div>
            {user.plan === SubscriptionPlan.FREE ? (
              <button 
                id="dashboard-upgrade-btn"
                onClick={onUpgradeClick}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
              >
                Upgrade to Pro <Zap className="w-3 h-3 fill-indigo-400" />
              </button>
            ) : (
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Max Priority
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main SaaS Generator Form */}
      <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800/60 p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        {/* Glow gradients behind */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* Step 1: Input Topic */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              01. Enter your Video Topic
            </label>
            <div className="relative">
              <input
                id="topic-input-field"
                type="text"
                required
                disabled={isGenerating || !hasRemainingCredits}
                placeholder="e.g. 'How compound interest creates billionaires' or 'Unsolved mysteries of the deep sea'"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800 focus:border-indigo-500/80 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all font-sans text-base shadow-inner disabled:opacity-50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] bg-zinc-900/80 border border-zinc-800 text-zinc-500 font-mono px-2 py-1 rounded">
                ENTER TOPIC
              </span>
            </div>
          </div>

          {/* Step 2: Select Niche */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              02. Choose Your YouTube Channel Niche
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {niches.map((niche) => {
                const IconComponent = niche.icon;
                const isSelected = selectedNiche === niche.type;
                return (
                  <button
                    id={`niche-btn-${niche.type.toLowerCase()}`}
                    key={niche.type}
                    type="button"
                    disabled={isGenerating || !hasRemainingCredits}
                    onClick={() => setSelectedNiche(niche.type)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-indigo-600/10 border-indigo-500 scale-[1.02] shadow-lg shadow-indigo-500/10" 
                        : niche.color
                    } disabled:opacity-50`}
                  >
                    <IconComponent className={`w-5 h-5 mb-2 ${isSelected ? "text-indigo-400" : ""}`} />
                    <span className={`text-xs font-medium ${isSelected ? "text-white font-semibold" : "text-zinc-300"}`}>
                      {niche.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3 & 4: Format and Language Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            
            {/* Format Choice */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                03. Choose Video Format
              </label>
              <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800/80">
                <button
                  id="format-shorts-btn"
                  type="button"
                  disabled={isGenerating || !hasRemainingCredits}
                  onClick={() => setSelectedType(VideoType.SHORTS)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    selectedType === VideoType.SHORTS 
                      ? "bg-zinc-900 border border-zinc-800 text-white font-bold" 
                      : "text-zinc-500 hover:text-zinc-300"
                  } disabled:opacity-50`}
                >
                  <Video className="w-4 h-4 text-rose-500" />
                  Shorts (&lt; 60s)
                </button>
                <button
                  id="format-longform-btn"
                  type="button"
                  disabled={isGenerating || !hasRemainingCredits}
                  onClick={() => setSelectedType(VideoType.LONG_FORM)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    selectedType === VideoType.LONG_FORM 
                      ? "bg-zinc-900 border border-zinc-800 text-white font-bold" 
                      : "text-zinc-500 hover:text-zinc-300"
                  } disabled:opacity-50`}
                >
                  <Play className="w-4 h-4 text-emerald-500" />
                  Long-form (&gt; 5m)
                </button>
              </div>
            </div>

            {/* Indian Language Selection Dropdown */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                04. Choose Script Language
              </label>
              <div className="relative">
                <select
                  id="publish-language-selector"
                  value={selectedLanguage}
                  disabled={isGenerating || !hasRemainingCredits}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all font-sans text-xs sm:text-sm select-none"
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-zinc-950 text-white">
                      {lang.name} — {lang.nativeName}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 flex items-center gap-1.5 pr-1">
                  <Globe className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
            </div>

            {/* Simulated Action & Status details */}
            <div className="bg-zinc-950 rounded-xl border border-zinc-800/80 p-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  AI Production Est: ~5 seconds
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  CreatorAI generates 5 Viral Ideas, 10 Hooks, a Story-first Script, professional Thumbnail prompts, algorithmic SEO keyword collections, and voice directives in your exact selected language.
                </p>
              </div>
              <div className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                Gemini Multi-Model Active
              </div>
            </div>
          </div>

          {/* Warning state if credits empty */}
          {!hasRemainingCredits && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-white">Daily Credit Limit Exceeded!</p>
                <p className="text-zinc-400">
                  You have consumed your 3 complimentary generations for today. Upgrade to a Pro account for unlimited credits or try switching user subscription plans in the Profile tab.
                </p>
              </div>
            </motion.div>
          )}

          {/* Form Action Submit Button */}
          <div className="pt-2">
            <button
              id="generate-package-submit-btn"
              type="submit"
              disabled={isGenerating || !selectedNiche || !topic.trim() || !hasRemainingCredits}
              className={`w-full group relative py-4 rounded-xl text-sm font-bold tracking-wider text-white shadow-lg overflow-hidden flex items-center justify-center gap-2 transition-all ${
                isGenerating 
                  ? "bg-zinc-800 cursor-wait text-zinc-400" 
                  : !selectedNiche || !topic.trim() || !hasRemainingCredits
                  ? "bg-zinc-800 border border-zinc-700/60 text-zinc-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:shadow-indigo-500/25 active:scale-[0.98] cursor-pointer"
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin" />
                  Generating YouTube Package...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300 group-hover:scale-125 transition-transform" />
                  GENERATE COMPLETE PUBLISHING PACKAGE (1 Credit)
                </>
              )}
            </button>
          </div>
        </form>

        {/* Dynamic Generating Screen Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center space-y-6"
            >
              {/* Spinning creator circles */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-fuchsia-500 border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                />
                <Sparkles className="w-7 h-7 text-yellow-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Tips content */}
              <div className="space-y-2 max-w-md">
                <h3 className="text-white font-bold text-lg tracking-tight">
                  Crafting Algorithmic Gold...
                </h3>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tipIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-indigo-400 font-mono text-xs min-h-[36px]"
                  >
                    🚀 {LOADING_CREATOR_TIPS[tipIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-500">
                DO NOT REFRESH OR CLOSE THE APPMOBILE-READY
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
