import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Prospects_Table } from "./prospects_table/Prospects_Table.tsx";
import Roster_Row_Container from "./roster_row_container/Roster_Row_Container.tsx";

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
