"use client";

import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import toast from 'react-hot-toast';
import FeedbackHelper from '@/services/feedback';

function FeedbackForm() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        // Call the helper function to create feedback
        const feedback = await FeedbackHelper.createFeedback({
          serviceName,
          rating,
          comment,
        });
        toast.success("Feedback submitted");
        setSubmitted(true);
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error("Could not submit feedback.");
      } finally {
        setIsSubmitting(false);
      }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-4 ">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Share Your Feedback</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Which service are you rating?
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Customer Support, Platform Features"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How would you rate our service?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none transition-colors"
                >
                  {star <= rating ? (
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                  ) : (
                    <StarOff className="w-8 h-8" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Your feedback
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Please share your experience with us..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              isSubmitting || rating === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;