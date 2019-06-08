import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MovieSearchBar from './component/movieRequest/MovieSearchBar';

import SimpleSwiper from './component/SimpleSwipe/SimpleSwiper';

class App extends Component {
  state = {
    searchText: '',
    apiKey: 'e6713b23198a2507a7db0374c7d22d05',
    apiURL: 'https://api.themoviedb.org/3/search/multi?api_key=',
    results: [],
    
  };

  onChangeHandle = e => {
    this.setState(
      {
        searchText: e.target.value
      },
      () => {
        axios
          .get(
            `${this.state.apiURL}${this.state.apiKey}&language=en-US&query=${
              this.state.searchText
            }&page=1&include_adult=false`
          )
          .then(response => this.setState({ results: response.data.results }))
          .catch(err => console.log(err));
      }
    );
  };

  render() {
    let simpleSwiperDisplay;
    if (this.state.results.length > 0) {
      simpleSwiperDisplay = (
        <SimpleSwiper
          movies={this.state.results}
          displayMovieTiles={this.state.displayMovieTiles}
          displayMovieDetails={this.state.displayMovieDetails}
        />
      );
    } else {
      simpleSwiperDisplay = null;
    }

    return (
      <div className='App'>
        <MovieSearchBar
          searchText={this.state.searchText}
          onChange={this.onChangeHandle}
        />
        {simpleSwiperDisplay}
      </div>
    );
  }
}

export default App;
