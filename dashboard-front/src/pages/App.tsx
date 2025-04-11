import { createContext, useEffect, useState } from 'react';
import { Outlet } from "react-router";
import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";
import { Prospects } from '../data/entities_types/types';

interface SearchContextType {
	search: string;
	setSearch: (search: string) => void;
}

interface SortContextType {
	sort: string;
	setSort: (search: string) => void;
}

interface SelectedProspectContextType{
	selectedProspect:Prospects | undefined;
	setSelectedProspect:(prospect:Prospects) => void;
}


interface ShowListContextType{
	showList:Prospects[];
	setShowList: (list:Prospects[]) => void;
}

interface SelectedRowContextType{
	selectedRow:number;
	setSelectedRow:(row:number) => void;
}

const SelectedRowContext = createContext<SelectedRowContextType | undefined>(undefined);
const SearchContext = createContext<SearchContextType | null>(null);
const SortContext 	= createContext<SortContextType | null>(null);
const SelectedProspectContext = createContext<SelectedProspectContextType | null>(null);
const ShowListContext = createContext<ShowListContextType | null>(null);

function App() {

	const [ tempSearch ] 		= useState(sessionStorage.getItem("search_value"))
	const [ tempSort ] 			= useState(sessionStorage.getItem("sort_value"))
	
	const [ search, setSearch ] = useState<string>("")
	const [ sort, setSort ] 	= useState<string>("")
	const [selectedProspect, setSelectedProspect] = useState<Prospects>();
    const [ showList, setShowList ] = useState<Prospects[]>([])
	const [selectedRow, setSelectedRow] = useState<number>(-1);

	console.log(showList);

	useEffect(() => {
		tempSearch ? setSearch(tempSearch) : setSearch("")
	}, [tempSearch])
	useEffect(() => {
		tempSort ? setSort(tempSort) : setSort("")
	}, [tempSort])

	return (
		<>
			<Header />
			<SearchContext.Provider 	value={ { search, setSearch } }>
				<SortContext.Provider 	value={ { sort, setSort } }>
					<SelectedProspectContext.Provider value={{selectedProspect,setSelectedProspect}}>
						<ShowListContext.Provider value={{showList,setShowList}}>
							<SelectedRowContext.Provider value={{selectedRow,setSelectedRow}}>
								<main className="main">
									<Control />
									<Outlet />
								</main>
							</SelectedRowContext.Provider>
						</ShowListContext.Provider>
					</SelectedProspectContext.Provider>
				</SortContext.Provider>
			</SearchContext.Provider>
		</>
	);
}

export default App;
export { SortContext, SearchContext, SelectedProspectContext, ShowListContext,SelectedRowContext }