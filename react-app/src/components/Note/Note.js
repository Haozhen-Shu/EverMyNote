import { editOneNotebook } from '../../store/notebook';
import NavBar from '../NavBar';
import "./Note.css"
import notebook_logo from '../../images/notebook.png';
import {useEffect, useState} from 'react';
import {getAllNotes} from '../../store/notebook';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

const Note = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user);
    const userid = user.id;
    const {notebookid} = useParams();
    const notes = useSelector(state=>state.notebook.notes)
    const notebook = useSelector(state=>state.notebook.currNotebook)

    useEffect(()=> {
        dispatch(getAllNotes(userid, notebookid))
    }, [dispatch])
    
    console.log(notes, "from component notes")
    return (
        <div className="note_container">
            <NavBar />
            <div className="note_main">
                <div className="note_header">
                    <div className="notes_img_notes">
                        <img src={notebook_logo} className="note_main_img"/>
                        <div>{notebook && notebook.title}</div>
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

        </div>
    )

}

export default Note