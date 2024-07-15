import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookOperations from '../hooks/useBookOperations';
import {DeleteBookProps } from '../types/types';



const DeleteBook: React.FC<DeleteBookProps> = ({ name, onDelete }) => {
  const { deleteBook, isLoading, error } = useBookOperations();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const success = await deleteBook(name);
      if (success) {
        onDelete();
        navigate('/');
      }
    }
  };

  return (
    <>
      <button className="btn btn-danger" onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete Book'}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </>
  );
};

export default DeleteBook;