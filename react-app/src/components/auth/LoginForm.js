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
    return <Redirect to='/' />;
  }

  return (
    <div className="login_container">
      <img src={logo} alt="Logo" className="login_img"></img>
      <h1>MyNotes</h1>
      <p className="remember">Remember Everything is  Important</p>
      <div className="login_form_container">
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit'>Login</button>
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
              <Link className='link' to="/accounts/sign-up">Sign Up</Link>
            </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
