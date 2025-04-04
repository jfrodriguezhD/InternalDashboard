import { Link } from "react-router-dom";
import "./HamburguerMenu.css";

interface HamburguerMenuProps {
  setMenuVisible: (visible: boolean) => void;
}

function HamburguerMenu({ setMenuVisible }: HamburguerMenuProps) {
  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  const handleCloseClick = () => {
    setMenuVisible(false);
  };

  return (
    <div className="modal-backdrop" onClick={handleCloseClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <section className="user-information">
          <h2>User name</h2>
          <h3>User Role</h3>
        </section>
        <section className="shortcuts">
          <nav>
            <ul className="menu-links">
              <Link to="/prospects" onClick={handleLinkClick}>
                <li className="nav-link">
                  <div className="nav-element">
                    <p className="material-symbols-outlined ham-icon">groups</p>
                    <p className="nav-text">Prospects Management</p>
                  </div>
                </li>
              </Link>
              <Link to="/roster" onClick={handleLinkClick}>
                <li className="nav-link">
                  <div className="nav-element">
                    <p className="material-symbols-outlined ham-icon">
                      engineering
                    </p>
                    <p className="nav-text">Roster Management</p>
                  </div>
                </li>
              </Link>
              <Link to="/projects" onClick={handleLinkClick}>
                <li className="nav-link">
                  <div className="nav-element">
                    <p className="material-symbols-outlined ham-icon">
                      library_books
                    </p>
                    <p className="nav-text">Projects</p>
                  </div>
                </li>
              </Link>
              <Link to="/capabilities" onClick={handleLinkClick}>
                <li className="nav-link">
                  <div className="nav-element">
                    <p className="material-symbols-outlined ham-icon">
                      format_list_bulleted
                    </p>
                    <p className="nav-text">Capabilities</p>
                  </div>
                </li>
              </Link>
              <Link to="/logout" onClick={handleLinkClick}>
                <li className="nav-link logout">
                  <div className="nav-element">
                    <p className="material-symbols-outlined ham-icon">logout</p>
                    <p className="nav-text">Logout</p>
                  </div>
                </li>
              </Link>
            </ul>
          </nav>
        </section>
      </div>
    </div>
  );
}

export default HamburguerMenu;
