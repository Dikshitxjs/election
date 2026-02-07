import { apiFetch } from "@/lib/api";
import CommentSection from "@/components/candidate/Comments";

export default async function CandidatePage({ params, searchParams }: any) {
  const candidate = await apiFetch(`/api/candidates/${params.id}`);

  // If the page is opened with asVisitor=<fingerprint>, forward it to the comments API
  const commentsEndpoint = `/api/comments?candidateId=${params.id}${searchParams?.asVisitor ? `&fingerprint=${encodeURIComponent(searchParams.asVisitor)}` : ""}`;
  const comments = await apiFetch(commentsEndpoint);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{candidate.name}</h1>
      <CommentSection initialComments={comments} candidateId={candidate.id} />
    </div>
  );
}
