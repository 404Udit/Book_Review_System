import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../utils/api";
import ReviewSection from "../components/ReviewSection";

export default function BookDetailsPage() {
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      const data = await getBookById(id);
      setBook(data);
    }
    fetchBook();
  }, [id]);

  if (!book) return <p className="p-8 text-gray-600">Loading...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Book Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{book.title}</h1>
        <p className="text-gray-600 text-lg mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
        <p className="text-gray-600 text-lg mb-2"><span className="font-semibold">Year:</span> {book.year}</p>
        <p className="text-gray-600 text-lg mb-2"><span className="font-semibold">Genre:</span> {book.genre}</p>
        <p className="text-gray-600 text-lg mb-4"><span className="font-semibold">Description:</span> {book.description}</p>

        {book.pdfUrl && (
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            📘 Download PDF
          </a>
        )}
      </div>

      {/* Review Section */}
      <ReviewSection bookId={id} />
    </div>
  );
}
