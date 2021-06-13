import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';


//import bootstrap styling 
import  { Button, Card } from 'react-bootstrap';

//import local styling
import './movie-view.scss';


export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = { FavoriteMovies: [] };
    }
        //add to favorites
         addFavorite = (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            axios.post
                (`https://sleepy-crag-80436.herokuapp.com/users/${user}/Movies/${this.props.movie._id}`, {}, {
                headers: { Authorization: `Bearer ${token}`}
            })

            .then((response) => {
                alert(`${this.props.movie.Title} added to your Favorites List.`)
                this.setState({
                    fav: true,
                });
            })

            .catch(function (error) {
                console.log(Error, "movie not added to Favorites");
            });
        };
    render() {
        const { movie, director, addFavorite, onBackClick }= this.props;

        return (         
            <Card controlId="card-poster">
                <div className="img-fluid">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="text-white font-weight-bold">Title: </span>
                    <span className="text-white">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="text-white font-weight-bold">Description: </span>
                    <span className="text-white">{movie.Description}</span>
                </div>

                <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="primary btn-block"> Director </Button>
                </Link> 
                    
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="primary btn-block"> Genre </Button>
                </Link>
                {<Button variant="success btn-block" onClick={this.addFavorite}>Add to Favorites</Button>}       
                <div className="backbutton">
                    <Link to={`/`}>
                        <Button className='button-back' variant='danger btn-block'>Back</Button>
                    </Link>
                </div>
               
            </Card>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.array.isRequired
      }),
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };