import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Prospects_Table } from "./components/molecules/Prospects_Table/Prospects_Table.tsx";
import { Personal_Info_Edit } from "./components/molecules/personal_info/personal_info.tsx";
import Roster_Table from "./components/molecules/roster_table/Roster_Table.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Prospects_Table />}></Route>
        <Route path="prospects" element={<Prospects_Table />}></Route>
        <Route path="roster" element={<Roster_Table />}></Route>
        <Route path="personal_info" element={<Personal_Info_Edit />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
