import { useEffect, useState } from 'react';
import { getCategory } from '../api/script.js';
import SearchPodcast from './SearchPodcast.jsx';
import { useParams } from 'react-router-dom';
import Header from '../components/header.jsx';
import { getShow } from '../api/auth.js';
import { Button } from 'react-bootstrap';
import Greeting from '../components/Greeting.jsx';
import ProfileBar from '../components/ProfileBar.jsx';
import PlayList from '../components/playinglist.jsx';

const MyPodcast = () => {
  const [error, setError] = useState(null);
  const [category,setCategories] = useState('');
  const [podCast,setPodcast] = useState([]);
  const [openSearchModal,setOpenSearchModal] = useState(false);
  // const [viewType, setViewType] = useState('list'); 

  const { id } = useParams();

 const handleOpenSearch = () => {
   setOpenSearchModal(true);
  };

  const handleCloseSearch = () => {
   setOpenSearchModal(false);
  };

   const formatDuration = (duration_ms) => {
    const totalSeconds = duration_ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}小時${minutes}分`;
  };
 
   const fetchCategoryData = async () => {
    try {
      const data = await getCategory();
      const selectedCategory = data.find(item => item.id === id);
      setCategories(selectedCategory);  
      console.log('select',selectedCategory); 
    } catch (error) {
      console.error(`Error searching podcasts:', ${error.message}`);
    }
  };

   useEffect(() => {
    fetchCategoryData(); 
  }, [id]); 

useEffect(() => {
  if (category.savedShows && category.savedShows.length > 0) {
    const showIds = category.savedShows.map((show) => show.id.split(':')[2]);

    showIds.forEach(async (id) => {
       try {
        const data = await getShow(id);
        // 检查是否已经存在于podCast数组中
        if (!podCast.find(p => p.id === data.id)) {
          setPodcast((prevPodcast) => [...prevPodcast, data]);
        }
      } catch (error) {
        console.error(error);
      }
    });

    console.log(podCast);
  }
}, [category.savedShows]);

useEffect(() => {
  // console.log(podCast);
}, [podCast]);


  return (
    <>

    <div className="homepage-container d-flex col-12">
    <div className="homepage-navbar col-2">
      <Header />
    </div>

 <div className="homepage-main col col-10" style={{display: 'flex', flexDirection: 'column'}}>
    <div className="homepage-title" style={{margin: '2.5rem 8.5rem 0 2rem',display:'flex',justifyContent:'space-between'}}>
      <h4 className='title' style={{fontSize: '2rem', fontWeight: '700'}}>
        <Greeting />
        </h4>
      <div className='profile-bar'>
      <ProfileBar />
      </div>
    </div>

     <div className="homepage-item-container" style={{display: 'flex', flex: '1'}}>
      <div className="homepage-items" style={{display: 'flex', margin: '1rem 1rem 0 2rem', flexWrap: 'wrap', flex: '3'}}>

        {podCast && podCast.map((p) => (
            <div className="podcast-card d-flex" key={p.id} style={{width:'100%',height:'9.43rem',margin:'0.5rem',border:'1px solid var(--main-orange-light)',borderRadius:'1rem'}}>
              <div className="podcast-img-container d-flex" style={{alignItems:'center',margin:'0.1rem 0.5rem 1.5rem 0.5rem'}}>
              <img src={p.images[1].url} alt="img" style={{height:'6rem',width:'6rem',borderRadius:'0.5rem'}}/>
              </div>

            <div className="podcast-info-container d-flex mt-3" style={{flexDirection:'column',alignItems:'flex-start'}}>
              <h3 className="podcast-title" style={{fontWeight:'700'}}>{p.name}</h3>
              <p className="podcast-author" style={{fontSize:'0.875rem'}}>{p.publisher}</p>
              <p className="podcast-description" style={{fontSize:'0.875rem'}}>{p.description.substring(0,100)}...</p>

                <div className="podcast-player">
                      <p>時長: {formatDuration(p.episodes.items[0].duration_ms)}</p>
                      <audio controls>
                        <source src={p.episodes.items[0].audio_preview_url} type="audio/mpeg" />
                        您的瀏覽器
                      </audio>
                    </div>
            </div>



              
            </div>
          ))}
      </div>
      
      <div className="homepage-playing" style={{flex: '1.7'}}>
        <div>
      
          <PlayList />
        </div>
      </div>

    </div>
    
    <div className="search-btn col-6" style={{marginLeft:'2.2rem'}}>
      <Button onClick={handleOpenSearch}>新增PodCast</Button>
      {openSearchModal && <SearchPodcast show={openSearchModal} onClose={handleCloseSearch} />
      }

      {error && <p>{error}</p>}    
    </div>


    


 </div>


      

    
    </div>
    </>
  );
};

export default MyPodcast;