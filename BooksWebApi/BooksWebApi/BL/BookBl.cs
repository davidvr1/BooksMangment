using BooksWebApi.DAL;
using BooksWebApi.Dtos;
using BooksWebApi.interfaces;
using BooksWebApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BooksWebApi.BL
{
    public class BookBl : IBookBl
    {
        private readonly BookDbContext _db;
        public BookBl(BookDbContext db)
        {
            _db = db;
        }
        public async Task<List<Book>> GetBooksByAuthor(string authorName)
        {

            var books =await _db.Books
            .Include(b => b.Series)
            .Include(b => b.BookAuthors)
                .ThenInclude(ba => ba.Author)
            .Where(b =>
                b.BookAuthors.Any(ba => ba.Author.Name.Contains(authorName)) ||
                b.Series.Books.Any(sb => sb.BookAuthors.Any(ba => ba.Author.Name.Contains(authorName)))
            )
            .ToListAsync();

            return books;
        }
        

        public async Task<Book?> GetBooksById(int id)
        {
            var book = await _db.Books
             .Include(b => b.Series)
             .Include(b => b.BookAuthors)
                 .ThenInclude(ba => ba.Author)
             .FirstOrDefaultAsync(b => b.Id == id);
            return book;
        }
        public async Task<bool> InsertBook(BookData bookData)
        {
            if (!_db.Books.Any(x => x.Title == bookData.Title))
            {
                Book book = new Book();
                book.Title = bookData.Title;

                var result = GetAuthorAndSeriesFromDb(bookData.AuthorName, bookData.Series);
                Author? author = result.author;
                Series? series = result.series;

                if (author != null && series != null)
                {
                    BookAuthor bookAuthor = new BookAuthor()
                    {
                        Author= author,
                        AuthorId=author.Id,
                    };
                    book.BookAuthors.Add(bookAuthor);
                    book.Series = series;
                    _db.Books.Add(book);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            };
            return false;
        }

        private (Author? author, Series? series) GetAuthorAndSeriesFromDb(string authorName = "", string seriesName = "")
        {
            Author? author = _db.Authors.Where(x => x.Name == authorName).FirstOrDefault();
            Series? series = _db.Series.Where(x => x.Name == seriesName).FirstOrDefault();
            return (author, series);
        }

        //public async Task<bool> InsertAuthor(string authorName)
        //{
        //    var result = GetAuthorAndSeriesFromDb(authorName:authorName);
        //    if (result.author == null)
        //    {
        //       Author newAuthor=new Author() { Name = authorName };
        //        _db.Authors.Add(newAuthor);
        //        await _db.SaveChangesAsync();
        //        return true;
        //    }
        //    return false;
        //}

        //public async Task<bool> InsertSeries(string seriesName)
        //{
        //    var result = GetAuthorAndSeriesFromDb(seriesName: seriesName);
        //    if (result.series == null)
        //    {
        //        Series newSeries=new Series() { Name=seriesName};
        //        _db.Series.Add(newSeries);
        //        await _db.SaveChangesAsync();
        //        return true;
        //    }
        //    return false;
        //}

        public async Task<bool> UpdateBook(BookData newBookData)
        {
            Book? bookFromDb = _db.Books.Where(x => x.Title == newBookData.Title).FirstOrDefault();
            if (bookFromDb != null)
            {
                bool needToUpdate = false;               
                if (!string.IsNullOrWhiteSpace(newBookData.AuthorName))
                {
                    var result = GetAuthorAndSeriesFromDb(authorName: newBookData.AuthorName);
                    Author? author = result.author;
                    if (author != null)
                    {
                        needToUpdate = true;
                        bookFromDb.BookAuthors.Add(new BookAuthor() { Author = author });
                    }
                }
                if (!string.IsNullOrWhiteSpace(newBookData.Series))
                {
                    var result = GetAuthorAndSeriesFromDb(seriesName: newBookData.Series);
                    Series? series = result.series;
                    if (series != null)
                    {
                        needToUpdate = true;
                        bookFromDb.Series = series;
                    }
                }
                if (needToUpdate)
                {
                    _db.Books.Update(bookFromDb);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            return false;
        }

        public async Task<bool> DeleteBook(string bookTitle)
        {
            var bookFromDb = await _db.Books.Where(x => x.Title == bookTitle).FirstOrDefaultAsync();
            if (bookFromDb != null)
            {
                _db.Books.Remove(bookFromDb);
                await _db.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<Author>> GetlistOfAuthors()
        {
            var Authors = await _db.Authors.ToListAsync();           
            return Authors;
        }

        public async Task<List<Series>> GetlistOfSeries()
        {
            var Authors = await _db.Series.ToListAsync();
            return Authors;
        }
    }
}
