import React from 'react';
import axios from 'axios';

import { LoginView } from './login-view/login-view';
import { MovieCard } from './movie-card/movie-card';
import { MovieView } from './movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        //Intial state is set to null
        this.state = {
            movies:[],
            selectedMovie: null,
            user: null
        };
    }
    
    componentDidMount(){
        axios.get('https://sleepy-crag-80436.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    /*when a movie is clicked, this function is invoked and updates the state
    of the `selectedMovie` *property to that movie*/

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` por
    erty in state to the *particual user*/

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render(){
        const { movies, selectedMovie } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user
        details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        //before the movie have been loaded
        if (movies.length === 0) return <div className="main-view"/>;

        return(
            <div className="main-view">
                <button onClick={() => {alert('Nice!')}}>Click me!</button>
            {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
        
      }
    </div>
    );
    }}
    export default MainView;
