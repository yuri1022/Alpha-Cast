import MainPage from './pages/MainPage.jsx';
import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemCategory from './pages/ItemCategory.jsx';
import ItemDetail from './pages/ItemDetail.jsx';
import CallbackPage from "./pages/CallbackPage";
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import FavoritePage from './pages/FavoritePage.jsx';
import MyPodcast from './pages/MyPodcast.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';


function App() {

  return (
    <>
  <BrowserRouter>

  <div className="app">

       <Routes>       
          <Route path="home" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route path="mypage/show/:id" element={<MyPodcast />} />

        </Routes>
    </div>
     
    </BrowserRouter>
    </>
  );
}

export default App;