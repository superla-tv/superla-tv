// Styling
import './App.css';
// Config
import dbRef from './firebase';
// Modules
import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// Components
import TVResults from './Components/TVResults';


const App = () => {
  const [ showSearch, setShowSearch ] = useState('');
  const [ tvRes, setTVRes ] = useState([]);
  const [ handleSubmit, setHandleSubmit] = useState(false);

  const handleShowSearch = (e) => {
    e.preventDefault();
    setShowSearch(e.target[0].value)
    setHandleSubmit(true)
  }


  useEffect(() => {
      axios({
        url: "https://api.tvmaze.com/search/shows",
        params: {
          q: showSearch
        }
      })
      .then((response) => {
        const tvResults = response.data
        setTVRes(tvResults);
        console.log(tvRes)
      })
      .catch(err => {
        console.log(err, "Something went wrong!")
      });
  }, [showSearch])


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
      
      <main className="tvResults">
        { handleSubmit ? 
        <TVResults 
        tvRes={tvRes} 
        showSearch={showSearch} 
        /> 
        :
        null 
        } 
      </main>
    </div> 
  ); 
}

export default App;