import { useContext, useEffect, useState } from 'react';
import useApi from '../context/useApi.jsx';
import { addShow } from '../api/script.js';
import { searchShow} from '../api/auth.js';
import { Modal,Button } from 'react-bootstrap';

const SearchPodcast = ({show,onClose,id}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

 const handleSearch = async () => {
    try {
      const data = await searchShow(searchTerm);
      console.log(data);
      const results = data.items;
      setSearchResults(results);
    } catch (error) {
      console.error(`Error searching podcasts:', ${error.message}`);
      setError(error.message);

    }
  };

 const handleCheckAdd = async (showId) => {
  try {
    const categoryId = 297; // 使用组件中传入的 id 参数
    const success = await addShow({ categoryId, showId }); // 调用 addShow 函数
    if (success) {
      // 如果成功添加节目，则更新搜索结果和分类数据
      setSearchResults([]);
      setSearchTerm('');
      fetchCategoryData(); // 重新获取分类数据，以更新 category.savedShows
    } else {
      console.error('Failed to add show');
    }
  } catch (error) {
    console.error(`Error adding show:', ${error.message}`);
    setError(error.message);
  }
};




  return (
       <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Spotify Podcasts</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{overflowY:'scroll'}}>
      <div>
      <h2>Spotify Podcasts</h2>
      <h6>請搜尋Podcast關鍵字</h6>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="輸入關鍵詞" 
      />
      <button onClick={handleSearch}>搜索</button>
      {error && <p>{error}</p>}
      <div className="search-result">
        <div className="search-result-title">
          <h5>搜尋結果</h5>
          </div>
        <div className='search-result-container d-flex' style={{flexDirection:'column',margin:'1rem'}}>
        <ul>
        {searchResults && searchResults.length > 0 && searchResults.map((result) => (
          <li key={result.id}>
            <h3>{result.name}</h3>
            <img src={result.images[1].url} alt={result.name} />
            <p>{result.description}</p>
            <div>
              <Button>取消</Button>
              <Button onClick={() => handleCheckAdd(result.uri)}>確認新增</Button>
              </div>
          </li>
        ))}
      </ul>
      </div>
      </div>



    </div>        
      </Modal.Body>



        </Modal>


  );
};

export default SearchPodcast;