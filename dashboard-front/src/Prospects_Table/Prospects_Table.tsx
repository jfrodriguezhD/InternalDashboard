import "./Prospects_Table.css";
import { Prospects_Row, Data } from "../prospect_Row/Prospect_Row.tsx";
import { Prospects_Footer_Page_Marker } from "../prospects_footer_page_marker/Prospects_Footer_Page_Marker.tsx";

const one: Data = {
  name: "Leonel Gonzalez Valencia",
  status: "Active",
  level: "Senior",
  expertise: "Fullstack Developer",
  capability: "Java",
  prospected_for: "Amazon",
};
const two: Data = {
  name: "Jose Alfredo Gutierrez",
  status: "Discarted",
  level: "Consultant",
  expertise: "Frontend Developer",
  capability: "HTML",
  prospected_for: "Youtube",
};
const three: Data = {
  name: "Leonel Gonzalez Valencia",
  status: "Paused",
  level: "Senior",
  expertise: "Fullstack Developer",
  capability: "Java",
  prospected_for: "Kaiser",
};
const four: Data = {
  name: "Leonel Gonzalez Valencia",
  status: "Hired",
  level: "Senior",
  expertise: "Fullstack Developer",
  capability: "Java",
  prospected_for: "None",
};

const list = [one, two, three, four];

function Prospects_Table() {
  return (
    <div className="prospects__table">
      <div className="prospects__table__header">
        <div>Name</div>
        <div>Status</div>
        <div>Level</div>
        <div>Expertise</div>
        <div>Capability</div>
        <div>Prospected For</div>
      </div>
      <div className="prospects__table__row__container">
        {list.map((data, index) => {
          return <Prospects_Row data={data} key={index} />;
        })}
      </div>
      <div className="prospects__table__footer">
        <div className="prospects__table__footer__page__number__marker">
          <Prospects_Footer_Page_Marker data={list.length} />
        </div>
      </div>
    </div>
  );
}

export { Prospects_Table };
