// script.js
import axios from 'axios';

const clientId = '86b4101a07c04e0daf26e325dbd84454'; 
const redirectUri = "http://localhost:5173/callback"; 
const api = 'https://spotify-backend.alphacamp.io'


// 如果瀏覽器的 URL 中包含了 code 參數，則執行獲取訪問權杖的邏輯
if (window.location.search.includes("code")) {
  handleAuthorizationResponse();
} else {
  // 否則，將用戶重新導向到 Spotify 授權頁面
  redirectToSpotifyAuthorization();
}

// 將用戶重新導向到 Spotify 授權頁面的函數
function redirectToSpotifyAuthorization() {
const codeVerifier = generateCodeVerifier(43);
const codeChallenge = generateCodeChallenge(codeVerifier);
const state = generateRandomString(16);

// 將 state 存儲在本地存儲中以便稍後使用
localStorage.setItem('code_verifier', codeVerifier);
localStorage.setItem('spotify_auth_state', state);


  // 構建 Spotify 授權 URL
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email&code_challenge_method=S256&code_challenge=${codeChallenge}&state=${generateRandomString(16)}`;



  // 重新導向到 Spotify 授權頁面
  window.location.href = authUrl;
}


async function handleAuthorizationResponse() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  
  // 檢查 state 是否與之前存儲的匹配，以確保這不是 CSRF 攻擊
  // if (state !== localStorage.getItem("spotify_auth_state")) {
  //   console.error("Invalid state. Possible CSRF attack.");
  //   return;
  // }

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
    const verifier = localStorage.getItem('code_verifier');
    
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('code_verifier', verifier);
    
    // 發送請求
    const response = await axios.post(
      `${api}/api/users`,
      params.toString(), // 將 params 轉換成 x-www-form-urlencoded 格式
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log(response);
    // 返回 API 存取令牌
    return response.data.access_token;
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
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
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


// 生成 code verifier 的函數
function generateCodeVerifier(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// 生成 code challenge 的函數
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(digest)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}