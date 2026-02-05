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
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Contact</h1>
          <p className="text-gray-600 mt-2 font-medium">
            If you couldn't find your district number, let us know and we'll help you.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Request Your District</h2>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-emerald-700 font-semibold">
                ✓ Thanks — your request was received. We'll reply to the email you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Your name (optional)</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 border border-gray-300 rounded-lg bg-white text-slate-900 placeholder-gray-400 font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 hover:border-gray-400 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Your email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-3.5 border border-gray-300 rounded-lg bg-white text-slate-900 placeholder-gray-400 font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 hover:border-gray-400 transition"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full p-3.5 border border-gray-300 rounded-lg bg-white text-slate-900 placeholder-gray-400 font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 hover:border-gray-400 transition resize-none"
                  placeholder="Describe which district you couldn't find and any details..."
                  required
                />
              </div>

              {error && <div className="text-red-700 font-semibold bg-red-50 p-3 rounded-lg border border-red-200">⚠️ {error}</div>}

              <div>
                <button
                  disabled={submitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-60 transition"
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
