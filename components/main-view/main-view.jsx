import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, matchPath, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();
        //Intial state is set to null
        this.state = {
            movies:[],
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

    /* When a user successfully logs in, this function updates the `user` for
    entry in state to the *particual user*/

    onLoggedIn(authData) {
        console.log(authData); 
            this.setState({
                user: authData.user.Username
        });
    
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    
    }
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user:null
        });
    }

    getMovies(token) {
        axios.get('https://sleepy-crag-80436.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //assign the reslt to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        const { movies, selectedMovie, user } = this.state;
      
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user
        details are *passed as a prop to the LoginView*/
      
        //before the movie have been loaded
       if (!user && movies.length === 0) return <div className="main-view"/>;

        return(
            <Router>
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                  if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }} />
              <Route path="/register" render={() => {
                 return <Col>
              <RegistrationView />
              </Col>
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                </Col>
              }} />
              <Route path="/genres/:name" render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                      <GenreView genre={movies.find(m => m.Genre.Name === matchPath.params.name)
                      .Genre} />
                  </Col>
              }}/>
              <Route path="/directors/:name" render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                      <DirectorView director={movies.find(m => m.Director.Name === matchPath.params.name)
                      .Director} />
                  </Col>
              }}/>
            </Row>
              
          </Router>

            );         
    }}
    export default MainView;
