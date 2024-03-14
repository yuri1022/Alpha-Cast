import PropTypes from 'prop-types';
import BottomIcon from '../assets/icon/bottom.svg';
import useAuth from '../context/useauth';
import { useState, useEffect,useContext } from 'react';
import { getProfile } from '../api/auth.js';
import ApiContext from '../context/ApiContext.jsx';


const ProfileBar = () => {
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
    <div className='profile-bar-container' style={{width:'11.5rem',height:'3rem',backgroundColor:'#FAFAFA',borderRadius:'62.5rem',display:'flex',paddingLeft:'0.7rem'}}>
      {isAuth ?(  
        loading ?(
          <p>loading...</p>
        ):(    
      <>
      <img src={profile.images[0].url} alt="pic" style={{borderRadius:'50%',cursor:'pointer'}}/>
      <h5 style={{fontWeight:'700',padding:'0.82rem 0 0 0.5rem'}}>{profile.display_name}</h5>
      <img src={BottomIcon} alt="選單" style={{width:'0.8rem',height:'0.8rem',margin:'1rem 0 0 1rem',cursor:'pointer'}}/>
      </>)):(
      <div>plz login</div>
      )}

    </div>
  );
};

export default ProfileBar;

ProfileBar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};