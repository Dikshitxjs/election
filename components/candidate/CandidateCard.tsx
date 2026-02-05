"use client";

import { useState } from "react";
import VoteActions from "./VoteActions";
import Comments from "./Comments";

export default function CandidateCard({ candidate, showChhetra = true, showVoteActions = true }: any) {
  const [showComments, setShowComments] = useState(false);

  const partyBadgeSrc = candidate.partyIcon || `/party-badges/${String(candidate.party).toLowerCase().replace(/\s+/g, "-")}.svg`;

  return (
    <article className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* Candidate Header with Photo and Party Badge */}
      <div className="bg-linear-to-r from-blue-50 to-gray-50 p-4 sm:p-5 border-b border-gray-100">
        <div className="flex items-start gap-4">
          {/* Photo */}
          <div className="shrink-0">
            <img
              src={candidate.photo || "/avatar.png"}
              alt={candidate.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm ring-2 ring-white"
            />
          </div>

          {/* Name and Party */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg leading-tight text-gray-900 truncate">
              {candidate.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <img
                src={partyBadgeSrc}
                alt={candidate.party}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 px-2 py-1 bg-white rounded-full border border-gray-200">
                {candidate.party}
              </span>
            </div>
          </div>
        </div>

        {/* Chhetra Info */}
        {showChhetra && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="font-semibold">📍 Chhetra:</span> {candidate.chhetra_id || candidate.chhetraId}
            </p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 sm:p-5 space-y-3">
        {/* Bio Preview */}
        {candidate.bio && (
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
            {candidate.bio}
          </p>
        )}

        {/* Vote and Comment Stats */}
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          {candidate.supportCount !== undefined && (
            <div className="bg-green-50 text-green-700 px-2 py-1 rounded-lg border border-green-200 font-semibold">
              👍 {candidate.supportCount} Support
            </div>
          )}
          {candidate.opposeCount !== undefined && (
            <div className="bg-red-50 text-red-700 px-2 py-1 rounded-lg border border-red-200 font-semibold">
              👎 {candidate.opposeCount} Oppose
            </div>
          )}
        </div>
      </div>

      {/* Vote Actions */}
      {showVoteActions && (
        <div className="p-4 sm:p-5 bg-blue-50 border-t border-gray-200">
          <VoteActions
            candidateId={candidate.id}
            initialSupport={candidate.supportCount}
            initialOppose={candidate.opposeCount}
          />
        </div>
      )}

      {/* Comments Section */}
      <div className="p-4 sm:p-5 border-t border-gray-100">
        <button
          onClick={() => setShowComments((s) => !s)}
          className="w-full text-left text-sm font-semibold text-blue-600 hover:text-blue-800 transition hover:underline"
        >
          {showComments ? "🔼 Hide Comments" : "💬 View Comments"} ({candidate.comments?.length || 0})
        </button>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Comments candidateId={candidate.id} initialComments={candidate.comments || []} />
          </div>
        )}
      </div>
    </article>
  );
}
