"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Candidate } from "@/types/candidate";
import CandidateCard from "@/components/candidate/CandidateCard";
import Button from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export default function ChhetraPage({ params }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await apiFetch<Candidate[]>(
          `/chhetra/${params.id}/candidates`
        );
        setCandidates(data);
      } catch (err: any) {
        setError(err.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [params.id]);

  return (
    <section className="bg-gray-50 min-h-screen px-4 pt-8 pb-12">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Candidates in this Chhetra
        </h1>
        <p className="text-sm text-gray-700 mb-4 text-center">
          Browse candidates and their votes
        </p>

        {/* Loading / Error / Empty States */}
        {loading && <p className="text-gray-700 text-center my-4">Loading...</p>}
        {error && <p className="text-red-600 text-center my-4">{error}</p>}
        {!loading && !error && candidates.length === 0 && (
          <p className="text-gray-700 text-center my-4">No candidates found.</p>
        )}

        {/* Candidate Cards */}
        <div className="space-y-4 mt-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push("/explore")}
            className="w-full mb-2 bg-green-600 text-white hover:bg-green-700"
          >
            Explore Other Chhetras
          </Button>

          <button
            onClick={() => router.push("/explore")}
            className="w-full border border-gray-300 rounded-lg py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
          >
            Back to Explore
          </button>
        </div>
      </div>
    </section>
  );
}
