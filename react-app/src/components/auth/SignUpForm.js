import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../images/book1.jpeg';
import './auth.css';
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/notebooks' />;
  }

  return (
     <div className="login_container">
      <img src={logo} alt="Logo" className="login_img"></img>
      <h1 className="login_head">MyNotes</h1>
      <p className="remember">Remember Everything is  Important</p>
      <div className="login_form_container"></div>
          <form onSubmit={onSignUp} className="signup_form">
            <div>
              {errors.map((error, ind) => (
                <div className="signup_error" key={ind}>{error}</div>
              ))}
            </div>
            <div className="sinup_input">
            <input
                type='text'
                name='username'
                onChange={updateUsername}
                placeholder="Username"
                value={username}
              ></input>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                placeholder="Email"
                value={email}
              ></input>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                placeholder="Password"
                value={password}
              ></input>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                placeholder="Confirm Password"
                value={repeatPassword}
                required={true}
              ></input>
            <button type='submit' className="signup_btn">Sign Up</button>
            </div>
        <div className='addition'>
          Don't have a account?
        </div>
        <Link className='link' to="/login">Log In</Link>
          </form>
  </div>
  );
};

export default SignUpForm;
