using BooksManagment.DataObjects;
using BooksManagment.DataObjects.Dtos;
using BooksManagment.DataObjects.interfaces;
using Microsoft.EntityFrameworkCore;

namespace BooksManagment.BL
{
    public class BooksLib
    {
        private readonly IBooksDal _booksDal;
        public BooksLib(IBooksDal booksDal)
        {
            _booksDal = booksDal;
        }
        public async Task<List<Book>> GetBooksByAuthor(string authorName)
        {
                var books=await _booksDal.GetBooksByAuthor(authorName);
                return books;                      
        }
        

        public async Task<Book?> GetBooksById(int id)
        {
           var book=await _booksDal.GetBooksById(id);
           return book;            
        }
        public async Task<bool> InsertBook(BookData bookData)
        {
            var status = await _booksDal.InsertBook(bookData); 
            return status;
        }      

        public async Task<bool> UpdateBook(BookData newBookData)
        {
            var status=await _booksDal.UpdateBook(newBookData);
            return status;
        }

        public async Task<bool> DeleteBook(string bookTitle)
        {
            var status=await _booksDal.DeleteBook(bookTitle);
            return status;
        }

        public async Task<List<Author>> GetlistOfAuthors()
        {
           var authors=await _booksDal.GetlistOfAuthors();
            return authors;
        }

        public async Task<List<Series>> GetlistOfSeries()
        {
            var serieses=await _booksDal.GetlistOfSeries(); 
            return serieses;
        }
    }
}
