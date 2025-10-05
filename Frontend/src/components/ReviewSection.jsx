import { useState, useEffect } from "react";
import { getBookReviews, addBookReview } from "../utils/api";

export default function ReviewSection({ bookId }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Calculate average rating
    const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

    // Fetch reviews when component mounts
    useEffect(() => {
        async function fetchReviews() {
            const data = await getBookReviews(bookId);
            setReviews(data);
        }
        fetchReviews();
    }, [bookId]);

    // Handle review submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!comment) return;
        setLoading(true);
        const data = await addBookReview(bookId, { rating, comment });
        console.log("Review API Response:", data);
        // setReviews((prev) => [newReview, ...prev]);
        setComment("");
        setRating(5);
        setLoading(false);
        if (data.success) setMessage(data.message)
        else setMessage(data.message || "Failed to add Review!!")

    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>

            {/* Average rating */}
            <div className="mb-6 flex items-center space-x-3">
                <span className="text-xl font-semibold">Average Rating:</span>
                <span className="text-yellow-500 text-xl">{avgRating} ★</span>
                <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Add Your Review</h3>

                <div className="flex items-center mb-4 space-x-4">
                    <label className="text-gray-600">Rating:</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>{r} ★</option>
                        ))}
                    </select>
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-2 border rounded mb-4"
                    rows={3}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
                {message && (
                    <p
                        className={`mt-3 text-center font-semibold ${message.toLowerCase().includes("success")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </form>

            {/* Review List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((r) => (
                        <div key={r._id} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800">{r.addedBy}</span>
                                <span className="text-yellow-500 font-semibold">{r.rating} ★</span>
                            </div>
                            <p className="text-gray-700">{r.comment}</p>
                            <p className="text-gray-400 text-sm mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
