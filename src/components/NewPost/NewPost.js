import {React,useState} from 'react'
import Input from '../../UI/input/Input'
import New_Post from './NewPost.module.css'
import {FaFileImage, FaImage}  from 'react-icons/fa'
import NewPostModal from '../../customHelper/newPostModal/NewPostModal'
function NewPost() {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    function enableModal(){
        setIsOpen(true)
    }
    return (
        <div className={`${New_Post.base_new_post}`}>
            <div className={`${New_Post.sub_new_post}`}>
            <img className={`${New_Post.profile_img}`} src="annabelle.jpg"  alt="" />
            <Input readonly={'readonly'} onclick ={enableModal} placeholder={`What's on your mind, ${localStorage.getItem('userName')}?`} class={`${New_Post.post_input} ${New_Post.text_style}`}/>
            </div>
            <div className={`${New_Post.select_item}`}><span onClick={enableModal} className={New_Post.cursorStyle} > <FaImage className={`${New_Post.post_icons}`}/> Photo/Video</span> <span onClick={enableModal}  className={New_Post.cursorStyle} ><FaImage className={`${New_Post.post_icons}`}/> Feeling/Celebration</span></div>
                 <NewPostModal modalIsOpen = {modalIsOpen} setIsOpen={setIsOpen} />
                 
            
        </div>
    )
}

export default NewPost
