import { forwardRef, useState, useEffect } from "react";
import { senorities } from "../../../data/edit_roster_information/edit_roster_information_data.ts";
import { rosterBaseApiURL, capabilityBaseApiURL } from "../../../data/endpoints/api_endpoints.ts"
import { Capabilities } from '../../../data/entities_types/types.ts'
import "./CreateNewRoster.css";

type RosterStarter = {
	name: string;
	last_name: string;
	status: ["COMING_AVAILABLE"] | ["ASSIGNED"] | ["AVAILABLE"] | ["NOT_AVAILABLE"] | ["HOLD"];
	seniority: ['SENIOR'] | ['CONSULTANT'] | ['ANALYST'] | ['MANAGER'];
	job_title: ['BACKEND_DEVELOPER'] | ['FRONTEND_DEVELOPER'] | ['FULLSTACK_DEVELOPER'];
	capabilities: Capabilities[] | null | undefined;
	sub_capabilities: Capabilities[] | null | undefined;
}

interface Props {
  toggleDialog: () => void;
}
 
const CreateNewRoster = forwardRef<HTMLDialogElement, Props>(
	({ toggleDialog }: Props, ref) => {

	const [Capabilities, setCapabilities] = useState<Capabilities[]>([])
	const [formData, setFormData] = useState<RosterStarter>({
		name: " ",
		last_name: " ",
		status: ["AVAILABLE"],
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
				? [...new Set([...(prevState.capabilities || []), capability])]
				: prevState.capabilities || [];
			const updatedSubCapabilities = type === "SECONDARY_CAPABILITY"
				? [...new Set([...(prevState.sub_capabilities || []), capability])]
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
			const response = await fetch(rosterBaseApiURL, {
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
		window.location.reload();
	};

	useEffect(() => {
		fetchCapablities();
	}, []);

	return (
		<dialog ref={ref} className="create__roster-modal">
			<div className="create__roster-modal__heading">
				<h2>New Roster Information</h2>
				<button className="close-modal" onClick={() => toggleDialog()}>
				X
				</button>
			</div>
			<form onSubmit={handleSubmit} className="create__roster__form">

				<div className="create__roster-modal__name">
					<p>Roster Name:</p>
					<input type="text" name="name" value={formData.name} onChange={handleChange}/>
				</div>

				<div className="create__roster-modal__name">
					<p>Roster Last Name:</p>
					<input type="text" name="last_name" value={formData.last_name} onChange={handleChange}/>
				</div>

				<div className="create__roster-modal__senority">
					<p>Senority:</p>
					{senorities.map((senority, index) => (
						<label className={`WordBubble senority`} key={index}>
							{senority}
							<input type="radio" name="senority" onChange={() => setFormData({ ...formData, seniority: [senority as "SENIOR" | "CONSULTANT" | "ANALYST" | "MANAGER"] })}></input>
						</label>
					))}
				</div>

				<div className="create__roster-modal__status">
					<p>Status:</p>
					<select name="status" value={formData.status} onChange={handleChange}>
						<option value='COMING_AVAILABLE'>COMING_AVAILABLE</option>
						<option value='ASSIGNED'>ASSIGNED</option>
						<option value='AVAILABLE'>AVAILABLE</option>
						<option value='NOT_AVAILABLE'>NOT_AVAILABLE</option>
						<option value='HOLD'>HOLD</option>
					</select>
				</div>

				<div className="create__roster-modal__job-title">
					<p>Job Title:</p>
					<select name="job_title" value={formData.job_title} onChange={handleChange}>
						<option value='FRONTEND_DEVELOPER'>Frontend Developer</option>
						<option value='BACKEND_DEVELOPER'>Backend Developer</option>
						<option value='FULLSTACK_DEVELOPER'>Full Stack Developer</option>
					</select>
				</div>

				<div className="create__roster-modal__capabilities">
					<p>Main Capabilities:</p>
					{Capabilities.filter(capability => capability.type === "MAIN_CAPABILITY").map((mainCapability, index) => (
						<label className={`WordBubble capabilities`} key={index}>
							{mainCapability.name}
							<input type="checkbox" name="capabilities" onChange={() => handleCapabilityChange(mainCapability, "MAIN_CAPABILITY")}></input>
						</label>
					))}
				</div>
				<div className="create__roster-modal__capabilities">
					<p>Sub Capabilities:</p>
					{Capabilities.filter(capability => capability.type === "SECONDARY_CAPABILITY").map((subCapability, index) => (
						<label className={`WordBubble capabilities`} key={index}>
							{subCapability.name}
							<input type="checkbox" name="capabilities" onChange={() => handleCapabilityChange(subCapability, "SECONDARY_CAPABILITY")}></input>
						</label>
					))}
				</div>
				<div className="create__roster-modal__buttons">
					<button className="save-button" type="submit">Save</button>
				</div>
			</form>
			<div className="create__roster-modal__buttons">
				<button className="cancel-button" onClick={() => toggleDialog()}>Cancel</button>
			</div>
		</dialog>
	);
});


export { CreateNewRoster };
