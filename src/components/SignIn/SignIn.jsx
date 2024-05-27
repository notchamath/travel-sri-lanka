import { useState } from "react";
import { signInWithEmailPw } from "../../utils/firebase/firebase.utils";

import FormInput from '../FormInput/FormInput.jsx';

// default values for useState
const defaultFormFields = {
  email: '',
  password: '',
};

function SignIn() {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // reset fields to empty
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // handle form submits, prevent reloading the page first then connect to firebase
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailPw(email, password);
      resetFormFields();

    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  };

  // all fields changes are recorded to useState
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='signin__container'>

      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        
        <div className='signin__btns-container'>
          <button className='signin__btns' type='submit'>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn