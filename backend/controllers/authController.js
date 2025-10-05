import User from "../models/User.js";
import Book from "../models/Book.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Review from "../models/Review.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Signup
export const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add Book
export const addbook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const pdfUrl = req.file?.path;
    const Avg_Rating = 0;


    const bookExists = await Book.findOne({ title, author, description, genre, year });
    if (bookExists) return res.status(400).json({ message: "Book already exists" });


    if (!pdfUrl) {
      return res.status(400).json({ message: "PDF upload failed" });
    }
    console.log("Text fields:", req.body);  // title, author, etc.
    console.log("Uploaded file:", req.file); // file info like path, filename
    const book = await Book.create({ title, author, description, genre, year, pdfUrl, addedBy: req.user.id, Avg_Rating });


    res.json({ success: true, message: "Book added successfully!", book, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addreview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookID = req.params.bookId;
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });

    const reviewExists = await Review.findOne({ book: bookID, UserId: userId });
    if (reviewExists) return res.status(400).json({success:false, message: "Each user can submit only one review per book." });

    const review = await Review.create({ book: bookID, comment, rating, addedBy: user.name, UserId: userId });

    const reviews = await Review.find({ book: bookID });
    const Avg_Rating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    // ✅ Update book document
    await Book.findByIdAndUpdate({ _id: bookID }, {
      Avg_Rating,
    });

    res.json({ success: true, message: "Review added successfully!", review, });
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};