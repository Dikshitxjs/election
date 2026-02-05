"use client";

import { useState } from "react";
import VoteActions from "./VoteActions";
import Comments from "./Comments";

export default function CandidateCard({ candidate, showChhetra = true, showVoteActions = true }: any) {
  const [showComments, setShowComments] = useState(false);

  const partyBadgeSrc = candidate.partyIcon || `/party-badges/${String(candidate.party).toLowerCase().replace(/\s+/g, "-")}.svg`;

  // Calculate total votes for percentage
  const totalVotes = (candidate.supportCount || 0) + (candidate.opposeCount || 0);
  const supportPercentage = totalVotes > 0 ? Math.round(((candidate.supportCount || 0) / totalVotes) * 100) : 0;

  return (
    <article className="bg-slate-900 rounded-lg shadow-lg border border-slate-700 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-200">
      {/* Candidate Header - Professional */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Photo */}
          <div className="shrink-0">
            <img
              src={candidate.photo || "/avatar.png"}
              alt={candidate.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover ring-2 ring-slate-600 shadow-md"
            />
          </div>

          {/* Name and Party */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg sm:text-xl text-white leading-tight truncate">
              {candidate.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={partyBadgeSrc}
                alt={candidate.party}
                className="w-5 h-5 rounded object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                {candidate.party}
              </span>
            </div>
          </div>

          {/* Support Percentage Badge */}
          {totalVotes > 0 && (
            <div className="shrink-0 bg-blue-600 rounded-lg px-3 py-1.5 text-center">
              <p className="text-sm font-bold text-white">{supportPercentage}%</p>
            </div>
          )}
        </div>

        {/* Chhetra Info */}
        {showChhetra && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {candidate.chhetra_id || candidate.chhetraId}
            </p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 sm:p-5 space-y-3 bg-slate-900">
        {/* Bio Preview */}
        {candidate.bio && (
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {candidate.bio}
          </p>
        )}

        {/* Vote Stats */}
        <div className="flex gap-2.5 text-xs sm:text-sm">
          {candidate.supportCount !== undefined && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/40 text-emerald-300 rounded-lg font-bold border border-emerald-800">
              <span className="text-lg">+</span>
              <span>{candidate.supportCount}</span>
            </div>
          )}
          {candidate.opposeCount !== undefined && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/40 text-rose-300 rounded-lg font-bold border border-rose-800">
              <span className="text-lg">-</span>
              <span>{candidate.opposeCount}</span>
            </div>
          )}
          {candidate.commentsCount !== undefined && candidate.commentsCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/40 text-blue-300 rounded-lg font-bold border border-blue-800">
              <span className="text-xs">C</span>
              <span>{candidate.commentsCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Vote Actions */}
      {showVoteActions && (
        <div className="p-4 sm:p-5 bg-slate-800 border-t border-slate-700">
          <VoteActions
            candidateId={candidate.id}
            initialSupport={candidate.supportCount}
            initialOppose={candidate.opposeCount}
          />
        </div>
      )}

      {/* Comments Section */}
      <div className="p-4 sm:p-5 border-t border-slate-700 bg-slate-900">
        <button
          onClick={() => setShowComments((s) => !s)}
          className="w-full text-left text-sm font-bold text-blue-400 hover:text-blue-300 transition"
        >
          {showComments ? "Hide" : "View"} Comments ({candidate.comments?.length || 0})
        </button>

        {showComments && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <Comments candidateId={candidate.id} initialComments={candidate.comments || []} />
          </div>
        )}
      </div>
    </article>
  );
}
