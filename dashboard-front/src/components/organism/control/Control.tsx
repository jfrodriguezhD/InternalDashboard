import "./Control.css";
import { outputs, filters, tools } from "../../../data/control/control_data";
import { SearchContext, SortContext } from "../../../pages/App";
import { useContext } from "react";
import ToolButton from "../../atoms/toolbutton/ToolButton";
import WordBubble from "../../atoms/wordbubble/WordBubble";

export default function Control() {

	const searchContext = useContext(SearchContext);
  	const sortContext = useContext(SortContext);

	const { search, setSearch } = searchContext;
	const { sort, setSort } = sortContext;

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		console.log(search)
	};

	const handleSortChange = (filter: string) => {
		setSort(filter)
		console.log(sort)
	};

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
			</div>
		</section>
		<section className="control__tools">
			{tools.map((tool, index) => {
			return <ToolButton word={tool.word} group="tools" icon={tool.icon} key={index}/>;
			})}
		</section>
		</div>
	);
}
