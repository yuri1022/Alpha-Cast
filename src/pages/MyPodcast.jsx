import { useEffect, useState } from 'react';
import { getCategory } from '../api/script.js'; // 記得替換成你的實際 API 檔案名稱


const MyPodcast = () => {
const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategory();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    console.log(categories);
    fetchCategories();
  }, [categories]);

  return (
    <div>
      <h2>Spotify Podcasts</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          {/* 在這裡可以加入顯示該分類下的 Podcast 的程式碼 */}
        </div>
      ))}
    </div>
  );
};

export default MyPodcast;