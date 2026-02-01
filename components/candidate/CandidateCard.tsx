"use client";

import { useState } from "react";
import VoteActions from "./VoteActions";
import Comments from "./Comments";

export default function CandidateCard({ candidate, showChhetra = true, showVoteActions = true }: any) {
  const [showComments, setShowComments] = useState(false);

  const partyBadgeSrc = candidate.partyIcon || `/party-badges/${String(candidate.party).toLowerCase().replace(/\s+/g, "-")}.svg`;

  return (
    <article className="bg-white rounded-2xl shadow-md border p-4 flex flex-col md:flex-row gap-4">
      <div className="flex items-start gap-4">
        <img
          src={candidate.photo || "/avatar.png"}
          alt={candidate.name}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold text-lg leading-tight text-gray-900">{candidate.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <img src={partyBadgeSrc} alt={candidate.party} className="w-6 h-6 rounded-sm object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
              <span className="text-sm text-gray-900">Party: {candidate.party}</span>
              {showChhetra && (
                <span className="text-sm text-gray-900 ml-3">Chhetra: {candidate.chhetraId}</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-700">{/* placeholder for flags or small meta */}</div>
          </div>
        </div>

        {showVoteActions && (
          <div className="mt-4">
            <VoteActions
              candidateId={candidate.id}
              initialSupport={candidate.supportCount}
              initialOppose={candidate.opposeCount}
            />
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setShowComments((s) => !s)}
            className="text-sm text-gray-900 hover:underline"
          >
            {showComments ? "Hide Comments" : `View Comments (${candidate.comments?.length || 0})`}
          </button>

          <div className="text-sm text-gray-900">{candidate.bio ? `${candidate.bio.substring(0, 60)}${candidate.bio.length>60?'...':''}` : ''}</div>
        </div>

        {showComments && (
          <div className="mt-3">
            <Comments candidateId={candidate.id} initialComments={candidate.comments || []} />
          </div>
        )}
      </div>
    </article>
  );
}
