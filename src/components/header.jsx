import BrandIcon from '../assets/icon/alphacast.svg';
import { Link } from "react-router-dom";



export default function Header() {
  return (
    <>
    <header className="site-header" style={{position:'fixed',zIndex:'5',backgroundColor:'var(--grey-light)'}}>
     
      <div className="header-container mx-auto" style={{width:'260px',height:'1024px'}}>


      <div className="header-logo-container" href="#" style={{justifyContent:'center',display:'flex',alignItems:'center'}}>

            <Link to="/home" className="nav-link">
              <img  className="cursor-point" src={BrandIcon} style={{background:'transparent',width:'170px',marginTop:'40px'}}/>
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
        <nav className="navbar-menu" style={{display:'flex',flexDirection:'column',margin:'15% 20px 20px 20px'}}>
          <ul className="nav-list site-menu-list mr-auto">
            <li className="nav-item">
              <Link to="/category/commuting" className="nav-link">通勤清單</Link>
            </li>
            <li className="nav-item">
               <Link to="/category/learning" className="nav-link">學習清單</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/sleeping" className="nav-link">睡前清單</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/myplaylist" className="nav-link">我的Podcast</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/myplaylist" className="nav-link">已收藏</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">新增分類</Link>
            </li>
          </ul>
        

        </nav>
        </div>   


      </div>
    </header>
    </>
  );
}