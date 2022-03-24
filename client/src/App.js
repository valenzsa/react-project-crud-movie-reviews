import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');

  // Make an Axios/post request to send data to the backend
  const submitReview = (e) => {
    console.log('submitReview');
    console.log(e);

    console.log(movieName);
    console.log(review);

    Axios.post('http://localhost:5000/api/insert', { movieName: movieName, movieReview: review }).then(() => {
      console.log('Successful insert!');
    });
  }

  return (
    <div className="App">
      <h1>CRUD MOVIE REVIEW APPLICATION</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => setMovieName(e.target.value)} />

        <label>Movie Review</label>
        <input type="text" name="review" onChange={(e) => setReview(e.target.value)} />

        <button onClick={submitReview}>Submit</button>
      </div>

    </div>
  );
}

export default App;
