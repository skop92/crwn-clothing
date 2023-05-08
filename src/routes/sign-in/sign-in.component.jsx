import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect(() => {
    async function handleRedirect() {
      // Some browser settings may prevent this from working as expected
      // ... like settings related to sessionStorage
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
      //console.log(response);
    }
    handleRedirect();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(); // destruct from response
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  )
}

export default SignIn;