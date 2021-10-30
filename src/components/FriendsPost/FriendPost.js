import React from 'react'
import friend_post from './FriendPost.module.css'
import new_post from '../NewPost/NewPost.module.css'
import { FaCommentAlt, FaComments, FaEllipsisH, FaThumbsUp } from 'react-icons/fa'
function FriendPost() {
    return (
        <div className={`${friend_post.base_post} ${new_post.base_new_post}`}>
            <div className={`${friend_post.user_profile_base}`}>
              <div className={`${friend_post.user_profile_base}`}><img className={`${friend_post.profile_img}`} src="Screenshot (334).png" alt="" /> <p>User Name</p> 
              </div>
              <FaEllipsisH className={`${friend_post.post_option}`}/>
            </div>

            <div className={`${friend_post.img_bg}`} >
              <img className={`${friend_post.img}`} src="priest 1.jpg" alt="" />
            </div>

            <div className={`${friend_post.like_comments} ${friend_post.user_profile_base}`}> 
                <div style={{display:'flex',alignItems:'center'}}>      
                    <div className={`${friend_post.total_like}`}>
                        <FaThumbsUp className={`${friend_post.total_like_icon}`}/>
                    </div>  
                    <span className={`${friend_post.like_count}`}>100</span>
                </div>
                <div>
                    <span className={`${friend_post.comments}`}>12 Comments </span>
                </div>
            </div>
            <hr/>
            <div className={`${friend_post.like_content}`}>
                <div className={`${friend_post.like_content} ${friend_post.comments}`}>
                <FaThumbsUp />
                <span style={{ marginLeft:'5px'}}>Like</span>
                </div>

                <div className={`${friend_post.like_content} ${friend_post.comments}`}>
                <FaCommentAlt />
                <span style={{marginTop:'-5px', marginLeft:'5px'}}>Comment</span>
                </div>
            </div>
        </div>
    )
}
export default FriendPost
