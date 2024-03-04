import BrandIcon from '../assets/icon/alphacast.svg';
import { Link } from "react-router-dom";
import PlusIcon from '../assets/icon/plus.svg';
import { Button } from 'react-bootstrap';
import MoreIcon from '../assets/icon/more.svg';
import { useState } from 'react';
import '../styles/header.scss';



export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <header className="site-header" >
     
      <div className="header-container mx-auto">


      <div className="header-logo-container" href="#">

            <Link to="/home" className="nav-link">
              <img  className="nav-icon" src={BrandIcon} />
              </Link>
          
        </div>

      {/* 偽元素樣式 */}
          <style>
            {`
              .header-container::after {
                content: '';
                position: absolute;
                top: 5.5rem;
                left: 1rem;
                width: 12.25rem;
                height: 0.06rem; 
                background-color: var(--grey-300); 
              }
            `}
          </style>

        <div className="header-navbar">   
        <nav className="navbar-menu">

          <ul className="nav-list site-menu-list mr-auto" >


            <li className="nav-item" >
              <Link to="/category/commuting" className="nav-link" >
                <div className="nav-link-icon" >🚌</div>
                <div className="nav-link-text">通勤清單</div>
               </Link>
              <img className="nav-item-more" 
              src={MoreIcon} alt="more" 
               onClick={toggleMenu}/>
                {isMenuOpen && (
            <div className="popup-menu">
              <div className="popup-menu-list" >
              <div className="popup-menu-item" >
                
              <div className="popup-menu-item-text">編輯名稱</div>
              <div className="popup-menu-separator"></div>
              
              </div>

              <div className="popup-menu-item" >                
              <div className="popup-menu-item-text">刪除分類</div>
              <div className="popup-menu-separator"></div>
                </div>

              <div className="popup-menu-item" >
              <div className="popup-menu-item-text">新增PodCast</div>
              
              </div>
              </div>

              {/* 彈出選單的內容，包括等選項 */}
              {/* 可以使用React-Bootstrap的Dropdown或者自己設計一個 */}
            </div>
          )}
            </li>


            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex',justifyContent:'space-between', width:'100%'}}>
               <Link to="/category/learning" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>📚</div>
                <div className="nav-link-text">學習清單</div>
                </Link>
               <img className="nav-item-more" 
               src={MoreIcon} alt="more"    
               onClick={toggleMenu}/>
            </li>


            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex', justifyContent:'space-between',width:'100%'}}>
              <Link to="/category/sleeping" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
               <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>💤</div>
                <div className="nav-link-text">睡前清單</div>                
                
                </Link>
              <img className="nav-item-more" 
              style={{marginRight:'0.5rem'}} 
              src={MoreIcon} alt="more" 
              onClick={toggleMenu}/>
            </li>


            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex', justifyContent:'space-between',width:'100%'}}>
              <Link to="/category/myplaylist" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>🏘️</div>
                <div className="nav-link-text">我的Podcast</div>                    
                
               </Link>
              <img className="nav-item-more"  
              style={{marginRight:'0.5rem'}} 
              src={MoreIcon} alt="more" 
              onClick={toggleMenu}/>
            </li>


            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex', justifyContent:'space-between',width:'100%'}}>
              <Link to="/category/favorite" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>❤️</div>
                <div className="nav-link-text">已收藏</div>                   
                </Link>
              <img className="nav-item-more" 
              style={{marginRight:'0.5rem'}} 
              src={MoreIcon} alt="more" 
              onClick={toggleMenu}/>
            </li>


            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex',justifyContent:'space-between', width:'100%'}}>
              <Link to="#" className="nav-link">
                <Button variant="outline-primary" style={{display:'flex',border:"0.125rem solid var(--main-blue)",borderRadius:'0.75rem',color:'var(--main-blue)',width:'12.25rem',height:'2.93rem',margin:'0 0 0 -0.5rem'}}>
                  <img className="nav-item-plus" style={{margin:'0.3rem 0 0 0'}} src={PlusIcon} alt="plus" />
                  <div className="nav-item-text" style={{fontSize:'0.875rem',fontWeight:'500',margin:'0.3rem 0 0 0.2rem'}}>新增分類</div>
                </Button>
                </Link>
            </li>


          </ul>
        

        </nav>
        </div>   


      </div>
    </header>
    </>
  );
}