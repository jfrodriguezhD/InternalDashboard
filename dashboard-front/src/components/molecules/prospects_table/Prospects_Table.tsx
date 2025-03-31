import { useState, useEffect, useRef, useContext, createContext, ReactNode, SetStateAction, Dispatch } from "react";
import { Prospects, Prospects_Row } from "../../atoms/prospect_row/Prospect_Row.tsx";
import { Prospects_Footer_Page_Marker } from "../../atoms/prospects_footer_page_marker/Prospects_Footer_Page_Marker.tsx";
import "./Prospects_Table.css";
import { CreateNewProspect } from "../../organism/create_new_prospect/CreateNewProspect.tsx";
import ProspectView from "../../organism/prospect_view_menu/ProspectView.tsx";

const prospectBaseApiURL = "http://localhost:8080/api/v1/prospect"
//const prospectBaseApiURL = "http://backend:80/api/v1/prospect"


export const SelectedRowContext = createContext<Dispatch<SetStateAction<number>> | undefined>(undefined);

function Prospects_Table() {

  const [selectedRow,setSelectedRow] = useState<number>(0);
  
  const viewRef = useRef<HTMLDialogElement>(null);
  

	function toggleView() {
		if (!viewRef.current) {
		return;
	}
	viewRef.current.hasAttribute("open")
	  ? viewRef.current.close()
	  : viewRef.current.showModal();
  	}

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
        {list.length>0?<ProspectView prospect={list[selectedRow]} toggleDialog={toggleView} ref={viewRef} />:null}
        <SelectedRowContext.Provider value={setSelectedRow}>
        {list.map((data, index) => {
          return <Prospects_Row data={data} key={index} index={index}/>;
        })}
        </SelectedRowContext.Provider>
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
