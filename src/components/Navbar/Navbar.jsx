import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

function Navbar() {

  const {currentUser, setCurrentUser} = useContext(UserContext);

  return (

    <>
        <div>Navbar</div>
        <button onClick={signOutUser}>Sign out</button>

        <Outlet/>
    </>
  )
}

export default Navbar