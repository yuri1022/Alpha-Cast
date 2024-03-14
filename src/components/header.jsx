//header.jsx
import BrandIcon from '../assets/icon/alphacast.svg';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import '../styles/header.scss';
import useApi from '../context/useApi';  
import AddNewCategoryModal from './AddCategoryModal';
import EditCategoryBtn from './EditCategoryBtn';
import { useParams } from 'react-router-dom';




export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { myCategory, nowCategory } = useApi();
 
 const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const renderedCategoryList = myCategory?.map((list) => {
    const splitName = list.name.split(",");
    // 測試用
    // console.log(splitName);
    console.log(list);
    return (
      <EditCategoryBtn
        key={list.id}
        name={splitName[0]}
        icon={splitName[1]}
        id={list.id}
      />
    );
  });



  

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
        <nav className="navbar-menu" style={{paddingRight:'1rem'}}>

        {renderedCategoryList}
        <AddNewCategoryModal />

        </nav>
        </div>   
        
      
      </div>
      
    </header>
    
      
    </>
  );
}