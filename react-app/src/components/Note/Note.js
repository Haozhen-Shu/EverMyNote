import { editOneNotebook } from '../../store/notebook';
import NavBar from '../NavBar';
import "./Note.css"
import notebook_logo from '../../images/notebook.png';
import note_logo from '../../images/note.png';
import logout_logo from '../../images/logout.png';
import linkedIn_logo from '../../images/linkedin.png';
import github_logo from '../../images/github.png'
import {useEffect, useState} from 'react';
import {getAllNotes, getOneNotebook} from '../../store/notebook';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const Note = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user);
    const userid = user.id;
    const {notebookid} = useParams();
    const notes = useSelector(state=>state.notebook.notes)
    const [notebook, setNotebook] = useState(null)
    
    const handleNewNote = () => {
        document.querySelector(".note_editor").classList.remove("hidden")
    }

    useEffect(()=> {
        dispatch(getAllNotes(userid, notebookid))
    }, [dispatch])

    useEffect(()=> {
        dispatch(getOneNotebook(userid, notebookid)).then(res=>setNotebook(res.notebook))
    }, [dispatch])
    
    // console.log(notes, "notes from component notes")
    // console.log(notebook, "notebook from component")
    return (
        <div className="note_container">
            <div className="navbar">
                <div className="navbar_header">
                    <img src={user.profile_url} className="navbar_url"></img>
                    <div className="navbar_profile_name">
                        <p>Welcome {user.username}</p>
                    </div>
                </div>
                <div className="navbar_search">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class="C1Pw2rSHz9BEf3xLKAgU"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z" fill="currentColor"></path></svg>
                    <form className="search_form" role="search">
                        <input
                            className="search"
                            placeholder="Search"
                            value={undefined}
                            onChange={e => { }}
                        />
                    </form>
                </div>
                <button className="new_note" onClick={handleNewNote}>
                    <div className="new_note_icon">+</div>
                    <div className="add_new_note" >
                        New Note
                    </div>
                </button>
                <div className="navbar_menu">
                    <h3 className="navbar_notebooks">
                        <img src={notebook_logo} className="notebooks_icon" />
                        <NavLink to="/notebooks" className="navbar_title_notebooks">Notebooks</NavLink>
                    </h3>
                    <h3 className="navbar_notes">
                        <img src={note_logo} title="note_icons" className="notes_icon" />
                        <NavLink to="/notes" className="navbar_title_notebooks">Notes</NavLink>
                    </h3>
                    <h3 className="navbar_logout">
                        <img src={logout_logo} className="logout_icon" />
                        <LogoutButton />
                    </h3>

                </div>
                <div className="navbar_links">
                    <a href="https://www.linkedin.com/in/haozhen-shu-a5136ab7/" target="_blank" rel="noreferrer noopener">
                        <img src={linkedIn_logo} className="linkedIn_icon" />
                    </a>
                    <a href="https://github.com/Haozhen-Shu/MyNotes" target="_blank" rel="noreferrer noopener">
                        <img src={github_logo} className="github_icon" />
                    </a>
                </div>

            </div>
            <div className="note_main">
                <div className="note_header">
                    <div className="notes_img_notes">
                        <img src={notebook_logo} className="note_main_img"/>
                        <div className="notes_notebook_title">{notebook && notebook.title}</div>
                    </div>
                    <div className="notes_count">
                        {notes && notes.length} Notes
                    </div>
                </div>
                <div className="notes_container">
                    <ul className="notes_list">
                    {notes && notes.map(note => (
                        <li key={note.id} className="note_info">
                            <div className="note_title">{note.title}</div>
                            <div className="note_content">{note.content}</div>
                            <div className="note_update">{note.updated_at.slice(5,11)}</div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className="note_editor hidden">
                I am editor
            </div>

        </div>
    )

}

export default Note