import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../images/book1.jpeg';
import './auth.css';
import { Link } from "react-router-dom";
import question_face from '../../images/Question-mark-face.jpeg'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_url, setProfile_url] = useState("")
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {
    const errors = []
    if (username.length < 3 || username.length > 45){
      errors.push("Username must be between 3 and 45 characters.")
    }
    if (!email.includes("@")){
      errors.push("Please provide a valid email.")
    }
    if (password != repeatPassword){
      errors.push("Password do not match.")
    }
    if (password.length < 5) {
      errors.push("Password should be longer than 5.")
    }
    //  if(typeof profile_url != "string") {
    // if (!profile_url || (!profile_url.includes(".png") || (!profile_url.includes(".jpeg")))) {
    //    setProfile_url(question_face);
    //  }
    return errors
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) return setErrors(errors)
    if (password === repeatPassword) {
      if (profile_url.length === 0) {
        const data = await dispatch(signUp(username, email, password, question_face));
        if (data) {
          setErrors(data)
        } 
        // setProfile_url(question_face);
        // console.log("@@@@@@@@@@")
      } else {
        const data = await dispatch(signUp(username, email, password, profile_url));
        if (data) {
          setErrors(data)
        } 

      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfileUrl = (e) => {
    setProfile_url(e.target.value);
  }

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
                type='text'
                name='profile_url'
                onChange={updateProfileUrl}
                placeholder="Profile_url"
                value={profile_url}
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
