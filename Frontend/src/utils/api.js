const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_URL; 
console.log("Backend URL:", API_BASE);

// Signup
export const signupUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

// Login
export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

// Get current user (protected)
export const getMe = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Add Book
export const addBook = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/auth/addbook`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // 👈 send token
    },
    body: formData, // FormData (not JSON)
  });
  return res.json();
};

//get Books
export const getBooks = async () => {
  const res = await fetch(`${API_BASE}/auth/all`);
  return res.json();
};

//get single book
export const getBookById = async (id) => {
  const res = await fetch(`${API_BASE}/auth/books/${id}`);
  return res.json();
};

//add book review
export const addBookReview = async (bookId, reviewData) => {
  try {
    const token = localStorage.getItem("token"); // Ensure user is logged in
    const res = await fetch(`${API_BASE}/auth/reviews/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send JWT token for auth
      },
      body: JSON.stringify(reviewData),
    });


    return await res.json(); // Returns the created review
  } catch (error) {
    console.error(error);
    return null;
  }
};



//get book reviews
export const getBookReviews = async (bookId) => {
  try {
    const res = await fetch(`${API_BASE}/auth/reviews/${bookId}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};


//get my books
export const getMyBooks = async (id) => {
  const res = await fetch(`${API_BASE}/auth/mybooks/${id}`);
  return res.json();
};

