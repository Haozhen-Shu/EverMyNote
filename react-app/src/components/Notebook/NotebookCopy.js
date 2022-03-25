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
import NotebookNotFound from './NotebookNotFound'

const Notebook = () => {
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

    const handleSearch = () => {
        if (searchContent === "" || !notebooks) {
            setNotebooksFound([])
        } else {
            const matchedNotebooks = notebooks.filter(notebook => {
                return (notebook.title.toLowerCase() === searchContent.toLowerCase()) || (notebook.title.toLowerCase().includes(searchContent.toLowerCase()))
            })
            if (matchedNotebooks) {
                setNotebooksFound(matchedNotebooks)
                setShowAllNotebooks(false)
                setShowOneNotebook(true)
            } else {
                return (<NotebookNotFound />)
            }
        }
    }

    return (
        <div className="notebook_container">
            {overlayCreate &&
                <NotebookModal user={user} overlayCreate={overlayCreate} setOverlayCreate={setOverlayCreate} showNewNotebookForm={showNewNotebookForm} setShowNotebookForm={setShowNotebookForm} />}
            <NavBar />

            <div className="notebook_main">
                <div className="notebook_header">
                    <h1>Notebooks</h1>
                    <div className="navbar_search_notebook">
                        {/* <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="C1Pw2rSHz9BEf3xLKAgU"><path fillRule="evenodd" clipRule="evenodd" d="M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z" fill="currentColor"></path></svg> */}
                        <div className="search_form_notebook" onClick={handleSearch}>
                            <input
                                type="text"
                                name="searchContent"
                                className="search_notebook"
                                placeholder="Search Notebooks ..."
                                // atuoComplete="off"
                                value={searchContent}
                                onChange={e => setSearchContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="notebook_top">
                    {showAllNotebooks &&
                        <div className="notebook_count">{notebooks && notebooks.length} notebooks</div>
                    }
                    {showOneNotebook &&
                        <div className="notebook_count">{notebooksFound && notebooksFound.length} notebooks</div>
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
                                <div className="notebook_updated_at">{notebook.updated_at.slice(5, 16)}</div>
                                <div className="notebook_actions">
                                    <button className="notebook_edit_btn" onClick={() => handleEditNotebookModal(user, notebook)}>Edit</button>
                                    <button onClick={() => handleDelete(notebook.id)} className="notebook_delete_btn">Delete</button>
                                </div>
                                {overlayEdit && notebook.id == currentid &&
                                    <EditNotebookModal userid={user.id} notebookid={notebook.id} notebooktitle={notebook.title} overlayEdit={overlayEdit} setOverlayEdit={setOverlayEdit} showEditNotebookForm={showEditNotebookForm} setShowEditNotebookForm={setShowEditNotebookForm} />}
                            </li>
                        ))}
                    {showOneNotebook &&
                        notebooksFound && notebooksFound.map(notebook => (
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
                        ))

                    }

                </ul>

            </div>
        </div>
    )
}

export default Notebook;