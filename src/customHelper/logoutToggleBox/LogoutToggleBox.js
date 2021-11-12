import React from 'react'
import toggleBox from './LogoutToggleBox.module.css'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router'
function LogoutToggleBox() {
    const history = useHistory()
    const cookies = new Cookies
    function a(){
      var confirmation = window.confirm('are you sure')
      if ( confirmation == true){
        cookies.remove('userJwt')
        localStorage.clear('userId')
        localStorage.clear('userName')
        localStorage.clear('userLogin')
        history.push('/login')

      }
    }
    return (
        <div className={`${toggleBox.baseDiv}`}>
            <div className={`${toggleBox.innerDiv}`}>
            <p className={toggleBox.pTag}>Profile</p>
            <p className={toggleBox.pTag}>Settings</p>
            <p onClick={a} className={toggleBox.pTag}>Logout</p>
            
            </div>
        </div>
    )
}

export default LogoutToggleBox
