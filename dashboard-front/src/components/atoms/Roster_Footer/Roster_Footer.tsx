import './Roster_Footer.css'

interface tables{
    len:number;
    selected:number;
}

function Roster_Footer({len,selected}:tables) {
  const table = Array.from({length:len}, (_,i) => i + 1);
  console.log(table);
  return (
    <>
    {len>0? 
        <div className='roster__table__footer'>
            {table.map((item)=>
            <a className={selected==item?'selected':'not-selected'} href='/table'>{item}</a>)}
        </div> : null}
    </>
  )
}

export default Roster_Footer