import './Prospect_Row.css'

type Data = {
	name: String, 
	status: String, 
	level: String, 
	expertise: String, 
	capability: String, 
	prospected_for: String
}

type Prop = {
	data: Data
}

function Prospects_Row({ data }: Prop) {
	const showModal = () => {
		const modal = document.querySelector(
		  ".prospect-modal-view"
		) as HTMLDialogElement;
		modal!.showModal();
	  };
	
  return (
    <div className='prospects__row' onClick={showModal}>
		<div className='prospects__row__member'>{data.name}</div>
		<div className={'prospects__row__member prospects__row__member__status ' + data.status}>{data.status}</div>
		<div className='prospects__row__member'>{data.level}</div>
		<div className='prospects__row__member'>{data.expertise}</div>
		<div className='prospects__row__member'>{data.capability}</div>
		<div className={'prospects__row__member prospects__row__member__prospected_for ' + data.prospected_for}>{data.prospected_for}</div>
	</div>
  )
}

export { Prospects_Row }
export type { Data }
