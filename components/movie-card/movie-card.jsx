import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//import styling from bootstrap
import  { Button, Card } from 'react-bootstrap';

//import local styling
import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="col-sm-12" controlId="cardmovie">
                <Card.Img class="movie-img" variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title class="card-title">{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="primary" class="movie-card-button">About</Button>
                    </Link>
                </Card.Body>
            </Card>
            
        );
    }
}
//check my mongo db to find all catagories we need to match. Left for reference
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    })
};