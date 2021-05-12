import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

//Bootstrap components
import Buttom from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import styling 
import './profile-view.scss';

//export
export class ProfileView extends React.Compnent {
    constroctor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            email:'',
            birthday:'',
            favoriteMovies:''
        };
    }

    componentDidMount(){
        this.GetUser();
    }

    getUser() {
        const username = localStorage.getItem('user');
        let token = localStorage.getItem('token');

        axios.get(`https://sleepy-crag-80436.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}`},
        })

        .then((response) => {
            this.setState({
                Username:response.data.username,
                password:response.data.password,
                email:response.data.email,
                birthday:response.data.birthday
            })
        })

        .catch(function (error) { 
            console.log('error at getUser', error);
        })
    }

    handleDeregister(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete('https://sleepy-crag-80436.herokuapp.com/users/${username}'{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        })
        .catch((e) => { 
            console.log(e);
        });



    }

    handleUpdate(e, username, password, email, birthday ) {

        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = loaclStorage.getItem('user');

        const
    }

}



// I need to be able for user to update their info
//allow a user to deregister
//display a user's favorite movie
//allow a user to remove a movie from list