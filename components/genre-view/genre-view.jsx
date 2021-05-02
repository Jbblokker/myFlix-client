import React from 'react';

export class GenreView extends React.Component {

    render(){
        const { genre, onBackClick }= this.props;

        return(
            <div className="genre-view">
                <div className="genre-name">
                    <span className="label">Genre:</span>
                    <span className="value">{genre.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label">Description</span>
                    <span className="value">{genre.Description</span>
                </div>
            </div>
        );
    }
}