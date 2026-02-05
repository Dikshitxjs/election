"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type LocalComment = { id: number; message: string };

export default function Comments({ candidateId, initialComments }: { candidateId: number; initialComments?: LocalComment[] }) {
  const [comments, setComments] = useState<LocalComment[]>(initialComments || []);
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return;

    const temp = {
      id: Date.now(),
      message: text,
    };

    setComments((c: LocalComment[]) => [temp, ...c]);
    setText("");

    try {
      const res = await apiFetch("/comments", {
        method: "POST",
        body: JSON.stringify({ candidateId, message: temp.message }),
      });

      setComments(res.comments);
    } catch {
      setComments((c: LocalComment[]) => c.filter((x) => x.id !== temp.id));
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

      <button
        onClick={submit}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg shadow-md active:scale-95 transition font-bold"
      >
        Post Comment
      </button>
    </div>
  );
}
