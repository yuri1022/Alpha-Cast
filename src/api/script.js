// script.js
import axios from 'axios';

const clientId = '86b4101a07c04e0daf26e325dbd84454'; 
const redirectUri = "http://localhost:5173/callback"; 
const api = 'https://spotify-backend.alphacamp.io/'


// 如果瀏覽器的 URL 中包含了 code 參數，則執行獲取訪問權杖的邏輯
if (window.location.search.includes("code")) {
  handleAuthorizationResponse();
} else {
  // 否則，將用戶重新導向到 Spotify 授權頁面
  redirectToSpotifyAuthorization();
}

// 將用戶重新導向到 Spotify 授權頁面的函數
function redirectToSpotifyAuthorization() {
  const scopes = ["user-read-private", "user-read-email"]; // 根據你的需求修改範圍
  const state = generateRandomString(16); // 產生一個隨機字串，用於安全性檢查

  // 將 state 存儲在本地存儲中以便稍後使用
  localStorage.setItem("spotify_auth_state", state);

  // 構建 Spotify 授權 URL
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&state=${state}`;


  // 重新導向到 Spotify 授權頁面
  window.location.href = authUrl;
}

// 處理 Spotify 回調的函數
async function handleAuthorizationResponse() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  
  // 檢查 state 是否與之前存儲的匹配，以確保這不是 CSRF 攻擊
  if (state !== localStorage.getItem("spotify_auth_state")) {
    console.error("Invalid state. Possible CSRF attack.");
    return;
  }

  // 獲取訪問權杖
  const accessToken = await getAccessToken(code);
  if (accessToken) {
    // 使用訪問權杖獲取用戶資料
    const userData = await fetchUserData(accessToken);
    console.log(userData);
  }
}

// 獲取訪問權杖的函數
async function getAccessToken(code) {
   try {
   const response = await axios.post(`${api}/api/users`, {
  spotifyToken: code,
});

    return response.data.accessToken; // 假设你的后端返回一个包含访问令牌的对象
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

// 使用訪問權杖獲取用戶資料的函數
async function fetchUserData(accessToken) {
try {
 const response = await axios.get(`${api}/api/me`, {
  headers: {
    Authorization: `Bearer ${accessToken.apiToken}`, // 使用 API 回應中的正確屬性
  },
});

    return response.data; // 假设你的后端返回包含用户数据的对象
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// 生成指定長度的隨機字串的函數
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}