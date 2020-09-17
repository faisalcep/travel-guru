import React, { useState, useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import facebookIcon from '../../assets/icon/fb.png';
import googleIcon from '../../assets/icon/google.png';
import githubIcon from '../../assets/icon/github.png';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleFbSignIn,
  handleGithubSignIn,
  resetPassword,
} from './loginManager';

// ============================================================================================

const Login = () => {
  // Initialize Firebase
  initializeLoginFramework();

  //Handle New User:
  const [newUser, SetNewUSer] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
  });

  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // Redirecting to Hotel Component if signed In successfully
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: '/hotel-details/' },
  };

  // Google Sign In
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => handleResponse(res, true));
  };
  // Facebook Sign In
  const fbSignIn = () => {
    handleFbSignIn().then((res) => handleResponse(res, true));
  };

  // Github Sign In
  const githubSignIn = () => {
    handleGithubSignIn().then((res) => handleResponse(res, true));
  };

  // handle Response
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  // handle Sign Out
  // const signOut = () => {
  //   handleSignOut().then((res) => {
  //     handleResponse(res, false);
  //   });
  // };
  // =========================================================

  // Validate form input
  const handleBlur = (e) => {
    // debugger;
    let isFieldValid = true;
    // console.log(e.target.name, e.target.value);
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    // Password with at least 1 number
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  // Handle login with email and password
  const handleUserSubmit = () => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          verifyEmail();
          // window.history.back();
        })
        .catch((err) => setUser({ error: err.message }));
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((err) => setUser({ error: err.message }));
    }
    // e.preventDefault();
  };

  // Update username
  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(function (res) {
        setUser(res.user);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  // Send verification email
  const verifyEmail = () => {
    const userVerify = firebase.auth().currentUser;
    userVerify
      .sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // React hook form for extra form validation and error message
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <Container className='d-flex justify-content-center mt-4'>
      <Row>
        <Col md={12}>
          {/* If not a new user then show this form, else Sign Up form*/}
          {!newUser ? (
            <Form
              onSubmit={handleSubmit(handleUserSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >
              {/* Show error message if user not exist or password is wrong or other error */}
              {user != null && (
                <p style={{ maxWidth: '400px' }} className='text-danger'>
                  * {user.error}
                </p>
              )}
              <h4 className='font-weight-bold mb-3'>Login</h4>
              <Form.Group controlId='formEmail'>
                <Form.Control
                  onBlur={handleBlur}
                  name='email'
                  type='email'
                  placeholder='Email'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Control
                  onBlur={handleBlur}
                  name='password'
                  type='password'
                  placeholder='Password'
                  ref={register({ required: true })}
                />
                {errors.password && (
                  <span className='error'>Password is required</span>
                )}
              </Form.Group>

              <Form.Row className='mt-3 text-center'>
                <Form.Group as={Col} id='formGridCheckbox'>
                  <Form.Check type='checkbox' label='Remember me' />
                </Form.Group>
                <Form.Group as={Col} id='formForget'>
                  <span
                    style={{ cursor: 'pointer', color: '#F9A51A' }}
                    onClick={() => resetPassword(user.email)}
                  >
                    Foreget Password?
                  </span>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Button
                  style={{ width: '100%' }}
                  variant='warning'
                  type='submit'
                >
                  Login
                </Button>
              </Form.Group>

              <Form.Group as={Col} id='formForget' className='text-center mt-3'>
                <span>Don't have an account?</span>{' '}
                <span
                  style={{ cursor: 'pointer', color: '#F9A51A' }}
                  onClick={() => SetNewUSer(true)}
                >
                  Create an account
                </span>
              </Form.Group>

              <p className='horizontal-or'> or </p>
              <div className='social-login'>
                <Button onClick={fbSignIn}>
                  <img src={facebookIcon} alt='facebook icon' />{' '}
                  <span>Continue with Facebook</span>
                </Button>
                <Button onClick={googleSignIn}>
                  <img src={googleIcon} alt='google icon' />{' '}
                  <span>Continue with Google</span>
                </Button>
                <Button onClick={githubSignIn}>
                  <img src={githubIcon} alt='github icon' />{' '}
                  <span>Continue with Github</span>
                </Button>
              </div>
            </Form>
          ) : (
            <Form
              onSubmit={handleSubmit(handleUserSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >
              {/* Show error message if user not exist or password is wrong */}
              {user != null && (
                <p style={{ maxWidth: '400px' }} className='text-danger'>
                  * {user.error}
                </p>
              )}
              <h4 className='font-weight-bold mb-3'>Login</h4>
              <Form.Group controlId='formFirstName'>
                <Form.Control
                  onBlur={handleBlur}
                  name='name'
                  type='text'
                  placeholder='Name'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Name is required</span>
                )}
              </Form.Group>
              <Form.Group controlId='formEmail'>
                <Form.Control
                  onBlur={handleBlur}
                  name='email'
                  type='email'
                  placeholder='Email'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Control
                  onBlur={handleBlur}
                  name='password'
                  type='password'
                  placeholder='Password'
                  ref={register({ required: true, minLength: 6 })}
                />
                {errors.password && (
                  <span className='error'>
                    6 character with at least 1 digit is required
                  </span>
                )}
              </Form.Group>
              <Form.Group controlId='formConfirmPassword'>
                <Form.Control
                  onBlur={handleBlur}
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                  ref={register({
                    validate: (value) => value === watch('password'),
                  })}
                />
                {errors.confirmPassword && (
                  <span className='error'>Password don't match</span>
                )}
              </Form.Group>

              <Form.Group>
                <Button
                  style={{ width: '100%' }}
                  variant='primary'
                  type='submit'
                >
                  Sign Up
                </Button>

                <Form.Group
                  className='text-center mt-3'
                  style={{ color: 'green' }}
                >
                  {user.success && (
                    <p>
                      User Created Successfully. A verification email sent in
                      your email.
                    </p>
                  )}
                </Form.Group>
              </Form.Group>

              <Form.Group as={Col} id='formForget' className='text-center mt-2'>
                <span>Already have an account?</span>{' '}
                <span
                  style={{ cursor: 'pointer', color: '#F9A51A' }}
                  onClick={() => SetNewUSer(false)}
                >
                  Login
                </span>
              </Form.Group>

              <p className='horizontal-or'> or </p>
              <div className='social-login'>
                <Button onClick={fbSignIn}>
                  <img src={facebookIcon} alt='facebook icon' />{' '}
                  <span>Continue with Facebook</span>
                </Button>
                <Button onClick={googleSignIn}>
                  <img src={googleIcon} alt='google icon' />{' '}
                  <span>Continue with Google</span>
                </Button>
                <Button onClick={githubSignIn}>
                  <img src={githubIcon} alt='github icon' />{' '}
                  <span>Continue with Github</span>
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
