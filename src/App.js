//Styling
import './App.css';
//Config
import dbRef from './firebase';
//Modules
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { getDatabase, ref } from './firebase/database';

/*const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const dbRef = ref(database);

export default dbRef;
 */

function App() {

  useEffect (() => {

    console.log('dbRef', dbRef);
    axios({

      url: "https://api.tvmaze.com/search/shows",
      method: "GET",
      params: {
        q: "superhero",

      }

    })

  .then((response) => {

    console.log(response)
  })
  
}, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div> 
  ); 
}

export default App;
