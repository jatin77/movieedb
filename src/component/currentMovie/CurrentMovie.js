import React, { Component } from 'react';
import './currentMovie.css';
import axios from 'axios';
import YouTubePlayer from 'react-player/lib/players/YouTube';
export class CurrentMovie extends Component {
  state = {
    apiKey: 'e6713b23198a2507a7db0374c7d22d05',
    id: this.props.currentMovie.id,
    youtubeUrl: ' https://www.youtube.com/watch?v=',
    movieTrailerUrl: 'https://api.themoviedb.org/3/movie/',
    gotoUrl: '',
    displayTrailer: false
  };
  trailer = e => {
    e.preventDefault();
    console.log(this.state.id);
    axios
      .get(
        `${this.state.movieTrailerUrl}${this.state.id}/videos?api_key=${
          this.state.apiKey
        }&language=en-US`
      )
      .then(response => {
        this.setState({
          gotoUrl: this.state.youtubeUrl + response.data.results[0].key,
          displayTrailer: true
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.id.key);
    const { currentMovie } = this.props;
    const movieImgUrl = 'https://image.tmdb.org/t/p/w780';
    let trailer;
    if (this.state.displayTrailer && this.state.gotoUrl !== '') {
      trailer = (
        <YouTubePlayer
          url={this.state.gotoUrl}
          light
          width='100%'
          playing
          controls
        />
      );
    } else {
      trailer = (
        <div>
          <h1>Opps..No trailer available!</h1>
        </div>
      );
    }
    return (
      <div className='movieDetails'>
        <div className='current-poster'>
          <img src={movieImgUrl + currentMovie.backdrop_path} alt='' />
        </div>
        <div className='current-details'>
          <div className='current-title'>
            <h2>{currentMovie.title}</h2>
          </div>
          <div className='current-type_rating'>
            <div className='current-type'>
              <p>{currentMovie.media_type}</p>
            </div>
            <div className='current-rating'>
              <span className='movie-rating-star'>
                {currentMovie.vote_average > 7.5 ? (
                  <i className='fas fa-star' />
                ) : (
                  <i className='far fa-star' />
                )}
              </span>
              <span className='currentMovie-avg'>
                {currentMovie.vote_average}
              </span>
            </div>
          </div>
          <div className='current-overview'>
            <p>{currentMovie.overview}</p>
          </div>
          <div className='current-date'>
            <p>Release Date</p>
            <p>
              <b>
                <small>{currentMovie.release_date}</small>
              </b>
            </p>
          </div>
          <div className='current-popularity'>
            <p>Popularity</p>
            <p>
              <b>
                <small>{currentMovie.popularity}</small>
              </b>
            </p>
          </div>
        </div>
        <div className='goto-options'>
          <a href='/' onClick={this.props.gobackHandle}>
            Go Back
          </a>
          <a href='/' onClick={this.trailer}>
            Watch trailer
          </a>
        </div>
        {trailer}
      </div>
    );
  }
}

export default CurrentMovie;
