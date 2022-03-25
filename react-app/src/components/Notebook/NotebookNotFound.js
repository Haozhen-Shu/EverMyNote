import "./Notebook.css";
import Notebook_logo from '../../images/notebook.png';

const NotebookNotFound = () => {
    return (
        <div className="notebook_container">
            <div className="notebook_main">
                <div className="notebook_header">
                    <h1>Notebooks</h1>
                </div>
                <div className="notebook_top">
                    <div className="notebook_count">0 notebooks</div>
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
                <p>Notebooks not found!Please check the filter again!</p>

            </div>
        </div>
    )
}

export default NotebookNotFound;