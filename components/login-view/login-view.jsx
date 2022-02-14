import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import bootstrap styling 
import { Button, Form } from 'react-bootstrap';

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
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control type="text" className="login-input" size="sm" placeholder="Type Username Here" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control type= "password" placeholder=" Type Password Here" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="loginButton">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                LOGIN
            </Button>
            </Form.Group>
            <Form.Group controlId="registerButton">
                <Link to={`/register`}>
                        <Button className="button-register" variant="secondary btn-block">REGISTER</Button>
                </Link>
            </Form.Group>
        </Form>
        
    );               
}