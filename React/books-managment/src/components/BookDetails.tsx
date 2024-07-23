import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, IAddBook } from '../types/types';
import useFetch from '../hooks/useFetch';
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error, fetchData } = useFetch<Book>(`http://localhost:46405/BooksApi/GetBookById?id=${id}`);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  const handleDelete = () => {
    // The navigation is handled in the DeleteBook component
  };

  const handleUpdate = (updatedBook: IAddBook) => {
    fetchData();
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Book name:</h2>{book.title}      
        {book.series && (         
          <p className="card-text"> <h3>Series: </h3>{book.series.name}</p>
        )}
        <h3>Authors:</h3>
        <ul className="list-group mb-3">
          {book.authors.map(author => (
            <li key={author.id} className="list-group-item">{author.name}</li>
          ))}
        </ul>
        
        {isEditing ? (
          <div className="row">
            <div className={"col-sm-12 text-center"}>
              <UpdateBook book={book} onUpdate={()=> handleUpdate} />
              
            </div> 
          </div>         
        ) : (<>
        <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
            Edit Book
          </button>
          <DeleteBook name={book.title} onDelete={()=> handleDelete} />
        </>
          
        )}              
      </div>
    </div>
  );
}

export default BookDetails;