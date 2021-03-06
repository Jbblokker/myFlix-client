import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { render } from 'react-dom';

//import bootstrap styling
import  { Button, Form, Container, Card, FormLabel } from 'react-bootstrap';

//import local styling 
import './profile-view.scss';

//export
export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username:'',
            password:'',
            email:'',
            birthday:'',
            favoriteMovies:[],
        };
    }

    componentDidMount() {
        this.getUser();
    }
    //get users information
    getUser() {
        const username = localStorage.getItem('user');
        let token = localStorage.getItem('token');

        axios.get(`https://sleepy-crag-80436.herokuapp.com/user/${username}`, {
            headers: { Authorization: `Bearer ${token}`},
        })

        .then((response) => {
            this.setState({
                username: response.data.Username,
                password: response.data.Password,
                email: response.data.Email,
                birthday: response.data.Birthday,
                favoriteMovies: response.data.FavoriteMovies,
            });
        })

        .catch(function (error) { 
            console.log('error at getUser', error);
        });
    }
   

    //update a user
    handleUpdate(e, newUsername, newPassword, newEmail, newBirthday ) {

        e.preventDefault();
        this.setState({
            validated: null,
        });

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              validated: true,
            });
            return;
        }

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.put(`https://sleepy-crag-80436.herokuapp.com/user/${username}`,{
            headers: {Authorization:`Bearer ${token}`},
            data: {
                username: newUsername ? newUsername : this.state.username,
                password: newPassword ? newPassword : this.state.password,
                email: newEmail ? newEmail : this.state.email,
                birthday: newBirthday ? newBirthday : this.state.birthday,
            },
        })
        .then((response) => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
            });
            alert('Changes have been successfully made.');
            localStorage.setItem('user', this.state.Username);
        })

        .catch(function (e){
            console.log('update user function failed.', e)
        });
    }

    
        setUsername(input) {
        this.Username = input;
        }

        setPassword(input) {
        this.Password = input; 
        }

        setEmail(input) {
        this.Email = input;
        }

        setBirthday(input) {
        this.Birthday = input;
        }


        //remove favoriteMovie from user
        removeFavoriteMovie(movieId) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('user');

            axios 
            .delete(`https://sleepy-crag-80436.herokuapp.com/users/${username}/movies/${movieId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              alert('Movie was removed');
              this.componentDidMount();
            })
            .catch(function (error) {
              console.log(error);
            })        }
            
        //remove a user 
        handleDeregister(e) {
            e.preventDefault();

            const token = localStorage.getItem('token');
            const username = localStorage.getItem('user');

            axios.delete(`https://sleepy-crag-80436.herokuapp.com/user/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                alert('Your account has successfully been removed.');
            })
            .catch((error) => { 
                console.log(error, 'user has not been removed');
            })
            .catch((error) => {
                console.log(error);
            });
        }

        


    render() {
        const { favoriteMovies, validated } = this.state;
        const { movies } = this.props;
        const favorites = movies.filter(movie => favoriteMovies.indexOf(movie._id) > -1)


            return(
            //favorite movies
            <Container className='profile-view'>

            
            <Card className='profile-card'>
                <Card.Title className='profile-title'>Your List of Favorites</Card.Title>
                    <div className='favorites-container'>
                             {favoriteMovies.length > 0 &&
                            favorites.map(m => (
                            <Card className="col-sm-14" controlId="cardmovie">
                            <Card.Body>
                            <Card.Title>{m.Title}</Card.Title>
                            <Card.Img variant="top" src={m.ImagePath} />
                            <Link to={`/movies/${m._id}`}>
                                <Button class="profile-about" variant="link">About</Button>
                            </Link>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' value={m._id} onClick={(error) => this.removeFavoriteMovie(m._id)}>
                                Remove
                            </Button>
                </Card.Body>
            </Card>
            ))
           }
            </div>
            </Card>

            <Card className='update-card'>
                <Card.Title>Update Your Profile:</Card.Title>
                <Card.Body>
                    <Form noValidate validated={validated} className='update-form' onSubmit={(error) => this.handleUpdate(error, this.username, this.password, this.email, this.birthday)}>
                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label className='form-label'>Username</Form.Label>
                            <Form.Control type='text' placeholder='Change Username' onChange={() => this.setUsername(error.target.value)} pattern='[a-zA-Z0-9]{5,}' />
                            <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                        </Form.Group>
                            <Form.Group controlId='formBasicPassword'>
                            <Form.Label className='form-label'>
                            Password<span className='pw'></span>
                            </Form.Label>
                            <Form.Control type='password' placeholder='Current or New Password' onChange={(error) => this.setPassword(error.target.value)} pattern='.{5,}' />
                            <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 characters.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label className='form-label'>Email</Form.Label>
                            <Form.Control type='email' placeholder='Change Email' onChange={(error) => this.setEmail(error.target.value)} />
                            <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formBasicBirthday'>
                            <Form.Label className='form-label'>Birthday</Form.Label>
                            <Form.Control type='date' placeholder='Change Birthday' onChange={(error) => this.setBirthday(error.target.value)} />
                            <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>
                        </Form.Group>
                        <Button className='update-profile-button' type='submit' variant='info'>
                        Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            

        <Card className='update-card'>
            <Card.Title className='profile-title'>Delete Your Profile</Card.Title>
            <Card.Subtitle className='text-muted'>Once deleted, your account cannot be recovered. </Card.Subtitle>
            <br></br>
            <Card.Subtitle className='text-muted'>( It is like a bad first date, no going back. )</Card.Subtitle>
            <Card.Body>
                <Button className='button' variant='danger' onClick={(error) => this.handleDeregister(error)}>
                    Click Here
                </Button>
            </Card.Body>
        </Card>
        </Container>
        );
      }
}

ProfileView.propTypes = {
user: propTypes.shape({
favoriteMovies: propTypes.arrayOf(
propTypes.shape({
_id: propTypes.string.isRequired
})
),
username: propTypes.string.isRequired,
email: propTypes.string.isRequired,
birthday: propTypes.instanceOf(Date),
})
};


// I need to be able for user to update their info
//allow a user to deregister-check
//display a user's favorite movie-check
//allow a user to remove a movie from list-check