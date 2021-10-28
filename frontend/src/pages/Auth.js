import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import AuthContext from '../store/auth-context';

import '../styles/pages/_auth.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle sign-in/sign-up form
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailChangeHandler = () => setEnteredEmail(emailInputRef.current.value);
  const passwordChangeHandler = () =>
    setEnteredPassword(passwordInputRef.current.value);

  const createNewAcctHandler = () => {
    setIsLogin((prevState) => {
      setIsLogin(!prevState);
    });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    // send form input data to server
    const inputData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    // console.log(inputData);

    if (isLogin) {
      await authCtx.onLogin(inputData);
    } else {
      await authCtx.onRegister(inputData);
    }
    // go back to previous page after login
    history.goBack();
  };
  console.log(authCtx.isAuthenticated);

  return (
    <>
      <div className='auth'>
        <h1 className='heading--1 auth__heading'>
          {isLogin ? 'Login' : 'Create Account'}
        </h1>
        <form action='' className='auth__form' onSubmit={authSubmitHandler}>
          <div className='auth-form__group'>
            <label className='auth-form__label' htmlFor=''>
              Email
            </label>
            <input
              ref={emailInputRef}
              className='auth-form__input'
              type='text'
              name='email'
              id='email'
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div className='auth-form__group'>
            <label className='auth-form__label' htmlFor=''>
              Password
            </label>
            <input
              ref={passwordInputRef}
              className='auth-form__input'
              type='password'
              name='password'
              id='password'
              onChange={passwordChangeHandler}
              required
            />
          </div>

          <div className='form__action'>
            <button className='btn btn-primary' type='submit'>
              {isLogin ? 'Login' : 'Create Account'}
            </button>

            <button
              className='btn btn-tertiary'
              type='button'
              onClick={createNewAcctHandler}
            >
              {isLogin
                ? 'New Customer? Create an Account'
                : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
