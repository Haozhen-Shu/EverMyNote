import {useEffect, useState} from 'react';
import NavBar from '../NavBar';
import "./Notebook.css";
import Notebook_logo from '../../images/notebook.png';
import {useDispatch, useSelector} from 'react-redux';
import { getAllNotebooks, removeOneNotebook } from '../../store/notebook';
import NotebookModal from './NotebookModal';

const Notebook = () => {
    const user = useSelector(state =>state.session.user)
    const dispatch = useDispatch()
    const notebooks = useSelector(state=> state.notebook.notebooks)
    // console.log(notebooks)
    const [overlay, setOverlay] = useState(false)
    const [showNewNotebookForm, setShowNotebookForm] = useState(false)
    
    const handleNotebookModal = e => {
        setShowNotebookForm(true)
        setOverlay(true)
    }

    const handleDelete = (notebookid) => {
        dispatch(removeOneNotebook(user.id, notebookid))
    }

    useEffect(() => {
        if (user) {
            dispatch(getAllNotebooks(user.id))
        }
    },[dispatch, user])


    return (
        <div className="notebook_container">
        {overlay &&
             <NotebookModal user={user} overlay={overlay} setOverlay={setOverlay} showNewNotebookForm={showNewNotebookForm} setShowNotebookForm={setShowNotebookForm}/>}
        <NavBar />
        <div className="notebook_main">
            <div className="notebook_header">
                <h1>Notebooks</h1>
            </div>
            <div className="notebook_top">
                <div className="notebook_count">{notebooks && notebooks.length} notebooks</div>
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
                {notebooks && notebooks.map(notebook => (
                 <li key={notebook.id}>
                    <div className="notebook_title">{notebook.title}</div>
                    <div className="notebook_created_by">{user.username}</div>
                    <div className="notebook_updated_at">{notebook.updated_at.slice(5,16)}</div>
                    <div className="notebook_actions">
                        <button className="notebook_edit_btn">Edit</button>
                        <button onClick={() => handleDelete(notebook.id)} className="notebook_delete_btn">Delete</button>
                    </div>
                 </li>
                ))}

            </ul>

        </div>
    </div>
    )
}

export default Notebook