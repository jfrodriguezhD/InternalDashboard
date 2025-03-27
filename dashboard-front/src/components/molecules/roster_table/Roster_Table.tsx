import Roster_Footer from "../../atoms/roster_footer/Roster_Footer";
import Roster_Row from "../../atoms/roster_row/Roster_Row.tsx";
import "./Roster_Table.css";
import data from "./roster_example.json";

function Roster_Table() {
  console.log(data);
  return (
    <>
      <div className="roster-table">
        <div className="table-header">
          <p className="roster__name__cell">Name</p>
          <p className="roster__cell">Status</p>
          <p className="roster__cell">Level</p>
          <p className="roster__cell">Expertise</p>
          <p className="roster__cell">Capability</p>
          <p className="roster__cell">Project</p>
          <p className="roster__cell">Prospected for</p>
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
      <Roster_Footer len={Math.floor(data.length / 10)} selected={1} />
    </>
  );
}

export default Roster_Table;
