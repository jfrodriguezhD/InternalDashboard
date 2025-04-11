import { createContext, useEffect, useState } from 'react';
import { Outlet } from "react-router";
import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";
import { Prospects, Roster } from '../data/entities_types/types';

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


interface ProspectShowListContextType{
	prospectShowList:Prospects[];
	setProspectShowList: (list:Prospects[]) => void;
}

interface SelectedRosterContextType{
	selectedRoster:Roster | undefined;
	setSelectedRoster:(roster:Roster) => void;
}


interface RosterShowListContextType{
	rosterShowList:Roster[];
	setRosterShowList: (list:Roster[]) => void;
}

interface SelectedRowContextType{
	selectedRow:number;
	setSelectedRow:(row:number) => void;
}

const SelectedRowContext = createContext<SelectedRowContextType | undefined>(undefined);
const SearchContext = createContext<SearchContextType | null>(null);
const SortContext 	= createContext<SortContextType | null>(null);
const SelectedProspectContext = createContext<SelectedProspectContextType | null>(null);
const ProspectShowListContext = createContext<ProspectShowListContextType | null>(null);
const SelectedRosterContext = createContext<SelectedRosterContextType | null>(null);
const RosterShowListContext = createContext<RosterShowListContextType | null>(null);

function App() {

	const [ tempSearch ] 		= useState(sessionStorage.getItem("search_value"))
	const [ tempSort ] 			= useState(sessionStorage.getItem("sort_value"))
	
	const [ search, setSearch ] = useState<string>("")
	const [ sort, setSort ] 	= useState<string>("")
	const [selectedProspect, setSelectedProspect] = useState<Prospects>();
    const [ prospectShowList, setProspectShowList ] = useState<Prospects[]>([])
	const [selectedRoster, setSelectedRoster] = useState<Roster>();
    const [ rosterShowList, setRosterShowList ] = useState<Roster[]>([])
	const [selectedRow, setSelectedRow] = useState<number>(-1);

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
						<ProspectShowListContext.Provider value={{prospectShowList, setProspectShowList}}>
							<SelectedRowContext.Provider value={{selectedRow,setSelectedRow}}>
								<RosterShowListContext.Provider value={{rosterShowList,setRosterShowList}}>
									<SelectedRosterContext.Provider value={{selectedRoster,setSelectedRoster}}>
										<main className="main">
											<Control />
											<Outlet />
										</main>
									</SelectedRosterContext.Provider>
								</RosterShowListContext.Provider>
							</SelectedRowContext.Provider>
						</ProspectShowListContext.Provider>
					</SelectedProspectContext.Provider>
				</SortContext.Provider>
			</SearchContext.Provider>
		</>
	);
}

export default App;
export { SortContext, SearchContext, SelectedProspectContext, ProspectShowListContext ,SelectedRowContext, RosterShowListContext,SelectedRosterContext }