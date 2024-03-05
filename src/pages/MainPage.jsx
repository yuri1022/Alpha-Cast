import { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemData } from '../data/ItemData.jsx';
import PlayList from '../components/playinglist.jsx';
import useAuth from '../context/useauth.jsx';
import { getProfile } from '../api/auth.js';
import ProfileBar from '../components/ProfileBar.jsx';


const Items = ({ item }) =>{
   const navigate = useNavigate();
  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/item/${item.id}`);
  };

  return (
      
      <div className="div-container__info" key={item.id}
      onClick={handleButtonClick}>
        <card className="card" style={{width: '11.12rem',height:'16.625rem',margin:'1rem 1rem 1rem 0',borderRadius:'0.5rem',boxShadow: '24px 8px 24px rgba(199, 199, 199, 0.24)',border:'none'}}>
        <div className="item-card" style={{ display: 'flex', justifyContent:'center'}}>
          <div className="item-card-img-container" style={{width:'9rem',height:'9rem',margin:'1rem'}}>
          <img src={item.avatar} alt="pic" style={{width: '100%', height: '100%', objectFit: 'cover',borderRadius:'0.66rem'}}/>
          </div>      

        </div>

        
        <div className="item" style={{margin:'0 1rem 1.2rem 1rem'}}>
        <h3 className="item-name" style={{marginBottom:'0.5rem',fontSize:'0.875rem',fontWeight:'700'}}>{item.name}</h3>
        <h5 className="item-price" style={{marginBottom:'0.5rem',fontSize:'0.75rem',color:'var(--grey-400)'}}>{item.price}</h5>
        <div className="button" style={{ display:'flex',justifyContent: 'start' }}>
    
       <button className="add-cart" style={{ 
      backgroundColor: 'var(--main-blue)',
      width: '2.75rem',
      height: '1.75rem',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      padding: '0.25rem 0.5rem 0.25rem 0.5rem',
      margin:'0',
      color:'#FFF',
      fontWeight:'400',
      fontSize:'0.875rem'
     }}>更多</button>
           </div>
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
  const { isAuth, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfile();
        setProfile(userProfile);
        setLoading(false);  // 資料載入完成後設置 loading 為 false
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setLoading(false);  // 發生錯誤時也要確保將 loading 設置為 false
      }
    };

    if (isAuth) {
      fetchProfile();
    }
  }, [isAuth]);


  return (
    
   
      <>
      <div className="homepage-container col col-12" >
        <div className="homepage-navbar col col-2">
        <Header />
      </div>

 <div className="homepage-main col col-10" style={{display: 'flex', flexDirection: 'column'}}>
    <div className="homepage-title" style={{margin: '2.5rem 8.5rem 0 2rem',display:'flex',justifyContent:'space-between'}}>
      <h4 className='title' style={{fontSize: '2rem', fontWeight: '700'}}>早安</h4>
      <div className='profile-bar'>
      <ProfileBar profile={profile} isAuth={isAuth} loading={loading}/>
      </div>


    </div>
    <div className="homepage-item-container" style={{display: 'flex', flex: '1'}}>
      <div className="homepage-items" style={{display: 'flex', margin: '1rem -1rem 0 2rem', flexWrap: 'wrap', flex: '3'}}>
        {ItemData.map((item) => (
          <Items key={item.id} item={item} />
        ))}
      </div>
      <div className="homepage-playing" style={{flex: '1.7'}}>
        <div>
      
          <PlayList />
        </div>
      </div>
    </div>
  </div>     


      </div>
      </>
      
  
  );
}