import React from 'react';
import PropTypes from 'prop-types';

export default function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegister(username); 
    }
    
    axios.post('https://sleepy-crag-80436.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');// the second argument '_self' is necessary so that the page 
      //will open in a current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });

      
    
        return(
            <Container>
          <form>
            <label>
              Email:
              <input type='text' value={Email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              Birthday:
            <input type='text' value={Birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <label>
             Username:
             <input type='text' value={Username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
            Password:
            <input type='text' value={Password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </form> 
          </Container>
        );
}