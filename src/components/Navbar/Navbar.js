import React from 'react'
import NavbarCSS from'./Navbar.module.css'
import {FaHome,FaYoutube,FaLayerGroup,FaGamepad,FaFacebookMessenger,FaBell,FaUser} from 'react-icons/fa'
import Input from '../../UI/input/Input';
function Navbar(props) {
    return (
        <div className={`${NavbarCSS.nav_base} ${NavbarCSS.box_shadow}`}> 
           <div className={NavbarCSS.logo}>    
             <h3 className={NavbarCSS.text_color_a}>social media</h3> 
           </div> 
            <div className={NavbarCSS.flex}>
              <FaHome className={`${NavbarCSS.p} ${NavbarCSS.home_icon} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
              <Input class={`${NavbarCSS.nav_input} ${NavbarCSS.box_shadow_inner} ${NavbarCSS.bg_base} ${NavbarCSS.text_color_b} ${NavbarCSS.pl_1}`} placeholder='Search'/>
            </div>
            <div className={NavbarCSS.a}>
              <FaYoutube className={`${NavbarCSS.p} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
              <FaGamepad className={`${NavbarCSS.p} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
              <FaLayerGroup className={`${NavbarCSS.p} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
              <FaFacebookMessenger className={`${NavbarCSS.p} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
              <FaBell className={`${NavbarCSS.p} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
              <FaUser onClick={props.toggleLogout} className={`${NavbarCSS.p} ${NavbarCSS.text_color_c} ${NavbarCSS.box_shadow_icon} ${NavbarCSS.icon_radius}`}/>
           </div>
        </div> 
    )
}

export default Navbar;
