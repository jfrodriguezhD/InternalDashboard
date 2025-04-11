import "./Control.css";
import { outputs, filters, tools } from "../../../data/control/control_data";
import { SearchContext, SelectedProspectContext, SelectedRowContext, ShowListContext, SortContext } from "../../../pages/App";
import { useContext, useEffect, useState } from "react";
import ToolButton from "../../atoms/toolbutton/ToolButton";
import WordBubble from "../../atoms/wordbubble/WordBubble";
import { prospectBaseApiURL } from "../../../data/endpoints/api_endpoints";

export default function Control() {

	const [ prospectPinList, setProspectPinList ] = useState<number[]>();

	const searchContext = useContext(SearchContext);
  	const sortContext 	= useContext(SortContext);
	const showListContext = useContext(ShowListContext);
	const selectedProspectContext = useContext(SelectedProspectContext);
	const selectedRowContext = useContext(SelectedRowContext);

	const { search, setSearch } = searchContext;
	const { sort, setSort } = sortContext;
	const { showList, setShowList } = showListContext;
	const { selectedProspect, setSelectedProspect } = selectedProspectContext;
	const {selectedRow, setSelectedRow} = selectedRowContext;

	useEffect(() => {
		const storedPinList = localStorage.getItem('pinned-prospects')
		const pinList = storedPinList? JSON.parse(storedPinList) : [];
		setProspectPinList(pinList);	
		setShowList([
			...showList.filter(obj => prospectPinList?.includes(obj.id))
			.sort((a,b) => prospectPinList?.indexOf(a.id) - prospectPinList?.indexOf(b.id)),
			...showList.filter(obj => !prospectPinList?.includes(obj.id))
		])
		console.log(showList);
		console.log(pinList)
			
		setShowList([
			...showList.filter(obj => prospectPinList?.includes(obj.id))
			.sort((a,b) => prospectPinList?.indexOf(a.id) - prospectPinList?.indexOf(b.id)),
			...showList.filter(obj => !prospectPinList?.includes(obj.id))
		]);
	  }, []);
	  
	useEffect(() => {
		localStorage.setItem('pinned-prospects', JSON.stringify(prospectPinList));
		setShowList([
			...showList.filter(obj => prospectPinList?.includes(obj.id))
			.sort((a,b) => prospectPinList?.indexOf(a.id) - prospectPinList?.indexOf(b.id)),
			...showList.filter(obj => !prospectPinList?.includes(obj.id))
		]);
	  }, [prospectPinList]);

	const archiveProspect = () => {
		selectedProspect.status = ["ARCHIVED"];
	
		const modifyURL = `${prospectBaseApiURL}/${selectedProspect.id}`;
	
		fetch(modifyURL, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(selectedProspect),
		})
		  .then((response) => response.json())
		  .then((data) =>
			alert("Profile successfully updated: " + JSON.stringify(data))
		  );
		location.reload();
	}

	const pinProspect = () => {
		if(prospectPinList?.includes(selectedProspect.id)){
			setProspectPinList(prospectPinList.filter(item => item !== selectedProspect.id));
		}
		else{
			setProspectPinList([selectedProspect.id,...prospectPinList]);
			setSelectedRow(0);
		}
	}
	
	const handleToolBtnClick = (e: MouseEvent, toolType:string) =>{
		switch (toolType){
		  case tools[0].word:
			e?.preventDefault();
			showModal();
			break;
		  case tools[1].word:
			e?.preventDefault();
			archiveProspect();
			break;
		  case tools[2].word:
			pinProspect();
			break;
		}
	  }
	
	const showModal = () => {
		const modal = document.querySelector(
		  ".prospect-modal-view"
		) as HTMLDialogElement;
		modal!.showModal();
	};

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
