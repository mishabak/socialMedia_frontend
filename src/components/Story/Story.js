import {React,useState,useEffect} from 'react'
import Status_Story from './Story.module.css'
function Story() {
    const [storyWidth,size]=useState(0)
    function updateSize() {
        if(window.innerWidth<=1000 && window.innerWidth>700){
        size(window.innerWidth-277); // for set dynamic width 
         } else if(window.innerWidth<=700){
            size(window.innerWidth-42); // for set dynamic width 
         } else{
            size(window.innerWidth-506); // for set dynamic width 
         } 
      }
      
      useEffect(()=>{
          updateSize()
         
        },[storyWidth])
      window.addEventListener('resize', updateSize);
    return (
        
            <div style={{width:`${storyWidth}px`}} className={`${Status_Story.display} ${Status_Story.story_base}`}>
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               <img className={`${Status_Story.story}`} src="annabelle.jpg" alt="" />
               
            </div>
            
        
    )
    
}

export default Story
