import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password!==confirmPassword) {
      console.log('Passwords do not match'); // Use this before implementing better way to inform user
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    }
    catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        console.log('Cannot create user. Email already in use');
      } else {
        console.log('Error when signing up with email and password', error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          id='displayName'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <label>Email</label>
        <input
          id='email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        
        <label>Password</label>
        <input
          id='password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        
        <label>Confirm Password</label>
        <input
          id='confirmPassword'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
                
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;
