const Book = require('../models/book.model');
const Review = require('../models/review.model'); 
class BookRepository {
  async getAllBooks(author, genre,page = 1) {
    const searchParams = {};
    if (author) {
      searchParams.author = author;
    }
    if (genre) {
      searchParams.genre = genre;
    }
    try {
      const limit = 10;
      const skip = (page - 1) * limit;
      const books = await Book.find(searchParams)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      return books;
    } catch (error) {
      throw new Error("Failed to retrieve books: " + error.message);
    }
  }
  async getAllBooksWithoutPagination() {
    try {
      const books = await Book.find()
      .sort({ createdAt: -1 })
      return books;
    } catch (error) {
      throw new Error("Failed to retrieve books: " + error.message);
    }
  }
  async getBookById(id) {
    if (!id) {
      throw new Error("Book ID is required");
    }
    try {
      const book = await Book.findById(id);
      if (!book) {
        throw new Error("Book not found");
      } 
      return book;
    } catch (error) {
      throw new Error("Failed to retrieve book: " + error.message);
    }
  }
  async addBook(book) {
    const newbook = await Book.create(book);
    if (!book) {
      throw new Error("Failed to create book");
    }
    return newbook;
  }
  async addReviewForBookById(bookId, reviewData) {
    try {
      const reviewForBook = await Review.create({
        book: bookId,
        user: reviewData.userId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      const book = await this.getBookById(bookId);
      if (!book) {
        throw new Error("Book not found");
      }
      book.totalRatings =  book.totalRatings + 1  || 0;
      book.totalReviews = book.totalReviews + 1 || 0;
      book.save();
      return reviewForBook;
    } catch (error) {
      throw new Error("Failed to add review: " + error.message);
    }
  }
  async getBookByTitle(title) {
    try {
      const book = await Book.findOne({ title: title });
      return book;
    } catch (error) {
      throw new Error("Failed to retrieve book by title: " + error.message);
    }
  }
}

module.exports = new BookRepository(); // Adjust the path as necessary