import React, { Component } from 'react';
import './movieRequest.css';
import user from './jordan-whitfield-107093-unsplash.jpg';
class MovieSearchBar extends Component {
  focusHandle = () => {
    this.input.focus();
  };

  render() {
    return (
      <header>
        <div className='header-logo'>
          <i className='fas fa-film' />
        </div>
        <div className='header-search'>
          <div className='header-search-icon'>
            <i onClick={this.focusHandle} className='fas fa-search' />
          </div>

          <input
            ref={input => {
              this.input = input;
            }}
            className='searchbar'
            onChange={this.props.onChange}
            value={this.props.searchText}
            type='text'
            placeholder='Find Movies and TV shows...'
          />
        </div>
        <div className='header-user'>
          <img src={user} alt='' />
        </div>
      </header>
    );
  }
}

export default MovieSearchBar;
