//Styling
import './App.css';
//Config
import dbRef from './firebase';
//Modules
import { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {

  const handleShowSearch = (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    axios({
      url: "https://api.tvmaze.com/search/shows",
      params: {
        q: query
      }
    })
    .then((response) => {
      console.log('API response', response)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Superla-TV</h1>
        <form onSubmit={(e) => {handleShowSearch(e)}}>
          <label htmlFor='query'></label>
          <input 
          type='text' 
          id='query'
          placeholder='enter tv show here'
          />
          <button>Search</button>
        </form> 
      </header>
    </div> 
  ); 
}

export default App;