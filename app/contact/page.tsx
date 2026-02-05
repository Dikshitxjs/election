"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email so we can reply.");
      return;
    }
    if (!message.trim()) {
      setError(
        "Please include a short message explaining you couldn't find your chhetra number."
      );
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Contact</h1>
          <p className="text-slate-400 mt-2 font-semibold">
            If you couldn't find your district number, let us know and we'll help you.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800 p-6 sm:p-8 rounded-xl border border-slate-700">
          <h2 className="text-lg font-bold text-slate-200 mb-4">Can't find your district?</h2>

          {submitted ? (
            <div className="p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg">
              <p className="text-emerald-200 font-semibold">
                Thanks — your request was received. We'll reply to the email you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">Your name (optional)</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 border border-slate-700 rounded-lg bg-slate-900 text-slate-200 placeholder-slate-500 font-semibold focus:border-blue-500 focus:outline-none hover:border-slate-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">Your email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-3.5 border border-slate-700 rounded-lg bg-slate-900 text-slate-200 placeholder-slate-500 font-semibold focus:border-blue-500 focus:outline-none hover:border-slate-600 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full p-3.5 border border-slate-700 rounded-lg bg-slate-900 text-slate-200 placeholder-slate-500 font-semibold focus:border-blue-500 focus:outline-none hover:border-slate-600 transition resize-none"
                  placeholder="Describe which district you couldn't find and any details."
                  required
                />
              </div>

              {error && <div className="text-rose-300 font-semibold bg-rose-900/30 p-3 rounded-lg border border-rose-700">{error}</div>}

              <div>
                <button
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold disabled:opacity-60 transition"
                >
                  {submitting ? "Sending..." : "Send Request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
