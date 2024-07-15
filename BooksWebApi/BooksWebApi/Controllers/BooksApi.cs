using BooksWebApi.Dtos;
using BooksWebApi.interfaces;
using BooksWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BooksWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksApi : ControllerBase
    {
        private readonly IBookBl _bookBl;

        public BooksApi(IBookBl bookBl)
        {
            _bookBl = bookBl;
        }

        [HttpGet("GetBookByAuthor")]
        public async Task<IActionResult> GetBookByAuthor(string authorName)
        {
            try
            {
                var books =await _bookBl.GetBooksByAuthor(authorName);
                if (books.Count == 0)
                {
                    return NotFound(new { Message = $"Books with author Name {authorName} have not found." });
                }
                var booksforJson = new
                {
                    AuthorSearched = authorName,
                    TotalBooksFound = books.Count,
                    Books = books.Select(b => new
                    {
                        Id = b.Id,
                        Title = b.Title,
                        Series = b.Series != null ? new { Id = b.Series.Id, Name = b.Series.Name } : null,
                        Authors = b.BookAuthors.Select(ba => new { Id = ba.Author.Id, Name = ba.Author.Name }).ToList()
                    }).ToList()
                };
                return Ok(booksforJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [HttpGet("GetBookById")]
        public async Task<IActionResult> GetBookByAuthor(int id)
        {
            try
            {
                var book =await _bookBl.GetBooksById(id);

                if (book == null)
                {
                    return NotFound(new { Message = $"Book with ID {id} was not found." });
                }

                var bookforJson = new
                {
                    Id = book.Id,
                    Title = book.Title,
                    Series = book.Series != null ? new { Id = book.Series.Id, Name = book.Series.Name } : null,
                    Authors = book.BookAuthors.Select(ba => new { Id = ba.Author.Id, Name = ba.Author.Name }).ToList()
                };
                return Ok(bookforJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [HttpGet("GetListOfAuthors")]
        public async Task<IActionResult> GetListOfAuthors()
        {
            try
            {
                var authors =await _bookBl.GetlistOfAuthors();
                return Ok(authors.Select(x => new {id=x.Id,Name=x.Name}).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [HttpGet("GetListOfSeries")]
        public async Task<IActionResult> GetListOfSeries()
        {
            try
            {
                var serieses = await _bookBl.GetlistOfSeries();
                return Ok(serieses.Select(x => new { id = x.Id, Name = x.Name }).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [HttpPost("InsertBook")]
        public async Task<IActionResult> InsertBook([FromBody] BookData bookData)
        {
            try
            {
                var result = await _bookBl.InsertBook(bookData);
                if (result)
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
            
        }

        [HttpPut("UpdateBook")]
        public async Task<IActionResult> UpdateBook([FromBody] BookData bookData)
        {
            try
            {
                bool succedded = await _bookBl.UpdateBook(bookData);
                if(succedded)
                {
                    return Ok(); 
                }             
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
           
        }

        [HttpDelete("DeleteBook")]
        public async Task<IActionResult> DeleteBook([FromBody] string bookTitle)
        {
            try
            {
                bool succedded =await _bookBl.DeleteBook(bookTitle);
                if(succedded)
                {  
                    return Ok(); }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }           
        }


    }
}
