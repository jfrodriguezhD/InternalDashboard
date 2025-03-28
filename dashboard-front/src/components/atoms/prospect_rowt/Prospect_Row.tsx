import './Prospect_Row.css'

type Prospects = {
	id: number;
	name: string;
	last_name: string;
	email: string;
	phone: number;
	route_to_resume: string;
	status: 'ACTIVE' | 'HIRED' | 'NOT_IN_PROCESS' | 'DISCARTED' | 'PAUSED' | 'ARCHIVED';
	seniority: 'SENIOR' | 'CONSULTANT' | 'ANALYST' | 'MANAGER';
	job_title: 'BACKEND_DEVELOPER' | 'FRONTEND_DEVELOPER' | 'FULLSTACK_DEVELOPER';
	capabilities: Capabilities[];
	sub_capabilities: Capabilities[];
	prospected_for: Projects;
}

type Capabilities = {
	id: number;
	name: string;
	type: 'MAIN_CAPABILITY' | 'SECONDARY_CAPABILITY';
	prospects: Prospects[];
	prospects_sub: Prospects[];
}

type Projects = {
	id: number;
	name: string;
	company: string;
	prospects: Prospects[];
	roster: Roster[];
	project_contacts: ProjectContacts[];
}

type Roster = {
	id: number;
	name: string;
	last_name: string;
	email: string;
	phone: number;
	route_to_resume: string;
	status: ["COMING_AVAILABLE" | "ASSIGNED" | "AVAILABLE" | "NOT_AVAILABLE" | "HOLD"];
	seniority: ["SENIOR" | "CONSULTANT" | "ANALYST" | "MANAGER"];
	job_title: ["BACKEND_DEVELOPER" | "FRONTEND_DEVELOPER" | "FULLSTACK_DEVELOPER"];
	capabilities: Capabilities[];
	sub_capabilities: Capabilities[];
	prospected_for: Projects[];
	project: Projects;
}
  
type ProjectContacts = {
	id: number;
	name: string;
	phone: number;
	project: Projects[];
}

type Prop = {
	data: Prospects
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
export type { Prospects, Projects, Roster }
