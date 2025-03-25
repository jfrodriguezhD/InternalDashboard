import Control from "./control/Control";
import Header from "./header/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="link__container"></div>
      <Header />
      <main>
        <Control />
        {/* <Prospects_Table /> */}
        <Outlet />
        {/* <Roster_Row_Container /> */}
      </main>
    </>
  );
}

export default App;
