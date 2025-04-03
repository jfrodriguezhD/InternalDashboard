import { createContext, useState } from 'react';
import { Outlet } from "react-router";
import Control from "../components/organism/control/Control";
import Header from "../components/molecules/header/Header";

interface SearchContextType {
	search: string;
	setSearch: (search: string) => void;
}

interface SortContextType {
	sort: string;
	setSort: (search: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);
const SortContext 	= createContext<SortContextType | null>(null);

function App() {
	const [ search, setSearch ] = useState<string>("")
	const [ sort, setSort ] 	= useState<string>("")
	return (
		<>
			<Header />
			<SearchContext.Provider 	value={ { search, setSearch } }>
				<SortContext.Provider 	value={ { sort, setSort } }>
					<main className="main">
						<Control />
						<Outlet />
					</main>
				</SortContext.Provider>
			</SearchContext.Provider>
		</>
	);
}

export default App;
export { SortContext, SearchContext }