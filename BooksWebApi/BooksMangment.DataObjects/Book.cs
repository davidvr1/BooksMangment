namespace BooksManagment.DataObjects
{
    public class Book
    {      
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<BookAuthor> BookAuthors { get; set; }=new HashSet<BookAuthor>();
        public Series Series { get; set; } = new Series();
    }


}
