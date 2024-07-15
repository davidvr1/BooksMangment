import React, { useState } from 'react';
import useBookOperations from '../hooks/useBookOperations';
import { Author, IAddBook, Series, UpdateBookProps} from '../types/types';
import useFetch from '../hooks/useFetch';



const UpdateBook: React.FC<UpdateBookProps> = ({ book, onUpdate }) => {
  const [seriesName, setSeriesName] = useState('');
  const [authorName,setAuthorName]=useState(''); 
    
  const { updateBook, isLoading, error } = useBookOperations();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();        
    const updatedBook = await updateBook({title:book.title,series:seriesName,authorName:authorName});
    if (updatedBook) {
      onUpdate(updatedBook);
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value!=="0")
        setAuthorName(e.target.value);
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value!=="0")
        setSeriesName(e.target.value);
  };

  const { data: authors } = useFetch<Author[]>('http://localhost:5042/BooksApi/GetListOfAuthors');
  const { data: serieses } = useFetch<Series[]>('http://localhost:5042/BooksApi/GetListOfSeries');

  return (<>
    <form onSubmit={handleSubmit}>       
      <div className="mb-3">
          <label htmlFor="series" className="form-label">Series</label>       
          <select            
            className="form-select"
            id="serieses"
            value={seriesName}
            onChange={(e)=> handleSeriesChange (e)}
            required
          >
            <option key={0} value={"0"} >Change series</option>
            {serieses?.map(series => (
              <option key={series.id} value={series.name}>
                {series.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="authors" className="form-label">Authors</label>
          <select            
            className="form-select"
            id="authors"
            value={authorName}
            onChange={handleAuthorChange}
            required
          >
            <option key={0} value={"0"} >Add Author</option>
            {authors?.map(author => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div> 
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
     {isLoading ? 'Updating...' : 'Update Book'}
   </button>
   {error && <p className="text-danger mt-2">{error}</p>}     
    </form>
     
   </>
  );
};

export default UpdateBook;