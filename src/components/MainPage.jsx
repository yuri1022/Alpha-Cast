import { useState, useEffect } from 'react';
import Header from './header.jsx';
import Footer from './Footer/footer.jsx'; // 這裡引入 Footer 元件
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopBanner from './pages/TopBanner.jsx';
import fetchItemsFromAPI from '../api/item.js'

const ImageContainer = styled.div`
  width: 160px;
  height: 160px; 
  margin-bottom: 10px; 
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
`;

const Items = ({ item }) =>{
   const navigate = useNavigate();
  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/item/${item.id}`);
  };

  return (
    
      <div className="div-container__info col col-4" key={item.id} style={{ border:'1px solid light-grey',maxWidth: '360px' , padding:'8px',margin:'10px' }} onClick={handleButtonClick}>
        <card className="card" style={{width: '100%'}}>
        <div className="teacher-top" style={{ display: 'flex', alignItems: 'center' }}>
        <ImageContainer>
        <Image src={item.avatar} alt={item.name}/>
        </ImageContainer>
        <div className="item">
        <h3 className="item-name" >{item.name}</h3>
        <h5 className="item-price">${item.price}</h5>
        <h5 className="item-rating">{item.rating}</h5>
        </div>
        </div>

     
   <div className="button" style={{ display:'flex',justifyContent: 'center' }}>
    

       <button className="add-cart" style={{ 
      backgroundColor: '#F67599',
      width: '124px',
      height: '36px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      padding: '10px 20px',
      margin:'15px 5px 10px 10px',
     }}>加入購物車</button>
    </div>
   </card>
   </div>
  );
};

Items.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default function MainPage() {
  const [items, setItems] = useState([]); // 使用狀態來存儲資料

    useEffect(() => {
    const fetchItems = async () => {
      try{
    const itemsFromAPI = await fetchItemsFromAPI();
      setItems(itemsFromAPI);
    } catch(error){
      console.error('error!',error);
    }

    };
     

    fetchItems();
  }, []); // 空的 dependency array 代表只在 mount 時執行

  return (
    
   
      <>
      <Header />
      <TopBanner />
      <div className="items col col-8" style={{display:'flex'}}>
        {items.map((item) => (
        <Items key={item.id} item={item} />
      ))}
      </div>

      <Footer />
      </>
      
  
  );
}