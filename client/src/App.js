import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    (async () => {
      await Axios.get('http://localhost:5000/api/get')
        .then((result) => {
          console.log(result);
          setMovieReviewList(result.data);
        });
    })();
  }, []);

  // Make an Axios/post request to send data to the backend
  const submitReview = (e) => {
    console.log('submitReview');
    console.log(e);

    console.log(movieName);
    console.log(review);

    Axios.post('http://localhost:5000/api/insert', { movieName: movieName, movieReview: review }).then(() => {
      console.log('Successful insert!');
      setMovieReviewList(
        [
          ...movieReviewList,
          { movieName: movieName, movieReview: review }
        ]
      )
    });
  }

  const deleteReview = (deleteMovie) => {
    console.log(deleteMovie);
    Axios.delete(`http://localhost:5000/api/delete/${deleteMovie}`)
      .then(() => {
        console.log('Movie review deleted!');
      });
  }

  const updateReview = (updateMovie) => {
    console.log(updateMovie);
    Axios.put('http://localhost:5000/api/update/', { movieName: updateMovie, movieReview: newReview })
      .then(() => {
        console.log('Movie review updated!');
        setMovieReviewList(
          [
            ...movieReviewList,
            newReview
          ]
        )
      });

    setNewReview("");
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

      {
        movieReviewList.map((movieReviews) => {
          return (
            <div className="card">
              <h2>{movieReviews.movieName}</h2>
              <p>{movieReviews.movieReview}</p>

              <button onClick={() => deleteReview(movieReviews.movieName)}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => setNewReview(e.target.value)} />

              <button onClick={() => updateReview(movieReviews.movieName)}>Update</button>
            </div>
          )
        })
      }

    </div>
  );
}

export default App;
