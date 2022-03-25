import {useEffect, useState} from 'react';
import NavBar from '../NavBar';
import "./Notebook.css";
import Notebook_logo from '../../images/notebook.png';
import {useDispatch, useSelector} from 'react-redux';
import { getAllNotebooks, removeOneNotebook } from '../../store/notebook';
import NotebookModal from './NotebookModal';
import EditNotebookModal from './EditNotebookModal';
import Note from '../Note/Note';
import {NavLink, useHistory} from 'react-router-dom';

const Notebook = () => {
    if (document.querySelector(".new_note")){
        document.querySelector(".new_note").classList.add("hidden")
    }
    if (document.querySelector(".navbar_search")){

        document.querySelector(".navbar_search").classList.add('hidden')
    }

    const user = useSelector(state =>state.session.user)
    const dispatch = useDispatch()
    const notebooks = useSelector(state=> state.notebook.notebooks)
    console.log(notebooks)
    const [overlayCreate, setOverlayCreate] = useState(false)
    const [overlayEdit, setOverlayEdit] = useState(false)
    const [showNewNotebookForm, setShowNotebookForm] = useState(false)
    const [showEditNotebookForm, setShowEditNotebookForm] = useState(false)
    const [currentid, setCurrentid] = useState(null);
    const history = useHistory();
    const [searchContent, setSearchContent] = useState("");
    const [matchedNotebooks, setMatchedNotebooks] = useState([]);
    const [showAllNotebooks, setShowAllNotebooks] = useState(true);
    const [showMatchedNotebooks, setShowMatchedNotebooks] = useState(false)
   
    const handleNotebookModal = e => {
        setShowNotebookForm(true)
        setOverlayCreate(true)
    }

    const handleEditNotebookModal = (user, notebook)=> {
        setShowEditNotebookForm(true)
        setOverlayEdit(true)
        setCurrentid(notebook.id)
    }

    const handleDelete = (notebookid) => {
        dispatch(removeOneNotebook(user.id, notebookid))
    }
    // search Notebooks
    const handleSearchNotebooks = () => {
        if (searchContent == "" || !notebooks) {
            setMatchedNotebooks([])
        } else {
            const matchedResult = notebooks.filter(notebook => {
                return (notebook.title.toLowerCase() == searchContent.toLowerCase()) || (notebook.title.toLowerCase().includes(searchContent.toLowerCase()))
            })
            setMatchedNotebooks(matchedResult)
            setShowAllNotebooks(false)
            setShowMatchedNotebooks(true)
            document.querySelector(".navbar_search").classList.add('hidden')
        }          
    }

    
    
    useEffect(() => {
        if (user) {
            dispatch(getAllNotebooks(user.id))
        }
    },[dispatch, user])


    return (
        <div className="notebook_container">
            {overlayCreate &&
                <NotebookModal user={user} overlayCreate={overlayCreate} setOverlayCreate={setOverlayCreate} showNewNotebookForm={showNewNotebookForm} setShowNotebookForm={setShowNotebookForm}/>}
            <NavBar />
            <div className="notebook_main">
                <div className="notebook_header">
                    <h1>Notebooks</h1>
                    <div className="search_input_notebooks" onClick={handleSearchNotebooks} >
                        <input
                            type="text"
                            name="searchContent"
                            value={searchContent}
                            // autoComplete="off"
                            placeholder="Search Notebooks ..."
                            className='search_Notebooks'
                            onChange={(e) => setSearchContent(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div className="notebook_top">
                    {showAllNotebooks && 
                        <div className="notebook_count">{notebooks && notebooks.length} notebooks</div>
                    }
                    {showMatchedNotebooks && 
                        <div className="notebook_count">{matchedNotebooks && matchedNotebooks.length} notebooks</div>
                    }
                    <button className="new_notebook" onClick={handleNotebookModal}>
                        <img src={Notebook_logo} className="notebook_main_logo"></img>
                        New Notebook
                    </button>
                </div>
                <ul className="notebook_list">
                    <li>
                        <div className="notebook_title">TITLE</div>
                        <div className="notebook_created_by">CREATED BY</div>
                        <div className="notebook_updated_at">UPDATED</div>
                        <div className="notebook_actions">ACTIONS</div>
                    </li>
                    {showAllNotebooks && 
                    notebooks && notebooks.map(notebook => (
                        <li key={notebook.id}>
                        <div className="notebook_title">
                            <NavLink to={`/notebooks/${notebook.id}`} className="notebook_link_note">
                                <img src={Notebook_logo} className="notebook_main_logo" alt="notebook logo"></img>
                                {notebook.title} ({Object.keys(notebook.notes).length})
                            </NavLink>
                        </div>
                        <div className="notebook_created_by">{user.username}</div>
                        <div className="notebook_updated_at">{notebook.updated_at.slice(5,16)}</div>
                        <div className="notebook_actions">
                            <button className="notebook_edit_btn" onClick={() => handleEditNotebookModal(user, notebook)}>Edit</button>
                            <button onClick={() => handleDelete(notebook.id)} className="notebook_delete_btn">Delete</button>
                        </div>
                            {overlayEdit && notebook.id == currentid &&
                                <EditNotebookModal userid={user.id} notebookid={notebook.id} notebooktitle={notebook.title} overlayEdit={overlayEdit} setOverlayEdit={setOverlayEdit} showEditNotebookForm={showEditNotebookForm} setShowEditNotebookForm={setShowEditNotebookForm}/> }
                    </li>
                    ))}
                    {showMatchedNotebooks &&
                        matchedNotebooks && matchedNotebooks.map(notebook => (
                            <li key={notebook.id}>
                                <div className="notebook_title">
                                    <NavLink to={`/notebooks/${notebook.id}`} className="notebook_link_note">
                                        <img src={Notebook_logo} className="notebook_main_logo" alt="notebook logo"></img>
                                        {notebook.title} ({Object.keys(notebook.notes).length})
                                    </NavLink>
                                </div>
                                <div className="notebook_created_by">{user.username}</div>
                                <div className="notebook_updated_at">{notebook.updated_at.slice(5, 16)}</div>
                                <div className="notebook_actions">
                                    <button className="notebook_edit_btn" onClick={() => handleEditNotebookModal(user, notebook)}>Edit</button>
                                    <button onClick={() => handleDelete(notebook.id)} className="notebook_delete_btn">Delete</button>
                                </div>
                                {overlayEdit && notebook.id == currentid &&
                                    <EditNotebookModal userid={user.id} notebookid={notebook.id} notebooktitle={notebook.title} overlayEdit={overlayEdit} setOverlayEdit={setOverlayEdit} showEditNotebookForm={showEditNotebookForm} setShowEditNotebookForm={setShowEditNotebookForm} />}
                            </li>
                        ))}

                </ul>

            </div>
       </div>
    )
}

export default Notebook