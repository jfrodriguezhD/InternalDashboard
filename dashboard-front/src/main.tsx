import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Prospects_Table } from "./components/molecules/Prospects_Table/Prospects_Table.tsx";
import Roster_Row_Container from "./components/molecules/Roster_Row_Container/Roster_Row_Container.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Prospects_Table />}></Route>
        <Route path="prospects" element={<Prospects_Table />}></Route>
        <Route path="roster" element={<Roster_Row_Container />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
