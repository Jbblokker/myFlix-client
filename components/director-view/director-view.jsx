import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

//styling from bootstrap
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

//internal styling 
import './director-view.scss';

export class DirectorView extends React.Component {



    render() {
        const { director, onBackClick}= this.props;

        return (
          <Container className="director-container">
            <div className="director-view">
                <Card className="director-card">
                    <div className="director-name">
                      <Card.Title className="text-white">DIRECTOR</Card.Title>
                             <span className="text-white font-weight-bold">Name: </span>
                              <span className="text-white">{director.Name}</span>
                        </div>
                        <div className="director-bio">
                              <span className="text-white font-weight-bold">Bio: </span>
                              <span className="text-white">{director.Bio}</span>
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


