import './EditNotebookModal.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editOneNotebook } from '../../store/notebook';

const EditNotebookModal = ({ userid, notebookid, notebooktitle, overlayEdit, setOverlayEdit, showEditNotebookForm, setShowEditNotebookForm}) => {
    const [title, setTitle] = useState(notebooktitle);
    const dispatch = useDispatch();

    const closeEditNotebookForm = e => {
        e.preventDefault();
        setShowEditNotebookForm(false)
        setOverlayEdit(false)
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        // const userid = user.id;
        // const notebookid = notebook.id
        // const notebooktitle = notebook.title
        const notebook = await dispatch(editOneNotebook(userid, notebookid, title))
        if (notebook) {
            setShowEditNotebookForm(false)
            setOverlayEdit(false)
        }
    }
    
    return (
        <div className="background-overlay">
            <form className="editNotebook-modal" onSubmit={handleSubmit}>
                <div className="editNotebook_modal_title">Edit a notebook</div>
                <label className="create_label">Title</label>
                <input 
                    className="edit_input" 
                    type="text"
                    placeholder="New title for this notebook"
                    value={title}
                    required
                    onChange={e=>setTitle(e.target.value)}
                />
                <div className="edit-modal-buttons">
                    <button type="submit" className="create-modal-create">Save</button>
                    <button className="create-modal-cancel" onClick={closeEditNotebookForm}>Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default EditNotebookModal