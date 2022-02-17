import './NotebookModal.css';
import { createOneNotebook, getAllNotebooks } from '../../store/notebook';
import {useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';

const NotebookModal = ({ user, overlay, setOverlay, showNewNotebookForm, setShowNotebookForm}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    useEffect(() => {
        let err = []
        if (!title) {
            return 
        }
    }, [title])

    const handleOverlay = e => {
        setShowNotebookForm(false)
        setOverlay(false)
    }

    const closeNewNotebookForm = e =>{ 
        e.preventDefault();
        setShowNotebookForm(false)
        setOverlay(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const userid = user.id;
        console.log(userid, "uuuuuuuuuu")
        const notebook = await dispatch(createOneNotebook(userid, title))
        console.log(notebook, "aaaaaaaaa")
        // const notebooks = await dispatch(getAllNotebooks(userid))
        if (notebook) {
            setShowNotebookForm(false)
            setOverlay(false)
        }
    }
    

    return (
        <div className="background-overlay" >
            <form className="notebook-modal" onSubmit={handleSubmit}>
                <div className="newNotebook_modal_title">Create new notebook</div>
                <div className="newNotebookForm_p"> Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>
                <label className="create_label">Title</label>
                <input 
                    className="create_input" 
                    type="text"
                    placeholder="Notebook Title"
                    value={title}
                    required
                    onChange={e=>setTitle(e.target.value)}
                />
                <div className="create-modal-buttons">
                    <button type="submit" className="create-modal-create">Create</button>
                    <button className="create-modal-cancel" onClick={closeNewNotebookForm}>Cancel</button>
                </div>
            </form>

        </div>
    )
}


export default NotebookModal;