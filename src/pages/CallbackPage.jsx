import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../api/auth.js";
import { register } from "../api/script.js";
import useAuth from "../context/useauth.jsx";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

function CallbackPage() {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(new URL(window.location).search);
    const spotifyCode = urlParams.get("code");
    console.log("CallbackPage useEffect executed")
    if (urlParams.get("error")) {
      setTimeout(() => {
        FailMsg("授權註冊失敗");
        navigate("/login");
      }, 1500);
      return;
    }
    if (spotifyCode) {
      localStorage.setItem("spotifyCode", spotifyCode);
      const registerAC = async () => {
        try {
          const spotifyToken = await getAccessToken(spotifyCode);
          const acPermission = await register(spotifyToken);
          if (acPermission.id) {
            setIsAuth(true);
            SuccessMsg("登入或註冊成功");
            setTimeout(() => {
              navigate("/home");
            }, 1500);
          }
        } catch (err) {
          console.log(`Register Alphacast Failed ${err}`);
          setTimeout(() => {
            FailMsg("異常😟請重新整理頁面");
          }, 5000);
        }
      };
      registerAC();
    }
  }, [setIsAuth, navigate]);

  return (
    <div className="position-relative">
      <div
        className="position-absolute d-flex flex-column justify-content-center align-items-center w-100"
        style={{
          top: "25vh",
        }}
      >
        <Spinner
          animation="border"
          variant="info"
          className="m-5"
          style={{
            width: "9rem",
            height: "9rem",
            borderWidth: "1.25rem",
          }}
        />
        <p
          className="text-info"
          style={{ fontSize: "4rem", fontWeight: 700, letterSpacing: 10 }}
        >
          LOADING...
        </p>
      </div>
    </div>
  );
}

export default CallbackPage;

function SuccessMsg(msg) {
  return Swal.fire({
    title: msg,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}

function FailMsg(msg) {
  return Swal.fire({
    title: msg,
    icon: "error",
    timer: 1500,
    showConfirmButton: false,
  });
}