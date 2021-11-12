import {React,useState,useEffect} from 'react'
import FriendPost from '../FriendsPost/FriendPost';
import NewPost from '../NewPost/NewPost';
import Story from '../Story/Story';
import HomeCSS from './AllPost.module.css'
function AllPost() {

    return (
        <div className={`${HomeCSS.base_style}`}>
            <Story/>
            <NewPost/>
            <FriendPost/>       
        </div>
    )
}

export default AllPost
