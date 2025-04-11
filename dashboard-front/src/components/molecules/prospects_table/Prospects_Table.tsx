import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { prospectBaseApiURL } from "../../../data/endpoints/api_endpoints.ts";
import { PAGE_LIMIT } from "../../../data/general_variables/important_figures.ts";
import { SearchContext, SelectedProspectContext, SelectedRowContext, ProspectShowListContext, SortContext } from "../../../pages/App.tsx";
import { Prospects, Prospects_Row } from "../../atoms/prospect_row/Prospect_Row.tsx";
import { Prospects_Footer_Page_Marker } from "../../atoms/prospects_footer_page_marker/Prospects_Footer_Page_Marker.tsx";
import { CreateNewProspect } from "../../organism/create_new_prospect/CreateNewProspect.tsx";
import ProspectView from "../../organism/prospect_view_menu/ProspectView.tsx";
import "./Prospects_Table.css";

function Prospects_Table() {

    const {selectedRow, setSelectedRow} = useContext(SelectedRowContext);
    const [pageNumber, setPageNumber] = useState(1);
    const { page } = useParams();

    const [ list, setList ] = useState<Prospects[]>([])
    const [ sortList, setSortList ] = useState<Prospects[]>([])
    const [ searchList, setSearchList ] = useState<Prospects[]>([])
    //const [ showList, setShowList ] = useState<Prospects[]>([])

    const profileModal = useRef<HTMLDialogElement>(null);
    const viewRef = useRef<HTMLDialogElement>(null);

    const searchContext = useContext(SearchContext);
  	const sortContext = useContext(SortContext);
    const prospectContext = useContext(SelectedProspectContext);
    const showListContext = useContext(ProspectShowListContext);

	const search = searchContext?.search;
	const sort = sortContext?.sort;
    const {prospectShowList, setProspectShowList} = showListContext;

    if(prospectShowList.length > 0 && selectedRow!=-1){
        prospectContext?.setSelectedProspect(prospectShowList[selectedRow]);
    }

    function toggleView() {
        if (!viewRef.current) {
            return;
        }
        viewRef.current.hasAttribute("open")
            ? viewRef.current.close()
            : viewRef.current.showModal();
    }

    function updatePageQuantity() {
        if(page){
            setPageNumber(parseInt(page))
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(prospectBaseApiURL);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data: Prospects[] = await response.json();
            setList(data)
            setProspectShowList(data)
            setSortList(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function toggleDialog() {
        if (!profileModal.current) {
            return;
        }
        profileModal.current.hasAttribute("open")
            ? profileModal.current.close()
            : profileModal.current.showModal();
    }

    function sortBy(
        sort_type: string, og_list: Prospects[], setOG: (arg: Prospects[]) => void) {
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
                let tempArr = [...og_list].filter((a) => {
                    return a.capabilities.length >= 1
                })
                tempArr = [...tempArr].sort((a, b) => {
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
                let tempArr = [...og_list].filter((a) => {
                    return a.projects.length >= 1
                })
                tempArr = [...tempArr].sort((a, b) => {
                    let tempA = a.projects[0].name
                    let tempB = b.projects[0].name
                    if (tempA < tempB) 
                        return -1;
                    if (tempA > tempB)
                        return 1;
                    return 0
                })
                setSortList(tempArr)
                setOG(tempArr)
            }
            break;
            case "Active": {
                const tempArr = [...og_list].filter((a) => {
                    return a.status[0] == "ACTIVE"
                })
                setSortList(tempArr)
                setOG(tempArr)
            }
            break;
            case "Hired": {
                const tempArr = [...og_list].filter((a) => {
                    return a.status[0] == "HIRED"
                })
                setSortList(tempArr)
                setOG(tempArr)
            }
            break;
            case "Not In Process": {
                const tempArr = [...og_list].filter((a) => {
                    return a.status[0] == "NOT_IN_PROCESS"
                })
                setSortList(tempArr)
                setOG(tempArr)
            }
            break;
            case "Discarted": {
                const tempArr = [...og_list].filter((a) => {
                    return a.status[0] == "DISCARTED"
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

    function searchBy(search_string: string, og_list: Prospects[], setOG: (arg: Prospects[]) => void){
        const tempArr = [...og_list].filter((a) => {
            if(!a.name || !a.last_name)
                return
            return (a.name.toLowerCase() + a.last_name.toLowerCase()).includes(search_string.toLowerCase())
        })
        setOG(tempArr)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        sortBy(sort ?? "", list, setProspectShowList)
        searchBy(search ?? "", sortList, setProspectShowList)
        if(!sort || sort == "")
            sortBy("modified_time", list, setProspectShowList)
    }, [ list ])
    useEffect(() => {
        searchBy(search ?? "", sortList, setProspectShowList)
    }, [ search ])
    useEffect(() => {
            sortBy(sort ?? "", list, setProspectShowList)
    }, [ sort ])

    useEffect(() => {
      updatePageQuantity()
    }, [ page ])

    
	if(prospectShowList.length>0 && selectedRow>=prospectShowList.length){
		setSelectedRow(-1);
	}


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
            {
            prospectShowList.length > 0 ? 
                <ProspectView prospect={selectedRow!=-1?prospectShowList[selectedRow]:prospectShowList[0]} toggleDialog={toggleView} ref={viewRef} />
                : null
            }
            {
                prospectShowList.map((data, index) => {
                        if (index < (PAGE_LIMIT * pageNumber) && index >= ((PAGE_LIMIT * pageNumber) - PAGE_LIMIT)) {
                            return <Prospects_Row data={data} key={index} index={index} classname={"content"}/>
                        }
                    } 
                )
            }
            <div className='prospects__row add__new__prospect' onClick={() => toggleDialog()}>
                Add New Prospect
            </div>
        </div>
        <div className="prospects__table__footer">
            <div className="prospects__table__footer__page__number__marker">
            <Prospects_Footer_Page_Marker data={prospectShowList.length} />
            </div>
            <CreateNewProspect toggleDialog={ toggleDialog } ref={ profileModal }/>
        </div>
        </div>
  );
}

export { Prospects_Table };
