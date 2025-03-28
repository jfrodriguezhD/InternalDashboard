import Roster_Footer from "../../atoms/roster_footer/Roster_Footer";
import Roster_Row from "../../atoms/roster_row/Roster_Row";
import "./Roster_Table.css"; 
import data from "./roster_example.json";

function Roster_Table() {
	const addMember = () =>{
		console.log("new user");
	}

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
        <div className='roster-member__new' onClick={addMember}>
			<p className='roster__name__cell'>Add new member to Roster...</p>
			<p className="roster__cell"></p>
			<p className="roster__cell"></p>
			<p className="roster__cell"></p>
			<p className="roster__cell"></p>
			<p className="roster__cell"></p>
			<p className="roster__cell"></p>
        </div>
      </div>
      <Roster_Footer len={Math.floor(data.length / 10)} selected={1} />
    </>
  );
}

export default Roster_Table;
