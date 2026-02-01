"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Comment } from "@/types/comment";
import { useFingerprint } from "@/lib/fingerprint";

interface CommentsProps {
  candidateId: number;
  initialComments?: Comment[];
}

export default function Comments({ candidateId, initialComments = [] }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const { getFingerprint } = useFingerprint();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<Comment[]>(`/candidates/${candidateId}/comments`);
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      setError("Please enter a comment");
      return;
    }

    if (newComment.length > 500) {
      setError("Comment must be less than 500 characters");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const fingerprint = await getFingerprint();
      
      const response = await apiFetch(`/candidates/${candidateId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment.trim(),
          fingerprint,
          anonymous: true,
        }),
      });

      if (response.success) {
        setNewComment("");
        setShowForm(false);
        
        // Add new comment to the list
        const newCommentObj: Comment = {
          id: response.commentId,
          content: newComment.trim(),
          timestamp: new Date().toISOString(),
          author: "Anonymous",
          likes: 0,
        };
        
        setComments(prev => [newCommentObj, ...prev]);
      } else {
        setError(response.message || "Failed to submit comment");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      const fingerprint = await getFingerprint();
      
      await apiFetch(`/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fingerprint }),
      });

      // Update local state
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, likes: (comment.likes || 0) + 1 }
            : comment
        )
      );
    } catch (err) {
      console.error("Failed to like comment:", err);
    }
  };

  useEffect(() => {
    if (initialComments.length === 0) {
      fetchComments();
    }
  }, [candidateId]);

  // Helper to format timestamp
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "Add Comment"}
        </button>
      </div>

      {/* Comment Form */}
      {showForm && (
        <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-xl p-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this candidate (anonymous)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            maxLength={500}
            disabled={submitting}
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-500">
              {newComment.length}/500 characters
            </div>
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </form>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading comments...</p>
        </div>
      )}

      {/* Comments List */}
      {!loading && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-medium">
                      {comment.author?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {comment.author || "Anonymous"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTimeAgo(comment.timestamp)}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-sm">{comment.likes || 0}</span>
                </button>
              </div>

              {/* Comment Content */}
              <p className="text-gray-700 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-8 border rounded-lg">
            <div className="w-16 h-16 mx-auto text-gray-300 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No Comments Yet
            </h4>
            <p className="text-gray-600 mb-4">
              Be the first to share your thoughts about this candidate
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add First Comment
            </button>
          </div>
        )
      )}

      {/* Load More Button */}
      {comments.length >= 10 && (
        <div className="text-center">
          <button
            onClick={fetchComments}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More Comments"}
          </button>
        </div>
      )}
    </div>
  );
}