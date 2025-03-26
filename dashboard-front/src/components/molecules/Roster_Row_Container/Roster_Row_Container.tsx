import Roster_Footer from "../../atoms/Roster_Footer/Roster_Footer";
import Roster_Row from "../../atoms/Roster_Row/Roster_Row.tsx";
import "./Roster_Row_Container.css";
import data from "./roster_example.json";

function Roster_Row_Container() {
  console.log(data);
  return (
    <>
      <div className="roster-table">
        <div className="table-header">
          <p className="name">Name</p>
          <p>Status</p>
          <p>Level</p>
          <p>Expertise</p>
          <p>Capability</p>
          <p>Project</p>
          <p>Prospected for</p>
        </div>
        {data.map((member) => (
          <Roster_Row
            id={member.id}
            firstName={member.firstname}
            lastName={member.lastname}
            status={member.status}
            level={member.seniority}
            expertise={member.job_title}
            capability={member.capability}
            project={member.project}
            prospectedFor={member.prospected_for}
          />
        ))}
      </div>
      <Roster_Footer tables={Math.floor(data.length / 20)} />
    </>
  );
}

export default Roster_Row_Container;
