import { forwardRef, useState, useEffect } from "react";
import { senorities } from "../../../data/edit_prospect_information/edit_prospect_information_data";
import { Prospects, Capabilities } from '../../../data/entities_types/types.ts'
import WordBubble from "../../atoms/wordbubble/WordBubble";
import "./CreateNewProspect.css";


const prospectBaseApiURL = "http://localhost:8080/api/v1/prospect"
//const prospectBaseApiURL = "http://backend:80/api/v1/prospect"

const capabilityBaseApiURL = "http://localhost:8080/api/v1/capability"
//const capabilityBaseApiURL = "http://backend:80/api/v1/capability"

interface Props {
  toggleDialog: () => void;
}

const CreateNewProspect = forwardRef<HTMLDialogElement, Props>(
	({ toggleDialog }: Props, ref) => {

	const [Capabilities, setCapabilities] = useState<Capabilities[]>([])
	const [formData, setFormData] = useState({
		name: "",
		last_name: "",
		email: "",
		phone: "",
		route_to_resume: "",
		status: "",
		seniority: "",
		job_title: "",
		capabilities: [],
		sub_capabilities: [],
		prospected_for: null
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
				[name]: value
			});
		};
  
	const handleCapabilityChange = (capability: Capabilities, type: string) => {
		setFormData(prevState => {
			const updatedCapabilities = type === "MAIN_CAPABILITY"
				? [...prevState.capabilities, capability]
				: prevState.capabilities;
			const updatedSubCapabilities = type === "SECONDARY_CAPABILITY"
				? [...prevState.sub_capabilities, capability]
				: prevState.sub_capabilities;
			return {
				...prevState,
				capabilities: updatedCapabilities,
				sub_capabilities: updatedSubCapabilities
			};
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
		const response = await fetch(prospectBaseApiURL, {
				method: "POST",
				headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
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
		<dialog ref={ref} className="edit-profile-modal">
			<form onSubmit={handleSubmit}>
				<div className="edit-profile-modal__heading">
					<h2>New Prospect Information</h2>
					<button className="close-modal" onClick={() => toggleDialog()}>
					X
					</button>
				</div>

				<div className="edit-profile-modal__name">
					<p>Prospect Name:</p>
					<input type="text" name="name" value={formData.name} onChange={handleChange}/>
				</div>

				<div className="edit-profile-modal__senority">
					<p>Senority:</p>
					{senorities.map((senority, index) => (
						<label className={`WordBubble senority`} key={index}>
							{senority}
							<input type="radio" name="senority" onChange={() => setFormData({ ...formData, seniority: senority })}></input>
						</label>
					))}
				</div>

				<div className="edit-profile-modal__status">
					<p>Status:</p>
					<select name="status" value={formData.status} onChange={handleChange}>
						<option value="HIRED">Hired</option>
						<option value="ACTIVE">Active</option>
						<option value="DISCARTED">Discarted</option>
						<option value="PAUSED">Paused</option>
					</select>
				</div>

				<div className="edit-profile-modal__job-title">
					<p>Job Title:</p>
					<select name="job_title" value={formData.job_title} onChange={handleChange}>
						<option value="FRONTEND_DEVELOPER">Frontend Developer</option>
						<option value="BACKEND_DEVELOPER">Backend Developer</option>
						<option value="FULLSTACK_DEVELOPER">Full Stack Developer</option>
					</select>
				</div>

				<div className="edit-profile-modal__capabilities">
					<p>Main Capabilities:</p>
					{Capabilities.filter(capability => capability.type === "MAIN_CAPABILITY").map((mainCapability, index) => (
						<label className={`WordBubble capabilities`} key={index}>
							{mainCapability.name}
							<input type="checkbox" name="capabilities" onChange={() => handleCapabilityChange(mainCapability, "MAIN_CAPABILITY")}></input>
						</label>
					))}
				</div>
				<div className="edit-profile-modal__capabilities">
					<p>Sub Capabilities:</p>
					{Capabilities.filter(capability => capability.type === "SECONDARY_CAPABILITY").map((subCapability, index) => (
						<label className={`WordBubble capabilities`} key={index}>
							{subCapability.name}
							<input type="checkbox" name="capabilities" onChange={() => handleCapabilityChange(subCapability, "SECONDARY_CAPABILITY")}></input>
						</label>
					))}
				</div>
				<div className="edit-profile-modal__buttons">
					<button className="save-button" type="submit">Save</button>
					<button className="cancel-button" onClick={() => toggleDialog()}>Cancel</button>
				</div>
			</form>
		</dialog>
	);
});


export { CreateNewProspect };
