import './Roster_Row.css'

interface RosterMember{
  id:number;
  firstName:string;
  lastName:string;
  status:string;
  level:string;
  expertise:string;
  capability:string;
  project:string;
  prospectedFor:string;
}


function Roster_Row({id,firstName,lastName,status,level,expertise,capability,project,prospectedFor}:RosterMember) {

  function setSelected(id: number): void {
    console.log('Roster member selected: '+ id);
  }

  return (
    <>
    <div className='roster-member' onClick={()=>setSelected(id)}>
      <p className='roster__name__cell'>{firstName} {lastName}</p>
      <p className="roster__cell">{status}</p>
      <p className="roster__cell">{level}</p>
      <p className="roster__cell">{expertise}</p>
      <p className="roster__cell">{capability}</p>
      <p className="roster__cell">{project}</p>
      <p className="roster__cell">{prospectedFor}</p>
    </div>
    </>
  )
}

export default Roster_Row