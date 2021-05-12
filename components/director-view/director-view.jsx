import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
//styling from bootstrap
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './director-view.scss';

export class DirectorView extends React.Component {



    render() {
        const { description, onBackClick }= this.props;
        
        return (
            <div className="director-view">
                <Card className="director-card">
                    <Card.Title className='director-title'>DIRECTOR</Card.Title>
                        <div className='director-name'>
                             <span className="label">Name: </span>
                              <span className="value">{director.Name}</span>
                        </div>
                        <div className="director-bio">
                              <span className="label">Bio: </span>
                              <span className="value">{director.Bio}</span>
                        </div>
                        <div className='director-back'>
                            <Button variant="primary" onClick={() => onBackClick()}>
                                Back
                            </Button>
                        </div>
                </Card>
             </div>    
           </Container>
        );
    }
}


