import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IAddBook, Author, Series } from '../types/types';
import useFetch from '../hooks/useFetch';

function AddAuthor() {
    const [authorName,setAuthorName]=useState<string>('');
    const  handleSubmit=async ()=>{
        await axios.post<string>('http://localhost:46405/BooksApi/InsertAuthor',{           
            data:{authorName}
          }).then((res)=>{
              
          }).catch((err) =>{
            console.log(err.message);
           
          })
    }
  return (
    <>
    <h2>AddAuthor</h2>
    <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author Name"
            required
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  )
}

export default AddAuthor