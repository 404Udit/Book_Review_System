import express from "express";
import { signup, login} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { addbook } from "../controllers/authController.js";
import { upload } from "../middleware/upload.js";
import Book from "../models/Book.js";
import { addreview } from "../controllers/authController.js";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/addbook",protect, upload.single("pdf"), addbook);
router.get("/me", protect, (req, res) => {
  res.json(req.user); 
});

router.get("/all", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;           
    const book = await Book.findById(id); 

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);                   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/reviews/:bookId",protect, addreview);

router.get("/reviews/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({book:bookId}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/mybooks/:id", async (req, res) => {
  try {
    const id=req.params.id;
    const books = await Book.find({addedBy: id}).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;