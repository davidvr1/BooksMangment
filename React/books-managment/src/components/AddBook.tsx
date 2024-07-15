import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IAddBook, Author, Series } from '../types/types';
import useFetch from '../hooks/useFetch';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');  
  const [seriesName, setSeriesName] = useState('');
  const [authorName,setAuthorName]=useState('');  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorsValid, setIsAuthorsValid] = useState(false);
  const [isSSeriesValid, setIsseriesValid] = useState(false);
  const navigate = useNavigate();

  // Fetch the list of authors
  const { data: authors, isLoading: isLoadingAuthors, error: authorsError } = useFetch<Author[]>('http://localhost:5042/BooksApi/GetListOfAuthors');
  const { data: serieses, isLoading: isLoadingSerieses, error: seriesesError } = useFetch<Series[]>('http://localhost:5042/BooksApi/GetListOfSeries');

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value!=="0"){
        setIsAuthorsValid(true)
        setAuthorName(e.target.value);
    }else{
        setIsAuthorsValid(false)
    }
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value!=="0"){
      setIsseriesValid(true);
      setSeriesName(e.target.value);
    }else{
      setIsseriesValid(false);
    }
       
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isAuthorsValid && isSSeriesValid){
      setIsLoading(true);
      setError(null);
  
      try {
  
        // Create the book
        const bookResponse = await axios.post<IAddBook>('http://localhost:5042/BooksApi/InsertBook', {
          title,       
          series:seriesName,
          authorName: authorName
        });
  
        navigate(`/`, { state: { message: 'Book added successfully' } });
      } catch (err) {
        setError('An error occurred while adding the book.');
      } finally {
        setIsLoading(false);
      }
    }
   
  };

  if (isLoadingAuthors || isLoadingSerieses) return <div>Loading...</div>;
  if (authorsError) return <div>Error loading authors: {authorsError}</div>;
  if (seriesesError) return <div>Error loading serieses: {seriesesError}</div>;

  return (
    <div className="container mt-4">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>        
        <div className="mb-3">
          <label htmlFor="series" className="form-label">Series (optional)</label>       
          <select            
            className="form-select"
            id="serieses"
            value={seriesName}
            onChange={(e)=> handleSeriesChange (e)}
            required
          >
            <option key={0} value={"0"} selected>Select Series</option>
            {serieses?.map(author => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          {!isSSeriesValid && <p className="alert alert-danger" role="alert">You must choose a Series</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="authors" className="form-label">Authors </label>
          <select            
            className="form-select"
            id="authors"
            value={authorName}
            onChange={handleAuthorChange}
            required
          >
            <option key={0} value={"0"} selected>Add Author</option>
            {authors?.map(author => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          {!isAuthorsValid && <p className="alert alert-danger" role="alert">You must choose an Author</p>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default AddBook;