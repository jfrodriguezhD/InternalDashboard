import { useContext } from "react";
import { SelectedRowContext } from "../../molecules/prospects_table/Prospects_Table";
import "./Prospect_Row.css";
import { Prospects } from "../../../data/entities_types/types.ts";
import { tools } from "../../../data/control/control_data.ts";
import ToolButton from "../toolbutton/ToolButton.tsx";
import { prospectBaseApiURL } from "../../../data/endpoints/api_endpoints.ts";

type Prop = {
  data: Prospects;
  index: number;
  classname: string;
};

function Prospects_Row({ data, index, classname }: Prop) {
  const setSelectedRow = useContext(SelectedRowContext);

  const archiveProspect = () => {
    data.status = ["ARCHIVED"];

    const modifyURL = `${prospectBaseApiURL}/${data.id}`;

    fetch(modifyURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        alert("Profile successfully updated: " + JSON.stringify(data))
      );
    location.reload();
  }
  
  const pinProspect = () => {
    
  }

  const handleBtnClick = (e: MouseEvent, toolType:string) =>{
    console.log()
    switch (toolType){
      case tools[0].word:
        e?.preventDefault();
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
    if (setSelectedRow != undefined) {
      setSelectedRow(index);
    }
    const modal = document.querySelector(
      ".prospect-modal-view"
    ) as HTMLDialogElement;
    if(event?.target instanceof(HTMLInputElement) && event.target.id!=tools[0].word){
      modal!.close();
    }
    else{
      modal!.showModal();
    }
  };

  return (
    <div className={`prospects__row ${classname}`} onClick={showModal}>
      <div className="prospects__row__member">
        {`${data.name ? data.name : ""} ${
        data.last_name ? data.last_name : ""
      }`}
      <section className="prospects__row__control__tools">
          {tools.map((tool, index) => {
          return <ToolButton word={tool.word} group={`prospects_row__tools__${tool.word}${data.id}`} icon={tool.icon} key={index} handleClick={()=>handleBtnClick(event,tool.word)}/>;
          })}
        </section>
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
      <div className="prospects__row__member">
        {data.capabilities.map((i) => {
          if (i) return i.name;
        })}
      </div>
      <div
        className={
          "prospects__row__member prospects__row__member__prospected_for " +
          (data.prospected_for ? data.prospected_for.company : "")
        }
      >
        {" "}
        {data.prospected_for ? data.prospected_for.name : ""}{" "}
      </div>
    </div>
  );
}

export { Prospects_Row };
export type { Prospects };
