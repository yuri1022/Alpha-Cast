import Toggle from '../assets/icon/toggle.svg';
import SearchIcon from '../assets/icon/search.svg';
import CartIcon from '../assets/icon/cart.svg';
import LogoIcon from '../assets/icon/logo.svg';
import { Link } from "react-router-dom";



export default function Header() {
  return (
    <>
    <header className="site-header" style={{position:'fixed',zIndex:'5',backgroundColor:'var(--grey-light)'}}>
      <div className="header-container mx-auto">
     
        <input id="navbar-toggle" className="navbar-toggle" type="checkbox" />
        <label id="navbar-toggle" className="burger-container">
          <img className="icon-toggle cursor-point" src={Toggle}/>
        </label>

 
        <nav className="navbar-menu" >
          <ul className="nav-list site-menu-list mr-auto">
            <li className="nav-item">
              <Link to="/category/men" className="nav-link">男款</Link>
            </li>
            <li className="nav-item">
               <Link to="/category/women" className="nav-link">女款</Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link">最新消息</Link>
            </li>
            <li className="nav-item">
              <Link to="/customization" className="nav-link">客製商品</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">聯絡我們</Link>
            </li>
          </ul>
          <ul className="nav-list site-action-list">
           
            <li className="nav-item">
              <img className="nav-icon cursor-point" src={SearchIcon} />                        
            </li>
    
            <li className="nav-item">
              <img className="nav-icon cursor-point" src={CartIcon} />
            </li>
          </ul>
        </nav>


        <a className="header-logo-container" href="#">
          <img  className="cursor-point" src={LogoIcon}/>
        </a>
      </div>
    </header>
    </>
  );
}