/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  ShieldCheck, 
  Users, 
  Terminal, 
  Settings, 
  Activity, 
  TrendingUp, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Sliders, 
  Coins, 
  ArrowUpRight, 
  Check, 
  Power, 
  Flame, 
  AlertTriangle, 
  Radio, 
  Database,
  Cpu,
  Tv,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
  Globe
} from "lucide-react";
import { UserProfile, SubscriptionPlan, NicheType } from "../types";

interface AdminPanelProps {
  currentUser: UserProfile;
  onUpdateCurrentUser: (updated: UserProfile) => void;
  onLockConsole?: () => void;
}

interface SimulatedUser {
  id: string;
  name: string;
  email: string;
  plan: SubscriptionPlan;
  creditsRemaining: number;
  creditsMax: number;
  joinedChannelsCount: number;
  status: "active" | "dormant";
  avatarColor: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
  source: string;
  message: string;
}

const PRESET_MOCK_USERS: SimulatedUser[] = [
  { id: "usr-1", name: "Ananya Sharma", email: "ananya@facts.studio", plan: SubscriptionPlan.PRO, creditsRemaining: 9999, creditsMax: 9999, joinedChannelsCount: 3, status: "active", avatarColor: "from-amber-550 to-orange-500" },
  { id: "usr-2", name: "Marc Dubois", email: "marc.dubois@financeguru.co", plan: SubscriptionPlan.TEAM, creditsRemaining: 9999, creditsMax: 9999, joinedChannelsCount: 5, status: "active", avatarColor: "from-blue-500 to-indigo-600" },
  { id: "usr-3", name: "Kenji Sato", email: "sato@techloops.jp", plan: SubscriptionPlan.FREE, creditsRemaining: 1, creditsMax: 3, joinedChannelsCount: 1, status: "dormant", avatarColor: "from-emerald-500 to-teal-600" },
  { id: "usr-4", name: "Sarah Jenkins", email: "sjenkins@motivationhub.com", plan: SubscriptionPlan.PRO, creditsRemaining: 9540, creditsMax: 9999, joinedChannelsCount: 2, status: "active", avatarColor: "from-purple-500 to-pink-600" },
  { id: "usr-5", name: "Rajesh Patel", email: "rajesh@religioninsights.in", plan: SubscriptionPlan.FREE, creditsRemaining: 3, creditsMax: 3, joinedChannelsCount: 0, status: "active", avatarColor: "from-rose-500 to-red-600" }
];

const INITIAL_LOGS: SystemLog[] = [
  { id: "log-1", timestamp: "06:41:05", level: "INFO", source: "AuthGateway", message: "User session validated for chintan70221@gmail.com. Local IP verified." },
  { id: "log-2", timestamp: "06:41:23", level: "SUCCESS", source: "PredictiveModel", message: "Compiled viral suitability score index. Current Score: 86%. Active." },
  { id: "log-3", timestamp: "06:42:01", level: "INFO", source: "CronScheduler", message: "Initiated sync of joined channels for registered Creator profiles." },
  { id: "log-4", timestamp: "06:44:12", level: "WARNING", source: "GeminiAPI", message: "High demand spike detected on gemini-3.5-flash. Automatically queued. latency (2.8s)." },
  { id: "log-5", timestamp: "06:46:04", level: "CRITICAL", source: "GeminiAPI", message: "Call failed with 503 Service Unavailable on primary model. Invoking multi-model fallback protocol." },
  { id: "log-6", timestamp: "06:46:05", level: "SUCCESS", source: "ModelFallback", message: "Fallback request successful using gemini-3.1-flash-lite (1,840 output tokens)." }
];

export default function AdminPanel({ currentUser, onUpdateCurrentUser, onLockConsole }: AdminPanelProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<"overview" | "users" | "cpm" | "logs">("overview");
  
  // Real Local state to allow real edits/mutation on the visual panel
  const [userList, setUserList] = useState<SimulatedUser[]>(PRESET_MOCK_USERS);
  const [logs, setLogs] = useState<SystemLog[]>(INITIAL_LOGS);
  
  // Create creator modal or parameters
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPlan, setNewUserPlan] = useState<SubscriptionPlan>(SubscriptionPlan.FREE);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  
  // CPM adjust parameters
  const [cpmMultipliers, setCpmMultipliers] = useState<Record<string, number>>({
    Finance: 3.8,
    Motivation: 2.1,
    Technology: 3.5,
    Facts: 1.8,
    Business: 2.9,
    Religion: 1.2,
    Education: 2.4,
    "Comedy & Entertainment": 2.5,
    "Children Cartoon Content": 3.0,
    Other: 1.5
  });

  // Model settings state
  const [preferredModel, setPreferredModel] = useState("gemini-3.5-flash");
  const [aiTemperature, setAiTemperature] = useState(0.7);
  const [enableFallback, setEnableFallback] = useState(true);
  const [strictScoring, setStrictScoring] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search filter for lists
  const [userSearch, setUserSearch] = useState("");

  // Setup brief auto-toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keep logs streaming mock simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const logSources = ["GeminiAPI", "AuthGateway", "VectorDecoder", "ContentRender", "SEOPackager", "CDN_Server"];
      const messages = [
        "Flushed local memory cache for generation thread pool.",
        "System state healthy. Average API latency is within 1.25s parameters.",
        "Synchronized historical archives with localStorage client vault.",
        "Optimized CTR indexing multiplier for high-growth niche channels.",
        "Ping request received from development application. Status: OK.",
        "Synthesized B-Roll motion graphics keywords for next compilation.",
        "User modified preferred AI model configurations to match active load limits."
      ];
      const levels = ["INFO", "SUCCESS", "INFO", "INFO", "SUCCESS"] as const;
      
      const randomSource = logSources[Math.floor(Math.random() * logSources.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      const newLog: SystemLog = {
        id: `log-dyn-${Math.random().toString(36).substring(3, 8)}`,
        timestamp: timeStr,
        level: randomLevel,
        source: randomSource,
        message: randomMsg
      };

      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const totalSimulatedPremium = userList.filter(u => u.plan !== SubscriptionPlan.FREE).length;
    const currentIsPremium = currentUser.plan !== SubscriptionPlan.FREE ? 1 : 0;
    const premiumRatio = ((totalSimulatedPremium + currentIsPremium) / (userList.length + 1) * 100).toFixed(1);
    
    // Sum pseudo credits
    const totalRemainingCredits = userList.reduce((sum, u) => sum + (u.plan === SubscriptionPlan.FREE ? u.creditsRemaining : 10), 0) + currentUser.creditsRemaining;
    
    return {
      totalActiveAccounts: userList.length + 1,
      premiumRate: `${premiumRatio}%`,
      mrr: `$${(totalSimulatedPremium * 49 + currentIsPremium * 49).toLocaleString()}`,
      latency: "1.24s",
      remainingCredits: totalRemainingCredits
    };
  }, [userList, currentUser]);

  // Handle CRUD operation edits directly
  const handleTogglePlan = (id: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === id) {
        const nextPlan = u.plan === SubscriptionPlan.FREE ? SubscriptionPlan.PRO : SubscriptionPlan.FREE;
        showToast(`Updated ${u.name}'s plan to ${nextPlan}`);
        return {
          ...u,
          plan: nextPlan,
          creditsRemaining: nextPlan === SubscriptionPlan.PRO ? 9999 : 3,
          creditsMax: nextPlan === SubscriptionPlan.PRO ? 9999 : 3,
          status: "active" as const
        };
      }
      return u;
    }));
  };

  const handleEditCredits = (id: string, amount: number) => {
    setUserList(prev => prev.map(u => {
      if (u.id === id) {
        const limitSetting = u.plan === SubscriptionPlan.FREE ? 10 : 9999;
        const newCredits = Math.min(limitSetting, Math.max(0, u.creditsRemaining + amount));
        showToast(`Adjusted creator credits allocated: ${newCredits}`);
        return {
          ...u,
          creditsRemaining: newCredits
        };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to de-register Creator profile: ${name}?`)) {
      setUserList(prev => prev.filter(u => u.id !== id));
      showToast(`De-registered ${name} from platform database.`);
    }
  };

  const handleCreateMockUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert("Please provide a valid creator name and contact email!");
      return;
    }

    const availableColors = [
      "from-orange-500 to-amber-500",
      "from-rose-500 to-red-650",
      "from-indigo-600 to-sky-500",
      "from-purple-500 to-fuchsia-400",
      "from-teal-600 to-emerald-400"
    ];

    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

    const created: SimulatedUser = {
      id: `usr-new-${Math.random().toString(36).substring(3, 8)}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      plan: newUserPlan,
      creditsRemaining: newUserPlan === SubscriptionPlan.FREE ? 3 : 9999,
      creditsMax: newUserPlan === SubscriptionPlan.FREE ? 3 : 9999,
      joinedChannelsCount: Math.floor(Math.random() * 3),
      status: "active",
      avatarColor: randomColor
    };

    setUserList(prev => [...prev, created]);
    setNewUserName("");
    setNewUserEmail("");
    setShowAddUserForm(false);
    showToast(`Creator ${created.name} successfully provisioned!`);
  };

  // Sync state between Admin Controls and connected App.tsx logged-in session user profile
  const handleToggleCurrentUserPlan = () => {
    const nextPlan = currentUser.plan === SubscriptionPlan.FREE ? SubscriptionPlan.PRO : SubscriptionPlan.FREE;
    onUpdateCurrentUser({
      ...currentUser,
      plan: nextPlan,
      creditsRemaining: nextPlan === SubscriptionPlan.PRO ? 9999 : 3,
      creditsMax: nextPlan === SubscriptionPlan.PRO ? 9999 : 3
    });
    showToast(`Your session has been updated to ${nextPlan} plan status!`);
  };

  const handleEditCurrentUserCredits = (amount: number) => {
    const nextVal = Math.max(0, currentUser.creditsRemaining + amount);
    onUpdateCurrentUser({
      ...currentUser,
      creditsRemaining: nextVal
    });
    showToast(`Modified active login token credits: ${nextVal}`);
  };

  const filteredUsers = useMemo(() => {
    return userList.filter(u => 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [userList, userSearch]);

  const handleGenerateSyntheticLoad = () => {
    const syntheticTopics = [
      "AI Quantum Revolution Explained",
      "Secrets of High-Yield Dividends",
      "The Psychology of Hyper-Growth Channels",
      "Faceless Automation Mastery 2026",
      "Debugging React Web app closures"
    ];
    const syntheticNiches = ["Technology", "Finance", "Motivation", "Business", "Education"];
    const randomIdx = Math.floor(Math.random() * syntheticTopics.length);
    const chosenTopic = syntheticTopics[randomIdx];
    const chosenNiche = syntheticNiches[randomIdx];

    const newLogItem: SystemLog = {
      id: `synth-${Date.now()}`,
      timestamp: new Date().toTimeString().split(" ")[0],
      level: "INFO",
      source: "EngineLoadBalancer",
      message: `[Simulator Load] Triggered pipeline compilation block for "${chosenTopic}" under "${chosenNiche}" settings.`
    };

    setLogs(prev => [newLogItem, ...prev]);
    showToast("Synthetic compiler query injected into logs stream!");
  };

  const handleClearMemoryCache = () => {
    setLogs(prev => [
      {
        id: `clear-${Date.now()}`,
        timestamp: new Date().toTimeString().split(" ")[0],
        level: "SUCCESS",
        source: "MemoryFlusher",
        message: "Cleaned system state. Re-aligned CPM vectors. Active connection speed improved."
      },
      ...prev
    ]);
    showToast("Cache successfully cleared. Engine speed refreshed!");
  };

  return (
    <div id="admin-panel-viewport-container" className="space-y-6 max-w-5xl mx-auto">
      
      {/* Toast Alert Simulation */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-zinc-900 text-indigo-400 border border-indigo-500/30 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-450" />
          {toastMessage}
        </div>
      )}

      {/* Head Panel Info Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Super Administrative Dashboard</h2>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
                  SYSTEM LEVEL PRO
                </span>
              </div>
              <p className="text-zinc-405 text-xs mt-1">
                Configure SaaS configurations, control token priority models, override credits billing, and view live processing queues.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="text-xs font-mono text-zinc-500 bg-zinc-950/70 border border-zinc-850 px-3.5 py-2.5 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 block" />
                Main Instance Code Running
              </div>
              <div className="mt-1 text-[11px] text-zinc-550">Node v22 (Apache-2.0 Platform)</div>
            </div>

            {onLockConsole && (
              <button
                onClick={onLockConsole}
                className="px-3.5 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Power className="w-3.5 h-3.5" />
                Lock Console
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Four Mini SaaS Metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-zinc-900/40 border border-zinc-805 rounded-xl p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Total SaaS Accounts</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xl font-bold text-white">{stats.totalActiveAccounts}</span>
            <span className="text-[9px] text-zinc-500 font-mono block">Connected via Auth & Sessions</span>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-805 rounded-xl p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Monthly Revenue (MRR)</span>
            <TrendingUp className="w-4 h-4 text-emerald-450" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xl font-bold text-white text-emerald-450">{stats.mrr}</span>
            <span className="text-[9px] text-zinc-500 font-mono block">Computed static base plan metrics</span>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-805 rounded-xl p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Premium Rate</span>
            <Coins className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xl font-bold text-white">{stats.premiumRate}</span>
            <span className="text-[9px] text-zinc-500 font-mono block">PRO and TEAM percentage shares</span>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-805 rounded-xl p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Average API Latency</span>
            <Cpu className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xl font-bold text-amber-400">{stats.latency}</span>
            <span className="text-[9px] text-zinc-500 font-mono block">Calculated via fallback queues</span>
          </div>
        </div>

      </div>

      {/* Segmented Internal Admin Tabs */}
      <div className="flex overflow-x-auto bg-zinc-950 p-1 rounded-xl border border-zinc-850 gap-1.5">
        <button
          onClick={() => setActiveAdminTab("overview")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
            activeAdminTab === "overview"
              ? "bg-zinc-850 text-white border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          Engine Parameters
        </button>

        <button
          onClick={() => setActiveAdminTab("users")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
            activeAdminTab === "users"
              ? "bg-zinc-850 text-white border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Users className="w-3.5 h-3.5 text-sky-400" />
          Creators DB ({userList.length + 1})
        </button>

        <button
          onClick={() => setActiveAdminTab("cpm")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
            activeAdminTab === "cpm"
              ? "bg-zinc-850 text-white border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Coins className="w-3.5 h-3.5 text-emerald-450" />
          CPM & Niche Multipliers
        </button>

        <button
          onClick={() => setActiveAdminTab("logs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
            activeAdminTab === "logs"
              ? "bg-zinc-850 text-white border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-amber-500" />
          Live Instance Terminal Logs
        </button>
      </div>

      {/* Inner View Canvas */}
      <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-5 min-h-[350px]">
        
        {/* TAB 1: ENGINE SETTINGS AND PARAMETERS */}
        {activeAdminTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* AI Engine prioritizer details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-white font-bold text-sm">Model Pipeline Config</h3>
                <p className="text-zinc-450 text-xs mt-0.5">Adjust primary weights and retry mechanisms for dynamic video script generations.</p>
              </div>

              {/* Toggle select model */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-zinc-300 text-xs font-semibold block">Select Primary Production Model</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash", desc: "Highest speed (Recommended)" },
                      { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Lite", desc: "Extreme low token cost" },
                      { id: "gemini-flash-latest", name: "Gemini flash-old", desc: "Standard fallback node" }
                    ].map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => { setPreferredModel(m.id); showToast(`Model preference switched to ${m.name}`); }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          preferredModel === m.id
                            ? "bg-indigo-600/10 border-indigo-500"
                            : "bg-zinc-950/60 border-zinc-850 hover:border-zinc-700"
                        }`}
                      >
                        <span className={`text-xs font-bold block ${preferredModel === m.id ? "text-indigo-400" : "text-zinc-300"}`}>
                          {m.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5 leading-tight">{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI parameters sliders */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-350">AI Extraction Temperature</span>
                      <span className="font-mono text-indigo-450 font-bold">{aiTemperature} (Balanced)</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1.2" 
                      step="0.1" 
                      value={aiTemperature}
                      onChange={(e) => setAiTemperature(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-zinc-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Settings toggles */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3 bg-zinc-955/35 border border-zinc-850/50 rounded-xl">
                      <div className="space-y-0.5 pr-4">
                        <span className="text-xs text-white font-bold block">Strict Algorithmic Scoring</span>
                        <span className="text-[10px] text-zinc-500 block lead-snug">Require 1-100 Clickability Ratings to compute niche comparative averages precisely.</span>
                      </div>
                      <button
                        onClick={() => { setStrictScoring(prev => !prev); showToast(`Strict scoring ${!strictScoring ? "enabled" : "disabled"}`); }}
                        className={`p-1 w-10 rounded-full flex transition-colors cursor-pointer ${strictScoring ? 'bg-indigo-600 justify-end' : 'bg-zinc-800 justify-start'}`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white block" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-zinc-955/35 border border-zinc-850/50 rounded-xl">
                      <div className="space-y-0.5 pr-4">
                        <span className="text-xs text-white font-bold block">Automatic Fallback Model Routing</span>
                        <span className="text-[10px] text-zinc-500 block lead-snug">Redirect requests on high tier service load automatically to lite fallback pipelines.</span>
                      </div>
                      <button
                        onClick={() => { setEnableFallback(prev => !prev); showToast(`Multi-model fallback routing ${!enableFallback ? "enabled" : "disabled"}`); }}
                        className={`p-1 w-10 rounded-full flex transition-colors cursor-pointer ${enableFallback ? 'bg-indigo-600 justify-end' : 'bg-zinc-800 justify-start'}`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white block" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick operational alerts / status node info on the right */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Instance System Guard</span>
              
              <div className="p-4 bg-zinc-950/80 border border-zinc-850/80 rounded-xl space-y-3 text-xs leading-normal">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-pulse" />
                  <strong className="text-zinc-200">Active Node Status: SECURE</strong>
                </div>

                <div className="space-y-2 text-zinc-400">
                  <div className="flex justify-between">
                    <span>Active Memory:</span>
                    <span className="font-mono text-zinc-200">124MB / 512MB RAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connected User State:</span>
                    <span className="font-mono text-zinc-200">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database Engine:</span>
                    <span className="font-mono text-zinc-200">Local Cache Keys</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sync Status:</span>
                    <span className="font-mono text-emerald-450 font-bold">Synchronized</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                  <button
                    onClick={handleClearMemoryCache}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold font-mono text-[11px] cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                    Clean Memory Cache Buffer
                  </button>
                  <button
                    onClick={handleGenerateSyntheticLoad}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 text-indigo-305 font-bold font-mono text-[11px] cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 text-indigo-400" />
                    Inject Mock Query Request
                  </button>
                </div>
              </div>

              <div className="bg-indigo-950/10 border border-indigo-900/20 p-4 rounded-xl text-xs space-y-2">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Administrator Instruction tip
                </span>
                <p className="text-zinc-350 leading-relaxed">
                  Adjusting these primary weights updates local response thresholds immediately. Changes made to <strong>Plan status settings</strong> in the DB tab will dynamically alter SaaS limitations in the user interface.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: USER PROFILE / CREATORS MANAGEMENT DATABASE */}
        {activeAdminTab === "users" && (
          <div className="space-y-4">
            
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
              <div>
                <h3 className="text-white font-bold text-sm">Registered Content Creators</h3>
                <p className="text-zinc-450 text-xs">Simulate user logins, upgrade billing capabilities, and modify residual creator credits.</p>
              </div>

              {/* Add User Toggle Button */}
              <button
                onClick={() => setShowAddUserForm(!showAddUserForm)}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-lg text-xs font-bold transition-all cursor-pointer select-none"
              >
                <Plus className="w-3.5 h-3.5" />
                {showAddUserForm ? "Cancel ProvisionForm" : "Provision New Creator"}
              </button>
            </div>

            {/* Quick Create user form simulation */}
            {showAddUserForm && (
              <form onSubmit={handleCreateMockUser} className="bg-zinc-950/70 border border-zinc-850 p-4 rounded-xl max-w-2xl space-y-3 animate-fadeIn">
                <span className="text-[10px] font-mono uppercase text-indigo-450 font-bold block">Provision New Active Creator Profile</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-450 uppercase font-mono">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="E.g. Elon Musk"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-505"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-450 uppercase font-mono">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="E.g. elon@spacex.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-505"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-450 uppercase font-mono">Base Billing Tier</label>
                    <select
                      value={newUserPlan}
                      onChange={(e) => setNewUserPlan(e.target.value as SubscriptionPlan)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 outline-none focus:border-indigo-505"
                    >
                      <option value={SubscriptionPlan.FREE}>Free Plan (3 credits)</option>
                      <option value={SubscriptionPlan.PRO}>Pro Unlimited Plan</option>
                      <option value={SubscriptionPlan.TEAM}>Enterprise Team Plan</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-zinc-850/60">
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs rounded-lg cursor-pointer"
                  >
                    Save & Initialize Profile
                  </button>
                </div>
              </form>
            )}

            {/* Simulated Live Filters */}
            <div className="relative">
              <span className="absolute left-3.5 top-2.5">
                <Search className="w-4 h-4 text-zinc-550 text-zinc-500" />
              </span>
              <input
                type="text"
                placeholder="Query database directory by registered creator name or contact email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 h-10 pl-10 pr-4 rounded-xl text-xs text-white outline-none placeholder-zinc-550 transition-colors"
              />
            </div>

            {/* Creators database table visual layout */}
            <div className="overflow-x-auto border border-zinc-850 rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-zinc-400 font-mono text-[10px] uppercase border-b border-zinc-850">
                    <th className="p-3.5">Creator Identity</th>
                    <th className="p-3.5">Assigned SaaS Billing Plan</th>
                    <th className="p-3.5">Usage Allowance Token Credits</th>
                    <th className="p-3.5">Syndicated Channels</th>
                    <th className="p-3.5 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  
                  {/* Row 1: The real logged-in session user */}
                  <tr className="bg-indigo-950/20 text-zinc-200">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-550 to-fuchsia-600 flex items-center justify-center font-black text-white shrink-0">
                          {currentUser.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-1.5 text-white">
                            {currentUser.name} 
                            <span className="bg-indigo-500/10 text-indigo-400 font-mono text-[9px] border border-indigo-500/20 px-1 py-0.25 rounded font-bold">
                              ACTIVE LOGIN SESSION (YOU)
                            </span>
                          </div>
                          <div className="text-zinc-500 text-[11px]">{currentUser.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        currentUser.plan === SubscriptionPlan.FREE 
                          ? "bg-zinc-800 text-zinc-400 border border-zinc-700" 
                          : "bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/25"
                      }`}>
                        {currentUser.plan}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-300">
                          {currentUser.plan === SubscriptionPlan.FREE ? `${currentUser.creditsRemaining} / ${currentUser.creditsMax}` : "Unlimited Premium (∞)"}
                        </span>
                        
                        {currentUser.plan === SubscriptionPlan.FREE && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditCurrentUserCredits(-1)}
                              className="w-5 h-5 bg-zinc-950 hover:bg-zinc-800 text-zinc-450 flex items-center justify-center rounded border border-zinc-800 cursor-pointer text-xs"
                              title="Decrease active credits"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleEditCurrentUserCredits(1)}
                              className="w-5 h-5 bg-zinc-950 hover:bg-zinc-800 text-zinc-455 flex items-center justify-center rounded border border-zinc-800 cursor-pointer text-xs"
                              title="Increase active credits"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-mono bg-zinc-950/80 px-2 py-0.5 rounded text-[11px] text-zinc-450 border border-zinc-850">
                        {currentUser.channelsJoined.length} Synced
                      </span>
                    </td>

                    <td className="p-3.5 text-right font-semibold">
                      <button
                        onClick={handleToggleCurrentUserPlan}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer hover:underline"
                      >
                        [Toggle Pro / Free Plan]
                      </button>
                    </td>
                  </tr>

                  {/* Rest of simulated platform users */}
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center font-mono text-zinc-550 text-zinc-500">
                        No other registered creators match your active filter key.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-zinc-950/40 text-zinc-300 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${user.avatarColor} flex items-center justify-center font-black text-white shrink-0`}>
                              {user.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-zinc-150 flex items-center gap-1">
                                {user.name}
                                {user.status === "dormant" && (
                                  <span className="text-[8px] bg-zinc-800 text-zinc-500 px-1.5 py-0.25 rounded">DORMANT</span>
                                )}
                              </div>
                              <div className="text-zinc-500 text-[11px]">{user.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            user.plan === SubscriptionPlan.FREE 
                              ? "bg-zinc-800 text-zinc-400 border border-zinc-700/60" 
                              : user.plan === SubscriptionPlan.PRO 
                              ? "bg-indigo-650/10 text-indigo-400 border border-indigo-500/20"
                              : "bg-emerald-650/10 text-emerald-450 border border-emerald-500/20"
                          }`}>
                            {user.plan}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold">
                              {user.plan === SubscriptionPlan.FREE ? `${user.creditsRemaining} / ${user.creditsMax}` : "Unlimited Premium (∞)"}
                            </span>
                            
                            {user.plan === SubscriptionPlan.FREE && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleEditCredits(user.id, -1)}
                                  className="w-5 h-5 bg-zinc-950 hover:bg-zinc-800 text-zinc-450 flex items-center justify-center rounded border border-zinc-800 cursor-pointer text-xs"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => handleEditCredits(user.id, 1)}
                                  className="w-5 h-5 bg-zinc-950 hover:bg-zinc-800 text-zinc-455 flex items-center justify-center rounded border border-zinc-800 cursor-pointer text-xs"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="font-mono bg-zinc-950/60 px-2 py-0.5 rounded text-[11px] text-zinc-500">
                            {user.joinedChannelsCount} Synced
                          </span>
                        </td>

                        <td className="p-3.5 text-right space-x-3.5">
                          <button
                            onClick={() => handleTogglePlan(user.id)}
                            className="text-[11px] text-indigo-450 hover:text-indigo-400 cursor-pointer hover:underline font-semibold"
                            title="Upgrade or Downgrade Plan status"
                          >
                            Toggle Tier
                          </button>
                          
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="text-zinc-500 hover:text-red-400 cursor-pointer select-none"
                            title="Delete user record"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline align-middle" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>

            <div className="bg-zinc-950/30 p-3 rounded-lg border border-zinc-850/80 text-[11px] text-zinc-400 font-mono">
              <strong>Database Integrity Schema:</strong> Creator table records represent client-side persistent storage buffers instantiated inside local sandbox browsers. Editing allowance fields triggers instant sync.
            </div>

          </div>
        )}

        {/* TAB 3: CPM AND CATEGORIES MULTIPLIERS */}
        {activeAdminTab === "cpm" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-sm font-sans">Niche CPM & Ad bidding Variables</h3>
              <p className="text-zinc-450 text-xs mt-0.5">Adjust CPM multipliers dynamically to calculate final ROI evaluation maps.</p>
            </div>

            {/* Custom inputs layout using sliders in a nice double grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(cpmMultipliers).map(([niche, val]) => {
                const numericVal = val as number;
                return (
                  <div key={niche} className="bg-zinc-950/60 border border-zinc-850 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold tracking-tight">{niche.toUpperCase()} CPM</span>
                      <span className="text-emerald-455 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">${numericVal.toFixed(2)} baseline</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="0.5" 
                        max="8.0" 
                        step="0.1" 
                        value={numericVal}
                        onChange={(e) => {
                          const parsed = parseFloat(e.target.value);
                          setCpmMultipliers(prev => ({
                            ...prev,
                            [niche]: parsed
                          }));
                        }}
                        className="flex-1 accent-emerald-500 bg-zinc-900 h-1 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[11px] text-zinc-500 font-mono tracking-wider">Scale: 0.5 - 8.0</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3.5 border-t border-zinc-850/60 pt-4">
              <button
                onClick={() => {
                  setCpmMultipliers({
                    Finance: 3.8,
                    Motivation: 2.1,
                    Technology: 3.5,
                    Facts: 1.8,
                    Business: 2.9,
                    Religion: 1.2,
                    Education: 2.4,
                    "Comedy & Entertainment": 2.5,
                    "Children Cartoon Content": 3.0,
                    Other: 1.5
                  });
                  showToast("Niche CPM baseline multipliers reset to global defaults.");
                }}
                className="px-3 py-2 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-400 hover:text-white cursor-pointer"
              >
                Reset to Defaults
              </button>

              <button
                onClick={() => showToast("CPM custom multipliers saved and synchronized successfully!")}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow shadow-emerald-500/10 cursor-pointer"
              >
                Apply Custom Multipliers
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: SYSTEM logs & TELEMETRY TERMINAL LOGS ENTRY */}
        {activeAdminTab === "logs" && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1">
              <div>
                <h3 className="text-white font-bold text-sm">Active Instance Terminal Stream</h3>
                <p className="text-zinc-500 text-xs">Real-time status loops from API models, prompt compilation, and storage sync events.</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleGenerateSyntheticLoad}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 hover:bg-zinc-850 text-indigo-400 text-xs font-bold cursor-pointer"
                >
                  Generate synthetic task
                </button>
                <button
                  type="button"
                  onClick={() => { setLogs([]); showToast("Console cleared."); }}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white text-xs font-mono font-bold cursor-pointer"
                >
                  Clear Console Overlay
                </button>
              </div>
            </div>

            {/* Micro mock logs console screen */}
            <div className="bg-black/95 rounded-xl border border-zinc-850 p-4 overflow-hidden shadow-inner text-[11px] font-mono leading-relaxed select-text select-all space-y-1.5 min-h-[300px] max-h-[420px] overflow-y-auto scrollbar-thin">
              
              <div className="text-zinc-500 pb-2 border-b border-zinc-900 flex justify-between tracking-wide select-none">
                <span>SYSTEM CONSOLE VIEW & TELEMETRY PORT: 3000</span>
                <span>SYSTEM CORE: READY (FALLBACKS ACTIVE)</span>
              </div>

              {logs.length === 0 ? (
                <div className="text-center py-12 text-zinc-650 font-sans select-none text-zinc-500">
                  <p>Console is silent. Trigger custom requests to register background operations logs.</p>
                </div>
              ) : (
                logs.map(log => {
                  let badgeColor = "text-sky-400";
                  let bgBadge = "bg-sky-500/10";
                  if (log.level === "SUCCESS") {
                    badgeColor = "text-emerald-450 text-emerald-400";
                    bgBadge = "bg-emerald-500/10";
                  } else if (log.level === "WARNING") {
                    badgeColor = "text-yellow-500";
                    bgBadge = "bg-yellow-500/10";
                  } else if (log.level === "CRITICAL") {
                    badgeColor = "text-red-500 font-extrabold animate-pulse";
                    bgBadge = "bg-red-500/15";
                  }

                  return (
                    <div key={log.id} className="flex items-start gap-2.5 transition-colors duration-150 py-0.5 hover:bg-zinc-900/40">
                      <span className="text-zinc-550 select-none text-zinc-500 shrink-0">[{log.timestamp}]</span>
                      <span className={`px-1.5 py-0.25 rounded text-[9px] shrink-0 font-bold tracking-wider ${bgBadge} ${badgeColor}`}>
                        {log.level}
                      </span>
                      <span className="text-indigo-400 font-bold shrink-0">{log.source}:</span>
                      <span className="text-zinc-300 break-all">{log.message}</span>
                    </div>
                  );
                })
              )}

            </div>

            <div className="flex items-center gap-2 justify-between text-[11px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active telemetry listener polling port 3000 instance nodes.
              </span>
              <span>Total output logs: {logs.length}</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
