const bookService = require('../services/book.service');
class BookController{
    async getAllBooks(author, genre,page) {
        return await bookService.getAllBooks(author, genre,page);
    }
    async getBookById(bookId){
        if(!bookId) {
            throw new Error("Book ID is required");
        }
        return await bookService.getBookById(bookId);
    }
    async addBook(bookData) {
        if(!bookData || !bookData.title || !bookData.author || !bookData.genre) {
            throw new Error("Invalid book data");
        }
        bookData.createdBy = bookData.userId; 
        return bookService.addBook(bookData);        
    }
    async deleteBook(req, res) {

    }
    async addReviewForBookById(bookId,reviewData){
        return await bookService.addReviewForBookById(bookId,reviewData);
    }
}

module.exports = new BookController();