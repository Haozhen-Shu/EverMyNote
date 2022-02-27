
import {React, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import notebook_logo from '../images/notebook.png';
import note_logo from '../images/note.png';
import logout_logo from '../images/logout.png';
import linkedIn_logo from '../images/linkedin.png';
import github_logo from '../images/github.png';
import searchResults from '../store/search';


const NavBar = () => {
  const user = useSelector(state=>state.session.user);
  const [searchContent, setSearchContent] = useState("")
  const [allTitles, setAllTitles] = useState()
  const dispatch = useDispatch();
  const history = useHistory();
  
  
  useEffect(()=> {
    (async () => {
      const titles = await fetch(`/api/users/${user.id}/search`)
      const Titles = await titles.json();
      setAllTitles(Titles)

    })();
  },[dispatch]);

  let allnotebooks;
  let allnotes;
  if (allTitles){
    allnotebooks = allTitles.notebooks;
    allnotes = allTitles.notes;
   }
  
  // console.log(allnotebooks)
  // console.log(allnotes)
  
  
  const handleSearch = () => {
    if (allnotebooks) {
      for (let i = 0; i < allnotebooks.length; i++) {
        if (searchContent == allnotebooks[i].title) {
          // console.log(searchContent, "ccccccc")
          // console.log(allnotebooks[i].title, "tttttt")
          history.push(`/notebooks/${allnotebooks[i].id}`)
        }
      }
    }

    // console.log(searchContent, "ccccccc")
    // console.log(allnotes, "tttttt")
     if (allnotes) {
      for (let i = 0; i < allnotes.length; i++) {
        if (searchContent == allnotes[i].title) {
          // console.log(searchContent, "ccccccc")
          // console.log(allnotes[i].title, "tttttt")
          history.push(`/notebooks/${allnotes[i].notebookid}`)
        }
      }
    // } else {
    //   return "Notebook or note not found!"
    }
  }
  
  // console.log(searchContent, "ccccccc")
  // console.log(allnotes, "tttttt")

  return (
    <div className="navbar">
      <div className="navbar_header">
        <img src={user.profile_url} className="navbar_url" alt="navbar_url"></img>
        <div className="navbar_profile_name">
          <p>Welcome {user.username}</p>
        </div>
      </div>
      <div className="navbar_search">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="C1Pw2rSHz9BEf3xLKAgU"><path fillRule="evenodd" clipRule="evenodd" d="M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z" fill="currentColor"></path></svg>
        <form className="search_form" role="search" onSubmit={handleSearch}>
          <input
          type="text"
          name="searchContent"
          className="search"
          placeholder="Search"
          // atuoComplete="off"
          value={searchContent}
          onChange={e => setSearchContent(e.target.value)}
          />
        </form>
      </div>
      <button className="new_note">
        <div className="new_note_icon">+</div>
        <div className="add_new_note" >
          New Note
        </div>
      </button>
      <div className="navbar_menu">
        <h3 className="navbar_notebooks"> 
          <img src={notebook_logo} className="notebooks_icon" alt="notebook logo"/>
          <NavLink to="/notebooks" className="navbar_title_notebooks">Notebooks</NavLink>
        </h3>
        <h3 className="navbar_notes">
          <img src={note_logo} title="note_icons" className="notes_icon" alt="note logo"/>
          <NavLink to="/notes" className="navbar_title_notebooks">Notes</NavLink>
        </h3>
        <h3 className="navbar_logout">
          <img src={logout_logo} className="logout_icon" alt="logout logo"/>
          <LogoutButton />
        </h3>

      </div>
      <div className="navbar_links">
        <a href="https://www.linkedin.com/in/haozhen-shu-a5136ab7/" target="_blank" rel="noreferrer noopener">
            <img src={linkedIn_logo} className="linkedIn_icon"  alt="linkedin logo"/>
        </a>
        <a href="https://github.com/Haozhen-Shu/MyNotes" target="_blank" rel="noreferrer noopener">
           <img src={github_logo} className="github_icon" alt="github logo"/>
        </a> 
      </div>

    </div>
  );
}

export default NavBar;
