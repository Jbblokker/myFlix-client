import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, director, onBackClick }= this.props;

        return (         
            <Card controlId="card-poster">
                <div className="movie-poster">
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
                    <div className="backbutton">
                        <Link to={`/`}>
                            <Button className='button-back' variant='danger btn-block'>Back</Button>
                        </Link>
                    </div>
               
            </Card>
        );
    }
}