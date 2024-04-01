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
import { isEqual } from 'lodash';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../styles/playinglist.scss';



const MyPodcast = () => {
  const [error, setError] = useState(null);
  const [category,setCategories] = useState('');
  const [podCast,setPodcast] = useState([]);
  const [openSearchModal,setOpenSearchModal] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState(null);

  // const [viewType, setViewType] = useState('list'); 
  const { id } = useParams();

 const handleOpenSearch = () => {
   setOpenSearchModal(true);
  };

  const handleCloseSearch = () => {
   setOpenSearchModal(false);
  };

const onPlay = (id) => {
  if (activePlayer && activePlayer !== id && activePlayer.audio && activePlayer.audio.current) {
    activePlayer.audio.current.pause();
  }
  setActivePlayer(id);
};

const onPause = (id) => {
  if (activePlayer === id && activePlayer.audio && activePlayer.audio.current) {
    setActivePlayer(null);
  }
};


   const formatDuration = (duration_ms) => {
    const totalSeconds = duration_ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}小時${minutes}分`;
  };
 
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await getCategory();
        const selectedCategory = data.find(item => item.id === id);
        setCategories(selectedCategory);  
      } catch (error) {
        console.error(`Error searching podcasts:', ${error.message}`);
      }
    };

    fetchCategoryData(); 
  }, [id]); 

useEffect(() => {
  if (category.savedShows && category.savedShows.length > 0) {
    const showIds = category.savedShows.map((show) => {
      if (show && typeof show.id === 'string' && show.id.includes(':')) {
        return { id: show.id.split(':')[2] };
      }
      return show; // 返回原始对象
    });

    const fetchData = async (id) => {
      try {
        return await getShow(id.id);
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    Promise.all(showIds.map(fetchData))
      .then((results) => {
        // 检查更新是否是由 category.savedShows 引起的
        if (!isEqual(podCast, results)) {
          setPodcast(results);
        }
      })
      .catch((error) => console.error(error));
  }
}, [category.savedShows, podCast]);
console.log('pct',podCast)

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

            <div className="podcast-info-container d-flex mt-3 mr-2" style={{flexDirection:'column',alignItems:'flex-start'}}>
              <h3 className="podcast-title" style={{fontWeight:'700'}}>{p.name}</h3>
              <p className="podcast-description mt-2" style={{fontSize:'0.875rem',color:'var(--main-blue-grey)',paddingRight:'0.5rem'}}>{p.description.substring(0,100)}...</p>

      <div className="podcast-player d-flex w-50">
          <AudioPlayer
          className='audio-play w-50 h-50'
           key={p.id}
          autoPlay={false}
          src={p.episodes.items[currentEpisodeIndex].audio_preview_url}
          onPlay={() => onPlay(p.id)} 
          onPause={() => onPause(null)}
          showJumpControls={false}
          showFilledProgress={false}
          showDownloadProgress={false}
          />
          <div className="podcast-time d-flex" style={{alignItems:'center',fontSize:'0.85rem',color:'var(--main-blue-grey)'}}>
          <h6>{p.episodes.items[currentEpisodeIndex].release_date}</h6>
          <span>．</span>
          <h6 className='title'>{formatDuration(p.episodes.items[currentEpisodeIndex].duration_ms)}</h6>
          </div>

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
      {openSearchModal && <SearchPodcast show={openSearchModal} onClose={handleCloseSearch} category={setCategories}/>
      }

      {error && <p>{error}</p>}    
    </div>
    </div>
    </div>
    </>
  );
};

export default MyPodcast;