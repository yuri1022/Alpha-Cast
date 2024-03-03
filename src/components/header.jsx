import BrandIcon from '../assets/icon/alphacast.svg';
import { Link } from "react-router-dom";
import PlusIcon from '../assets/icon/plus.svg';
import { Button } from 'react-bootstrap';
import MoreIcon from '../assets/icon/more.svg'


export default function Header() {
  return (
    <>
    <header className="site-header" style={{position:'fixed',zIndex:'5',backgroundColor:'var(--grey-light)'}}>
     
      <div className="header-container mx-auto" style={{width:'16.25rem',height:'64rem'}}>


      <div className="header-logo-container" href="#" style={{justifyContent:'center',display:'flex',alignItems:'center'}}>

            <Link to="/home" className="nav-link">
              <img  className="cursor-point" src={BrandIcon} style={{background:'transparent',width:'10.625rem',marginTop:'2.5rem'}}/>
              </Link>
          
        </div>

      {/* 偽元素樣式 */}
          <style>
            {`
              .header-container::after {
                content: '';
                position: absolute;
                top: 92px;
                left: 36px;
                width: 196px;
                height: 1px; 
                background-color: var(--grey-300); 
              }
            `}
          </style>

        <div className="header-navbar">   
        <nav className="navbar-menu" style={{width:'12.25rem',height:'21.375rem', margin:'8rem 1rem 1rem 2rem'}}>

          <ul className="nav-list site-menu-list mr-auto" style={{margin:'0.6rem',display:'flex', flexDirection:'column',justifyContent:'left' , fontSize:'0.875rem',fontWeight:'500',color:'var(--main-blue-grey',alignItems:'flex-start'}}>
            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex',justifyContent:'space-between', width:'100%'}}>
              <Link to="/category/commuting" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>🚌</div>
                <div className="nav-link-text">通勤清單</div>
               </Link>
              <img className="nav-item-more" src={MoreIcon} alt="more" />
            </li>
            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex',justifyContent:'space-between', width:'100%'}}>
               <Link to="/category/learning" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>📚</div>
                <div className="nav-link-text">學習清單</div>
                </Link>
               <img className="nav-item-more" src={MoreIcon} alt="more" />
            </li>
            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex', justifyContent:'space-between',width:'100%'}}>
              <Link to="/category/sleeping" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
               <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>💤</div>
                <div className="nav-link-text">睡前清單</div>                
                
                </Link>
              <img className="nav-item-more" src={MoreIcon} alt="more" />
            </li>
            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex', justifyContent:'space-between',width:'100%'}}>
              <Link to="/category/myplaylist" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>🏘️</div>
                <div className="nav-link-text">我的Podcast</div>                    
                
               </Link>
              <img className="nav-item-more" src={MoreIcon} alt="more" />
            </li>
            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex', justifyContent:'space-between',width:'100%'}}>
              <Link to="/category/favorite" className="nav-link" style={{display:'flex',alignItems:'baseline'}}>
                <div className="nav-link-icon" style={{fontSize:'1.25rem',paddingRight:'0.6rem'}}>❤️</div>
                <div className="nav-link-text">已收藏</div>                   
                </Link>
              <img className="nav-item-more" src={MoreIcon} alt="more" />
            </li>
            <li className="nav-item" style={{paddingBottom:'2.5rem',display:'flex',justifyContent:'space-between', width:'100%'}}>
              <Link to="#" className="nav-link">
                <Button variant="outline-primary" style={{display:'flex',border:"0.125rem solid var(--main-blue)",color:'var(--main-blue)',width:'10.25rem',height:'2.93rem'}}>
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