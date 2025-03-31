import { useContext } from 'react';
import { SelectedRowContext } from '../../molecules/prospects_table/Prospects_Table';
import './Prospect_Row.css'
import { Prospects } from '../../../data/entities_types/types.ts'

type Prop = {
	data: Prospects
	index: number;
}

function Prospects_Row({ data, index }: Prop) {
	const setSelectedRow = useContext(SelectedRowContext);
	const showModal = () => {
		if (setSelectedRow!=undefined){
			setSelectedRow(index);
		}
		const modal = document.querySelector(
		  ".prospect-modal-view"
		) as HTMLDialogElement;
		modal!.showModal();
	  };
	
  return (
    <div className='prospects__row' onClick={showModal}>
		<div className='prospects__row__member'>{`${(data.name ? data.name : '')} ${(data.last_name ? data.last_name : '')}`}</div>
		<div className={'prospects__row__member prospects__row__member__status ' + data.status}>{data.status}</div>
		<div className='prospects__row__member'>{data.seniority ? data.seniority: '' }</div>
		<div className='prospects__row__member'>{data.job_title ? data.job_title : ''}</div>
		<div className='prospects__row__member'>
			{
				data.capabilities.map((i) =>{
					if (i)
						return i.name;
				})
			}
		</div>
		<div className={'prospects__row__member prospects__row__member__prospected_for ' + (data.prospected_for ? data.prospected_for.company : '')}> {(data.prospected_for ? data.prospected_for.name : '')} </div>
	</div>
  )
}

export { Prospects_Row }
export type { Prospects }
