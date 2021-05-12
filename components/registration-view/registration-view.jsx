import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { Container} from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap/Form';
 
export default function RegisterView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        //props.onRegister(username); 
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
              <Form>
                <Form.Group controlId="regEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type='text' value={Email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="regBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type='text' value={Birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="regUser">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type='text' value={Username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group Controlid="regPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type='text' value={Password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={ onSubmit }> SUBMIT </Button>
              </Form> 
          </Container>
        );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func.isRequired
};