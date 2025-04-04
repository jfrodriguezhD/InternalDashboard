import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { prospectBaseApiURL } from "../../../data/endpoints/api_endpoints.ts";
import { PAGE_LIMIT } from "../../../data/general_variables/important_figures.ts";
import {
  Prospects,
  Prospects_Row,
} from "../../atoms/prospect_row/Prospect_Row.tsx";
import { Prospects_Footer_Page_Marker } from "../../atoms/prospects_footer_page_marker/Prospects_Footer_Page_Marker.tsx";
import { CreateNewProspect } from "../../organism/create_new_prospect/CreateNewProspect.tsx";
import ProspectView from "../../organism/prospect_view_menu/ProspectView.tsx";
import "./Prospects_Table.css";
import { SearchContext, SortContext } from "../../../pages/App.tsx";

export const SelectedRowContext = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);

function Prospects_Table() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { page } = useParams();
  const [list, setList] = useState<Prospects[]>([]);
  const [tempList, setTempList] = useState<Prospects[]>([]);
  const profileModal = useRef<HTMLDialogElement>(null);
  const viewRef = useRef<HTMLDialogElement>(null);

  const searchContext = useContext(SearchContext);
  const sortContext = useContext(SortContext);

  const { search, setSearch } = searchContext;
  const { sort, setSort } = sortContext;

  function toggleView() {
    if (!viewRef.current) {
      return;
    }
    viewRef.current.hasAttribute("open")
      ? viewRef.current.close()
      : viewRef.current.showModal();
  }

  function updatePageQuantity() {
    if (page) {
      setPageNumber(parseInt(page));
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(prospectBaseApiURL);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: Prospects[] = await response.json();
      setList(data);
      setTempList(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
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

  function sortBy(sort_type: string) {
    switch (sort_type) {
      case "Name":
        setTempList(
          [...list].sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "Capabilities":
        setTempList(
          [...list].sort((a, b) => {
            if (a.capabilities < b.capabilities) {
              return -1;
            }
            if (a.capabilities > b.capabilities) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "Project":
        setTempList(
          [...list].sort((a, b) => {
            if (!a.prospected_for || !b.prospected_for) {
              return 0;
            }
            if (a.prospected_for.name < b.prospected_for.name) {
              return -1;
            }
            if (a.prospected_for.name > b.prospected_for.name) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "Active":
        setTempList(
          [...list].filter((a) => {
            return a.status[0] == "ACTIVE";
          })
        );
        break;
      case "Hired":
        setTempList(
          [...list].filter((a) => {
            return a.status[0] == "HIRED";
          })
        );
        break;
      case "Not In Process":
        setTempList(
          [...list].filter((a) => {
            return a.status[0] == "NOT_IN_PROCESS";
          })
        );
        break;
      case "Discarted":
        setTempList(
          [...list].filter((a) => {
            return a.status[0] == "DISCARTED";
          })
        );
        break;
      default:
        break;
    }
  }

  function searchBy(search_string: string) {
    setTempList(
      [...list].filter((a) => {
        return a.name.includes(search_string);
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    searchBy(search);
  }, [search]);

  useEffect(() => {
    sortBy(sort);
  }, [sort]);

  useEffect(() => {
    updatePageQuantity();
  }, [page]);

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
        {tempList.length > 0 ? (
          <ProspectView
            prospect={tempList[selectedRow]}
            toggleDialog={toggleView}
            ref={viewRef}
          />
        ) : null}
        <SelectedRowContext.Provider value={setSelectedRow}>
          {tempList.map((data, index) => {
            if (
              index < PAGE_LIMIT * pageNumber &&
              index >= PAGE_LIMIT * pageNumber - PAGE_LIMIT
            ) {
              return (
                <Prospects_Row
                  data={data}
                  key={index}
                  index={index}
                  classname={"content"}
                />
              );
            }
          })}
        </SelectedRowContext.Provider>
        <div
          className="prospects__row add__new__prospect"
          onClick={() => toggleDialog()}
        >
          Add New Prospect
        </div>
      </div>
      <div className="prospects__table__footer">
        <div className="prospects__table__footer__page__number__marker">
          <Prospects_Footer_Page_Marker data={tempList.length} />
        </div>
        <CreateNewProspect toggleDialog={toggleDialog} ref={profileModal} />
      </div>
    </div>
  );
}

export { Prospects_Table };
