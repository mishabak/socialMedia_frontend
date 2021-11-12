import { React, useState, useEffect } from "react";
import newPost_modal from "./NewPostModal.module.css";
import newPost_Feeling from './newPostFeeling.module.css'
import Picker from "emoji-picker-react";
import Modal from "react-modal";
import "./newPostModal.css";
import Button from "../../UI/button/Button";
import {
  FaChevronCircleLeft,
  FaChevronLeft,
  FaLaughWink,
  FaPhotoVideo,
  FaSmileBeam,
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
  const [textPostBg, setTextPostBg] = useState(false);
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [textAreaBg, setTextAreaBg] = useState(0);
  const [emoji, setEmoji] = useState(false);
  const [feelings,setFeelings] = useState(true);
  
  // function openModal() {
  //   obj.setIsOpen(true);
  // }

  function afterOpenModal() {

  }

  function closeModal() {
    obj.setIsOpen(false);
  }
  // for input click action on a emoji
  function uploadData() {
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

  function fetchPostImageVideo(e) {
    var data = document.getElementById("chooseFile");
    console.log(e.target.files[0].type.split("/")[0],e.target);
   

   
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
   feelings? setFeelings(false):setFeelings(true);
  }

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
        <h3 className={newPost_Feeling.heading}>How are you feeling?</h3></div>
        
        <div>
          <Button class={newPost_Feeling.button} text='feelings'/>
          <Button class={newPost_Feeling.button} text='Activities'/>
        </div>
        <input className={newPost_Feeling.search} type="search" />
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
      </div>
      
      
      <div className={`${newPost_modal.postFrame}`}>
        
        <textarea
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
          name="t"
          placeholder={`What's on your mind, ${localStorage.getItem(
            "userName"
          )}?`}
        ></textarea>

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
          ) : (
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
              onClick={uploadData}
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
      <Button
        type="button"
        text="Add Post"
        class={newPost_modal.submitButton}
      />
      <Button
        style={{ color: "#979797", background: "rgba(128, 142, 147, 0.34)" }}
        type="button"
        text="Add Post"
        class={newPost_modal.submitButton}
      />
      </div> /* div for before show activities */
      }
    </Modal>
  );
}

export default NewPostModal;
