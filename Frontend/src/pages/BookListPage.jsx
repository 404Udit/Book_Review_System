import { useState, useEffect } from "react";
import { getBooks } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function BookListPage({isLoggedIn}) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBooks() {
      const data = await getBooks();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  const handleDetails = (id) => {
    navigate(`/books/${id}`);
  }

  return (<>
    {isLoggedIn && (<div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">All Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div onClick={() => handleDetails(book._id)} key={book._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-shadow duration-300 p-6 border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
              <p className="text-gray-500">Author: {book.author}</p>
              <p className="text-gray-500 mb-4">Year of Publication: {book.year}</p>
              <p className="text-yellow-500 font-semibold">
                ⭐ {book.Avg_Rating?.toFixed(1) ?? "No Ratings Yet"}
              </p>
            </div>

            {book.pdfUrl && (
              <a href={book.pdfUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="mt-auto inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                📘 Download PDF
              </a>
            )}
          </div>
        ))}
      </div>
    </div>)}
    {!isLoggedIn && <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Please Login/SignUp to Add and read Books.</h2>}
    </>

  );
}
