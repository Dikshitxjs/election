"use client";

type ChhetraHeaderProps = {
  chhetraNumber: string;
  chhetraName: string;
  totalCandidates: number;
  onBack?: () => void;
  showInfo?: boolean;
};

export default function ChhetraHeader({
  chhetraNumber,
  chhetraName,
  totalCandidates,
  onBack,
  showInfo = true,
}: ChhetraHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="px-4 pt-6 pb-4">
        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium mb-4 hover:text-blue-200 transition"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Explore
          </button>
        )}

        {/* Main Header Content */}
        <div className="flex items-start justify-between">
          <div>
            {/* Chhetra Badge & Info */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-blue-200 text-xs font-medium bg-blue-900/30 px-2 py-1 rounded-full">
                Chhetra {chhetraNumber}
              </span>
              <span className="text-xs text-blue-200 hidden sm:inline">•</span>
              <span className="text-xs text-blue-200">
                {totalCandidates} Candidate{totalCandidates !== 1 ? 's' : ''}
              </span>
            </div>
            
            {/* Chhetra Name */}
            <h1 className="text-xl font-bold">{chhetraName}</h1>
            
            {/* Subtitle */}
            <p className="text-blue-200 text-sm mt-1">
              Public Opinion Poll • Nepal Election 2081
            </p>
          </div>
          
          {/* Info Icon (Optional) */}
          {showInfo && (
            <button 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition shrink-0"
              aria-label="Chhetra Information"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Stats Bar */}
        <div className="mt-4 pt-4 border-t border-blue-500/30">
          <div className="flex items-center justify-between text-sm">
            <div className="text-center flex-1">
              <div className="font-bold">{totalCandidates}</div>
              <div className="text-blue-200 text-xs">Candidates</div>
            </div>
            <div className="w-px h-6 bg-blue-500/50"></div>
            <div className="text-center flex-1">
              <div className="font-bold flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                Live
              </div>
              <div className="text-blue-200 text-xs">Poll Active</div>
            </div>
            <div className="w-px h-6 bg-blue-500/50"></div>
            <div className="text-center flex-1">
              <div className="font-bold">Anonymous</div>
              <div className="text-blue-200 text-xs">Voting</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}