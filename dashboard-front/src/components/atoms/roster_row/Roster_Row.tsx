import { Roster } from '../../../data/entities_types/types';
import './Roster_Row.css'

interface Props{
  member:Roster;
}


function Roster_Row({member}:Props) {

  function setSelected(id: number): void {
    console.log('Roster member selected: '+ id);
  }

  return (
    <>
    <div className='roster-member' onClick={()=>setSelected(member.id)}>
      <p className='roster__name__cell'>{member.name} {member.last_name}</p>
      <p className="roster__cell">{member.status}</p>
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