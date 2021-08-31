import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

//imports of other pages to main-View
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import MovieList from '../movie-list/movies-list';

//import local styling 
import "./main-view.scss";

//styling imports
import  { Navbar, NavDropdown, Button, Col, Row} from 'react-bootstrap';

export class MainView extends React.Component {

    constructor() {
        super();
        //Initial state is set to null
        this.state = {
            movies: [],
            user: null,
            token: null,
            register: false
        };
    }
    
    
    componentDidMount(){

        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
             user: localStorage.getItem('user'),
             token:accessToken
           });
         this.getMovies(accessToken);
        }
    }
    getMovies(token) { 
        axios.get(`https://sleepy-crag-80436.herokuapp.com/movies`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setMovies(response.data);
            //this.setState({
               // movies: response.data,
                //token: access.token
       })
    
        .catch(function (error) {
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
    entry in state to the *particular user*/

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

    //onRegister(register) {
       // this.setState({
       //   register
      //  });
  //  }

    render(){
        // const { movies, register, selectedMovie, user } = this.state;  
        
        let { movies } = this.props;
        let { user, register } = this.state;
                  
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user
        details are *passed as a prop to the LoginView*/
      
        //before the movie have been loaded
       //if (!user && movies.length === 0) return <div className="main-view">Loading...</div>;

        return(                    
            <Router>
                    <Navbar bg="dark" variant="dark" fixed="top">
                    <Link to={'/'}>
                            <h5 className="header text-white">MyFlix by [ Blokked code ]</h5> 
                        </Link>
                        <Navbar.Collapse id="navbar-responsive">  
                            <NavDropdown title="Options" id="collapsible-nav-dropdown" stye="marginRight: 100"> 
                                <NavDropdown.Item href="/profile/">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={() => { this.onLoggedOut() }}>Logout</NavDropdown.Item> 
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Navbar>
                <Row className="main-view justify-content-md-center">
                <Route exact path="/" render={() => {
                    if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                    if (movies.length === 0) return <div className="main-view" /> 
                        return <MovieList movies={movies}/> }} />
                        {/* return movies.map(m => ( 
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        )) 
                    }}  */}
                <Route path="/register" render={() => {
                    if (!register) return <RegisterView onRegister={(register) =>this.onRegister(register)}/>
                }} />
                <Route exact path="/profile" render={({ }) => {
                return <Col md={9}>
                    {/* key={value} */}
                    <ProfileView movies={movies} />
                </Col>
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
    let mapStateToProps = state => {
        return { movies: state.movies }
    }
    export default connect(mapStateToProps, { setMovies } )(MainView);
