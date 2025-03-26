import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="link__container"></div>
      <Header />
      <main>
        <Control />
        <Outlet />
      </main>
    </>
  );
}

export default App;
