import newPost_Feeling from './newPostFeeling.module.css'
import newPost_modal from "./NewPostModal.module.css";
import { React, useState, useEffect } from "react";
import Button from "../../UI/button/Button";
import Picker from "emoji-picker-react";
import Modal from "react-modal";
import "./newPostModal.css";
import {
  FaChevronCircleLeft,
  FaClosedCaptioning,
  FaChevronLeft,
  FaTimesCircle,
  FaPhotoVideo,
  FaLaughWink,
  FaSmileBeam,
  FaSearch,
  FaTimes,
  FaCross,
  FaTh,
} from "react-icons/fa";

const customStyles = {
  content: {
    transform: "translate(-50%, -50%)",
    marginRight: "-50%",
    bottom: "auto",
    right: "auto",
    left: "50%",
    top: "50%",
  },
};
function NewPostModal(obj) {
  const [emojiFeelingCelebration,setEmojiFeelingCelebration]=useState(true) // if true show feelings and false show celebration
  const [choosedFeelings,setChoosedFeelings]=useState([false,null,null])
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [uploadingData,setUploadingData]=useState(false)
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const [textPostBg, setTextPostBg] = useState(false);
  const [textAreaBg, setTextAreaBg] = useState(0);
  const [feelings,setFeelings] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [uploadImage,setUploadImage] = useState([])
  const [uploadVideo,setUploadVideo] = useState([])
  const [uploadingBtn,setUploadingBtn]=useState(false)
  let [postText,setPostText]=useState(null)
  
 
  // function openModal() {
  //   obj.setIsOpen(true);
  // }

  function afterOpenModal() {
    setModalIsOpen(true)
  }
  if(modalIsOpen && !uploadingData){
    document.getElementsByClassName('ReactModal__Content')[0].style.maxHeight='100%';
  } 
  
  function closeModal() {
    setChoosedFeelings(false)
    setUploadingData(false)
    setModalIsOpen(false)
    obj.setIsOpen(false)
    setUploadVideo([])
    setUploadImage([])
    setFeelings(false)
    setPostText(null)
  }
  // for input click action on a emoji
  function uploadDataImgVideo() {
    setUploadingData(true)
  }

  function choosePostFile(){
    document.getElementById("chooseFile").click();
  }

  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);
    document.querySelector("#text_area").value += emojiObject.emoji;
  };
  function controlEmoji() {
    emoji ? setEmoji(false) : setEmoji(true);
  }
  useEffect(() => {
    if (!obj.modalIsOpen) {
      setEmoji(obj.modalIsOpen);
      setTextAreaBg(0);
      setTextPostBg(false); // for set background theme disable
    }
  }, [obj.modalIsOpen]);
  
 
  function fetchPostImageVideo(event) {
    let blobURL = URL.createObjectURL(event.target.files[0]);
    var data = document.getElementsByClassName("local")[0];
    if(event.target.files[0].type.split("/")[0]=='video'){
      var video = document.createElement('video') ;
      video.style.boxShadow = 'rgb(151, 174, 174) 0px 0px 3px 1px' ;
      video.style.objectFit='contain' ;
      video.style.borderRadius='4px' ;
      video.style.maxHeight='140px' ;
      video.style.margin = '5px' ;
      video.style.width = '45%' ;
      video.src = blobURL ;
      data.append(video)

      // let reader = new FileReader();
      // reader.onload = e =>{
      //   console.log(e.target.result ,event.target.files[0]);
      // }
      // reader.readAsDataURL(event.target.files[0]); 
      

      setUploadVideo([...uploadVideo, event.target.files[0]]);
    } else if (event.target.files[0].type.split("/")[0]=='image'){
      var image = document.createElement('img') ;
      image.style.boxShadow =  'rgb(151, 174, 174) 0px 0px 3px 1px' ;
      image.style.objectFit='contain' ;
      image.style.borderRadius='4px' ;
      image.style.maxHeight='140px' ;
      image.style.margin = '5px' ;
      image.style.width = '45%' ;
      image.src = blobURL ;
      data.append(image) ;
      setUploadImage([...uploadImage,event.target.files[0]]);
    }
  }


  function enableBgOption() {
    setTextPostBg(true);
  }
  function disableBgOption() {
    setTextPostBg(false);
  }
  function backgroundColor(data) {
    setTextAreaBg(data);
  }
  function controlActivities(){
    feelings?setFeelings(false):setFeelings(true)
    setUploadVideo([])
    setUploadImage([])
  }

  function showCelebrationEmojies(){
    setEmojiFeelingCelebration(false)
  }
  function showFeelingEmojies(){
    setEmojiFeelingCelebration(true)
  }
  function cancelImgVideoOption(){
    setUploadingData(false)
    setUploadVideo([])
    setUploadImage([])
  }
  function chooseFeelingsActivity(e){
    setChoosedFeelings([true,e.target.firstChild.firstChild.src,e.target.lastChild.innerText])
    controlActivities()
  }

  if(uploadingData){
    document.getElementsByClassName('ReactModal__Content')[0].style.maxHeight='500px';
  } 

  

  function TextAreaOnchange(event){
    setPostText(event.target.value?event.target.value:null)
  }
  
  
  let data={};
  data.post=Array()
  function submitData(){
    data.userName =localStorage.getItem('userName')  
           if (textAreaBg > 0 && postText) {
            data.post.push({data:postText,type:'text',backgroundColor:'bg'+textAreaBg})
           }
          if (postText && textAreaBg==0) {
            data.post.push({data:postText,type:'text'}) 
          }
          if(choosedFeelings[0] && choosedFeelings[1] && choosedFeelings[2]){
            data.feelingsEmoji=choosedFeelings[1]
            data.feelingsText =choosedFeelings[2]
          }
          console.log(uploadVideo,uploadImage);
  }
    useEffect(()=>{
      if(uploadVideo.length>=1 || uploadImage.length>=1 ||postText){
        setUploadingBtn(true)
      } else{
        setUploadingBtn(false)
      }

    },[uploadVideo,uploadImage,postText])
     
  return (
    <Modal
      isOpen={obj.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {feelings?<div>

        <div className={newPost_Feeling.innerBase} >  
        <FaChevronCircleLeft onClick={controlActivities} className={newPost_Feeling.backArrow}/> 
        <h3 className={newPost_Feeling.heading}>{emojiFeelingCelebration?'How are you feeling?':'What are you doing?'}</h3></div>
        
        <div>
          <Button click={showFeelingEmojies} style={emojiFeelingCelebration?{borderBottom:'3px solid #529ee2'}:null} class={newPost_Feeling.button} text='feelings'/>
          <Button click={showCelebrationEmojies} style={emojiFeelingCelebration?null:{borderBottom:'3px solid #529ee2'}}  class={newPost_Feeling.button} text='Celebration'/>
        </div>
        {/* <div className={newPost_Feeling.searchDiv}> <FaSearch className={newPost_Feeling.searchIcon}/><input className={newPost_Feeling.search} type="search" />  </div> */}
        <div style={{display:'flex' ,flexWrap:'wrap'}}>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/Iu45bu7idw4.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/TGmvhPYZHRc.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Happy':'friendShip'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/SbLxX4jljCS.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/78p5blttI6R.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Blessed':'Birthday'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/jnaR01aXOKF.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/wVys5GgT8vU.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Loved':'Christmas'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/y0/r/MqU4w6kG_-T.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/9qrhs9f0C43.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Sad':'Success'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/8HG4ArhYqqm.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/LqUZnnL1I6A.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Awesome':'Special day'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/GTVH05GEVXD.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/RE8L_5t7TMa.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Excited':'Victory'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/TLm2OJzKubg.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yY/r/c0kohwdzdZ7.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Cool':'Anniversary'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/D5AOH5Rt9K8.png`:'https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/CoOltLmRlf7.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Crazy':"Father's day"}</p>
        </div>
        
    
        </div>
        </div>:
      <div> {/* div for before show activities */}
      <span
       
        onClick={closeModal}
        className={newPost_modal.closeIcon}
      >
        &times;
      </span>
      <h3 className={newPost_modal.createPostStyle}>Create post</h3>

      <div className={newPost_modal.userProfileDiv}>
        <img
          className={newPost_modal.userProfileImg}
          src="Screenshot (334).png"
          alt=""
        />
        <p className={newPost_modal.userName}>
          {localStorage.getItem("userName")}
        </p>
        {choosedFeelings[0]? <div  style={{display:'flex'}} >
          <img name='feelingEmoji' id='feelingEmoji' src={choosedFeelings[1]} className={newPost_modal.feelingAndActivitiesEmojis} alt="" />
          <p id='feelingText' style={{marginLeft:'3px'}}>{choosedFeelings[2]}</p>
        </div>:null}
       
      </div>
      
      
      <div className={`${newPost_modal.postFrame}`}>
        
        <textarea
        value={postText}
          maxLength="140"
          class={`
        ${newPost_modal.textarea_style} 
        ${textAreaBg == 1 ? newPost_modal.bg1 : null}
        ${textAreaBg == 2 ? newPost_modal.bg2 : null}
        ${textAreaBg == 3 ? newPost_modal.bg3 : null}
        ${textAreaBg == 4 ? newPost_modal.bg4 : null}
        ${textAreaBg == 5 ? newPost_modal.bg5 : null}
        ${
          textAreaBg == 0
            ? newPost_modal.fontColorInitial
            : newPost_modal.fontColorAfter
        }
        `}
          id="text_area"
          name="postText"
          onChange={(event)=>{TextAreaOnchange(event)}}
          placeholder={`What's on your mind, ${localStorage.getItem("userName")}?`}
          style={uploadingData?{height:'100px',fontSize:'15px'}:null}
        ></textarea>
        {/* <img id='image' src="" width='100' height='100' alt="" /> */}
        {uploadingData?<div className={newPost_modal.uploadDataBaseDiv}>
          <div className={newPost_modal.transprentFrame}> 
          <FaTimes onClick={ cancelImgVideoOption } style={{float:'right' ,margin:'17px'}}/> 
          <div className={newPost_modal.imgVideoBtnDiv}>  
          <Button click={choosePostFile} text='Choose image/video' class={newPost_modal.imgVideoPostBtn}/>
           </div> 
           </div>
             <div className={`${newPost_modal.postContentDiv} local`}>
              {uploadVideo.map(()=>{
                return <h1> hello world </h1>
              })}
             </div>
        </div>:null}

        <div className={`${newPost_modal.bgImage}`}>
          {textPostBg ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaChevronLeft
                onClick={disableBgOption}
                className={newPost_modal.postIconLeft}
              />
              <div className={`${newPost_modal.textPostBackgroundDiv}`}>
                <div
                  onClick={() => backgroundColor(1)}
                  className={`${newPost_modal.textPostBackground}  ${newPost_modal.bg1}`}
                ></div>
                <div
                  onClick={() => backgroundColor(2)}
                  className={`${newPost_modal.textPostBackground}  ${newPost_modal.bg2}`}
                ></div>
                <div
                  onClick={() => backgroundColor(3)}
                  className={`${newPost_modal.textPostBackground}  ${newPost_modal.bg3}`}
                ></div>
                <div
                  onClick={() => backgroundColor(4)}
                  className={`${newPost_modal.textPostBackground}  ${newPost_modal.bg4}`}
                ></div>
                <div
                  onClick={() => backgroundColor(5)}
                  className={`${newPost_modal.textPostBackground}  ${newPost_modal.bg5}`}
                ></div>
              </div>
            </div>
          ) : uploadingData? null: (
            <FaTh
              onClick={enableBgOption}
              className={newPost_modal.postIconLeft}
            />
          )}

          <FaLaughWink
            onClick={controlEmoji}
            className={`${newPost_modal.postIconRight} ddd`}
          />
        </div>
      </div>
      <div className={`${newPost_modal.contentDiv}`}>
        <b>
          <p>Add to your post</p>
        </b>
        <div className={newPost_modal.iconDiv}>
          {textAreaBg > 0 ? (
            <FaPhotoVideo
              style={{ color: "#ccc2c2" }}
              className={newPost_modal.postIcon}
            />
          ) : (
            <FaPhotoVideo
              onClick={uploadDataImgVideo}
              className={newPost_modal.postIcon}
            />
          )}
          <FaSmileBeam onClick={controlActivities} className={newPost_modal.postIcon} />
        </div>
        <input
          id="chooseFile"
          onChange={(event) => fetchPostImageVideo(event)}
          style={{ display: "none" }}
          type="file"
        />
      </div>
      {emoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
     
      
      {uploadingBtn? <Button
        class={newPost_modal.submitButton}
        click = {submitData}
        text="Add Post"
        
        type="button"
      /> :<Button
        style={{ color: "#979797", background: "rgba(128, 142, 147, 0.34)" }}
        class={newPost_modal.submitButton}
        type="button"
        title ='now button is disable'
        text="Add Post"
      />}
      </div> /* div for before show activities */
      }
    </Modal>
  );
}

export default NewPostModal;
