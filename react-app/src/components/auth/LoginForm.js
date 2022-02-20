import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../images/book1.jpeg';
import './auth.css';
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onDemo = async(e) => {
    e.preventDefault();
    const email = 'demo@test.io';
    const password = 'password';
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/notebooks' />;
  }

  return (
    <div className="login_container">
      <img src={logo} alt="Logo" className="login_img"></img>
      <h1 className="login_head">MyNotes</h1>
      <p className="remember">Remember Everything is  Important</p>
      <div className="login_form_container">
        <form onSubmit={onLogin} className="login_form">
            <div>
              {errors.map((error, ind) => (
                <div className="login_error" key={ind}>{error}</div>
              ))}
            </div>
            <div className="login_input">
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit' className="login_btn">Login</button>
              </div>
            <div className="login-or">
              <div className="login-line"></div>
              <div className="l-or">OR</div>
              <div className="login-line"></div>
            </div>
            {!user &&
              <button className='demo' onClick={e => onDemo(e)}><nav>Log in as demo</nav></button>
            }
            <div className='addition'>
              Don't have a account?
            </div>
            <Link className='link' to="/sign-up">Create account</Link>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
