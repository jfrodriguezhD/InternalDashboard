import { useContext } from 'react';
import { Roster } from '../../../data/entities_types/types';
import './Roster_Row.css';
import { tools } from "../../../data/control/control_data.ts";
import { SelectedRowContext } from '../../molecules/roster_table/Roster_Table';

interface Props{
  member:Roster;
  index:number;
}

 
function Roster_Row({member, index}:Props) {
  
  const setSelectedRow = useContext(SelectedRowContext);

  const showModal = () => {
    if (setSelectedRow != undefined) {
      setSelectedRow(index);
    }
    const modal = document.querySelector(
      ".roster-modal-view"
    ) as HTMLDialogElement;
    if(event?.target instanceof(HTMLInputElement) && event.target.id!=tools[0].word){
      modal!.close();
    }
    else{
      modal!.showModal();
    }
  };

  return (
    <>
    <div className='roster-member' onClick={showModal}>
      <p className='roster__name__cell'>{member.name} {member.last_name}</p>
      <p className={"roster__cell "+ member.status}>{member.status}</p>
      <p className="roster__cell">{member.seniority}</p>
      <p className="roster__cell">{member.sub_capabilities.length>0?member.sub_capabilities[0].name:"Not Assigned"}</p>
      <p className="roster__cell">{member.capabilities.length>0?member.capabilities[0].name:"Not assigned"}</p>
      <p className="roster__cell">{member.project?member.project.company:"Not Assigned"}</p>
      <p className="roster__cell">{member.prospected_for?member.prospected_for[0].company:"Not Prospected"}</p>
    </div>
    </>
  )
}

export default Roster_Row