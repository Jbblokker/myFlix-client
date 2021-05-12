import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export class MovieView extends React.Component {

    render() {
        const { movie, director,  onBackClick }= this.props;

        return (         
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title:</span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description</span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null);
                }}>Back</button>

                <link to={'/directors/${movie.Director.Name}'}>
                        <Button variant="link">Director</Button>
                    </link> 
                    
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="secondary"> Genre </Button>
                </Link>
                <Link to={`/`}>
                        <Button className='button-back' variant='primary'>Back</Button>
                </Link>
               
            </div>
        );
    }
}