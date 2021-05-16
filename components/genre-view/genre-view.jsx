import React from 'react';

//import styling from bootstrap
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

//import internal styling 
import './genre-view.scss';


export class GenreView extends React.Component {

    render(){
        const { genre, onBackClick }= this.props;

        return(
            <Card className="genre-view">
                <div className="genre-view">
                    <div className="genre-name">
                        <span className="text-white font-weight-bold">Genre: </span>
                        <span className="text-white">{genre.Name}</span>
                    </div>
                    <div className="genre-description">
                        <span className="text-white font-weight-bold">Description: </span>
                        <span className="text-white">{genre.Description}</span>
                    </div>
                    <div className="genre-button">
                        <Button variant="primary" onClick={() => onBackClick()}>
                        Back
                        </Button>
                    </div>
                </div>
            </Card>
        );
    }
}