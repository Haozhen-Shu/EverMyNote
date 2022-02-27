import "./Note.css";
import notebook_logo from '../../images/notebook.png';
import note_logo from '../../images/note.png';
import logout_logo from '../../images/logout.png';
import linkedIn_logo from '../../images/linkedin.png';
import github_logo from '../../images/github.png'
import fullscreen_logo from '../../images/fullscreen.png';
// import move_logo from '../../images/move.png';
import {useEffect, useState} from 'react';
import {getAllNotes, getOneNotebook, createOneNote, editOneNote, removeOneNote} from '../../store/notebook';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
// import EditNote from './EditNote';


const Note = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user);
    const userid = user.id;
    const {notebookid} = useParams();
    const notes = useSelector(state=>state.notebook.notes)
    const [notebook, setNotebook] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [currNote, setCurrNote] = useState("")
    const [errorsCreate, setErrorsCreate] = useState([])
    const [errorsEdit, setErrorsEdit] = useState([])
    const [currNoteContent, setCurrNoteContent] = useState("")
    const [currNoteTitle, setCurrNoteTitle] = useState("")
    const notebooks = useSelector(state => state.notebook.notebooks)
    const [searchContent, setSearchContent] = useState("")
    const [allTitles, setAllTitles] = useState()
    const history = useHistory();
    const [preNoteTitle, setPreNoteTitle] = useState("")
    

    useEffect(() => {
        (async () => {
            const titles = await fetch(`/api/users/${user.id}/search`)
            const Titles = await titles.json();
            setAllTitles(Titles)

        })();
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllNotes(userid, notebookid))
    }, [dispatch])


    let allnotebooks;
    let allnotes;
    if (allTitles) {
        allnotebooks = allTitles.notebooks;
        allnotes = allTitles.notes;
    }
    // console.log(allnotebooks, "kkkkkk");
    // console.log(allnotes,"eeeeee")

    const handleSearch = () => {
        if (allnotebooks) {
            for (let i = 0; i < allnotebooks.length; i++) {
                if (searchContent.toLowerCase() == allnotebooks[i].title.toLowerCase()) {
                    history.push(`/notebooks/${allnotebooks[i].id}`)
                }
            }
        } else if (allnotes) {
            for (let i = 0; i < allnotes.length; i++) {
                if (searchContent.toLowerCase() == allnotes[i].title.toLowerCase()) {
                    history.push(`/notebooks/${allnotes[i].notebookid}`)
                }
            }
        } else {
            return "Notebook or note not found!"
        }
    }

    let titleList = []
    if (notebooks){
        for (let i = 0; i < notebooks.length; i++) {
            titleList.push(notebooks[i].title)
        }
    }

    if (notes) {
        for (let i = 0; i < notes.length; i++) {
            titleList.push(notes[i].title)
        }
    }

    const validateCreate =  () => {
        // console.log(title in titleList)
        const errorsCreateList =[];
        if (!title) {
            errorsCreateList.push("Please provide an title.")
        }
        if (!content) {
            errorsCreateList.push("Please provide valid content.")
        }
        if ( titleList && titleList.includes(title)) {
            errorsCreateList.push("Please provide a unique title.")
        }
        setErrorsCreate(errorsCreateList)
        return errorsCreateList
    }

    const validateEdit = () => {
        const errorsEditList =[];
        if (!currNoteTitle) {
            errorsEditList.push("Please provide an title")
        }

        if (!currNoteContent) {
            errorsEditList.push("Please provide valid content")
        }
        if (preNoteTitle && currNoteTitle && (preNoteTitle == currNoteTitle)) {
            errorsEditList.push("Please provide a different title.")
        }
        if (titleList && (title!=currNoteTitle) && (titleList.includes(title))){
            errorsEditList.push("Please provide a unique title.")
        }
        setErrorsEdit(errorsEditList)
        return errorsEditList
    }
    
    const handleNewNote = () => {
        document.querySelector(".note_editor_container").classList.remove("hidden")
    }

    

    const handleCreateSubmit = async(e) => {
        e.preventDefault();
         const errorsCreateList = validateCreate();
        if (errorsCreateList.length > 0) return 
        const noteVal = {
            title: title,
            content: content
        }
        await dispatch(createOneNote(userid, notebookid, noteVal))
        // console.log(notes)
        document.querySelector(".note_editor_container").classList.add("hidden")
        setTitle("")
        setContent("")
    }

    const closeEditor = () => {
        document.querySelector(".note_editor_container").classList.add("hidden")
    }

    const handleOpenEditor =(note) => {
        if (note){
          setCurrNote(note)
        //   console.log(note, "note", currNote, "currNote")
          setCurrNoteContent(note.content)
          setCurrNoteTitle(note.title)
          setPreNoteTitle(note.title)
        //   console.log(currNoteContent)
        }
        document.querySelector(".note_editor_container").classList.add("hidden")
        document.querySelector(".note_edit_editor_container").classList.remove("hidden")
        document.querySelector(".new_note").classList.add("hidden")
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        
        const noteid =  currNote.id;    
        await document.querySelector(".note_editor_container").classList.add("hidden")
        await document.querySelector(".note_edit_editor_container").classList.remove("hidden")
        const errorsEditList = validateEdit();
        if (errorsEditList.length > 0) return 
        const noteVal = {
            title: currNoteTitle,
            content: currNoteContent
        }
        const data = await dispatch(editOneNote(userid, notebookid, noteid, noteVal))
        if (data.errors){
            setErrorsEdit(data.errors)
        }
        
        await document.querySelector(".note_edit_editor_container").classList.add("hidden")
        await document.querySelector(".new_note").classList.remove("hidden")

    }

    const closeEditEditor = (e) => {
        e.preventDefault();
        document.querySelector(".note_edit_editor_container").classList.add("hidden")
        document.querySelector(".new_note").classList.remove("hidden")
        setCurrNoteTitle(title)
        setCurrNoteContent(content)
        setErrorsEdit([])
    }

    const handleDelete = (note)=> {
        dispatch(removeOneNote(userid, notebookid, note.id))
        document.querySelector(".note_edit_editor_container").classList.add("hidden")
    }


    const handleFullscreen = () => {
        document.querySelector(".note_edit_editor_container").classList.toggle("fullscreen")
    }

    // useEffect(()=> {
    //     dispatch(getAllNotes(userid, notebookid))
    // }, [dispatch])

    useEffect(()=> {
        dispatch(getOneNotebook(userid, notebookid)).then(res=>setNotebook(res.notebook))
    }, [dispatch])
    // console.log(notes)
    // console.log(currNote, "cccccccccc")
    return (
        <div className="note_container">
            <div className="navbar">
                <div className="navbar_header">
                    <img src={user.profile_url} className="navbar_url" alt="user profile url"></img>
                    <div className="navbar_profile_name">
                        <p>Welcome {user.username}</p>
                    </div>
                </div>
                {/* <div className="navbar_search">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="C1Pw2rSHz9BEf3xLKAgU"><path fillRule="evenodd" clipRule="evenodd" d="M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z" fill="currentColor"></path></svg>
                    <form className="search_form" role="search" onSubmit={handleSearch}> 
                        <input
                            className="search"
                            placeholder="Search"
                            value={searchContent}
                            onChange={e => setSearchContent(e.target.value)}
                        />
                    </form>
                </div> */}
                <button className="new_note" onClick={handleNewNote}>
                    <div className="new_note_icon">+</div>
                    <div className="add_new_note" >
                        New Note
                    </div>
                </button>
                <div className="navbar_menu">
                    <h3 className="navbar_notebooks">
                        <img src={notebook_logo} className="notebooks_icon" alt="notebook icon" />
                        <NavLink to="/notebooks" className="navbar_title_notebooks">Notebooks</NavLink>
                    </h3>
                    <h3 className="navbar_notes">
                        <img src={note_logo} title="note_icons" className="notes_icon" alt="note icon"/>
                        <NavLink to="/notes" className="navbar_title_notebooks">Notes</NavLink>
                    </h3>
                    <h3 className="navbar_logout">
                        <img src={logout_logo} className="logout_icon" alt="logout icon" />
                        <LogoutButton />
                    </h3>

                </div>
                <div className="navbar_links">
                    <a href="https://www.linkedin.com/in/haozhen-shu-a5136ab7/" target="_blank" rel="noreferrer noopener">
                        <img src={linkedIn_logo} className="linkedIn_icon"  alt="linkedIn icon"/>
                    </a>
                    <a href="https://github.com/Haozhen-Shu/MyNotes" target="_blank" rel="noreferrer noopener">
                        <img src={github_logo} className="github_icon" alt="github logo"/>
                    </a>
                </div>

            </div>
            <div className="note_main">
                <div className="note_header">
                    <div className="notes_img_notes">
                        <img src={notebook_logo} className="note_main_img" alt="notebook logo"/>
                        <div className="notes_notebook_title">{notebook && notebook.title}</div>
                    </div>
                    <div className="notes_count">
                        {notes && notes.length}
                         Notes
                    </div>
                </div>
                <div className="notes_container">
                    <ul className="notes_list">
                    {notes && notes.map(note => (
                        <li key={note.title} className="note_info" >
                            <div className="note_title_delete">
                                <div className="note_title" onClick={() => handleOpenEditor(note)}>{note.title}</div> 
                                <button onClick={() =>handleDelete(note)}>Delete</button>
                            </div>
                            <div className="note_content" onClick={() => handleOpenEditor(note)}>{note.content}</div>
                            <div className="note_update">{note.updated_at.slice(5,11)}</div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className="note_editor_container hidden">
                <div className="note_editor">
                    <div className="note_editor_header">
                        <div className="note_editor_fullscreen_move">
                            <button className="fullscreen_btn"> 
                                <img className="fullscreen_img" src={fullscreen_logo} alt="fullscreen button" onClick={handleFullscreen}></img>
                            </button>
                            <button className="back_to_notebook">
                                <img className="note_editor_notebook_logo" src={notebook_logo} alt="notebook logo"></img>
                                <div className="note_editor_notbook-title">{notebook && notebook.title}</div>
                            </button>
                            {/* <button className="note_editor_move">
                                <img className="note_editor_move_img" src={move_logo} alt="note logo"></img>
                            </button> */}
                        </div>
                    </div>
                    <div className="note_editor_update">
                        Last edited on {notebook && (notebook.updated_at.slice(5,17))}
                    </div>
                </div>
                <form className="note_editor_form" onSubmit={handleCreateSubmit}>
                    <div>
                        {errorsCreate && errorsCreate.map((error) => (
                            <div key={error} className="errors_note_create">{error}</div>
                        ))}
                    </div>
                    <input 
                        className="note_editor_title" 
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                        // onBlur={handleTitleBlur}
                        >
                    </input>
                    {/* <ReactQuill theme="snow" placeholder="Satrt witing" onBlur={handleContentBlur} onChange={e=>setContent(e.target.value)} /> */}
                    <textarea
                        className="note_editor_content"
                        id="content"
                        rows="17"
                        cols="65"
                        placeholder="Content"
                        value={content}
                        onChange={e=>setContent(e.target.value)}
                        // onBlur={handleContentBlur}
                        >
                    </textarea>
                    <div className ="editor_save_cancel">
                        <button type="submit">Save</button>
                        <button onClick={closeEditor}>Cancel</button>
                    </div>
                </form>    
            </div>
            <div className="note_edit_editor_container hidden">
                <div className="note_edit_editor">
                    <div className="note_editor_header">
                        <div className="note_editor_fullscreen_move">
                            <button className="fullscreen_btn">
                                <img className="fullscreen_img" src={fullscreen_logo} alt="fullscreen button" onClick={handleFullscreen}></img>
                            </button>
                            <button className="back_to_notebook">
                                <img className="note_editor_notebook_logo" src={notebook_logo} alt="notebook logo"></img>
                                <div className="note_editor_notbook-title">{notebook && notebook.title}</div>
                            </button>
                            {/* <button className="note_editor_move">
                                <img className="note_editor_move_img" src={move_logo} alt="nove logo"></img>
                            </button> */}
                        </div>
                    </div>
                    <div className="note_editor_update">
                        Last edited on {notebook && notebook.updated_at.slice(5, 17)}
                    </div>
                    <form className="note_edit_editor_form" onSubmit={handleEdit}>
                        <div>
                            {errorsEdit && errorsEdit.map((error, ind) => (
                                <div key={error} className="errors_note_create">{error}</div>
                            ))}
                        </div>
                        <input
                            className="note_edit_editor_title"
                            type="text"
                            placeholder={currNoteTitle}
                            value={currNoteTitle}
                            onChange={e => setCurrNoteTitle(e.target.value)}
                        // onBlur={handleTitleBlur}
                        >
                        </input>
                        {/* <ReactQuill theme="snow" placeholder="Satrt witing" onBlur={handleContentBlur} onChange={e=>setContent(e.target.value)} /> */}
                        <textarea
                            className="note_edit_editor_content"
                            rows="17"
                            cols="65"
                            id="content"
                            placeholder={currNoteContent}
                            value={currNoteContent}
                            onChange={e => setCurrNoteContent(e.target.value)}
                        // onBlur={handleContentBlur}
                        >
                        </textarea>
                        <div className="editor_edit_save_cancel">
                            <button type="submit">Save</button>
                            <button onClick={closeEditEditor}>Cancel</button>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    )

}

export default Note