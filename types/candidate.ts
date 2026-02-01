export interface Chhetra {
  id: number;
  name: string;
  region: string;
}

export interface Candidate {
  id: number;
  name: string;
  party: string;
  partyIcon?: string;
  photo?: string;
  chhetraId: number;
  bio?: string;
  supportCount: number;
  opposeCount: number;
  commentsCount?: number;
}

export interface Comment {
  id: number;
  candidateId: number;
  message: string;
  sentiment: "support" | "oppose";
  createdAt: string;
}
