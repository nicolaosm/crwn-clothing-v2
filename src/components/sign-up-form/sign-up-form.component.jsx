import { useState, useEffect } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { Form } from "react-router-dom";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // Log the formFields state whenever it changes
  useEffect(() => {
    console.log("Updated formFields:", formFields);
  }, [formFields]); // Dependency array

  // Reset the form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // First, check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // If they do, create the user in Firebase Auth
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Then, create the user in Firestore
      const userDocRef = await createUserProfileDocument(user, {
        displayName,
      });
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
    console.log("formFields:", formFields);
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    //  Update the formFields state
    setFormFields({
      ...formFields, // This copies all the existing fields into the new state
      [name]: value,
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account? Sign up here</h2>
      <span>Sign up with your Email Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label={"Email"}
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label={"Password"}
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label={"Confirm Password"}
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
