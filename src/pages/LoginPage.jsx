import { useState } from 'react';
import BrandIcon from '../assets/icon/alphacast.svg';
import LoginImage1 from '../assets/icon/login1.svg';
import LoginImage2 from '../assets/icon/login2.svg';
import LoginImage3 from '../assets/icon/login3.svg';
import LeftArrow from '../assets/icon/arrow-left.svg'
import RightArrow from '../assets/icon/arrow-right.svg'
import ProgressOn from '../assets/icon/progresson.svg'
import ProgressOff from '../assets/icon/progressoff.svg'
import { getSpotifyAuth, getRefreshToken } from "../api/auth.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useauth.jsx";

 


import { Button } from 'react-bootstrap';



const imageTexts = [
  {
    title: '鼓舞人心的故事',
    subtitle: '從非凡的人生故事和成功經歷中獲得靈感',
    backgroundColor:'#23262F',

  },
  {
    title: '輕鬆分類與管理',
    subtitle: '一目了然的分類，讓收藏的Podcast保持整潔',
    backgroundColor:'#2D3831',
  },
  {
    title: 'Spotify快速同步',
    subtitle: '透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽',
    backgroundColor:'#063540',
  },
];

export default function LoginPage () {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [LoginImage1, LoginImage2, LoginImage3];
    const totalImages = images.length;
    const { isAuth, setIsAuth } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (isAuth) {
        try {
          const spotifyRefreshToken = await getRefreshToken();
          if (spotifyRefreshToken) navigate("/home");
          setIsAuth(true);
        } catch (err) {
          setIsAuth(false);
          throw new Error(`取得refresh token失敗${err}`);
        }
      }
    };
    checkToken();
  }, [isAuth, setIsAuth, navigate]);

  const handleClick = () => {
    getSpotifyAuth();
  };

    const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    } else if (direction === 'right') {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  };
  



  return(
    <>
    
    <div className="login" style={{display:'flex',height:'100%',position:'relative'}}>

      <div className="login-left" style={{width:'50%',height:'100%',position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>

      <div className="login-left-brand" style={{position:'absolute',top:'35%',alignItems:'center',textAlign:'center',lineHeight:'18px'}}>   
            <img className="nav-icon cursor-point" src={BrandIcon} style={{width:'70%',height:'70%'}}/> 
            <p style={{fontWeight:'400',fontSize:'18px',marginTop:'16px'}}>Connecting Stories That Matter</p>
      </div>  

      <div className="login-left-btn" style={{position:'absolute',top:'50%',alignItems:'center',textAlign:'center',lineHeight:'18px',fontSize:'16px'}}>
        <Button className="btn btn-secondary" style={{width:'422px',height:'73px',backgroundColor:'var(--positive)'}} onClick={handleClick}>使用Spotify帳號登入</Button>
      </div>

        
      <div className="login-left-text" style={{position:'absolute',top:'66%',alignItems:'center',textAlign:'center',lineHeight:'18px'}}>
        <p style={{fontWeight:'400',fontSize:'16px'}}>沒有帳號嗎？註冊帳號</p>
        </div>
      </div>

      <div className="login-right" style={{width:'50%',height:'100%',backgroundColor:imageTexts[currentImageIndex].backgroundColor,position:'relative'}}>
        <div className="login-right-arrow-l" onClick={() => handleArrowClick('left')} style={{position:'absolute',top:'48%'}}>          
        <img className="nav-icon cursor-point" src={LeftArrow} />
        </div>
        <div className="login-right-img" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
         <img
              className="nav-icon cursor-point"
              src={images[currentImageIndex]}
              style={{ objectFit: 'contain', width: '100%', height: '100%' ,maxHeight:'420px',maxWidth:'420px'}}
              alt={`Login Image ${currentImageIndex + 1}`}
            />
        </div>
        <div className="login-right-arrow-r" onClick={() => handleArrowClick('right')} style={{position:'absolute',top:'48%',right: '0',alignItems:'right'}}>          
        <img className="nav-icon cursor-point" src={RightArrow} />
        </div>
      

      <div className="login-right-container" style={{height:'395px'}}>

      <div className="login-right-title" style={{color:'#FFFFFF',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h2 style={{fontWeight:'700',fontSize:'42px'}}>{imageTexts[currentImageIndex].title}</h2>
        <h6 style={{fontWeight:'400',fontSize:'16px',marginTop:'24px'}}>{imageTexts[currentImageIndex].subtitle}</h6>
        </div>

        <div className="login-right-progress" style={{display:'flex',flexWrap:'wrap',placeContent:'end center',marginTop:'30%'}}>

           {[...Array(totalImages)].map((_, index) => (
              <img
                key={index}
                className="nav-icon cursor-point"
                src={index === currentImageIndex ? ProgressOn : ProgressOff}
                style={{ marginRight: '8px' }}
              /> 
            ))}

        
        </div>
         </div>

      </div>

      </div>
    </>
  );
}