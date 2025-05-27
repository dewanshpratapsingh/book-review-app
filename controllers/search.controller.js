const bookService = require("../services/book.service");

class SearchController{
    async search(query) {
        if (!query || query.trim() === '') {
            throw new Error('Search query cannot be empty');
        }
        const regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(query)) {
            throw new Error('Search query can only contain alphanumeric characters and spaces');
        }
        const allBooks = await bookService.getAllBooksWithoutPagination(query);
        const results = allBooks.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );

        return results;
    }
}

module.exports = new SearchController();