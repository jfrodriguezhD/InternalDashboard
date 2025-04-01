import { forwardRef, useState, useEffect } from "react";
import { senorities } from "../../../data/edit_prospect_information/edit_prospect_information_data";
import { prospectBaseApiURL, capabilityBaseApiURL } from "../../../data/endpoints/api_endpoints.ts"
import { Capabilities } from '../../../data/entities_types/types.ts'
import "./CreateNewProspect.css";

type ProspectStarter = {
	name: string;
	status: ['ACTIVE'] | ['HIRED'] | ['NOT_IN_PROCESS'] | ['DISCARTED'] | ['PAUSED'] | ['ARCHIVED'];
	seniority: ['SENIOR'] | ['CONSULTANT'] | ['ANALYST'] | ['MANAGER'];
	job_title: ['BACKEND_DEVELOPER'] | ['FRONTEND_DEVELOPER'] | ['FULLSTACK_DEVELOPER'];
	capabilities: Capabilities[] | null | undefined;
	sub_capabilities: Capabilities[] | null | undefined;
}

interface Props {
  toggleDialog: () => void;
}

const CreateNewProspect = forwardRef<HTMLDialogElement, Props>(
	({ toggleDialog }: Props, ref) => {

	const [Capabilities, setCapabilities] = useState<Capabilities[]>([])
	const [formData, setFormData] = useState<ProspectStarter>({
		name: "",
		status: ["HIRED"],
		seniority: ["ANALYST"],
		job_title: ["FRONTEND_DEVELOPER"],
		capabilities: [],
		sub_capabilities: []
	  });

	async function fetchCapablities() {
		try {
			const response = await fetch(capabilityBaseApiURL);
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			const data: Capabilities[] = await response.json();
			setCapabilities(data);
		} catch (error) {
		  	console.error('There was a problem with the fetch operation:', error);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
			setFormData({
				...formData,
				[name]: (name === 'status' || name === 'job_title') ? [value] : value
			});
		};
  
	const handleCapabilityChange = (capability: Capabilities, type: string) => {
		setFormData(prevState => {
			const updatedCapabilities = type === "MAIN_CAPABILITY"
				? [...(prevState.capabilities || []), capability]
				: prevState.capabilities || [];
			const updatedSubCapabilities = type === "SECONDARY_CAPABILITY"
				? [...(prevState.sub_capabilities || []), capability]
				: prevState.sub_capabilities || [];
			return {
				...prevState,
				capabilities: updatedCapabilities,
				sub_capabilities: updatedSubCapabilities
			};
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataToSend = { ...formData };
		if (dataToSend.capabilities && dataToSend.capabilities.length === 0) {
			delete dataToSend.capabilities;
		}
		if (dataToSend.sub_capabilities && dataToSend.sub_capabilities.length === 0) {
			delete dataToSend.sub_capabilities;
		}
		try {
			console.log(JSON.stringify(dataToSend))
			const response = await fetch(prospectBaseApiURL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "*/*"
					},
				body: JSON.stringify(dataToSend)
			});
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
		} catch (error) {
			console.error('There was a problem with the submit operation:', error);
		}
	};

	useEffect(() => {
		fetchCapablities();
	}, []);

	return (
		<dialog ref={ref} className="create__prospect-modal">
			<form onSubmit={handleSubmit} className="create__prospect__form">
				<div className="create__prospect-modal__heading">
					<h2>New Prospect Information</h2>
					<button className="close-modal" onClick={() => toggleDialog()}>
					X
					</button>
				</div>

				<div className="create__prospect-modal__name">
					<p>Prospect Name:</p>
					<input type="text" name="name" value={formData.name} onChange={handleChange}/>
				</div>

				<div className="create__prospect-modal__senority">
					<p>Senority:</p>
					{senorities.map((senority, index) => (
						<label className={`WordBubble senority`} key={index}>
							{senority}
							<input type="radio" name="senority" onChange={() => setFormData({ ...formData, seniority: [senority as "SENIOR" | "CONSULTANT" | "ANALYST" | "MANAGER"] })}></input>
						</label>
					))}
				</div>

				<div className="create__prospect-modal__status">
					<p>Status:</p>
					<select name="status" value={formData.status} onChange={handleChange}>
						<option value='HIRED'>Hired</option>
						<option value='ACTIVE'>Active</option>
						<option value='DISCARTED'>Discarded</option>
						<option value='PAUSED'>Paused</option>
					</select>
				</div>

				<div className="create__prospect-modal__job-title">
					<p>Job Title:</p>
					<select name="job_title" value={formData.job_title} onChange={handleChange}>
						<option value='FRONTEND_DEVELOPER'>Frontend Developer</option>
						<option value='BACKEND_DEVELOPER'>Backend Developer</option>
						<option value='FULLSTACK_DEVELOPER'>Full Stack Developer</option>
					</select>
				</div>

				<div className="create__prospect-modal__capabilities">
					<p>Main Capabilities:</p>
					{Capabilities.filter(capability => capability.type === "MAIN_CAPABILITY").map((mainCapability, index) => (
						<label className={`WordBubble capabilities`} key={index}>
							{mainCapability.name}
							<input type="checkbox" name="capabilities" onChange={() => handleCapabilityChange(mainCapability, "MAIN_CAPABILITY")}></input>
						</label>
					))}
				</div>
				<div className="create__prospect-modal__capabilities">
					<p>Sub Capabilities:</p>
					{Capabilities.filter(capability => capability.type === "SECONDARY_CAPABILITY").map((subCapability, index) => (
						<label className={`WordBubble capabilities`} key={index}>
							{subCapability.name}
							<input type="checkbox" name="capabilities" onChange={() => handleCapabilityChange(subCapability, "SECONDARY_CAPABILITY")}></input>
						</label>
					))}
				</div>
				<div className="create__prospect-modal__buttons">
					<button className="save-button" type="submit">Save</button>
					<button className="cancel-button" onClick={() => toggleDialog()}>Cancel</button>
				</div>
			</form>
		</dialog>
	);
});


export { CreateNewProspect };
