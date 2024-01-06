import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import firebase from "firebase/app";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInWithFacebookPopup,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  useEffect(() => {
    async function getRedirectResults() {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response) {
        const userDocRef = await createUserProfileDocument(response.user);
        console.log(userDocRef);
      }
    }
    getRedirectResults();
  }, []);

  const logGoogleUserWithPopup = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(response.user);
    console.log(response);
  };

  const logGoogleUserWithRedirect = async () => {
    const response = await signInWithGoogleRedirect();
    console.log(response);
    const userDocRef = await createUserProfileDocument(response.user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUserWithPopup}>
        Sign In with Google Popup
      </button>
      <button onClick={logGoogleUserWithRedirect}>
        Sign In with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
