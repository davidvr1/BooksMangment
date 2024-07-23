import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookDetails from './components/BookDetails';
import BookSearch from './components/BookSearch';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';
import AddSeries from './components/AddSeries';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
      <div className='col-sm-12 text-center'>
      <h3>Book Management</h3>  
        </div>   
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">                                        
              <div className="navbar-nav">
                <Link className="nav-link" to="/search">Search Books</Link>
              </div>
              <div className="navbar-nav">
                <Link className="nav-link" to="/add">Add Book</Link>
              </div>
              <div className="navbar-nav">
                <Link className="nav-link" to="/addAuthor">Add Author</Link>
              </div>
              <div className="navbar-nav">
                <Link className="nav-link" to="/addSeries">Add Series</Link>
              </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/addAuthor" element={<AddAuthor />} />
          <Route path="/addSeries" element={<AddSeries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;