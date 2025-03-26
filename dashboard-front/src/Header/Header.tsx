import "./Header.css";

function Header() {
  return (
    <>
      <section className="main-header-container">
        <div className="header-left">
          <span className="material-symbols-outlined menu-icon">menu</span>
          <h1 className="header-title">Dashboard</h1>
        </div>
        <div className="header-user-name">
          <h3>User Name goes here</h3>
          <button>Darkmode</button>
        </div>
      </section>
    </>
  );
}

export default Header;
