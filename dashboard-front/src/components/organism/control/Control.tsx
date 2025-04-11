import "./Control.css";
import { outputs, filters, tools } from "../../../data/control/control_data";
import { SearchContext, SelectedProspectContext, SelectedRowContext, ProspectShowListContext, SortContext, SelectedRosterContext, RosterShowListContext } from "../../../pages/App";
import { useContext, useEffect, useState } from "react";
import ToolButton from "../../atoms/toolbutton/ToolButton";
import WordBubble from "../../atoms/wordbubble/WordBubble";
import { prospectBaseApiURL, rosterBaseApiURL } from "../../../data/endpoints/api_endpoints";
import { useLocation } from "react-router-dom";

export default function Control() {

	const [ prospectPinList, setProspectPinList ] = useState<number[]>([]);
	const [ rosterPinList, setRosterPinList ] = useState<number[]>([]);

	const searchContext = useContext(SearchContext);
  	const sortContext 	= useContext(SortContext);
	const prospectShowListContext = useContext(ProspectShowListContext);
	const rosterShowListContext = useContext(RosterShowListContext);
	const selectedProspectContext = useContext(SelectedProspectContext);
	const selectedRosterContext = useContext(SelectedRosterContext);
	const selectedRowContext = useContext(SelectedRowContext);

	const { search, setSearch } = searchContext;
	const { sort, setSort } = sortContext;
	const { prospectShowList, setProspectShowList } = prospectShowListContext;
	const { rosterShowList, setRosterShowList } = rosterShowListContext;
	const { selectedProspect, setSelectedProspect } = selectedProspectContext;
	const { selectedRoster, setSelectedRoster } = selectedRosterContext;
	const {selectedRow, setSelectedRow} = selectedRowContext;

	const path = useLocation().pathname;
	const page = path.split("/")[1];

	console.log(page);

	if(page=="roster"){
		console.log("kpe")
	}

	const showEditModal = () => {
		const modal = document.querySelector(
		  page=="roster"?".roster-modal-view":".prospect-modal-view"
		) as HTMLDialogElement;
		modal!.showModal();
	};

	const archive = () => {
		if(page=="roster"){
			selectedRoster.status = ["ARCHIVED"];
		}
		else{
			selectedProspect.status = ["ARCHIVED"];
		}
	
		const modifyURL = page=="roster"?`${rosterBaseApiURL}/${selectedRoster.id}`:`${prospectBaseApiURL}/${selectedProspect.id}`;
	
		fetch(modifyURL, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(page=="roster"?selectedRoster:selectedProspect),
		})
		  .then((response) => response.json())
		  .then((data) =>
			alert("Profile successfully updated: " + JSON.stringify(data))
		  );
		location.reload();
	}

	const pin = () => {
		if(page=="roster"){
			if(rosterPinList?.includes(selectedRoster.id)){
				setRosterPinList(rosterPinList.filter(item => item !== selectedRoster.id));
			}
			else{
				setRosterPinList([selectedRoster.id,...rosterPinList]);
			}
		}
		else{
			if(prospectPinList?.includes(selectedProspect.id)){
				setProspectPinList(prospectPinList.filter(item => item !== selectedProspect.id));
			}
			else{
				setProspectPinList([selectedProspect.id,...prospectPinList]);
			}
		}
		setSelectedRow(-1);
	}
	
	const handleToolBtnClick = (e: MouseEvent, toolType:string) =>{
		e?.preventDefault();
		switch (toolType){
			case tools[0].word:
				showEditModal();
				break;
		  	case tools[1].word:
				archive();
				break;
		  	case tools[2].word:
				pin();
				break;
		}
	}
	
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	};

	const handleSortChange = (filter: string) => {
		setSort(filter)
	};

	useEffect(() => {
		sessionStorage.setItem("sort_value", sort);
	}, [sort])
	useEffect(() => {
		sessionStorage.setItem("search_value", search);
	}, [search])


	useEffect(() => {
		const storedPinList = localStorage.getItem('pinned-prospects')
		const pinList = storedPinList? JSON.parse(storedPinList) : [];
		setProspectPinList(pinList);	
	  }, []);
	  
	useEffect(() => {
		localStorage.setItem('pinned-prospects', JSON.stringify(prospectPinList));
	  }, [prospectPinList]);

	useEffect(()=>{
		page!="roster"?setProspectShowList([
			...prospectShowList.filter(obj => prospectPinList?.includes(obj.id))
			.sort((a,b) => prospectPinList?.indexOf(a.id) - prospectPinList?.indexOf(b.id)),
			...prospectShowList.filter(obj => !prospectPinList?.includes(obj.id))
		]):null;	
	},[prospectShowList[0],prospectPinList]);


	useEffect(() => {
		const storedPinList = localStorage.getItem('pinned-roster')
		const pinList = storedPinList? JSON.parse(storedPinList) : [];
		setRosterPinList(pinList);	
	  }, []);
	  
	useEffect(() => {
		localStorage.setItem('pinned-roster', JSON.stringify(rosterPinList));
	  }, [rosterPinList]);

	useEffect(()=>{
		page=="roster"?setRosterShowList([
			...rosterShowList.filter(obj => rosterPinList?.includes(obj.id))
			.sort((a,b) => rosterPinList?.indexOf(a.id) - rosterPinList?.indexOf(b.id)),
			...rosterShowList.filter(obj => !rosterPinList?.includes(obj.id))
		]):null;	
	},[rosterShowList[0],rosterPinList]);

	return (
		<div className="control">
		<section className="control__heading">
			<h2>Prospects/Roster</h2>
			<p className="control__heading__total">x in total</p>
		</section>
		<section className="control__output">
			{outputs.map((output, index) => {
			return <WordBubble word={output} group="output" type="radio" key={index}/>;
			})}
		</section>
		<section className="control__grid">
			<p>Search prospects:</p>
			<p>Sort by:</p>
			<input
				className="control__grid__search"
				type="text"
				placeholder="Search by Name"
				onInput={handleSearchChange}
				value={search}
			></input>

			<div className="control__grid__filters">
				{filters.map((filter, index) => {
					return <WordBubble 
						word={filter} 
						group="filters" 
						type="radio" 
						handleInput={() => handleSortChange(filter)}
						key={index}
					/>
				})}
					<WordBubble 
						word="Reset" 
						group="filters" 
						type="radio" 
						handleInput={() => handleSortChange("reset")}
					/>
			</div>
		</section>
		<section className={`control__tools ${selectedRow==-1?"hidden":""}`}>
			{tools.map((tool, index) => {
			return <ToolButton 
							word={tool.word}
							group="tools" icon={tool.icon}
							key={index}
							handleClick={()=> handleToolBtnClick(event,tool.word)}/>;
			})}
		</section>
		</div>
	);
}
