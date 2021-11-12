import { React, useState, useEffect, useLayoutEffect } from "react";
import Navbar from "../Navbar/Navbar";
import pageCSS from "./Page.module.css";
import "../../rootColor/root.css";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import AllPost from "../AllPost/AllPost";
import navCSS from "../Navbar/Navbar.module.css";
import RightSideBar from "../RightSideBar/RightSideBar";
import LogoutToggleBox from "../../customHelper/logoutToggleBox/LogoutToggleBox";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

function Page() {
  const history = useHistory()
  const cookies = new Cookies()
  const [size, setSize] = useState(0);
  const [leftBar, setLeftBar] = useState(null);
  const [rightBar, setRightBar] = useState(null);
  const [logoutToggle,setLogoutToggle]=useState(false)

  useLayoutEffect(() => {
    updateSize();
     // for left bar
    if (size <= 1000) {
      setLeftBar(false);
    } else {
      setLeftBar(true);
    }
    // for right bar
    if (size <= 700) {
      setRightBar(false); 
    } else {
      setRightBar(true);
    }
  }, [size]);
  // useEffect(()=>{
  //   let currentCookies = cookies.get('userJwt')
  //   if(!currentCookies){
  //     history.push('/login')
  //   }
  // })

  function updateSize() {
    setSize(window.innerWidth);
  }
  function toggleLogout(){
    logoutToggle?setLogoutToggle(false):setLogoutToggle(true); 
  }
  window.addEventListener("resize", updateSize);
  
  return (
    <div className={`${pageCSS.base_padding}`}>


      <Navbar toggleLogout={toggleLogout}/>
      {logoutToggle?<LogoutToggleBox/>:null}  {/* manage toggle button using useState */}
     
      <div className={`${pageCSS.flex}`}>
        {leftBar ? <LeftSideBar /> : null}
        <AllPost className={`${pageCSS.flex}`} />
        {rightBar ? <RightSideBar /> : null}
      </div>
    </div>
  );
}

export default Page;
