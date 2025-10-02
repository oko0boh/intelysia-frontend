import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}
const sampleReviews: Review[] = [{
  id: 1,
  author: 'Jean Michel',
  rating: 5,
  date: '2023-04-15',
  content: 'Excellent service and friendly staff. The food was delicious and the atmosphere was very welcoming. Will definitely come back again!',
  helpful: 12
}, {
  id: 2,
  author: 'Marie Kouassi',
  rating: 4,
  date: '2023-03-22',
  content: 'Good experience overall. The service was a bit slow but the quality of the food made up for it. Reasonable prices for the quality received.',
  helpful: 8
}, {
  id: 3,
  author: 'Ibrahim Diallo',
  rating: 5,
  date: '2023-02-10',
  content: 'One of the best places in Cotonou! Everything from the service to the food was exceptional. Highly recommend the local dishes.',
  helpful: 15
}];
interface ReviewsProps {
  businessName: string;
  totalReviews: number;
  averageRating: number;
}
const Reviews: React.FC<ReviewsProps> = ({
  businessName,
  totalReviews,
  averageRating
}) => {
  const [reviews] = useState<Review[]>(sampleReviews);
  const [activeTab, setActiveTab] = useState<'reviews' | 'write'>('reviews');
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([]);
  const handleHelpfulClick = (reviewId: number) => {
    if (!helpfulClicked.includes(reviewId)) {
      setHelpfulClicked([...helpfulClicked, reviewId]);
    }
  };
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Reviews & Ratings
        </h3>
        <div className="flex space-x-4">
          <button className={`px-4 py-2 rounded-md ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveTab('reviews')}>
            Read Reviews
          </button>
          <button className={`px-4 py-2 rounded-md ${activeTab === 'write' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveTab('write')}>
            Write a Review
          </button>
        </div>
      </div>
      {activeTab === 'reviews' ? <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-3xl font-bold text-gray-800">
                  {typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'}
                </div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(typeof averageRating === 'number' ? averageRating : 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {totalReviews} reviews
                </div>
              </div>
              <div className="flex-1">
                {/* Rating distribution bars would go here */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => <div key={rating} className="flex items-center">
                      <span className="text-sm text-gray-600 w-6">
                        {rating}
                      </span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{
                    width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%`
                  }}></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                      </span>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {reviews.map(review => <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-800">
                      {review.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{review.content}</p>
                <div className="flex justify-between items-center">
                  <button className={`flex items-center text-sm ${helpfulClicked.includes(review.id) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleHelpfulClick(review.id)} disabled={helpfulClicked.includes(review.id)}>
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful (
                    {helpfulClicked.includes(review.id) ? review.helpful + 1 : review.helpful}
                    )
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <Flag className="h-4 w-4 mr-1" /> Report
                  </button>
                </div>
              </div>)}
          </div>
          <div className="mt-6 text-center">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Load More Reviews
            </button>
          </div>
        </div> : <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Share your experience at {businessName}
          </h4>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(rating => <button key={rating} className="p-1">
                  <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
                </button>)}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="review-title" className="block text-gray-700 mb-2">
              Review Title
            </label>
            <input type="text" id="review-title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Summarize your experience" />
          </div>
          <div className="mb-4">
            <label htmlFor="review-content" className="block text-gray-700 mb-2">
              Your Review
            </label>
            <textarea id="review-content" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell others about your experience"></textarea>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Submit Review
          </button>
        </div>}
    </div>
  );
};
export default Reviews;