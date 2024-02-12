import MainPage from './components/MainPage.jsx';
import './styles/style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemCategory from './components/pages/ItemCategory.jsx';
import ItemDetail from './components/pages/ItemDetail.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import SignUpPage from './components/pages/SignUpPage.jsx';
import FavoritePage from './components/pages/FavoritePage.jsx';
import MyPodcast from './components/pages/MyPodcast.jsx';


function App() {

  return (
    <>
  <BrowserRouter>

  <div className="app">

       <Routes>       
          <Route path="home" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="item/:itemName" element={<ItemDetail />} />
          <Route path="category/:categoryName" element={<ItemCategory />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route path="category/myplaylist" element={<MyPodcast />} />

        </Routes>
    </div>
     
    </BrowserRouter>
    </>
  );
}

export default App;