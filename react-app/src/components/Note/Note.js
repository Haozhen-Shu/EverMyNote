import { editOneNotebook } from '../../store/notebook';
import NavBar from '../NavBar';
import "./Note.css"
import note_logo from '../../images/note.png';

const Note = () => {

    return (
        <div className="note_container">
            <NavBar />
            <div className="note_main">
                <div className="note_header">
                    <div className="notes_img_notes">
                        <img src={note_logo} className="note_main_img"/>Notes
                    </div>
                    <div className="notes_count">
                        3 Notes
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Note