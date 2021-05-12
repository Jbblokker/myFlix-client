import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, matchPath, Route } from "react-router-dom";
//imports of other pages to main page
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
//styling imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


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

        // let accessToken = localStorage.getItem('token');
        // if (accessToken !== null) {
        //   this.setState({
        //     user: localStorage.getItem('user')
        //   });
        //   this.getMovies(accessToken);
        // }
       
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

    onRegister(register) {
        this.setState({
          register
        });
      }

    getMovies(token) {
        axios.get('https://sleepy-crag-80436.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //assign the result to the state
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
                if (movies.length === 0) return <div className="main-view" /> 
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }} />
              <Route path="/register" render={() => {
                  if (!register) return <RegisterView onRegister={(register) =>this.onRegister(register)}/>
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={()=> history.goBack()}/>
                </Col>
              }} />
              <Route path="/genres/:name" render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                      <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)
                      .Genre} onBackClick={()=> history.goBack()}/>
                  </Col>
              }}/>
              <Route path="/directors/:name" render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                      <DirectorView director={movies.find(m => m.Director.Name === match.params.name)
                      .Director} onBackClick={() => history.goBack()}/>
                  </Col>
              }}/>
            </Row>
              
          </Router>

            );         
    }}
    export default MainView;
