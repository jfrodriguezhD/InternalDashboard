import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";
import EditProfileModal from "../components/organism/edit_profile_modal/EditProfileModal";
import { Outlet } from "react-router";
import { useRef } from "react";

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      <EditProfileModal toggleDialog={toggleDialog} ref={dialogRef} />
      <Header />
      <main className="main">
        <Control />
        <Outlet />
      </main>
    </>
  );
}

export default App;
