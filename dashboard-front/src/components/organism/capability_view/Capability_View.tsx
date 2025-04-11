import Header from "../../molecules/header/Header";
import Capability_Form from "../../molecules/capability_form/Capability_Form";
import Capability_Table from "../../molecules/capability_table/Capability_Table";
import "./Capability_View.css";
import { useState } from "react";

const Capability_View = () => {
  const [isRemoveActive, setIsRemoveActive] = useState(false);
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="capabilities-header">Capabilities Management</h1>
        <Capability_Form setIsRemoveActive={setIsRemoveActive} />
        <Capability_Table isRemoveActive={isRemoveActive} />
      </main>
    </>
  );
};

export default Capability_View;
