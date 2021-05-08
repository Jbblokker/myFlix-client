import React from 'react';


export class DirectorView extends React.Component {

    render() {
        const { description, onBackClick }= this.props;
        
        return (
            <div className="director-view">
                <div className="director-name">
                    <span className="label">Name:</span>
                    <span className="value">{Director.Name}</span>
                </div>
                <div className="director-bio">
                    <span className="label">Bio</span>
                    <span className="value">{Director.Bio}</span>
                </div>
            </div>    
        );
    }
}