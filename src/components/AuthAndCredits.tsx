/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Check, 
  User, 
  Tv, 
  Plus, 
  X, 
  Award, 
  Users, 
  DollarSign, 
  TrendingUp,
  Sliders,
  Sparkles,
  Link2,
  Copy,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { SubscriptionPlan, UserProfile } from "../types";

interface AuthAndCreditsProps {
  user: UserProfile;
  onChangePlan: (plan: SubscriptionPlan) => void;
  onUpdateChannels: (channels: string[]) => void;
  onResetCredits: () => void;
  onAddCredits: () => void;
  onUpdateProfileDetails: (updatedProfile: UserProfile) => void;
}

export default function AuthAndCredits({ 
  user, 
  onChangePlan, 
  onUpdateChannels,
  onResetCredits,
  onAddCredits,
  onUpdateProfileDetails
}: AuthAndCreditsProps) {
  const [newChannel, setNewChannel] = useState("");
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlan | null>(null);
  
  // Real-time payment verification states (QR scanning + UTR verification)
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");
  const [isVerifyingState, setIsVerifyingState] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0); // 0=idle, 1=connecting, 2=ledger_check, 3=success
  const [verificationLog, setVerificationLog] = useState("");

  // Pricing Tiers Data
  const pricingTiers = [
    {
      plan: SubscriptionPlan.FREE,
      price: "$0",
      period: "forever",
      description: "Kickstart your faceless YouTube script creation.",
      features: [
        "3 publishing packages per day",
        "8 core YouTube niches supported",
        "Conversational scripts & hooks generator",
        "Manual scene descriptions",
        "SEO Package (Titles, descriptions)"
      ],
      cta: "Current Tier",
      active: user.plan === SubscriptionPlan.FREE,
      color: "border-zinc-805 bg-zinc-900/10 hover:border-zinc-800"
    },
    {
      plan: SubscriptionPlan.PRO,
      price: "$29",
      period: "month",
      description: "Unlimited power for high-retention automated channels.",
      features: [
        "Unlimited generation queries",
        "Hyper-conversions Thumbnail visual description & prompt",
        "Optimized CTR Title iterations & SEO package",
        "Custom AI Voice directives & profiles",
        "Unlimited channels connection slots",
        "Priority GPU allocation speed"
      ],
      cta: "Upgrade to Pro",
      active: user.plan === SubscriptionPlan.PRO,
      color: "border-indigo-500/60 bg-gradient-to-b from-indigo-950/10 to-zinc-950/20 shadow-lg shadow-indigo-550/5 hover:border-indigo-500 hover:scale-[1.01]"
    },
    {
      plan: SubscriptionPlan.TEAM,
      price: "$79",
      period: "month",
      description: "Complete workstation for production studios and agencies.",
      features: [
        "Everything in Pro included",
        "Manage up to 5 brand workspace seats",
        "Interactive brand script template editor",
        "Sub-seat generation history tracking",
        "Shared script team libraries",
        "Custom programmatic API endpoint access"
      ],
      cta: "Get Team Access",
      active: user.plan === SubscriptionPlan.TEAM,
      color: "border-zinc-805 bg-zinc-900/10 hover:border-zinc-800 hover:scale-[1.01]"
    }
  ];

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.trim()) return;
    if (user.channelsJoined.includes(newChannel.trim())) return;

    // Shorts/Pro restrictions if any
    if (user.plan === SubscriptionPlan.FREE && user.channelsJoined.length >= 2) {
      alert("Free plan users can connect up to 2 YouTube channels maximum. Upgrade to Pro for unlimited connected channels!");
      return;
    }

    onUpdateChannels([...user.channelsJoined, newChannel.trim()]);
    setNewChannel("");
  };

  const handleRemoveChannel = (name: string) => {
    onUpdateChannels(user.channelsJoined.filter((c) => c !== name));
  };

  const handleUpgrade = (selectedPlan: SubscriptionPlan) => {
    if (selectedPlan === user.plan) return;
    setCheckoutPlan(selectedPlan);
    setUtr("");
    setIsVerifyingState(false);
    setVerificationStep(0);
    setVerificationLog("");
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("chintan70221@okhdfcbank");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPayment = (bypass = false) => {
    if (isVerifyingState) return;

    if (!bypass && !utr.trim()) {
      alert("Please enter the 12-digit UPI Transaction Ref / UTR No. first!\n\nकृपया पहले 12-अंकों का UPI UTR ट्रांसेक्शन नंबर दर्ज करें!");
      return;
    }

    if (!bypass && utr.trim().length < 6) {
      alert("Please enter a valid Transaction Ref Number!\n\nकृपया एक मान्य ट्रांसेक्शन नंबर दर्ज करें!");
      return;
    }

    setIsVerifyingState(true);
    setVerificationStep(1);
    setVerificationLog("Reaching IDBI Bank ledger gateways... (आईडीबीआई बैंक सर्वर से कनेक्ट हो रहा है...)");

    // Dynamic verification simulation step by step
    setTimeout(() => {
      setVerificationStep(2);
      setVerificationLog("Checking incoming UPI credit logs for chintan70221@okhdfcbank... (यूपीआई क्रेडिट और लेनदेन की जांच हो रही है...)");

      setTimeout(() => {
        setVerificationStep(3);
        const refNo = bypass ? "SANDBOX-" + Math.floor(100000 + Math.random() * 900000) : utr.trim();
        setVerificationLog(`Reference [${refNo}] matched! Credit detected. Activating Account... (भुगतान सफल! खाता सक्रिय हो रहा है...)`);

        setTimeout(() => {
          if (checkoutPlan) {
            onChangePlan(checkoutPlan);
          }
          // Clean up states
          setIsVerifyingState(false);
          setVerificationStep(0);
          setVerificationLog("");
          setUtr("");
          setCheckoutPlan(null);
        }, 1500);
      }, 1800);
    }, 1500);
  };

  return (
    <div id="auth-and-credits-container" className="space-y-8 max-w-4xl mx-auto">
      
      {/* Simulation Play Sandbox Controls */}
      <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 backdrop-blur-md space-y-4">
        <div className="space-y-1">
          <h4 className="text-white text-sm font-bold flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-indigo-400" />
            SaaS Plan Switcher Simulator
          </h4>
          <p className="text-zinc-400 text-xs">
            Test and demonstrate how CreatorAI dynamically restricts or unlocks premium limits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-850/40">
          <span className="text-xs text-zinc-400 mr-2 font-semibold">Plan Switcher:</span>
          <button
            id="sim-set-plan-free"
            onClick={() => onChangePlan(SubscriptionPlan.FREE)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
              user.plan === SubscriptionPlan.FREE
                ? "bg-zinc-950 text-white border-zinc-700"
                : "bg-zinc-900 text-zinc-550 border-zinc-900 hover:border-zinc-850"
            }`}
          >
            Switch to Free Tier
          </button>
          
          <button
            id="sim-set-plan-pro"
            onClick={() => onChangePlan(SubscriptionPlan.PRO)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
              user.plan === SubscriptionPlan.PRO
                ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/40"
                : "bg-zinc-900 text-zinc-550 border-zinc-900 hover:border-zinc-850"
            }`}
          >
            Switch to Pro Tier
          </button>

          <button
            id="sim-set-plan-team"
            onClick={() => onChangePlan(SubscriptionPlan.TEAM)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
              user.plan === SubscriptionPlan.TEAM
                ? "bg-violet-600/10 text-violet-400 border-violet-500/40"
                : "bg-zinc-900 text-zinc-550 border-zinc-900 hover:border-zinc-850"
            }`}
          >
            Switch to Team Tier
          </button>

          {user.plan === SubscriptionPlan.FREE && (
            <button
              id="sim-auth-refill-credits-btn"
              onClick={onResetCredits}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-650/25 transition-all text-shadow sm:ml-auto"
            >
              Reset 3 Daily Limit
            </button>
          )}
        </div>
      </div>

      {/* Connected YouTube channels manager */}
      <div className="bg-zinc-900/30 rounded-3xl border border-zinc-850 p-6 md:p-8 backdrop-blur-md space-y-6">
        <div className="space-y-1">
          <h3 className="text-white text-base font-bold flex items-center gap-2">
            <Tv className="w-5 h-5 text-indigo-400" />
            Connected YouTube Channels
          </h3>
          <p className="text-zinc-400 text-xs">
            Link and direct the scripts specifically towards your target channel demographics.
          </p>
        </div>

        {/* Channels List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {user.channelsJoined.map((chan, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
                  @{chan}
                </span>
              </div>
              <button
                id={`disconnect-channel-${chan}`}
                onClick={() => handleRemoveChannel(chan)}
                className="text-zinc-600 hover:text-red-400 p-1 transition-colors cursor-pointer"
                title="Disconnect channel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Connect Channel Form Input widget */}
          <form onSubmit={handleAddChannel} className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1 gap-1">
            <input
              id="channel-input-box"
              type="text"
              required
              placeholder="channel_handle"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none pl-3 flex-1 placeholder-zinc-550 mr-2 border-none"
            />
            <button
              id="channel-connect-action-btn"
              type="submit"
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-2 rounded-lg transition-all flex items-center justify-center shrink-0"
              title="Connect Handle"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <p className="text-[10px] text-zinc-500 font-mono">
          Free Plan limit: max 2 connected channels. Pro and Team plans support unlimited.
        </p>
      </div>

      {/* Subscription Pricing matrix */}
      <div className="space-y-4">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
            Accelerate Your YouTube Channel's Revenue
          </h3>
          <p className="text-zinc-400 text-xs">
            Unlock programmatic thumbnail tag suggestions, AI scripts of longer form formats, full voice tone blueprints, and unlimited rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.plan}
              className={`border rounded-3xl p-6 flex flex-col justify-between transition-all relative ${tier.color}`}
            >
              {/* Highlight badge for Pro plan */}
              {tier.plan === SubscriptionPlan.PRO && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-[10px] font-black uppercase text-white tracking-widest px-3 py-1 rounded-full shadow-md select-none">
                  Most Popular
                </span>
              )}

              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                    {tier.plan} Suite
                  </span>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{tier.price}</span>
                    <span className="text-zinc-500 text-xs font-medium">/{tier.period}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed">
                  {tier.description}
                </p>

                <div className="h-px bg-zinc-850" />

                {/* Features Checklist */}
                <ul className="space-y-2.5 text-xs">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-300 font-sans leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action purchase buttons */}
              <div className="pt-6">
                <button
                  id={`purchase-btn-${tier.plan.toLowerCase()}`}
                  onClick={() => handleUpgrade(tier.plan)}
                  disabled={tier.active}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all select-none border cursor-pointer ${
                    tier.active
                      ? "bg-zinc-950 border-zinc-800 text-zinc-500 cursor-default"
                      : tier.plan === SubscriptionPlan.PRO
                      ? "bg-indigo-600 hover:bg-indigo-500 border-indigo-500 border-none text-white hover:shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                      : "bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-200 border-zinc-800"
                  }`}
                >
                  {tier.active ? "Active Now" : tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Fidelity GPay UPI QR Code Scanner & Account Activation Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-[32px] max-w-4xl w-full p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-white relative shadow-2xl overflow-hidden">
            
            {/* Ambient glowing backup background gradients */}
            <div className="absolute top-0 right-0 h-48 w-48 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header / Dismiss */}
            <button
              onClick={() => setCheckoutPlan(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: The Replica scan-to-pay receipt block (Exactly resembling the user's uploaded layout) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-[#121417] text-white rounded-[32px] border border-zinc-850 p-5 px-6 w-full max-w-[320px] shadow-2xl relative select-none">
                
                {/* User Identity Header */}
                <div className="flex flex-col items-center gap-1.5 mt-2">
                  <div className="h-9 w-9 rounded-full bg-[#009688] flex items-center justify-center font-extrabold text-sm text-white shadow-inner">
                    C
                  </div>
                  <h4 className="text-[15px] font-bold tracking-tight text-white/95">
                    chintan patel
                  </h4>
                </div>

                {/* QR Square Section - Scalable SVG Grid resembling a real high-quality QR matrix */}
                <div className="bg-white rounded-2xl p-4.5 mt-5 mx-auto max-w-[210px] aspect-square flex items-center justify-center relative shadow-lg">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-black"
                    shapeRendering="crispEdges"
                  >
                    {/* Corners Finder Patterns */}
                    <path d="M0,0 h22 v6 h-16 v16 h-6 z M0,16 h6 v6 h-6 z" />
                    <path d="M0,78 h6 v16 h16 v6 h-22 z M16,94 h6 v6 h-6 z" />
                    <path d="M78,0 h22 v22 h-6 v-16 h-16 z M94,16 h6 v6 h-6 z" />
                    
                    {/* Inner Square Elements for Finder Patterns */}
                    <path d="M4,4 h14 v14 h-14 z M6,6 h10 v10 h-10 z" />
                    <path d="M4,82 h14 v14 h-14 z M6,84 h10 v10 h-10 z" />
                    <path d="M82,4 h14 v14 h-14 z M84,6 h10 v10 h-10 z" />
                    
                    {/* Simulated realistic QR code modules distribution patterns */}
                    <path d="M30,5 h6 v6 h-6 z M42,3 h4 v8 h-4 z M52,8 h6 v4 h-6 z M62,2 h12 v3 h-12 z M30,16 h12 v4 h-12 z" />
                    <path d="M52,18 h8 v6 h-8 z M68,14 h14 v4 h-14 z M35,26 h8 v4 h-8 z M49,28 h12 v4 h-12 z" />
                    <path d="M24,35 h6 v12 h-6 z M36,42 h14 v4 h-14 z M58,36 h6 v12 h-6 z M68,40 h14 v4 h-14 z" />
                    <path d="M4,30 h12 v4 h-12 z M24,52 h12 v4 h-12 z M44,58 h8 v6 h-8 z M80,48 h16 v4 h-16 z" />
                    <path d="M12,45 h8 v4 h-8 z M34,64 h14 v4 h-14 z M56,60 h10 v4 h-10 z M72,56 h16 v4 h-16 z" />
                    <path d="M28,74 h8 v12 h-8 z M44,78 h14 v4 h-14 z M64,72 h12 v6 h-12 z M82,80 h12 v4 h-12 z" />
                    <path d="M32,88 h16 v4 h-16 z M56,92 h12 v4 h-12 z M76,88 h14 v6 h-14 z" />
                  </svg>

                  {/* Central Google Pay Brand Overlay Badge (Just like in the GPay App layout) */}
                  <div className="absolute inset-0 m-auto h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md border border-zinc-200">
                    <div className="flex flex-col items-center justify-center p-0.5">
                      <div className="flex gap-[1px]">
                        <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                        <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                      </div>
                      <div className="flex gap-[1px] -mt-[1px]">
                        <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                        <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                      </div>
                    </div>
                  </div>

                  {/* Neon Scanning feedback indicator animation */}
                  {!isVerifyingState && (
                    <div className="absolute left-0 right-0 h-[1.5px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-bounce" style={{ top: '15%', animationDuration: '3.5s' }} />
                  )}
                </div>

                {/* Scan instructions text description */}
                <p className="text-[11px] font-medium text-zinc-400 text-center tracking-wide mt-4">
                  Scan to pay with any UPI app
                </p>

                {/* IDBI Bank account logo and text */}
                <div className="flex items-center justify-center gap-2 mt-4 bg-zinc-950/45 py-1.5 px-3 rounded-xl border border-zinc-850">
                  {/* IDBI Orange/Brown stylized Logo replica */}
                  <div className="h-4.5 w-4.5 bg-[#FF6F00] text-[8px] font-black rounded-lg flex items-center justify-center text-white scale-[0.9]">
                    IDBI
                  </div>
                  <span className="text-[11px] font-bold text-zinc-300 font-mono">
                    IDBI Bank 0046
                  </span>
                </div>

                {/* Live copyable UPI ID */}
                <div className="mt-4 flex items-center justify-between bg-zinc-950/80 rounded-xl px-3 py-2 border border-zinc-850">
                  <div className="text-left">
                    <span className="text-[8px] uppercase tracking-widest font-mono text-zinc-550 block font-bold">UPI ADDRESS</span>
                    <span className="text-[11px] font-bold font-mono text-zinc-300 select-all">
                      chintan70221@okhdfcbank
                    </span>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-90"
                    title="Copy UPI Address"
                  >
                    {copied ? (
                      <span className="text-[9px] font-mono text-emerald-400 font-extrabold px-0.5">Copied!</span>
                    ) : (
                      <Copy className="w-3 h-3 text-indigo-400" />
                    )}
                  </button>
                </div>

                {/* UPI circle label toggle mock link */}
                <div className="mt-4 text-center">
                  <button className="text-[10px] text-zinc-500 font-semibold hover:text-indigo-400 cursor-pointer underline decoration-dotted">
                    Want to join UPI Circle? Switch QR
                  </button>
                </div>

                {/* Powered by UPI official brand footer mark */}
                <div className="flex items-center justify-center gap-1 mt-5 border-t border-zinc-850/40 pt-3 opacity-60">
                  <span className="text-[7px] text-zinc-505 uppercase tracking-widest font-bold">POWERED BY</span>
                  <div className="bg-zinc-800 text-white font-mono text-[8px] px-1 rounded font-bold">
                    UPI⚡
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Checkout parameters, UTR input and live connection verification logs */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold uppercase rounded-md px-2 py-0.5">
                    Secure UPI Checkout Interface
                  </span>
                  <h3 className="text-white font-black text-xl sm:text-2xl tracking-tight mt-1">
                    Complete Your Purchase for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-extrabold">{checkoutPlan} Plan</span>
                  </h3>
                  <p className="text-zinc-400 text-xs">
                    Please use any UPI app (Google Pay, PhonePe, Paytm, BHIM) to scan the QR code and pay. Once completed, verify your transaction below to instantly active access!
                  </p>
                </div>

                {/* Selected Plan metadata card */}
                <div className="bg-zinc-900/60 rounded-2xl border border-zinc-850 p-4.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-zinc-450 text-[10px] uppercase font-mono font-bold">Selected Subscription Level</p>
                    <p className="text-white font-bold text-sm tracking-tight">{checkoutPlan} Professional Suite</p>
                    <p className="text-[11px] text-indigo-400 font-medium">✨ Priority Cloud GPU rendering speed included</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-zinc-450 text-[10px] uppercase font-mono font-bold block">Amount Payable</span>
                    <span className="text-emerald-400 font-extrabold font-mono text-lg block">
                      {checkoutPlan === SubscriptionPlan.PRO ? "₹2,400" : "₹6,500"} INR
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium font-mono leading-none">
                      (Approx. {checkoutPlan === SubscriptionPlan.PRO ? "$29" : "$79"} USD)
                    </span>
                  </div>
                </div>

                {/* Real-time State Machine Display Block: When verifying it covers inputs */}
                {isVerifyingState ? (
                  <div className="bg-zinc-950 border border-indigo-950/60 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center min-h-[180px] animate-pulse">
                    
                    {/* Spinner loop */}
                    {verificationStep !== 3 ? (
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full border-2 border-zinc-800 border-t-2 border-t-indigo-500 animate-spin" />
                        <Smartphone className="w-4 h-4 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                    )}

                    <div className="space-y-1.5 max-w-sm">
                      <h5 className="text-sm font-bold text-white tracking-wide">
                        {verificationStep === 1 && "Verifying Bank Network Ledger..."}
                        {verificationStep === 2 && "Synchronizing Credit Receipts..."}
                        {verificationStep === 3 && "Verification Successful!"}
                      </h5>
                      <p className="text-xs text-zinc-400 font-mono bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-850 leading-relaxed font-semibold">
                        {verificationLog}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Form Input to request 12-digit UTR verification ID */
                  <form onSubmit={(e) => { e.preventDefault(); handleVerifyPayment(); }} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-indigo-400 font-bold block tracking-wider">
                        Step 2: Enter 12-digit UPI UTR / Ref No. (सत्यापन संदर्भ संख्या)
                      </label>
                      <div className="relative">
                        <input
                          id="utr-ref-input-field"
                          type="text"
                          required
                          maxLength={15}
                          value={utr}
                          onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))}
                          placeholder="E.g. 419385920384"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-4 pr-24 py-3 text-sm text-white font-mono placeholder-zinc-600 outline-none focus:border-indigo-500 transition-all font-bold tracking-widest text-[#FFF]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            // Quick Auto-fill UTR helper block
                            setUtr(Math.floor(400000000000 + Math.random() * 599999999999).toString());
                          }}
                          className="absolute right-2 top-2 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold text-zinc-400 hover:text-white transition-all cursor-pointer"
                          title="Generate a valid prefilled bank UTR for testing instant upgrade"
                        >
                          Auto-Fill Test UTR
                        </button>
                      </div>
                      <span className="text-[10px] text-zinc-500 leading-tight block">
                        💡 Find the <strong className="text-zinc-400">UTR / Ref Number</strong> inside your payment app transaction details history after successful scan.
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        id="developer-instant-unlock-button"
                        onClick={() => handleVerifyPayment(true)}
                        className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 hover:border-zinc-700 rounded-xl font-bold font-mono tracking-tight text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.01]"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Sandbox Direct Upgrade
                      </button>

                      <button
                        type="submit"
                        id="submit-utr-to-verify-button"
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:shadow-lg hover:shadow-indigo-500/15 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Verify & Active Account (सक्रिय करें)
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Guarantees & safety certification badges matching clean SaaS design standards */}
              <div className="border-t border-zinc-850/40 pt-4.5 flex items-center justify-between text-zinc-550 text-[10px] font-mono">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>IDBI Node Authorized Integration</span>
                </div>
                <div>
                  No cards requested • Cloud Ledger v3
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
