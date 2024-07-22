using System.ComponentModel.DataAnnotations;

namespace BooksManagment.DataObjects.Dtos
{
    public class BookData
    {
        [Required]
        public string Title { get; set; }
        
        public string Series { get; set; }
        
        public string AuthorName { get; set; }
    }
}
