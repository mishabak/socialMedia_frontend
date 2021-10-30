import React from 'react'
import Input from '../../UI/input/Input'
import New_Post from './NewPost.module.css'
import {FaFileImage, FaImage}  from 'react-icons/fa'

function NewPost() {
    return (
        <div className={`${New_Post.base_new_post}`}>
            <div className={`${New_Post.sub_new_post}`}>
            <img className={`${New_Post.profile_img}`} src="annabelle.jpg"  alt="" />
            <Input  placeholder="What's on your mind, UserName?" class={`${New_Post.post_input} ${New_Post.text_style}`}/>
            </div>
            <div className={`${New_Post.select_item}`}><span > <FaImage className={`${New_Post.post_icons}`}/> Photo/Video</span> <span ><FaImage className={`${New_Post.post_icons}`}/> Feeling/Activity</span></div>
        </div>
    )
}

export default NewPost
