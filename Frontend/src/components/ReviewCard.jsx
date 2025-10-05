export default function ReviewCard({ review }) {
  return (
    <div className="border rounded-md p-4 mb-3 shadow-sm">
      <p className="font-semibold">{review.user}</p>
      <p className="text-yellow-500">⭐ {review.rating}</p>
      <p>{review.comment}</p>
    </div>
  );
}
