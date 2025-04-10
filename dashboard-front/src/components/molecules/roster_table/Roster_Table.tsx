import { useEffect, useState, useRef } from "react";
import { rosterBaseApiURL } from "../../../data/endpoints/api_endpoints";
import { Roster } from "../../../data/entities_types/types";
import Roster_Footer from "../../atoms/roster_footer/Roster_Footer";
import Roster_Row from "../../atoms/roster_row/Roster_Row";
import { CreateNewRoster } from "../../organism/create_new_roster/CreateNewRoster";
import "./Roster_Table.css";

function Roster_Table() {

	const [rosterList, setRosterList] = useState<Roster[]>([])
	const profileModal = useRef<HTMLDialogElement>(null);
  
	async function fetchData() {
  
		  try {
			  const response = await fetch(rosterBaseApiURL);
			  if (!response.ok) {
				  throw new Error('Network response was not ok ' + response.statusText);
			  }
			  const data: Roster[] = await response.json();
			  setRosterList(data);
		  } catch (error) {
				console.error('There was a problem with the fetch operation:', error);
		  }
	  }
  
	useEffect(() => {
	  fetchData();
	}, []);

	function toggleDialog() {
        if (!profileModal.current) {
            return;
        }
        profileModal.current.hasAttribute("open")
            ? profileModal.current.close()
            : profileModal.current.showModal();
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
        {rosterList.map((member) => (
        	<Roster_Row member={member}/>
        ))}
		<div className='roster_table add__new__member' onClick={() => toggleDialog()}>
			Add New Roster Member
		</div>
      </div>
      <Roster_Footer len={Math.floor(rosterList.length / 10)} selected={1} />
	  <CreateNewRoster toggleDialog={ toggleDialog } ref={ profileModal }/>
    </>
  );
}

export default Roster_Table;
