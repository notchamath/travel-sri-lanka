import { useContext } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from '../../contexts/user.context';

import Logo from "../../components/Logo/Logo";

import './Navigation.styles.scss';

// navbar component
function Navigation() {

    const {currentUser} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    // clicking Logo button takes user to homepage, if already on homepage, reload the page
    const handleLogoClick = () => {
        if(location.pathname === '/'){
            window.location.reload();
        } else {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }

    return (
        <div className="app-container">
            <nav className="navigation__nav">
                <div className="logo-container" onClick={handleLogoClick}>
                    <Logo/>
                </div>


                {
                    currentUser?
                    <div className="navigation__buttons">
                        <div className="navigation__btn" onClick={signOutUser}>Sign Out</div>
                    </div>
                        :
                    <div className="navigation__buttons">
                        <Link to='/auth' className="navigation__btn">Sign In</Link> 
                    </div>
                }

            </nav>
       
            <Outlet/>
        </div>
    )
}

export default Navigation;