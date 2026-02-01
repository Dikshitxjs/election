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
      <p className="font-semibold mb-2">Public Opinions</p>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-2 rounded-lg text-sm">
            {c.message}
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded-xl p-3 mt-3"
        placeholder="Share your opinion (anonymous)"
      />

      <button
        onClick={submit}
        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl shadow-md active:scale-95 transition"
      >
        Post Comment
      </button>
    </div>
  );
}
