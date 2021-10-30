import  {React,useState,useEffect,useLayoutEffect} from "react";
import Navbar from "../Navbar/Navbar";
import pageCSS from "./Page.module.css";
import "../../rootColor/root.css";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import AllPost from "../AllPost/AllPost";
import navCSS from '../Navbar/Navbar.module.css'
import RightSideBar from "../RightSideBar/RightSideBar";

function Page() {
  const [size, setSize] = useState(0);
  const [leftBar,setLeftBar]=useState(null)
  const [rightBar,setRightBar]=useState(null)
  useLayoutEffect(() => {
    updateSize()
    if(size<=1000){           // for left bar
      setLeftBar(false)
    }else{
      setLeftBar(true)
    }
    if(size<=700){
      setRightBar(false)      // for right bar
    }else{
      setRightBar(true)
    }
      }, [size]);
  function updateSize() {
    setSize(window.innerWidth);
  }
  window.addEventListener('resize', updateSize);
  return (
    <div className={`${pageCSS.base_padding}`}>
      <Navbar />
      <div className={`${pageCSS.flex}`}>
     {leftBar?<LeftSideBar/>:null} 
      <AllPost className={`${pageCSS.flex}`} />
     {rightBar? <RightSideBar/>:null} 
      </div>
    </div>
  );
}

export default Page;
