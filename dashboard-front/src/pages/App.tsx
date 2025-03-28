import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";
import { Outlet } from "react-router";
import { useRef } from "react";
import ProspectView from "../components/organism/prospect_view_menu/ProspectView";

function App() {
  const viewRef = useRef<HTMLDialogElement>(null);

  function toggleView() {
    if (!viewRef.current) {
      return;
    }
    viewRef.current.hasAttribute("open")
      ? viewRef.current.close()
      : viewRef.current.showModal();
  }

  return (
    <>
      <ProspectView toggleDialog={toggleView} ref={viewRef} />
      <Header />
      <main className="main">
        <Control />
        <Outlet />
      </main>
    </>
  );
}

export default App;
