import { Link } from "react-router-dom";
import "./HamburguerMenu.css";

interface HamburguerMenuProps {
  setMenuVisible: (visible: boolean) => void;
}

function HamburguerMenu({ setMenuVisible }: HamburguerMenuProps) {
  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  return (
    <div className="main-ham-menu-container">
      <section className="user-information">
        <h2>User name</h2>
        <h3>User Role</h3>
      </section>
      <section className="shortcuts">
        <nav>
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/roster" onClick={handleLinkClick}>
                <span className="material-symbols-outlined">engineering</span>
                <span className="nav-text">Roster Management</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/prospects" onClick={handleLinkClick}>
                <span className="material-symbols-outlined">groups</span>
                <span className="nav-text">Prospects Management</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/projects" onClick={handleLinkClick}>
                <span className="material-symbols-outlined">library_books</span>
                <span className="nav-text">Projects</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/capabilities" onClick={handleLinkClick}>
                <span className="material-symbols-outlined">
                  format_list_bulleted
                </span>
                <span className="nav-text">Capabilities</span>
              </Link>
            </li>
            <li className="nav-link logout">
              <Link to="/logout" onClick={handleLinkClick}>
                <span className="material-symbols-outlined">logout</span>
                <span className="nav-text">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default HamburguerMenu;
