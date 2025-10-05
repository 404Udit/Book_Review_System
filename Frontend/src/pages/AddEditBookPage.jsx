import { useState } from "react";
import { addBook } from "../utils/api";

export default function AddEditBookPage() {
  const [form, setForm] = useState({ title: "", author: "", description: "", genre: "",year: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setcolor] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please upload a PDF");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("genre", form.genre);
    formData.append("year", form.year);
    formData.append("pdf", file);

    setLoading(true);
    const data = await addBook(formData);
    setLoading(false);
    if (data.success) {
      setcolor("text-green-600")
      setMessage("Book added successfully ✅");}
    else {
      setcolor("text-red-800")
      setMessage(data.message || "Failed to add book ❌");}

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add / Edit Book</h2>
        <input name="title" placeholder="Book Title" onChange={handleChange}
          className="w-full mb-4 p-2 border rounded" required />
        <input name="author" placeholder="Author" onChange={handleChange}
          className="w-full mb-4 p-2 border rounded" required />
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4 w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange}
          className="w-full mb-6 p-2 border rounded" required />

        <input name="genre" placeholder="Genre" onChange={handleChange}
          className="w-full mb-4 p-2 border rounded" required />
        <input name="year" placeholder="Year Of Publication" onChange={handleChange}
          className="w-full mb-4 p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Book
        </button>
        {loading && <p className="text-blue-600 mt-3">Uploading... Please wait ⏳</p>}
         {message && <p className={`${color}`}>{message}</p>}
      </form>
    </div>
  );
}