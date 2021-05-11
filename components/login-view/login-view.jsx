import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import styling
import './login-view.scss';

//export loginView
export function LoginView(props) {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
 
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a request to the server for authentication 
        axios.post('https://sleepy-crag-80436.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user');
            console.log(e);
        })
    };

    return (
        
        <Form className="login-page">
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" className="login-input" size="sm" placeholder="Type Username Here" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type= "password" placeholder=" Type Password Here" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
                LOGIN
            </Button>
                <Link to={`/register`}>
                        <Button className='button-register' variant='primary'>REGISTER</Button>
                </Link>
        </Form>
        
    );               
}