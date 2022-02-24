import './NotebookModal.css';
import { createOneNotebook, getAllNotebooks } from '../../store/notebook';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

const NotebookModal = ({ user, overlayCreate, setOverlayCreate, showNewNotebookForm, setShowNotebookForm}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);

    const notebooks = useSelector(state => state.notebook.notebooks)
    let titleList = []
    for (let i = 0; i < notebooks.length; i++) {
        titleList.push(notebooks[i].title)
    }
    
    const validate =() => {
        const errors =[];
        if (typeof title !== "string") {
            errors.push("Please provide a string as a title.")
        }
        if (title.length > 45) {
            errors.push("Please provide a title shorted than 45 characters.")
        }
        if (title in titleList) {
            errors.push("Please provide a unique title.")
        }
        return errors
    }

    useEffect(() => {
        let err = []
        if (!title) {
            return 
        }
    }, [title])

    const handleOverlay = e => {
        setShowNotebookForm(false)
        setOverlayCreate(false)
    }

    const closeNewNotebookForm = e =>{ 
        e.preventDefault();
        setShowNotebookForm(false)
        setOverlayCreate(false)
    }
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) return setErrors(errors)
        const userid = user.id;
        const notebook = await dispatch(createOneNotebook(userid, title))
        if (typeof notebook == "string") return setErrors(errors)
        // const notebooks = await dispatch(getAllNotebooks(userid))
        if (notebook) {
            setShowNotebookForm(false)
            setOverlayCreate(false)
        }
    }
    

    return (
        <div className="background-overlay" >
            <form className="notebook-modal" onSubmit={handleSubmit}>
                <div className="newNotebook_modal_title">Create new notebook</div>
                <div className="newNotebookForm_p"> Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>
                {errors && errors.map(error => (
                    <div key={error.id} className="create_title_error">{error}</div>
                ))}
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