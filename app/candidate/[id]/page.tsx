import { apiFetch } from "@/lib/api";
import CommentSection from "@/components/candidate/Comments";

export default async function CandidatePage({ params }: any) {
  const candidate = await apiFetch(`/api/candidates/${params.id}`);
  const comments = await apiFetch(`/api/comments/${params.id}`);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{candidate.name}</h1>
      <CommentSection initialComments={comments} candidateId={candidate.id} />
    </div>
  );
}
