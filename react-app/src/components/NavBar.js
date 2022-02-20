
import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import notebook_logo from '../images/notebook.png';
import note_logo from '../images/note.png';
import logout_logo from '../images/logout.png';
import linkedIn_logo from '../images/linkedin.png';
import github_logo from '../images/github.png'


const NavBar = () => {
  const user = useSelector(state=>state.session.user);
  // console.log(user, "uuuuuuuu")

  return (
    <div className="navbar">
      <div className="navbar_header">
        <img src={user.profile_url} className="navbar_url"></img>
        <div className="navbar_profile_name">
          <p>Welcome {user.username}</p>
        </div>
      </div>
      <div className="navbar_search">
        <form className="search_form">
          <input
          className="search"
          placeholder="Search"
          value={undefined}
          onChange={ e=> {}}
          />
        </form>
      </div>
      <div className="navbar_menu">
        <h3 className="navbar_notebooks"> 
          <img src={notebook_logo} className="notebooks_icon"/>
          <NavLink to="/notebooks" className="navbar_title_notebooks">Notebooks</NavLink>
        </h3>
        <h3 className="navbar_notes">
          <img src={note_logo} title="note_icons" className="notes_icon" />
          <NavLink to="/notes" className="navbar_title_notebooks">Notes</NavLink>
        </h3>
        <h3 className="navbar_logout">
          <img src={logout_logo} className="logout_icon"/>
          <LogoutButton />
        </h3>

      </div>
      <div className="navbar_links">
        <a href="https://www.linkedin.com/in/haozhen-shu-a5136ab7/" target="_blank" rel="noreferrer noopener">
            <img src={linkedIn_logo} className="linkedIn_icon" />
        </a>
        <a href="https://github.com/Haozhen-Shu/MyNotes" target="_blank" rel="noreferrer noopener">
           <img src={github_logo} className="github_icon"/>
        </a> 
      </div>

    </div>
  );
}

export default NavBar;
