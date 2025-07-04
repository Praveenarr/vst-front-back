import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Send, User } from 'lucide-react';

type Review = {
  id: string;
  email: string;
  text: string;
  rating: number;
  timestamp: string;
};

const ReviewsSection: React.FC = () => {
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  // ✅ Uses .env for local or live environment
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/reviews`;


  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error('Failed to fetch reviews:', error));
  }, [apiUrl]);

  const generateId = () => Math.random().toString(36).substr(2, 8);

  const handlePostReview = async () => {
    if (!reviewEmail.trim() || !reviewText.trim() || reviewRating === 0) {
      alert('Please enter your name/email, review text, and select a rating.');
      return;
    }

    const newReview: Review = {
      id: generateId(),
      email: reviewEmail.trim(),
      text: reviewText.trim(),
      rating: reviewRating,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(apiUrl, newReview);
      setReviews((prev) => [...prev, response.data]);
      setReviewEmail('');
      setReviewText('');
      setReviewRating(0);
    } catch (err) {
      console.error('Error posting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-yellow-400">Clients Say</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 lg:p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Share Your Experience</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Enter email or name:
                </label>
                <input
                  type="text"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-base"
                />
              </div>

              <div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts about our service..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 resize-none text-base"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Rate our service:</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-500'
                      }`}
                      onClick={() => setReviewRating(star)}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handlePostReview}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
              >
                <Send className="w-5 h-5" />
                <span>Post Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Display */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-yellow-400/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-black" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 space-y-2 sm:space-y-0">
                    <h4 className="text-yellow-400 font-semibold text-lg break-words">
                      {review.email}
                    </h4>
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{review.text}</p>
                  <p className="text-sm text-gray-400 mt-2">{formatTimestamp(review.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
