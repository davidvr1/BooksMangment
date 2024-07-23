﻿using BooksManagment.DataObjects.Dtos;

namespace BooksManagment.DataObjects.interfaces
{
    public interface IBooksDal
    {
        public Task<List<Book>> GetBooksByAuthor(string authorName);
        public Task<Book?> GetBooksById(int id);
        public Task<bool> InsertBook(BookData bookData);
        public Task<bool> UpdateBook(BookData newBookData);
        public Task<bool> DeleteBook(string bookTitle);
        public  Task<List<Author>> GetlistOfAuthors();
        public Task<List<Series>> GetlistOfSeries();
        
    }
}
