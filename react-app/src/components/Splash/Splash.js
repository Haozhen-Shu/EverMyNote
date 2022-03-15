import {NavLink, Link} from 'react-router-dom';
import splash_logo from '../../images/book1.jpeg';
import './Splash.css';

const  Splash = () => {
    return (
        <>
            <div className="splash_nav">
                <img className="splash_img" src={splash_logo} alt="Splash Logo"></img>
                <p>EverMyNote</p>
            </div>
            <div className="splash_main">
                <div className="splash_slogan">
                    Tame your work, organize your life
                </div>
                <div className="splash_sub_slogan_container">
                    <p className="splash_sub_slogan">Remember everything and tackle any project with your notes, tasks, and schedules all in one place.</p>
                </div>
                <div className='splash_signup_containter'>
                    <Link to="/sign-up" className="splash_signup">
                        Sign up for free
                    </Link>
                </div>
                <br />
                <div className="splash_login-container">
                    <NavLink to="/login" className="splash_login">
                        Already have an account? Log in
                    </NavLink>
                </div>
                <div className="splash_body">
                    <div className="splash_body_img_container">
                        <img className="splash_body_img" src="https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?b8ddc3599750b793" alt="splash body img"></img>
                    </div>
                    <section className="splash_body_sidebar">
                        <div className="sidebar_title_p">
                            <h4 className="sub_title">WORK ANYWHERE</h4>
                            <p className="sub_p">Keep important info handy—your notes sync automatically to all your devices.</p>
                        </div>
                        <div>
                            <h4 className="sub_title">REMEMBER EVERYTHING</h4>
                            <p className="sub_p">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                        </div>
                        <div>
                            <h4 className="sub_title">TURN TO-DO INTO DONE</h4>
                            <p className="sub_p">Bring your notes, tasks, and schedules together to get things done more easily.</p>
                        </div>
                        <div>
                            <h4 className="sub_title">FIND THING FAST</h4>
                            <p className="sub_p">Get what you need, when you need it with powerful, flexible search capabilities.</p>
                        </div>
                    </section>
                </div>
            </div>
            <hr/>
            <div className="splash_footer">
                <a className="footer_github" href="https://github.com/Haozhen-Shu/MyNotes">Github</a>
                <a className="footer_linkedin" href="https://www.linkedin.com/in/haozhen-shu-a5136ab7/">LinkedIn</a>
            </div>
        </>
    )
}

export default Splash;