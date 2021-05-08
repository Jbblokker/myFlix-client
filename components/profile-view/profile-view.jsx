import React from 'react';
import axios from 'axios';

//Bootstrap components
import Buttom from 'react-bootstratp/Button';
import Form from 'react-bootstrat/Form';

//import styling 
import './profile-view.scss';

//export profile-view 
export function ProfileView(props){

}
    //send a request to the server to retrieve user info 
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a request to the server for authentication 
        axios.delete('https://sleepy-crag-80436.herokuapp.com/user', {
            headers: { Authorization: `Bearer ${token}`}
    })
        .then(response => {
            response.data("User has been deleted.")
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('user cannot be deleted');
            console.log(e);
        })
       
        axios.get('https://sleepy-crag-80436.herokuapp.com/users/movieiID, {
            
        .then(repsonse)// i need to be able to pull the users fav movie id
        })

        .catch(e => {
            console.log('cannot pull favorite movies');
            console.log(e);
        })
//for profile view I need to look into handle.sumbit and axios to get the full 
// idea how to creat this page. 
// lets draw it out and see if we can create it too


// I need to be able for user to update their info
//allow a user to deregister
//display a user's favorite movie
//allow a user to remove a movie from list