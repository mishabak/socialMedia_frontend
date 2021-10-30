import React from 'react'
import leftCSS from'./LeftSideBar.module.css'
import navCSS from '../Navbar/Navbar.module.css'
import {FaUserCircle,
    FaHome,
    FaYoutube,
    FaLayerGroup,
    FaGamepad,
    FaFacebookMessenger,
    FaBell,
    FaUser,} from "react-icons/fa"
    function LeftSideBar() {
        
      return (
          <div className={`${leftCSS.base_padding}`}>
              <div className={`${leftCSS.inner_div} ${navCSS.box_shadow_inner} ${leftCSS.text_color_d} ${leftCSS.position_sticky}`}>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <FaUserCircle className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`}/> <h4>{localStorage.getItem('userName')}</h4>  </div>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <FaFacebookMessenger className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`}/> <h4>Messenger</h4>  </div>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <FaGamepad className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`}/> <h4>Play game</h4>  </div>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <FaLayerGroup className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`}/> <h4>Groups</h4>  </div>
                  <div className={`${leftCSS.inner_data} ${navCSS.box_shadow}`}> <FaYoutube className={`${navCSS.box_shadow} ${leftCSS.sideBar_img}`}/> <h4>Videos</h4>  </div>
  
              </div>
      
          </div>
      )
    }

export default LeftSideBar
