﻿namespace BooksWebApi.Models
{
    public class Series
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Book> Books { get; set; } = new List<Book>();

    }
}