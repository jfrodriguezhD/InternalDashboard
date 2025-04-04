import { ChangeEvent, useEffect, useState } from "react";
import "./Header.css";
import HamburguerMenu from "../hamburguer_menu/HamburguerMenu";

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>();

  const lightTheme = {
    'background':'#FFFFFF',
    'text-color':'black',
    'light-comp':'#ececec',
    'dark-comp':'#dddddd'
  };

  const darkTheme = {
    'background':'#2c2c2c',
    'text-color':'white',
    'light-comp':'#383838',
    'dark-comp':'#242424'
  }

  useEffect(() => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (darkMode != null) {
     setDarkMode(darkMode);
     setThemeVariables(darkMode);
    }
    else{
      setDarkMode(true);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const setThemeVariables = (isDarkMode:boolean) =>{
    const theme = isDarkMode? darkTheme : lightTheme;
    document.documentElement.style.setProperty('--background',theme.background);
    document.documentElement.style.setProperty('--text-color',theme["text-color"]);
    document.documentElement.style.setProperty('--light-comp',theme["light-comp"]);
    document.documentElement.style.setProperty('--dark-comp',theme["dark-comp"]);
  }

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  function toggleTheme(event: ChangeEvent<HTMLInputElement>): void {
    setThemeVariables(event.target.checked);
    setDarkMode(event.target.checked);
  }

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
              checked={darkMode}
              onChange={toggleTheme}
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
