import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, director, onBackClick }= this.props;

        return (         
            <Card className="card-poster">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label-Des">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="primary"> Director </Button>
                    </Link> 
                    
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="primary"> Genre </Button>
                </Link>
                <div class="backbutton">
                <Link to={`/`}>
                        <Button className='button-back' variant='danger'>Back</Button>
                </Link>
                </div>
               
            </Card>
        );
    }
}