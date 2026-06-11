/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Github, 
  Tv, 
  Layers, 
  BookOpen, 
  TrendingUp, 
  User, 
  Database,
  Briefcase,
  AlertCircle,
  Clock,
  LogOut,
  Info,
  ShieldAlert
} from "lucide-react";
import { 
  NicheType, 
  VideoType, 
  SubscriptionPlan, 
  UserProfile, 
  SavedGeneration, 
  YouTubePublishingPackage 
} from "./types";
import SaasDashboard from "./components/SaaSDashboard";
import AIPackageView from "./components/AIPackageView";
import SavedLibrary from "./components/SavedLibrary";
import AuthAndCredits from "./components/AuthAndCredits";
import AdminPanel from "./components/AdminPanel";

const PROFILE_LOCAL_KEY = "creator_ai_user_session_v1";
const ARCHIVE_LOCAL_KEY = "creator_ai_history_archive_v1";

const DEFAULT_USER: UserProfile = {
  email: "chintan70221@gmail.com",
  name: "Chintan",
  plan: SubscriptionPlan.FREE,
  creditsRemaining: 3,
  creditsMax: 3,
  channelsJoined: ["FinanceHustle", "FactsLab"]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"generate" | "vault" | "pricing" | "admin">("generate");
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [history, setHistory] = useState<SavedGeneration[]>([]);
  const [activePackage, setActivePackage] = useState<YouTubePublishingPackage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hidden admin 7-click unlock tracking states
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem("creators_ai_admin_unlocked") === "true";
  });
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Load state from localStorage on init
  useEffect(() => {
    const rawUser = localStorage.getItem(PROFILE_LOCAL_KEY);
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        // Automatically migrate any legacy fallback user emails to the secure admin email on refresh
        if (parsed.email === "creator@youtube.studio") {
          parsed.email = "chintan70221@gmail.com";
          localStorage.setItem(PROFILE_LOCAL_KEY, JSON.stringify(parsed));
        }
        setUser(parsed);
      } catch (err) {
        console.error("Failed to parse local stored user.", err);
      }
    } else {
      localStorage.setItem(PROFILE_LOCAL_KEY, JSON.stringify(DEFAULT_USER));
    }
    const rawHistory = localStorage.getItem(ARCHIVE_LOCAL_KEY);
    if (rawHistory) {
      try {
        setHistory(JSON.parse(rawHistory));
      } catch (err) {
        console.error("Failed to parse local stored archive.", err);
      }
    }
  }, []);

  // Secure admin routing guard to redirect unauthorized sessions automatically
  useEffect(() => {
    if (activeTab === "admin" && (user.email !== "chintan70221@gmail.com" || !isAdminUnlocked)) {
      setActiveTab("generate");
    }
  }, [activeTab, user.email, isAdminUnlocked]);

  // Handle logo 7-click security trigger sequence
  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 7) {
      setLogoClicks(0);
      setShowAdminLoginModal(true);
    }
  };

  // Save updates to localStorage
  const saveUserSession = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem(PROFILE_LOCAL_KEY, JSON.stringify(updatedUser));
  };

  const saveHistoryArchive = (updatedHistory: SavedGeneration[]) => {
    setHistory(updatedHistory);
    localStorage.setItem(ARCHIVE_LOCAL_KEY, JSON.stringify(updatedHistory));
  };

  // Main Generation Action Handler
  const handleGeneratePackage = async (topic: string, niche: NicheType, videoType: VideoType, language: string) => {
    // Check credit restrictions first
    if (user.plan === SubscriptionPlan.FREE && user.creditsRemaining <= 0) {
      setErrorMessage("No credits remaining! Upgrade to Pro for unlimited priority generations or switch plans in the Profile tab.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setActivePackage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, niche, videoType, language })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || "Server response failed");
      }

      const packageData: YouTubePublishingPackage = await response.json();
      
      // Successfully generated content!
      setActivePackage(packageData);

      // Decrement credits if on Free plan AND not in fallback mode
      if (user.plan === SubscriptionPlan.FREE && !packageData.isFallback) {
        saveUserSession({
          ...user,
          creditsRemaining: Math.max(0, user.creditsRemaining - 1)
        });
      }

    } catch (err: any) {
      console.error("Generation API Failed.", err);
      setErrorMessage(err.message || "Something went wrong inside the AI Generation pipeline. Please check your credentials or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToVault = () => {
    if (!activePackage) return;
    
    // Check if copy is already saved to avoid duplicates
    const alreadySaved = history.some((item) => item.packageData.topic === activePackage.topic && item.packageData.videoType === activePackage.videoType);
    if (alreadySaved) {
      alert("This exact package is already stored in your library vault!");
      return;
    }

    const newRecord: SavedGeneration = {
      id: Math.random().toString(36).substring(3, 11),
      topic: activePackage.topic,
      niche: activePackage.niche,
      videoType: activePackage.videoType,
      dateTime: new Date().toISOString(),
      packageData: activePackage
    };

    saveHistoryArchive([newRecord, ...history]);
  };

  const isCurrentPackageSaved = () => {
    if (!activePackage) return false;
    return history.some((item) => item.packageData.topic === activePackage.topic && item.packageData.videoType === activePackage.videoType);
  };

  const handleDeleteHistory = (id: string) => {
    saveHistoryArchive(history.filter((item) => item.id !== id));
  };

  const handleSelectHistoryItem = (item: SavedGeneration) => {
    setActivePackage(item.packageData);
    setActiveTab("generate"); // Slide view back to main generator tab to inspect loading values
  };

  const handleChangePlan = (newPlan: SubscriptionPlan) => {
    saveUserSession({
      ...user,
      plan: newPlan,
      creditsRemaining: newPlan === SubscriptionPlan.FREE ? 3 : 9999,
      creditsMax: newPlan === SubscriptionPlan.FREE ? 3 : 9999
    });
  };

  const handleUpdateChannels = (updatedChannels: string[]) => {
    saveUserSession({
      ...user,
      channelsJoined: updatedChannels
    });
  };

  const handleResetCredits = () => {
    saveUserSession({
      ...user,
      creditsRemaining: 3
    });
  };

  return (
    <div id="creator-app-root" className="min-h-screen bg-[#09090c] text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Outer ambient glow mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[180px] rounded-full pointer-events-none" />
      
      {/* SaaS Main Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => { 
              setActiveTab("generate"); 
              setActivePackage(null); 
              handleLogoClick(); 
            }}
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent transform hover:scale-[1.01] transition-transform flex items-center gap-1.5 leading-none">
                CreatorAI
              </h1>
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 block uppercase font-bold">
                Faceless SaaS Engine
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id="nav-tab-generate"
              onClick={() => setActiveTab("generate")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                activeTab === "generate" 
                  ? "bg-zinc-900 border border-zinc-800 text-white shadow-sm" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              SaaS Dashboard
            </button>

            <button
              id="nav-tab-vault"
              onClick={() => setActiveTab("vault")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                activeTab === "vault" 
                  ? "bg-zinc-900 border border-zinc-800 text-white shadow-sm" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
              My Vault
              {history.length > 0 && (
                <span className="bg-zinc-950 font-mono text-[10px] text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/15">
                  {history.length}
                </span>
              )}
            </button>

            <button
              id="nav-tab-pricing"
              onClick={() => setActiveTab("pricing")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                activeTab === "pricing" 
                  ? "bg-zinc-900 border border-zinc-800 text-white shadow-sm" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Plans & Billing
            </button>

            {isAdminUnlocked && user.email === "chintan70221@gmail.com" && (
              <button
                id="nav-tab-admin"
                onClick={() => setActiveTab("admin")}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                  activeTab === "admin" 
                    ? "bg-zinc-900 border border-zinc-800 text-white shadow-sm" 
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
                Admin
              </button>
            )}
          </nav>

          {/* Connected Handle Status Profile Display */}
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 block font-semibold leading-tight">{user.plan} Account</span>
              <span className="text-xs font-semibold text-zinc-300">
                {user.name}
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 border border-indigo-500/30 flex items-center justify-center">
              <User className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main SaaS Canvas Frame Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10 leading-relaxed font-sans">
        
        {/* API Error Notification Alerts */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3 relative max-w-4xl mx-auto"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-red-400">AI Pipe Error</h4>
                <p className="text-zinc-300">
                  {errorMessage}
                </p>
                <p className="text-[10px] text-zinc-500 pt-1 font-mono">
                  Troubleshoot: We bypassed real gateway failures. You can still test standard package mechanics automatically inside the mock interface by entering key topics.
                </p>
              </div>
              <button
                id="dismiss-global-alert"
                onClick={() => setErrorMessage(null)}
                className="absolute top-2 right-3 text-zinc-500 hover:text-white font-mono text-xs cursor-pointer select-none"
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Displays */}
        <div id="saas-tab-view-panels">
          
          {/* Tab 1: Creator Dashboard Form & Publishing Package Output */}
          {activeTab === "generate" && (
            <div className="space-y-8">
              {/* If we have active output generated, display the AIPackageView at the top, allowing them to dismiss or generate new */}
              {activePackage ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between max-w-4xl mx-auto border-b border-zinc-900 pb-2">
                    <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                      YOUTUBE CREATOR KIT SUCCESSFULLY COMPILED
                    </span>
                    <button
                      id="reset-dashboard-to-form-btn"
                      onClick={() => { setActivePackage(null); setErrorMessage(null); }}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg select-none cursor-pointer"
                    >
                      ← Generate Another Topic
                    </button>
                  </div>

                  <AIPackageView 
                    packageData={activePackage} 
                    onSaveToLibrary={handleSaveToVault} 
                    isSaved={isCurrentPackageSaved()}
                  />
                </div>
              ) : (
                <SaasDashboard
                  user={user}
                  onGenerate={handleGeneratePackage}
                  isGenerating={isGenerating}
                  onUpgradeClick={() => setActiveTab("pricing")}
                />
              )}
            </div>
          )}

          {/* Tab 2: Saved History Vault */}
          {activeTab === "vault" && (
            <SavedLibrary
              savedItems={history}
              onSelect={handleSelectHistoryItem}
              onDelete={handleDeleteHistory}
            />
          )}

          {/* Tab 3: Auth, Credits sandbox & upgrade plans */}
          {activeTab === "pricing" && (
            <AuthAndCredits
              user={user}
              onChangePlan={handleChangePlan}
              onUpdateChannels={handleUpdateChannels}
              onResetCredits={handleResetCredits}
              onAddCredits={() => {}}
              onUpdateProfileDetails={saveUserSession}
            />
          )}

          {/* Tab 4: Administrator Management Console */}
          {activeTab === "admin" && isAdminUnlocked && user.email === "chintan70221@gmail.com" && (
            <AdminPanel
              currentUser={user}
              onUpdateCurrentUser={saveUserSession}
              onLockConsole={() => {
                setIsAdminUnlocked(false);
                localStorage.removeItem("creators_ai_admin_unlocked");
                setActiveTab("generate");
              }}
            />
          )}

        </div>
      </main>

      {/* Admin Credentials Login Modal */}
      <AnimatePresence>
        {showAdminLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className="bg-zinc-950 border border-zinc-805 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center justify-center mx-auto mb-2">
                  <ShieldAlert className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
                <h3 className="text-white text-sm font-bold">Unlocking Master Console</h3>
                <p className="text-zinc-450 text-[11px] leading-relaxed">
                  Enter administrative keys to verify authority. Unauthorized sessions are completely hidden.
                </p>
              </div>

              {adminLoginError && (
                <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-red-450 text-xs text-center font-semibold animate-shake">
                  {adminLoginError}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAdminLoginError(null);
                  if (adminEmailInput.trim() === "chintan70221@gmail.com" && adminPasswordInput.trim() === "Chintan@4044") {
                    setIsAdminUnlocked(true);
                    localStorage.setItem("creators_ai_admin_unlocked", "true");
                    setShowAdminLoginModal(false);
                    setAdminEmailInput("");
                    setAdminPasswordInput("");
                    setActiveTab("admin");
                  } else {
                    setAdminLoginError("Invalid ID or Password! Access prohibited.");
                  }
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono font-bold block">Administrator ID (Email)</label>
                  <input
                    type="email"
                    required
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    placeholder="E.g. admin@facts.studio"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-505 placeholder-zinc-650 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono font-bold block">Master Password</label>
                  <input
                    type="password"
                    required
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-505 placeholder-zinc-650 transition-colors font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLoginModal(false);
                      setAdminEmailInput("");
                      setAdminPasswordInput("");
                      setAdminLoginError(null);
                    }}
                    className="w-full py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 font-bold font-sans transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-sans shadow-lg shadow-indigo-600/10 transition-colors cursor-pointer text-center"
                  >
                    Verify & Unlock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Aesthetic SaaS footer */}
      <footer className="border-t border-zinc-950 mt-20 bg-[#070709] py-12 relative z-10 text-xs text-zinc-600 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-400 font-sans font-bold text-sm">CreatorAI Platform</span>
            </div>
            <p className="text-[11px] leading-relaxed max-w-sm text-zinc-500 font-sans">
              Deploy creator packages in one click. Tailored to help faceless and educational automation networks scale production.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-zinc-500">
            <span className="text-zinc-500">Server Status: <span className="text-emerald-400">Node v22 Premium</span></span>
            <span className="text-zinc-500">Database Engine: <span className="text-indigo-400">Active Storage</span></span>
            <span className="text-zinc-500">Cloud Run Service: <span className="text-fuchsia-400">Ready</span></span>
          </div>

          <p className="text-[11px] text-zinc-650">
            &copy; 22026-06-11 CreatorAI Inc. Released under Apache-2.0.
          </p>
        </div>
      </footer>

    </div>
  );
}
