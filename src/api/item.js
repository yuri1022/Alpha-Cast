import axios from 'axios';

const apiEndpoint = 'http://localhost:3000/api';
const itemPath = `${apiEndpoint}/item`

const fetchItemsFromAPI = async () => {
  try {
    const response = await axios.get(itemPath,{ withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

export default fetchItemsFromAPI;