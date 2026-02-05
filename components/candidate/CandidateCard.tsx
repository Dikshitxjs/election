"use client";

import { useState } from "react";
import VoteActions from "./VoteActions";
import Comments from "./Comments";
import { getPartyFullName } from "@/lib/party-names";
import { getPartyAbbreviation } from "@/lib/party-utils";

export default function CandidateCard({ candidate, showChhetra = true, showVoteActions = true }: any) {
  const [showComments, setShowComments] = useState(false);

  const partyBadgeSrc = candidate.partyIcon || `/party-badges/${String(candidate.party).toLowerCase().replace(/\s+/g, "-")}.svg`;

  // Calculate total votes for percentage
  const totalVotes = (candidate.supportCount || 0) + (candidate.opposeCount || 0);
  const supportPercentage = totalVotes > 0 ? Math.round(((candidate.supportCount || 0) / totalVotes) * 100) : 0;

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      {/* Candidate Header */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Photo */}
          <div className="shrink-0">
            <img
              src={candidate.photo || `/candidates/${candidate.id}.jpg`}
              alt={candidate.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover ring-1 ring-gray-100 shadow-sm"
            />
          </div>

          {/* Name and Party */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg sm:text-xl text-slate-900 leading-tight truncate">
              {candidate.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={partyBadgeSrc}
                alt={candidate.party}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{getPartyFullName(candidate.party)}</span>
                <span className="text-[11px] text-gray-500">{getPartyAbbreviation(candidate.party)}</span>
              </div>
            </div>
          </div>

          {/* Support Percentage Badge */}
          {totalVotes > 0 && (
            <div className="shrink-0 bg-gray-50 rounded-lg px-3 py-1.5 text-center border border-gray-100">
              <p className="text-sm font-semibold text-slate-900">{supportPercentage}%</p>
            </div>
          )}
        </div>

        {/* Chhetra Info */}
        {showChhetra && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {candidate.chhetra_id || candidate.chhetraId}
            </p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 sm:p-5 space-y-3 bg-white">
        {/* Bio Preview */}
        {candidate.bio && (
          <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
            {candidate.bio}
          </p>
        )}

        {/* Vote Stats */}
        <div className="flex gap-2.5 text-sm">
          {candidate.supportCount !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-semibold border border-teal-100">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5v14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{candidate.supportCount}</span>
            </div>
          )}
          {candidate.opposeCount !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-semibold border border-red-100">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{candidate.opposeCount}</span>
            </div>
          )}
          {candidate.commentsCount !== undefined && candidate.commentsCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg font-semibold border border-gray-100">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{candidate.commentsCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Vote Actions */}
      {showVoteActions && (
        <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
          <VoteActions
            candidateId={candidate.id}
            initialSupport={candidate.supportCount}
            initialOppose={candidate.opposeCount}
          />
        </div>
      )}

      {/* Comments Section */}
      <div className="p-4 sm:p-5 border-t border-gray-100 bg-white">
        <button
          onClick={() => setShowComments((s) => !s)}
          className="w-full text-left text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
        >
          {showComments ? "Hide" : "View"} Comments ({candidate.comments?.length || 0})
        </button>

        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Comments candidateId={candidate.id} initialComments={candidate.comments || []} />
          </div>
        )}
      </div>
    </article>
  );
}
