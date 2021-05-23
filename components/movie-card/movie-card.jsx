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
            <Card className="col-sm-14" controlid="cardmovie">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">About</Button>
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