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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Contact</h1>
          <p className="text-gray-900 mt-1">
            If you could not find your chhetra number, tell us here and include your email so we can reply.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Can't find your chhetra?</h2>

          {submitted ? (
            <div className="p-4 bg-green-50 border border-green-100 rounded">
              <p className="text-green-800">
                Thanks — your request was received. We'll reply to the email you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Your name (optional)</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Your email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded mt-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded mt-2"
                  placeholder="Describe which chhetra you couldn't find and any details."
                  required
                />
              </div>

              {error && <div className="text-red-700">{error}</div>}

              <div>
                <button
                  disabled={submitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
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
