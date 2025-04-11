import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Prospects_Table } from "./components/molecules/prospects_table/Prospects_Table.tsx";
import Roster_Table from "./components/molecules/roster_table/Roster_Table.tsx";
import ProjectView from "./components/organism/project_page/ProjectView.tsx";
import App from "./pages/App.tsx";
import CapabilityView from "./components/organism/capability_view/Capability_View.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Prospects_Table />}></Route>
        <Route path="prospects/:page?" element={<Prospects_Table />}></Route>
        <Route path="roster" element={<Roster_Table />}></Route>
      </Route>
      <Route path="project" element={<ProjectView />}></Route>
      <Route path="capabilities" element={<CapabilityView />} />
    </Routes>
  </BrowserRouter>
);
