import {React,useState,useEffect} from 'react'
import friend_post from './FriendPost.module.css'
import new_post from '../NewPost/NewPost.module.css'
import Carousel from 'rsuite/Carousel';
import ReactPlayer from 'react-player'
import axios from 'axios'
import './carousel.css'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCommentAlt, FaComments, FaEllipsisH, FaThumbsUp } from 'react-icons/fa'
function FriendPost() {
    const server = 'http://localhost:3001'
    const [imageWidth,setImageWidth]=useState(0)
    const [imageHeight,setImageHeight]=useState(0)
    const [aa,setPostData]=useState([])
    useEffect(()=>{

         axios.get(`${server}/fetch-post`).then(async(response)=>{
            console.log('fetch data');
        setPostData(response.data)
        console.log(response.data);
    }).catch(response=>{})
    },[])
    
    
    
   var dd =[
            {id:'a',
            post:[
                {data:"412904.jpg",type:'image'},
                {data:"Screenshot.png",type:'image'},
                {data:"https://www.youtube.com/watch?v=ysz5S6PUM-U",type:'video'},
                {data:"412904.jpg",type:'image'}
            ]},
            {id:'b',
            title:'Let’s look at some options for iterating over a NodeList, as you get back from running a document qqqq qqqqqq qqqqqqqqqq qqqqqqq qqqqqqqq qqqq qqqq',
            post:[
                {data:"priest 1.jpg",type:'image'},
                {data:"412904.jpg",type:'image'}
            ]},
            {id:'c',
            post:[
                
                {data:'Let’s look at some options for iterating over a NodeList, as you get back from running a document',type:'text'}
            ]},
            {id:'d',
            post:[
                {data:'Let’s look at some options for iterating over a NodeList, as you get back from running a document',type:'text',backgroundColor:'bg2'},
                {data:'Let’s look at some options for iterating over a NodeList, as you get back from running a document',type:'text',backgroundColor:'bg3'}
            ]},
            {id:'e',
            post:[
                {data:'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',type:'text',backgroundColor:'bg4'},
                {data:'Let’s look at some options for iterating over a NodeList, as you get back from running a document',type:'text',backgroundColor:'bg5'}
            ]}
        ]
        
   
    function resizeWidth(){
        if(window.innerWidth<=1150 && window.innerWidth>1000){
            var currentSize = window.innerWidth - 628
            setImageWidth(currentSize)
        }else if(window.innerWidth<=1000 && window.innerWidth>790){
            var currentSize = window.innerWidth - 473
            setImageWidth(currentSize)
        }else if(window.innerWidth<=790 && window.innerWidth>700 ){
            var currentSize = window.innerWidth - 393
            setImageWidth(currentSize)
        }else if(window.innerWidth<=700 && window.innerWidth>550){
            var currentSize = window.innerWidth - 252
            setImageWidth(currentSize)
        }else if(window.innerWidth<=550 && window.innerWidth>400){
            var currentSize = window.innerWidth - 172
            setImageWidth(currentSize)
        }else if(window.innerWidth<=400){
            var currentSize = window.innerWidth - 112
            setImageWidth(currentSize)
        }else{
        var currentSize = window.innerWidth - 716
        setImageWidth(currentSize)
              }   
    }
   
    useEffect(()=>{
        
        resizeWidth()
       var a = document.querySelectorAll('.rs-carousel')
       var b = document.querySelectorAll('.postedImages112')
       for(var i =0;i<b.length;i++){
        b[i].style.height = '100%'
        b[i].style.width = '100%'
       }
       for(var i = 0;i<a.length;i++){
           a[i].style.height= '345px'
       }
       
    },[imageWidth])
    
    
    // function aa(){
    //     fetchData.map((postData,i)=>{
    //         const imageBaseHeight = document.querySelector('.Base'+postData.id)
    //         postData.post.map((data,a)=>{
    //           var v =   document.querySelectorAll('.'+postData.id)
    //           imageBaseHeight.style.height =v[0].clientHeight+'px' 
    //       })
    //     })
    // }

    window.addEventListener('resize',resizeWidth)

//    var count=0;
//     function rightArrow(postId){
//         const imageBaseHeight = document.querySelector('.Base'+postId)
//         const carouselImage = document.querySelectorAll('.'+postId)
//         const d = carouselImage[0].clientWidth

//        if(count==carouselImage.length-1) return
       
//        count ++
//        for(var i=0;i<carouselImage.length;i++){
//            carouselImage[i].style.transform = 'translateX('+(-d *count)+'px)'
//            carouselImage[i].style.transition = 'transform 0.6s ease-in-out'
//         }
//         imageBaseHeight.style.height = carouselImage[count].clientHeight +'px'
//     }

//     function leftArrow(postId){
//         const imageBaseHeight = document.querySelector('.Base'+postId)
//         const carouselImage = document.querySelectorAll('.'+postId)
//         const d = carouselImage[0].clientWidth

//        if(count==0) return

//        count --
//        for(var i=0;i<carouselImage.length;i++){
//            carouselImage[i].style.transform = 'translateX('+(-d *count)+'px)'
//            carouselImage[i].style.transition = 'transform 0.6s ease-in-out'
//         }
//         imageBaseHeight.style.height = carouselImage[count].clientHeight +'px'
//     }
    
    return (
        <div>
            {aa.length>0?aa.map((postData,i)=>{
                
              return   <div className={`${friend_post.base_post} ${new_post.base_new_post}`}>
              <div className={`${friend_post.user_profile_base}`}>
                <div className={`${friend_post.user_profile_base}`}><img className={`${friend_post.profile_img}`} src="Screenshot (334).png" alt="" /> <p className={`${friend_post.userName}`}>User Name {postData.feelingsEmoji?
                <img alt=""  referrerpolicy="origin-when-cross-origin" src={postData.feelingsEmoji} width="20px" height="20px"></img>:null} {postData.feelingsText?postData.feelingsText:null}</p> 
                </div>
                <FaEllipsisH className={`${friend_post.post_option}`}/>
              </div>
             {postData.title?<p className={`${friend_post.title}`}>{postData.title}</p>:null} 
              <div style={{width:imageWidth}} className={`${friend_post.img_base} ${'Base'+postData.id}`}> 
              {/* <FaArrowAltCircleLeft onClick={()=>leftArrow(postData.id)} style={{color:'white',position:'absolute',marginLeft:'8px', zIndex:'1',marginTop:'100px'}}/>
              <FaArrowAltCircleRight onClick={()=>rightArrow(postData.id)} style={{color:'white',position:'absolute',marginLeft:imageWidth-25,marginTop:'100px', zIndex:'1'}}/> */}
                  <Carousel  className={`${friend_post.customSlider} custom-slider`} > 
                   {postData.post.map((content,index)=>{
                       if(content.type=='image'){
                        return <div className={`${friend_post.img_bg}`}  > <img style={{objectFit:'cover',opacity:'0.8'}} className={`${friend_post.img} ${postData.id} postedImages112`} src={content.data} alt="" />
                         <img  className={`${friend_post.img} ${postData.id} postedImages112`} src={content.data} alt="" />
                        </div>
                       } 
                        if(content.type =='video') {
                        return <div  className={`${friend_post.img_bg}`}  > <ReactPlayer style={{width:'100% '}}  className={`${friend_post.img} ${postData.id} postedImages112`} style={{backgroundColor:'#08202e '}} controls={true}  url={content.data}/> </div>
                       }
                       if(content.type =='text') {
                        return <div  className={`${friend_post.img_bg}`} > 
                        <p  className={`
                        ${friend_post.img} 
                        ${friend_post.aaa} 
                        ${postData.id} 
                        ${content.backgroundColor=='bg1'?friend_post.bg1:null} 
                        ${content.backgroundColor=='bg2'?friend_post.bg2:null}
                        ${content.backgroundColor=='bg3'?friend_post.bg3:null}
                        ${content.backgroundColor=='bg4'?friend_post.bg4:null}
                        ${content.backgroundColor=='bg5'?friend_post.bg5:null}
                        postedImages112` }style={{margin:'initial',width:'100%',height:'100%'}}> <p className={`${friend_post.text_data}`}> {content.data} </p> </p></div>
                       }
                        
                   })}
                   </Carousel>

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
                  <span  style={{ marginLeft:'5px'}}>Like</span>
                  </div>
  
                  <div className={`${friend_post.like_content} ${friend_post.comments}`}>
                  <FaCommentAlt />
                  <span  className='ww' style={{marginTop:'-5px', marginLeft:'5px'}}>Comment</span>
                  </div>
              </div>
          </div>
            }):null}
        </div>
    )
}
export default FriendPost
