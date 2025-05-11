import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import profilePicture from "../assets/images/portret.jpg";

const Header = ({ pageName }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src={profilePicture}
          alt="Profile"
          className="header-logo"
          onClick={goToHome}
          style={{ cursor: "pointer" }}
        />
        <h1
          className="header-title"
          onClick={goToHome}
          style={{ cursor: "pointer" }}
        >
          Timon Coucke
        </h1>
      </div>
      <div className="header-center">
        <h1 className="header-title">⚡Custom Enchantments⚡</h1>
      </div>
      <div className="header-right"></div>
    </header>
  );
};

export default Header;
