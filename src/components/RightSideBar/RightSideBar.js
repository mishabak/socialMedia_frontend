import React from 'react'
import leftCSS from'./RightSideBar.module.css'
import navCSS from '../Navbar/Navbar.module.css'
import {FaUserCircle,
    FaHome,
    FaYoutube,
    FaLayerGroup,
    FaGamepad,
    FaFacebookMessenger,
    FaBell,
    FaUser,} from "react-icons/fa"
    function RightSideBar() {
        
      return (
          <div className={`${leftCSS.base_padding}`}>
              <div className={`${leftCSS.inner_div} ${navCSS.box_shadow_inner} ${leftCSS.text_color_d} ${leftCSS.position_sticky}`}>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <FaUserCircle className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`}/> <h4>Profile</h4>  </div>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <img src="/Screenshot.png" alt="img" className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`} /> <h5>hello world</h5>  </div>
              </div>
      
          </div>
      )
    }

export default RightSideBar
