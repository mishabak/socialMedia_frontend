import React from 'react'
import rightCSS from'./RightSideBar.module.css'
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
          <div className={`${rightCSS.base_padding}`}>
              <div className={`${rightCSS.inner_div} ${navCSS.box_shadow_inner} ${rightCSS.text_color_d} ${rightCSS.position_sticky}`}>
                  <div className={`${rightCSS.inner_data} ${navCSS.box_shadow}`}> <FaUserCircle className={`${navCSS.box_shadow} ${rightCSS.sideBar_img}`}/> <h5>Illias</h5> <p className={`${rightCSS.onlineUser}`}></p> </div>
                  <div className={`${rightCSS.inner_data} ${navCSS.box_shadow}`}> <img src="/Screenshot.png" alt="img" className={`${navCSS.box_shadow} ${rightCSS.sideBar_img}`} /> <h5>Arjun</h5> <p className={`${rightCSS.onlineUser}`}></p> </div>
              </div>
      
          </div>
      )
    }

export default RightSideBar
