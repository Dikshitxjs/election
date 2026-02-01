export interface Comment {
  id: number;
  content: string;
  author?: string;
  timestamp: string;
  likes: number;
  candidateId?: number;
}