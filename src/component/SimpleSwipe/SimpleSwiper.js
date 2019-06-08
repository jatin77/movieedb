import React, { Component } from 'react';

import './simpleSlider.css';
import CurrentMovie from '../currentMovie/CurrentMovie';

class SimpleSwiper extends Component {
  state = {
    displayMovieTiles: true,
    displayMovieDetails: false,
    currentMovie: ''
  };

  movieTileClicked = movie => {
    this.setState({
      currentMovie: movie,
      displayMovieTiles: false,
      displayMovieDetails: true
    });
  };
  gobackHandle = () => {
    this.setState({
      displayMovieDetails: false,
      displayMovieTiles: true
    });
  };
  render() {
    const movieImgUrl = 'https://image.tmdb.org/t/p/w185';

    console.log(this.props.movies);
    if (this.state.displayMovieTiles) {
      return (
        <div className='movies-container'>
          {this.props.movies.map(movie => {
            return (
              <div
                onClick={() => {
                  this.movieTileClicked(movie);
                }}
                key={movie.id}
                className='movie-card'
              >
                <div className='movie-img-bx'>
                  <img src={movieImgUrl + movie.poster_path} alt='' />
                </div>
                <div className='movie-rating'>
                  <span className='movie-rating-star'>
                    {movie.vote_average > 7.5 ? (
                      <i className='fas fa-star' />
                    ) : (
                      <i className='far fa-star' />
                    )}
                  </span>
                  <span className="movie-avg">{movie.vote_average}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <CurrentMovie
          goback={this.gobackHandle}
          currentMovie={this.state.currentMovie}
        />
      );
    }
  }
}

export default SimpleSwiper;
