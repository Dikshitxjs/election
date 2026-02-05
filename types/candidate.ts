export interface Chhetra {
  id: number;
  name: string;
  region: string;
  candidateCount?: number;
}

export interface Candidate {
  id: number;
  name: string;
  party: string;
  partyIcon?: string;
  photo?: string;
  chhetra_id?: number;
  chhetraId?: number;
  bio?: string;
  supportCount: number;
  opposeCount: number;
  comments?: Comment[];
  commentsCount?: number;
}

export interface Comment {
  id: number;
  candidateId?: number;
  message: string;
  sentiment?: "support" | "oppose";
  createdAt?: string;
}
