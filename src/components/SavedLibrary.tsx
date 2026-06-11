/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Trash2, 
  ChevronRight, 
  Calendar, 
  Video, 
  Play, 
  Database,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { SavedGeneration, VideoType } from "../types";

interface SavedLibraryProps {
  savedItems: SavedGeneration[];
  onSelect: (item: SavedGeneration) => void;
  onDelete: (id: string) => void;
}

export default function SavedLibrary({ 
  savedItems, 
  onSelect, 
  onDelete 
}: SavedLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = savedItems.filter((item) => {
    return item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.niche.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div id="saved-library-container" className="space-y-6">
      
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div className="space-y-1">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            My Creator Vault ({savedItems.length})
          </h3>
          <p className="text-zinc-400 text-xs">Search and browse your past YouTube publishing packages stored in the cloud.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            id="library-search-input"
            type="text"
            placeholder="Search topics or niches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-800 hover:bg-zinc-950 focus:border-indigo-500/60 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-zinc-500"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Library Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="bg-zinc-900/20 border border-dashed border-zinc-805/80 rounded-2xl p-12 text-center space-y-3">
          <Database className="w-10 h-10 text-zinc-600 mx-auto" />
          <h4 className="text-white font-bold text-sm">No packages found</h4>
          <p className="text-zinc-500 text-xs max-w-xs mx-auto">
            {searchTerm 
              ? "We couldn't match any archives with that keyword. Try searching another term."
              : "Generate and save a package on our main Dashboard to store your first viral package script here!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              id={`vault-card-${item.id}`}
              key={item.id}
              className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelect(item)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                      {item.niche}
                    </span>
                    <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded ${
                      item.videoType === VideoType.SHORTS 
                        ? "bg-rose-500/10 border border-rose-500/10 text-rose-400" 
                        : "bg-emerald-500/10 border border-emerald-500/10 text-emerald-400"
                    }`}>
                      {item.videoType === VideoType.SHORTS ? "Shorts" : "Long-Form"}
                    </span>
                  </div>

                  <button
                    id={`delete-vault-btn-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="text-zinc-600 hover:text-red-400 p-1 rounded-lg transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Delete saved package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-white font-bold leading-snug group-hover:text-indigo-400 transition-colors text-sm line-clamp-2">
                  Topic: "{item.topic}"
                </h4>
              </div>

              {/* Lower info */}
              <div className="border-t border-zinc-800/80 pt-3 mt-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                  {new Date(item.dateTime).toLocaleDateString()}
                </div>
                
                <span className="text-zinc-400 font-sans flex items-center gap-0.5 transition-transform group-hover:translate-x-1 font-semibold text-[10px]">
                  Open Package
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
