import { useEffect, useState } from 'react';
import { getCategory } from '../api/script.js';
import SearchPodcast from './SearchPodcast.jsx';
import { useParams } from 'react-router-dom';
import Header from '../components/header.jsx';
import { getShow } from '../api/auth.js';
import { Card } from 'react-bootstrap';
import Greeting from '../components/Greeting.jsx';
import ProfileBar from '../components/ProfileBar.jsx';
import PlayList from '../components/playinglist.jsx';

const MyPodcast = () => {
  const [error, setError] = useState(null);
  const [category,setCategories] = useState('');
  const [podCast,setPodcast] = useState([]);
  const [openSearchModal,setOpenSearchModal] = useState(false);
  const { id } = useParams();

 const handleOpenSearch = () => {
   setOpenSearchModal(true);
  };

  const handleCloseSearch = () => {
   setOpenSearchModal(false);
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
  console.log(podCast);
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
      <div className="homepage-items" style={{display: 'flex', margin: '1rem -1rem 0 2rem', flexWrap: 'wrap', flex: '3'}}>

        {podCast && podCast.map((p) => (
            <div className="podcast-card d-flex" key={p.id}>
              <div className="podcast-img-container">
              <img src={p.images[1].url} alt="img" />
              </div>

            <div className="podcast-info-container">
              <h3>{p.name}</h3>
              <p>发布者：{p.publisher}</p>
              <p>{p.description}</p>
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


      <button onClick={handleOpenSearch}>請搜尋並新增PodCast</button>
      {openSearchModal && <SearchPodcast show={openSearchModal} onClose={handleCloseSearch} />
      }

      {error && <p>{error}</p>}
    


 </div>


      

    
    </div>
    </>
  );
};

export default MyPodcast;