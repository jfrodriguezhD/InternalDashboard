import { useState } from "react";
import "./Header.css";
import HamburguerMenu from "../hamburguer_menu/HamburguerMenu";

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <section className="main-header-container">
        <div className="header-left">
          <span
            className="material-symbols-outlined menu-icon"
            onClick={toggleMenu}
          >
            menu
          </span>
          <h1 className="header-title">Dashboard</h1>
        </div>
        <div className="header-user-name">
          <h3>User Name goes here</h3>
          <div className="darkmode-button">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              /* checked={isDarkMode}
              onChange={toggleTheme} */
            />
            <label htmlFor="checkbox" className="checkbox-label">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className="ball"></span>
            </label>
          </div>
        </div>
      </section>
      {isMenuVisible && <HamburguerMenu setMenuVisible={setMenuVisible} />}
    </>
  );
}

export default Header;
