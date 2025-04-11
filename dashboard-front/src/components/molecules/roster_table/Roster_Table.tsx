import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { rosterBaseApiURL } from "../../../data/endpoints/api_endpoints";
import { Roster } from "../../../data/entities_types/types";
import Roster_Footer from "../../atoms/roster_footer/Roster_Footer";
import Roster_Row from "../../atoms/roster_row/Roster_Row";
import { CreateNewRoster } from "../../organism/create_new_roster/CreateNewRoster";
import "./Roster_Table.css";
import RosterView from "../../organism/roster_view/RosterView";
import { SearchContext, SortContext } from "../../../pages/App";

export const SelectedRowContext = createContext<Dispatch<SetStateAction<number>> | undefined>(undefined);

function Roster_Table() {

	const [rosterList, setRosterList] = useState<Roster[]>([])
    const [selectedRow, setSelectedRow] = useState<number>(0);
    const viewRef = useRef<HTMLDialogElement>(null);
	const profileModal = useRef<HTMLDialogElement>(null);
  
	const [ sortList, setSortList ] = useState<Roster[]>([])
	const [ showList, setShowList ] = useState<Roster[]>([])
	const searchContext = useContext(SearchContext);
	const sortContext = useContext(SortContext);
	const search = searchContext?.search;
	const sort = sortContext?.sort;

	async function fetchData() {
		  try {
			  const response = await fetch(rosterBaseApiURL);
			  if (!response.ok) {
				  throw new Error('Network response was not ok ' + response.statusText);
			  }
			  const data: Roster[] = await response.json();
			  setRosterList(data);
			  setSortList(data)
			  setShowList(data)
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
        sortBy(sort ?? "", rosterList, setShowList)
        searchBy(search ?? "", sortList, setShowList)
        if(!sort || sort == "")
            sortBy("modified_time", rosterList, setShowList)
    }, [ rosterList ])
    useEffect(() => {
        searchBy(search ?? "", sortList, setShowList)
    }, [ search ])
    useEffect(() => {
            sortBy(sort ?? "", rosterList, setShowList)
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
			showList.length > 0 ? 
				<RosterView roster={showList[selectedRow]} toggleDialog={toggleView} ref={viewRef} />
				: null
		}

		<SelectedRowContext.Provider value={setSelectedRow}>
			{
				showList.map((member, index) => (
						<Roster_Row member={member} index={index} key={index}/>
					)
				)
			}
		</SelectedRowContext.Provider>
		<div className='roster_table add__new__member' onClick={() => toggleDialog()}>
			Add New Roster Member
		</div>
      </div>
      <Roster_Footer len={Math.floor(showList.length / 10)} selected={1} />
	  <CreateNewRoster toggleDialog={ toggleDialog } ref={ profileModal }/>
    </>
  );
}

export default Roster_Table;
