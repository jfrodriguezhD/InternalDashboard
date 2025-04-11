import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { rosterBaseApiURL } from "../../../data/endpoints/api_endpoints";
import { Roster } from "../../../data/entities_types/types";
import Roster_Footer from "../../atoms/roster_footer/Roster_Footer";
import Roster_Row from "../../atoms/roster_row/Roster_Row";
import { CreateNewRoster } from "../../organism/create_new_roster/CreateNewRoster";
import "./Roster_Table.css";
import RosterView, { RosterContext } from "../../organism/roster_view/RosterView";
import { RosterShowListContext, SearchContext, SelectedRosterContext, SelectedRowContext, SortContext } from "../../../pages/App";

function Roster_Table() {

	const [rosterList, setRosterList] = useState<Roster[]>([])
    const {selectedRow, setSelectedRow} = useContext(SelectedRowContext);
    const viewRef = useRef<HTMLDialogElement>(null);
	const profileModal = useRef<HTMLDialogElement>(null);
  
	const [ sortList, setSortList ] = useState<Roster[]>([])
	const { rosterShowList, setRosterShowList } = useContext(RosterShowListContext);
	const searchContext = useContext(SearchContext);
	const sortContext = useContext(SortContext);
	const selectedRoster = useContext(SelectedRosterContext);

	const search = searchContext?.search;
	const sort = sortContext?.sort;
	
    if(rosterShowList.length > 0 && selectedRow!=-1){
        selectedRoster?.setSelectedRoster(rosterShowList[selectedRow]);
    }


	async function fetchData() {
		  try {
			  const response = await fetch(rosterBaseApiURL);
			  if (!response.ok) {
				  throw new Error('Network response was not ok ' + response.statusText);
			  }
			  const data: Roster[] = await response.json();
			  setRosterList(data);
			  setSortList(data)
			  setRosterShowList(data)
		  } catch (error) {
				console.error('There was a problem with the fetch operation:', error);
		  }
	  }
  
	  function sortBy(
		sort_type: string, og_list: Roster[], setOG: (arg: Roster[]) => void) {
		switch (sort_type) {
			case "Name": {
				const tempArr = [...og_list].sort((a, b) => {
					if (a.name < b.name) {
					return -1;
					}
					if (a.name > b.name) {
					return 1;
					}
					return 0;
				})
				setSortList(tempArr)
				setOG(tempArr)
			}
			break;
			case "Capabilities": {
				const tempArr = [...og_list].sort((a, b) => {
					if (a.capabilities < b.capabilities) {
					return -1;
					}
					if (a.capabilities > b.capabilities) {
					return 1;
					}
					return 0;
				})
				setSortList(tempArr)
				setOG(tempArr)
			}
			break;
			case "Project": {
				const tempArr = [...og_list].sort((a, b) => {
					if(!a.project || !b.project){
						return 0
					}
					if (a.project.name < b.project.name) {
					return -1;
					}
					if (a.project.name > b.project.name) {
					return 1;
					}
					return 0;
				})
				setSortList(tempArr)
				setOG(tempArr)
			}
			break;
			case "modified_time": {
				const tempArr = [...og_list].sort((a, b) => {
					if(!a.lastModified || !b.lastModified){
						return 0
					}
					if (a.lastModified > b.lastModified) {
					return -1;
					}
					if (a.lastModified < b.lastModified) {
					return 1;
					}
					return 0;
				})
				setSortList(tempArr)
				setOG(tempArr)
			}
			break;
			default:
				setSortList(og_list)
				setOG(og_list)
			break;
		}
	}
	
	function searchBy(search_string: string, og_list: Roster[], setOG: (arg: Roster[]) => void){
		const tempArr = [...og_list].filter((a) => {
			if(!a.name || !a.last_name)
				return
			return (a.name.toLowerCase() + a.last_name.toLowerCase()).includes(search_string.toLowerCase())
		})
		setOG(tempArr)
	}

	useEffect(() => {
	  fetchData();
	}, []);

	useEffect(() => {
        sortBy(sort ?? "", rosterList, setRosterShowList)
        searchBy(search ?? "", sortList, setRosterShowList)
        if(!sort || sort == "")
            sortBy("modified_time", rosterList, setRosterShowList)
    }, [ rosterList ])
    useEffect(() => {
        searchBy(search ?? "", sortList, setRosterShowList)
    }, [ search ])
    useEffect(() => {
            sortBy(sort ?? "", rosterList, setRosterShowList)
    }, [ sort ])

	function toggleDialog() {
        if (!profileModal.current) {
            return;
        }
        profileModal.current.hasAttribute("open")
            ? profileModal.current.close()
            : profileModal.current.showModal();
    }

	function toggleView() {
        if (!viewRef.current) {
            return;
        }
        viewRef.current.hasAttribute("open")
            ? viewRef.current.close()
            : viewRef.current.showModal();
    }

	if(rosterShowList.length>0 && selectedRow>=rosterShowList.length){
		setSelectedRow(-1);
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
		{
			rosterShowList.length > 0 ? 
				<RosterView roster={rosterShowList[selectedRow!=-1?selectedRow:0]} toggleDialog={toggleView} ref={viewRef} />
				: null
		}
		{
			rosterShowList.map((member, index) => (
					<Roster_Row member={member} index={index} key={index}/>
				)
			)
		}
		<div className='roster_table add__new__member' onClick={() => toggleDialog()}>
			Add New Roster Member
		</div>
      </div>
      <Roster_Footer len={Math.floor(rosterShowList.length / 10)} selected={1} />
	  <CreateNewRoster toggleDialog={ toggleDialog } ref={ profileModal }/>
    </>
  );
}

export default Roster_Table;
