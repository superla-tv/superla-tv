// Styling
import './App.css';
// Config
import dbRef from './firebase';
// Modules
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// Components
import TVResults from './Components/TVResults';
import Nav from './Components/Nav';
import Lists from './Components/Lists';

const Home = () => {
  const [showSearch, setShowSearch] = useState('');
  const [tvRes, setTVRes] = useState([]);
  const [handleSubmit, setHandleSubmit] = useState(false);
  const handleShowSearch = (e) => {
    e.preventDefault();
    setShowSearch(e.target[0].value);
    setHandleSubmit(true);
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
        console.log(tvRes) // remove this 
      })
      .catch(err => {
        alert(err, "Something went wrong!")
      });
  }, [showSearch])

  return (
    <>
      <h1>Superla-TV</h1>
      <form onSubmit={handleShowSearch}>
        <label htmlFor='query'></label>
        <input
          type='text'
          id='query'
          placeholder='enter tv show here'
        />
        <button>Search</button>
      </form>
      <main className="tvResults">
        {handleSubmit ?
          <TVResults
            tvRes={tvRes}
            showSearch={showSearch}
          />
          :
          null
        }
      </main>
    </>
  )
}


const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </div>
  );
}

export default App;