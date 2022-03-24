import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/get')
      .then((result) => {
        console.log(result);
        setMovieReviewList(result.data);
      });
  }, []);

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

      <h2>Movie Review List</h2>
      <ul>
        {
          movieReviewList.map((movieReviews) => {
            return <li>{movieReviews.movieName}</li>
          })
        }
      </ul>

    </div>
  );
}

export default App;
