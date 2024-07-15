import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchResult } from '../types/types';
import useFetch from '../hooks/useFetch';

const BookSearch: React.FC = () => {
  const [authorName, setAuthorName] = useState('');
  const { data: searchResult, isLoading, error, fetchData } = useFetch<SearchResult>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(`http://localhost:5042/BooksApi/GetBookByAuthor?authorName=${authorName}`);
  };

  return (
    <div>
      <h2 className="mb-4">Search Books by Author</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author Name"
            required
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {searchResult && (
        <div>
          <h3>Search Results:</h3>
          {searchResult.books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <div className="row">
              {searchResult.books.map(book => (
                <div key={book.id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>                     
                      <Link to={`/book/${book.id}`} className="btn btn-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookSearch;