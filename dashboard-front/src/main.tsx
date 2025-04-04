import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Prospects_Table } from "./components/molecules/prospects_table/Prospects_Table.tsx";
import Roster_Table from "./components/molecules/roster_table/Roster_Table.tsx";
import App from "./pages/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Prospects_Table />}></Route>
        <Route path="prospects/:page?" element={<Prospects_Table />}></Route>
        <Route path="roster" element={<Roster_Table />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
