import { useState, useEffect, useRef } from "react";
import { Prospects, Prospects_Row } from "../../atoms/Prospect_Row/Prospect_Row.tsx";
import { Prospects_Footer_Page_Marker } from "../../atoms/Prospects_Footer_Page_Marker/Prospects_Footer_Page_Marker.tsx";
import "./Prospects_Table.css";
import { CreateNewProspect } from "../../organism/create_new_prospect/CreateNewProspect.tsx";

const prospectBaseApiURL = "http://localhost:8080/api/v1/prospect"
//const prospectBaseApiURL = "http://backend:80/api/v1/prospect"

function Prospects_Table() {

	const [list, setList] = useState<Prospects[]>([])

	async function fetchData() {
		try {
			const response = await fetch(prospectBaseApiURL);
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			const data: Prospects[] = await response.json();
			setList(data);
		} catch (error) {
		  	console.error('There was a problem with the fetch operation:', error);
		}
	}

	const profileModal = useRef<HTMLDialogElement>(null);

	function toggleDialog() {
		if (!profileModal.current) {
		  return;
		}
		profileModal.current.hasAttribute("open")
		  ? profileModal.current.close()
		  : profileModal.current.showModal();
	  }

	useEffect(() => {
		fetchData();
	  }, []);

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
		<div className='prospects__row add__new__prospect' onClick={() => toggleDialog()}>
			Add New Prospect
		</div>
      </div>
      <div className="prospects__table__footer">
        <div className="prospects__table__footer__page__number__marker">
          <Prospects_Footer_Page_Marker data={list.length} />
        </div>
		<CreateNewProspect toggleDialog={toggleDialog} ref={ profileModal }/>
      </div>
    </div>
  );
}

export { Prospects_Table };
