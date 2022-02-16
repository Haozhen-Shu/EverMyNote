import NavBar from '../NavBar';
import "./Notebook.css";
import Notebook_logo from '../../images/notebook.png';
const Notebook = () => {
    return (
        <div className="notebook_container">
        <NavBar />
        <div className="notebook_main">
            <div className="notebook_header">
                <h1>Notebooks</h1>
            </div>
            <div className="notebook_top">
                <h2>3 notebooks</h2>
                <button className="new_notebook">
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

            </ul>

        </div>
    </div>
    )
}

export default Notebook