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

// Complete Generation Response Schema
export interface YouTubePublishingPackage {
  topic: string;
  niche: string;
  videoType: VideoType;
  generatedAt: string;
  isFallback?: boolean;
  language?: string;
  
  viralIdeas: ViralVideoIdea[];
  hooks: RetentionHook[];
  script: VideoScript;
  thumbnail: ThumbnailConcept;
  bRollSuggestions: BRollSuggestion[];
  seoPackage: SEOPackage;
  voiceInstructions: AIVoiceInstructions;
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
