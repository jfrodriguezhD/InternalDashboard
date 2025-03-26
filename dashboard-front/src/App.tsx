import Control from "./control/Control";
import Header from "./Header/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="link__container"></div>
      <Header />
      <main className="main">
        <Control />
        <Outlet />
      </main>
    </>
  );
}

export default App;
