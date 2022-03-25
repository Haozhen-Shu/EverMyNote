import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import "./Notebook.css";
import "../NavBar.css";
import Notebook_logo from '../../images/notebook.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotebooks, removeOneNotebook } from '../../store/notebook';
import NotebookModal from './NotebookModal';
import EditNotebookModal from './EditNotebookModal';
import Note from '../Note/Note';
import { NavLink } from 'react-router-dom';

const FoundNotebooks = (matchedNotebooks) => {
    console.log("aaaaaaaa")
    console.log(matchedNotebooks)
    if (document.querySelector(".new_note")) {
        document.querySelector(".new_note").classList.add("hidden")
    }
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const notebooks = useSelector(state => state.notebook.notebooks)
    // console.log(notebooks)
    const [overlayCreate, setOverlayCreate] = useState(false)
    const [overlayEdit, setOverlayEdit] = useState(false)
    const [showNewNotebookForm, setShowNotebookForm] = useState(false)
    const [showEditNotebookForm, setShowEditNotebookForm] = useState(false)
    const [currentid, setCurrentid] = useState(null);
    const [searchContent, setSearchContent] = useState("")
    const [showAllNotebooks, setShowAllNotebooks] = useState(true)
    const [showOneNotebook, setShowOneNotebook] = useState(false)
    const [notebooksFound, setNotebooksFound] = useState([])

    const handleNotebookModal = e => {
        setShowNotebookForm(true)
        setOverlayCreate(true)
    }

    const handleEditNotebookModal = (user, notebook) => {
        setShowEditNotebookForm(true)
        setOverlayEdit(true)
        setCurrentid(notebook.id)
    }

    const handleDelete = (notebookid) => {
        dispatch(removeOneNotebook(user.id, notebookid))
    }

    useEffect(() => {
        if (user) {
            dispatch(getAllNotebooks(user.id))
        }
    }, [dispatch, user])

    return (
    <div className="notebook_container">
        {overlayCreate &&
            <NotebookModal user={user} overlayCreate={overlayCreate} setOverlayCreate={setOverlayCreate} showNewNotebookForm={showNewNotebookForm} setShowNotebookForm={setShowNotebookForm} />}
        <NavBar />

        <div className="notebook_main">
            <div className="notebook_header">
                <h1>Notebooks</h1>
            </div>
            <div className="notebook_top">
                <div className="notebook_count">{matchedNotebooks.length} notebooks</div>
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
                {
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

export default FoundNotebooks;