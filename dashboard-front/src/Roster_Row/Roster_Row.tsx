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
      <p className='name'>{firstName} {lastName}</p>
      <p>{status}</p>
      <p>{level}</p>
      <p>{expertise}</p>
      <p>{capability}</p>
      <p>{project}</p>
      <p>{prospectedFor}</p>
    </div>
    </>
  )
}

export default Roster_Row