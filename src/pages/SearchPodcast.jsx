import { useContext, useEffect, useState } from 'react';
import useApi from '../context/useApi.jsx';
import { addShow } from '../api/script.js';
import { searchShow} from '../api/auth.js';
import { Modal,Button } from 'react-bootstrap';
import SearchIcon from '../assets/icon/search.svg'

const SearchPodcast = ({show,onClose,id}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);



 const handleSearch = async () => {
  if(!isInputEmpty){
    try {
      const data = await searchShow(searchTerm);
      console.log(data);
      const results = data.items;
      setSearchResults(results);
    } catch (error) {
      console.error(`Error searching podcasts:', ${error.message}`);
      setError(error.message);

    }
  }

  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsInputEmpty(e.target.value === '');
  };


 const handleCheckAdd = async (itemId) => {
  try {
    const categoryId = 297; 
    console.log('itemId',itemId);
    const response = await addShow({ categoryId, itemId }); 
    console.log(response);
    if (response) {
      setSearchResults([]);
      setSearchTerm('');
      setSelectedItems([]);
      onClose();
    } else {
      console.error('Failed to add show');
    }
  } catch (error) {
    console.error(`Error adding show:', ${error.message}`);
    setError(error.message);
    setSelectedItems([]);
  }
};

const handleSelectItem = (itemId) => {
  setSelectedItems([itemId]); 
};




  return (
       <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{fontWeight:'700',fontSize:'1.125rem',height:'1.2rem'}}>新增PodCast</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{overflowY:'scroll'}}>
      <div>
        <div className="search-input col-12" onClick={handleSearch}>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleInputChange}
        placeholder="開始搜尋..." 
        style={{width:'100%',borderRadius:'0.3125rem',backgroundColor:'var(--grey-light)', backgroundImage: `url(${SearchIcon})`, 
          backgroundPosition: '2rem right', 
          backgroundRepeat: 'no-repeat', 
          paddingLeft: '2rem',
        }}
        
      />

      {!isInputEmpty && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            cursor: 'pointer',
          }}
          onClick={handleSearch}
        ></div>
      )}
        </div>

      {error && <p>{error}</p>}
      <div className="search-result col-12">
        <div className="search-result-title col-12">
          <h5>搜尋結果</h5>
          </div>
        <div className='search-result-container d-flex col-12' style={{flexWrap:'wrap'}}>
        {searchResults && searchResults.length > 0 && searchResults.map((result) => (
          <div className="search-result-item col-3" key={result.id} style={{margin:'0.5rem', boxShadow: '2px 2px 2px rgba(199, 199, 199, 0.24)',height:'10rem',border: selectedItems.includes(result.id) ? '1px solid var(--main-orange-light)' : 'none',}}
          onClick={() => handleSelectItem(result.id)}>

            <div className="img-container d-flex" style={{margin:'0.5rem',justifyContent:'center',width:'6rem',height:'6rem'}}>
           <img src={result.images[1].url} alt={result.name} style={{objectFit:'cover',borderRadius:'0.3125rem'}}/>

            </div>
            <div className="title-container" style={{textAlign:'center'}}>
            <h6 style={{fontSize:'0.7rem',fontWeight:'700'}}>{result.name}</h6>
            <h6 style={{fontSize:'0.7rem'}}>{result.name}</h6>

            </div>

           
            <div>

              </div>
          </div>
     
  
        ))}
      </div>
      </div>



    </div>        
      </Modal.Body>
          <Modal.Footer>
            <Button>取消</Button>
              <Button onClick={() => handleCheckAdd(selectedItems)}>確認新增</Button>
            </Modal.Footer>  


        </Modal>


  );
};

export default SearchPodcast;