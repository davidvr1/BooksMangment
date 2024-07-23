import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IAddBook, Author, Series } from '../types/types';
import useFetch from '../hooks/useFetch';

function AddSeries() {
  const [seriesName,setSeriesName]=useState<string>('');
  const  handleSubmit=async ()=>{
      await axios.post('http://localhost:46405/BooksApi/InsertSeries', {
        seriesName
        }).then((res)=>{
             
        }).catch((err) =>{
          console.log(err);
          
        })
  }
return (
  <>
  <h2>AddSeries</h2>
  <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={seriesName}
          onChange={(e) => setSeriesName(e.target.value)}
          placeholder="Series Name"
          required
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </div>
    </form>
  </>
)
}

export default AddSeries