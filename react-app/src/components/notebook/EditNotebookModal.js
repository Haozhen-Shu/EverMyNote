import './EditNotebookModal.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOneNotebook } from '../../store/notebook';

const EditNotebookModal = ({ userid, notebookid, notebooktitle, overlayEdit, setOverlayEdit, showEditNotebookForm, setShowEditNotebookForm}) => {
    const [title, setTitle] = useState(notebooktitle);
    const [updated_at, setUpdated_at] = useState(null)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const notebooks = useSelector(state => state.notebook.notebooks)
    let titleList = []
    for (let i = 0; i < notebooks.length; i++) {
        titleList.push(notebooks[i].title)
    }

    const validate = () => {
        const errors = [];
        if (typeof title !== "string") {
            errors.push("Please provide a string as a title.")
        }
        if (title.length > 45) {
            errors.push("Please provide a title shorted than 45 characters.")
        }
        if (title != notebooktitle && title in titleList) {
            errors.push("Please provide a unique title.")
        }
        return errors
    }

    const closeEditNotebookForm = e => {
        e.preventDefault();
        setShowEditNotebookForm(false)
        setOverlayEdit(false)
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) return setErrors(errors)
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
                {errors && errors.map(error => (
                    <div key={error.id} className="create_title_error">{error}</div>
                ))}
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