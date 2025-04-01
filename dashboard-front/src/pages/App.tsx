import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Control />
        <Outlet />
      </main>
    </>
  );
}

export default App;
