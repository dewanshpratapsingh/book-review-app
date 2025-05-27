const bookRepository = require('../repository/book.repository.js');
class BookService{
    async getAllBooks(author, genre,page) {
        return await bookRepository.getAllBooks(author, genre,page);
    }
    async getBookById(bookId) {
        return await bookRepository.getBookById(bookId);
    }
    async addBook(bookData) {
        const bookExists = await bookRepository.getBookByTitle(bookData.title);
        if (bookExists) {
            throw new Error("Book with this title already exists");
        }
        return await bookRepository.addBook(bookData);
    }
    async addReviewForBookById(bookId, reviewData) {
        const book = await bookRepository.getBookById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return await bookRepository.addReviewForBookById(bookId, reviewData);
    }
    async getAllBooksWithoutPagination() {
        return await bookRepository.getAllBooksWithoutPagination();
    }
}

module.exports = new BookService();