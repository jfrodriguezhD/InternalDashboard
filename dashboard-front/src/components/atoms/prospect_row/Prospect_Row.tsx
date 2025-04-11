import { useContext } from "react";
import "./Prospect_Row.css";
import { Prospects } from "../../../data/entities_types/types.ts";
import { SelectedRowContext } from "../../../pages/App.tsx";

type Prop = {
  data: Prospects;
  index: number;
  classname: string;
};

function Prospects_Row({ data, index, classname }: Prop) {
  const selectedRowState = useContext(SelectedRowContext);
  const selectedRow = selectedRowState?.selectedRow;
  const setSelectedRow = selectedRowState?.setSelectedRow;
  
  const isSelected = selectedRow == index;

  const toggleSelection = () =>{
    if (isSelected){
      setSelectedRow?setSelectedRow(-1):null;
    }
    else{
      setSelectedRow?setSelectedRow(index):null
    }
  }

  const showModal = () => {
    setSelectedRow?setSelectedRow(index):null
    const modal = document.querySelector(
      ".prospect-modal-view"
    ) as HTMLDialogElement;
    modal!.showModal();
  };

  return (
    <div className={`prospects__row ${classname} ${isSelected?"selected":""}`} onDoubleClick={showModal} onClick={toggleSelection}>
      <div className="prospects__row__member">
        {`${data.name ? data.name : ""} ${
        data.last_name ? data.last_name : ""
      }`}
      </div>
      <div
        className={
          "prospects__row__member prospects__row__member__status " + data.status
        }
      >
        {data.status}
      </div>
      <div className="prospects__row__member">
        {data.seniority ? data.seniority : ""}
      </div>
      <div className="prospects__row__member">
        {data.job_title ? data.job_title : ""}
      </div>
      <div className="prospects__row__member capability__nametag__container">
        {data.capabilities.map((data, index) => {
          if (data) 
            return <div className="capability__nametag" key={index}>{data.name}</div>;
        })}
      </div>
      <div className="prospects__row__member prospected_for__nametag__container">
        {data.projects.map((data, index) => {
              if (data && index < 1) {
                return <div className="prospected_for__nametag" key={index}>{data.name}</div>
              }
            }
          )
        }
      </div>
    </div>
  );
}

export { Prospects_Row };
export type { Prospects };
