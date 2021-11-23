import { generateUploadURL} from '../../awsHelper/S3helper';
import newPost_Feeling from './newPostFeeling.module.css'
import newPost_modal from "./NewPostModal.module.css";
import { React, useState, useEffect } from "react";
import Button from "../../UI/button/Button";
import Picker from "emoji-picker-react";
import Modal from "react-modal";
import "./newPostModal.css";
import axios from 'axios'
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
const server = 'http://localhost:3001'
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
  const [uploadVideoImage,setUploadVideoImage] = useState([])
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [uploadingData,setUploadingData]=useState(false)
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const [uploadingBtn,setUploadingBtn]=useState(false)
  const [textPostBg, setTextPostBg] = useState(false);
  const [textAreaBg, setTextAreaBg] = useState(0);
  const [feelings,setFeelings] = useState(false);
  const [postText,setPostText]=useState(null);
  const [emoji, setEmoji] = useState(false);
  const [postProgress,setPostProgress] = useState([]);
  const [enableProgress,setEnableProgress]=useState(false)
  
 
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
    setUploadVideoImage([])
    setUploadingData(false)
    setModalIsOpen(false)
    obj.setIsOpen(false)
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
    var accessLimit = document.querySelector("#text_area").value
    if(accessLimit.length>=140){
    }else{
      document.querySelector("#text_area").value += emojiObject.emoji;
    }
    var currentTextData= document.querySelector("#text_area").value
    setPostText(currentTextData)
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
    setUploadVideoImage([...uploadVideoImage, event.target.files[0]]);
         setPostProgress([...postProgress,{percent:0}])
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
    // setUploadVideoImage([])
  }

  function showCelebrationEmojies(){
    setEmojiFeelingCelebration(false)
  }
  function showFeelingEmojies(){
    setEmojiFeelingCelebration(true)
  }
  function cancelImgVideoOption(){
    setUploadingData(false)
    setUploadVideoImage([])
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
  
  
  let uplodingDataToDb={};
  uplodingDataToDb.post=Array()
   async function submitData(){
    uplodingDataToDb.userId =localStorage.getItem('userId')  
    uplodingDataToDb.uploadingData = new Date()
           if (textAreaBg > 0 && postText) {
            uplodingDataToDb.post.push({data:postText,type:'text',backgroundColor:'bg'+textAreaBg})
              }
           if (postText && textAreaBg==0 && uploadVideoImage.length==0) {
            uplodingDataToDb.post.push({data:postText,type:'text'}) // if i can add default background here 
              }

           if(choosedFeelings[0] && choosedFeelings[1] && choosedFeelings[2]){
            uplodingDataToDb.feelingsEmoji=choosedFeelings[1]
            uplodingDataToDb.feelingsText =choosedFeelings[2]
              }

          if(uploadVideoImage.length>=1){ 
            if(postText){
              uplodingDataToDb.title = postText; 
            }
           var uploadCompleted=0;
            uploadVideoImage.map(async(currentDetails,index)=>{

              if(currentDetails.type.split('/')[0]=='video'){
                setEnableProgress(true)
                const options ={
                  onUploadProgress:(progressEvent)=>{
                  const {loaded,total} = progressEvent;
                  let percent = Math.floor((loaded*100)/total)
                  
                  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                  if (loaded == 0) return console.log('0 Byte');
                  var i = parseInt(Math.floor(Math.log(loaded) / Math.log(1024)));
                  var loadingSize =   Math.round(loaded / Math.pow(1024, i), 2) + ' ' + sizes[i] 
                  
                  if (total == 0) return console.log('0 Byte');
                  var i = parseInt(Math.floor(Math.log(total) / Math.log(1024)));
                  var totalSize =  Math.round(total / Math.pow(1024, i), 2) + ' ' + sizes[i]
                  
                  postProgress.splice(index,1,{percent:percent,total:totalSize,loading:loadingSize})
                  setPostProgress([...postProgress])
                }
              }
                var videoURL = await  generateUploadURL()
                const s3VideoPath = videoURL.split('?')[0]
                uplodingDataToDb.post.push({data:s3VideoPath,type:'video'})

                axios.put(videoURL,currentDetails,options).then((res)=>{
                  uploadCompleted++
                     if(postProgress.length===uploadCompleted){
                      setEnableProgress(false)
                      setPostProgress([])
                      closeModal()
                      axios.post(`${server}/post`,uplodingDataToDb).then((res)=>{

                      })
                     }
                  console.log('uploaded video');
                }).catch((err)=>{console.log(err,"i'am waiting..")})

                

              } else if(currentDetails.type.split('/')[0]=='image'){
                setEnableProgress(true)
                const options ={
                    onUploadProgress:(progressEvent)=>{
                    const {loaded,total} = progressEvent;
                    let percent = Math.floor((loaded*100)/total)
                    
                    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                    if (loaded == 0) return console.log('0 Byte');
                    var i = parseInt(Math.floor(Math.log(loaded) / Math.log(1024)));
                    var loadingSize =   Math.round(loaded / Math.pow(1024, i), 2) + ' ' + sizes[i] 
                    
                    if (total == 0) return console.log('0 Byte');
                    var i = parseInt(Math.floor(Math.log(total) / Math.log(1024)));
                    var totalSize =  Math.round(total / Math.pow(1024, i), 2) + ' ' + sizes[i]
                    postProgress.splice(index,1,{percent:percent,total:totalSize,loading:loadingSize})
                    setPostProgress([...postProgress])
                  }
                }
                var imageURL = await  generateUploadURL()
                console.log(imageURL);
                const s3ImagePath = imageURL.split('?')[0]
                uplodingDataToDb.post.push({data:s3ImagePath,type:'image'})

                  axios.put(imageURL,currentDetails,options).then(()=>{
                    uploadCompleted++
                     if(postProgress.length===uploadCompleted){
                      setEnableProgress(false)
                      setPostProgress([])
                      closeModal()
                      axios.post(`${server}/post`,uplodingDataToDb).then((res)=>{

                      })
                     }
                       console.log('uploaded images');
                     })
              }
            })
          }else{
            axios.post(`${server}/post`,uplodingDataToDb).then((res)=>{
              closeModal()
            })

          }
  }

    useEffect(()=>{
      if(uploadVideoImage.length>=1 || postText){
        setUploadingBtn(true)
      } else{
        setUploadingBtn(false)
      }
     
    },[uploadVideoImage,postText])
   
  return (
    <Modal
      isOpen={obj.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {!enableProgress && feelings?<div>

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
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/happy.png`:'/feelingEmoji/friendship.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Happy':'friendShip'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/blessed.png`:'/feelingEmoji/birthday.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Blessed':'Birthday'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/loved.png`:'/feelingEmoji/christmas.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Loved':'Christmas'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/sad.png`:'/feelingEmoji/success.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Sad':'Success'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/awesome.png`:'/feelingEmoji/specialday.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Awesome':'Special day'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/excited.png`:'/feelingEmoji/victory.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Excited':'Victory'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/cool.png`:'/feelingEmoji/anniversary.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Cool':'Anniversary'}</p>
        </div>
        <div onClick={(event)=>chooseFeelingsActivity(event)} className={newPost_Feeling.feelingEmojiBaseDiv}>
          <div className={newPost_Feeling.feelingEmojiDiv} >
          <img alt=""  referrerpolicy="origin-when-cross-origin" src={`${emojiFeelingCelebration?`/feelingEmoji/crazy.png`:'/feelingEmoji/fathersday.png'}`} width="20px" height="20px"></img>
          </div>
          <p className={newPost_Feeling.emojiText}>{emojiFeelingCelebration?'Crazy':"Father's day"}</p>
        </div>
        
    
        </div>
        </div>:!enableProgress?
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
        value={postText?postText:''}
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
              {uploadVideoImage.map((currentData)=>{
               var blobData = URL.createObjectURL(currentData)
                if(currentData.type.split('/')[0]=='video'){
                  return <video className={newPost_modal.postVidImg} src={blobData}> </video>
                } else if(currentData.type.split('/')[0]=='image'){
                  return <img className={newPost_modal.postVidImg} src={blobData}/>
                }
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
   

   </div>: enableProgress?<div style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
    { uploadVideoImage.map((unwantData,index)=>{
       return  <div className={newPost_modal.progressBarStyle} style={uploadVideoImage.length==1?{
         width:'100%',
         borderRadius:'3px',
         boxShadow:'rgb(200, 198, 198) 0px 0px 3px 0.3px',
         padding:'5px',
         marginTop:'5px',
         height:'30px',
         paddingBottom:'10px'
         
         
        }:
        {width:'47%',
         borderRadius:'3px',
         boxShadow:'rgb(200, 198, 198) 0px 0px 3px 0.3px',
         padding:'5px',
         marginTop:'5px',
         height:'30px',
         paddingBottom:'10px'
        }}> <div> <div  style={{backgroundColor:`rgb(87, ${postProgress[index].percent*2}, 34)`,borderRadius:'2px',color:'white',height:'8px',width:postProgress[index].percent+'%'}}></div></div> 
     
        <h6 style={{marginTop:'0px',marginBottom:'0px'}}>
            <span style={{fontSize:'10px',overflow:'hidden'}}>{unwantData.name}</span>
          <span style={{fontSize:'10px'}}>
          {postProgress[index].percent!=100?`
          ${postProgress[index].loading?
           postProgress[index].loading:''} / 
          ${postProgress[index].total?
           postProgress[index].total:''} | 
          ${postProgress[index].percent?
           postProgress[index].percent:''}%`:'completed'} 
           </span>
        </h6>

        </div>
        
      })} </div>:null } 

    </Modal>
  );
}

export default NewPostModal;
