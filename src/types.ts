/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum NicheType {
  FINANCE = "Finance",
  MOTIVATION = "Motivation",
  FACTS = "Facts",
  BUSINESS = "Business",
  RELIGION = "Religion",
  TECHNOLOGY = "Technology",
  EDUCATION = "Education",
  COMEDY = "Comedy & Entertainment",
  CARTOON = "Children Cartoon Content",
  OTHER = "Other"
}

export enum VideoType {
  SHORTS = "YouTube Shorts",
  LONG_FORM = "Long-form Video"
}

export enum SubscriptionPlan {
  FREE = "Free",
  PRO = "Pro",
  TEAM = "Team"
}

// Sub-interfaces of a complete YouTube Publishing Package

export interface ViralVideoIdea {
  title: string;
  explanation: string;
  clickabilityScore: number; // 1-100 rating
}

export interface RetentionHook {
  hookText: string;
  strategy: string; // e.g. "Negative framing", "Open loop", "Shock factor"
}

export interface ScriptSection {
  sectionName: string; // e.g. "Introduction (0:00 - 0:30)", "Body - The Secret Trick", etc.
  narratorText: string;
  visualDirection: string;
  retentionTactic: string;
}

export interface VideoScript {
  conversationalStyle: string;
  storytellingAngle: string;
  sections: ScriptSection[];
}

export interface ThumbnailConcept {
  textOverlay: string; // 2-5 words
  visualConcept: string;
  emotionalTrigger: string;
}

export interface BRollSuggestion {
  sceneNumber: number;
  timeframe: string; // e.g. "0:00-0:15"
  visualConcept: string;
  stockFootageKeywords: string;
  cameraMovement: string;
}

export interface SEOPackage {
  optimizedTitle: string;
  videoDescription: string;
  hashtags: string[];
  seoKeywords: string[];
}

export interface AIVoiceInstructions {
  recommendedVoiceStyle: string; // e.g., "Warm Conversational Male" / "Energetic Faceless YouTube"
  tone: string;
  pace: string;
  emotion: string;
}

// Elite Strategist interfaces
export interface EliteThinkingProcess {
  nicheAnalysis: string;
  targetAudience: string;
  viewerPsychology: string;
  competitionLevel: string;
  searchIntent: string;
}

export interface EliteViralTitle {
  title: string;
  reason: string;
  ctrScore: number;
  curiosityScore: number;
  searchPotentialScore: number;
}

export interface EliteThumbnailHook {
  hookText: string; // Max 4 words
  visualConcept: string;
}

export interface EliteSEO {
  bestSeoTitle: string;
  optimizedDescription: string;
  tags: string[]; // exactly 15 tags
  primaryKeywords: string[]; // exactly 5 keywords
}

export interface EliteViralVideoIdea {
  title: string;
  concept: string;
  whyClick: string;
  whyWatch: string;
  viralPotential: string;
}

export interface EliteScriptHook {
  hookText: string;
  strategy: string;
}

export interface EliteRetentionBooster {
  dropOffPoints: string;
  curiosityLoops: string;
  reEngagementLines: string;
}

export interface EliteCompetitorIntelligence {
  successfulVideoPatterns: string;
  nicheTrends: string;
  strategiesWorkingNow: string;
}

export interface EliteFinalRecommendation {
  bestTitle: string;
  bestThumbnailHook: string;
  bestOpeningHook: string;
  implementationStrategy: string;
}

// Complete Generation Response Schema
export interface YouTubePublishingPackage {
  topic: string;
  niche: string;
  videoType: VideoType;
  generatedAt: string;
  isFallback?: boolean;
  language?: string;
  
  // Legacy fields kept for backward compatibility (optional)
  viralIdeas?: ViralVideoIdea[];
  hooks?: RetentionHook[];
  script?: VideoScript;
  thumbnail?: ThumbnailConcept;
  bRollSuggestions?: BRollSuggestion[];
  seoPackage?: SEOPackage;
  voiceInstructions?: AIVoiceInstructions;

  // Elite Strategist Fields
  thinkingProcess?: EliteThinkingProcess;
  viralTitles?: EliteViralTitle[];
  thumbnailHooks?: EliteThumbnailHook[];
  seo?: EliteSEO;
  viralVideoIdeas?: EliteViralVideoIdea[];
  scriptHooks?: EliteScriptHook[];
  retentionBooster?: EliteRetentionBooster;
  competitorIntelligence?: EliteCompetitorIntelligence;
  finalRecommendation?: EliteFinalRecommendation;
}

// SaaS User Session Interfaces
export interface UserProfile {
  email: string;
  name: string;
  plan: SubscriptionPlan;
  creditsRemaining: number;
  creditsMax: number;
  channelsJoined: string[];
}

export interface SavedGeneration {
  id: string;
  topic: string;
  niche: string;
  videoType: VideoType;
  dateTime: string;
  packageData: YouTubePublishingPackage;
}
