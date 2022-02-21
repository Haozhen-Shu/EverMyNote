import NavBar from '../NavBar';
import "./NotesPage.css";
import { useDispatch, useSelector } from 'react-redux';
import notebook_logo from '../../images/notebook.png';

const NotesPage = () => {
    const user = useSelector(state => state.session.user);
    return (
        <div className="notespage_container">
            <NavBar />
            <div className="note_main">
                {/* <div className="note_header">
                    <div className="notes_img_notes">
                        <img src={notebook_logo} className="note_main_img" />
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
                                <div className="note_update">{note.updated_at.slice(5, 11)}</div>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>

        </div>
    )

}

export default NotesPage;