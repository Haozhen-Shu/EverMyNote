
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import notebook_logo from '../images/notebook.png';
import note_logo from '../images/note.png';
import logout_logo from '../images/logout.png';
import linkedIn_logo from '../images/linkedin.png';
import github_logo from '../images/github.png'


const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar_header">
        <div className="navbar_url">{}</div>
        <div className="navbar_profile_name">
          <p>Welcome name</p>
        </div>
      </div>
      <div className="navbar_search">
        <form className="search_form">
          <input
          className="search"
          placeholder="Search"
          value={null}
          onChange={ e=> {}}
          />
        </form>
      </div>
      <div className="navbar_menu">
        <h3 className="navbar_notebooks"> 
          <img src={notebook_logo} className="notebooks_icon"/>
          <p>Notebooks</p>
        </h3>
        <h3 className="navbar_notes">
          <img src={note_logo} title="note_icons" class="notes_icon" />
          <p>Notes</p>
        </h3>
        <h3 className="navbar_logout">
          <img src={logout_logo} class="logout_icon"/>
          <LogoutButton />
        </h3>

      </div>
      <div className="navbar_links">
          <img src={linkedIn_logo} className="linkedIn_icon"/>
          {/* // <a href="https://www.linkedin.com/in/haozhen-shu-a5136ab7/" className="></a> */}
         <img src={github_logo} className="github_icon"/>
      {/* <h3 className="  notebooksNavTitle">   <a href="https://github.com/Haozhen-Shu/MyNotes" className="y navhome"><i className=" xx fab fa-github"></i>GitHub</a> </h3> */}
      </div>

    </div>
  );
}

export default NavBar;
