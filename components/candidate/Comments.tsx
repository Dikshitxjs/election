"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useFingerprint } from "@/lib/fingerprint";

type LocalComment = { id: number; message: string };

export default function Comments({ candidateId, initialComments }: { candidateId: number; initialComments?: LocalComment[] }) {
  const [comments, setComments] = useState<LocalComment[]>(initialComments || []);
  const [text, setText] = useState("");
  const { getFingerprint } = useFingerprint();

  const submit = async () => {
    if (!text.trim()) return;

    const temp = {
      id: Date.now(),
      message: text,
    };

    setComments((c: LocalComment[]) => [temp, ...c]);
    setText("");

    try {
      const fingerprint = await getFingerprint().catch(() => undefined);
      const body: any = { candidateId, message: temp.message };
      if (fingerprint) body.fingerprint = fingerprint;

      const res = await apiFetch("/comments", {
        method: "POST",
        body,
      });

      setComments(res.comments);
    } catch {
      setComments((c: LocalComment[]) => c.filter((x) => x.id !== temp.id));
    }
  };

  const share = async () => {
    try {
      const fingerprint = await getFingerprint();
      const url = `${window.location.origin}${window.location.pathname}?asVisitor=${encodeURIComponent(fingerprint)}`;
      await navigator.clipboard.writeText(url);
      // small UX: notify user
      alert("Shareable link copied to clipboard");
    } catch (e) {
      alert("Unable to copy share link");
    }
  };

  return (
    <div className="mt-4">
      <p className="font-black text-slate-200 mb-3 text-sm">Public Opinions</p>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {comments.map((c) => (
          <div key={c.id} className="bg-slate-800 p-3 rounded-lg text-sm text-slate-300 border border-slate-700">
            {c.message}
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-slate-700 rounded-lg p-3 mt-3 bg-slate-900 text-slate-200 placeholder-slate-500 font-semibold focus:border-blue-500 focus:outline-none hover:border-slate-600 transition"
        placeholder="Share your opinion (anonymous)"
      />

      <div className="flex gap-3 mt-3">
        <button
          onClick={submit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg shadow-md active:scale-95 transition font-bold"
        >
          Post Comment
        </button>

        <button
          onClick={share}
          className="px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
        >
          Share View
        </button>
      </div>
    </div>
  );
}
