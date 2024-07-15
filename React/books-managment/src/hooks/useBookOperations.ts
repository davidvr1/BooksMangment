import { useState } from 'react';
import axios from 'axios';
import { IAddBook } from '../types/types';

const useBookOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBook = async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
     await axios.delete(`http://localhost:5042/BooksApi/DeleteBook`,{
        headers: {
          'Content-Type': 'application/json',          
        },
        data: name
    });
      return true;
    } catch (err) {
      setError('An error occurred while deleting the book.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBook = async (book: IAddBook) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:5042/BooksApi/UpdateBook`, book);  
      return response.data;
    } catch (err) {
      setError('An error occurred while updating the book.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteBook, updateBook, isLoading, error };
};

export default useBookOperations;