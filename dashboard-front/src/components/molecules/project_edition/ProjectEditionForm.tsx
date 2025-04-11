import { useState, useEffect } from "react";
import "./ProjectEdition.css";

interface Project {
  id: number;
  name: string;
  company: string;
  createdTime: string | null;
  lastModified: string | null;
  projectContacts: ProjectContact[];
  roster: any[];
  roster_prospected: any[];
}

interface ProjectContact {
  id: number;
  name: string;
  phone: string;
  createdTime: string | null;
  lastModified: string | null;
  projectId: number;
}

interface ProjectEditionFormProps {
  onClose: () => void;
}

const ProjectEditionForm: React.FC<ProjectEditionFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/project");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectName = e.target.value;
    const project = projects.find((p) => p.name === selectedProjectName);
    if (project) {
      setSelectedProject(project);
      setProjectName(project.name);
      setCompany(project.company);

      if (project.projectContacts.length > 0) {
        const contact = project.projectContacts[0];
        setName(contact.name);
        setPhone(contact.phone);
      } else {
        setName("");
        setPhone("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) {
      console.error("No project selected");
      return;
    }

    const projectContactRequestBody = {
      name,
      phone,
    };

    const projectRequestBody = {
      company,
      name: projectName,
    };

    try {
      if (selectedProject.projectContacts.length > 0) {
        const contactId = selectedProject.projectContacts[0].id;
        const projectContactResponse = await fetch(
          `http://localhost:8080/api/v1/project_contact/${contactId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectContactRequestBody),
          }
        );

        if (projectContactResponse.ok) {
          console.log("Project contact saved successfully");
        } else {
          console.error("Failed to save project contact");
        }
      }

      const projectResponse = await fetch(
        `http://localhost:8080/api/v1/project/${selectedProject.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectRequestBody),
        }
      );

      if (projectResponse.ok) {
        console.log("Project saved successfully");
        onClose();
      } else {
        console.error("Failed to save project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-edition-modal__form">
      <label htmlFor="project-edition-list">Select a Project to edit: </label>
      <select
        name="project-edition-list"
        id="project-edition-list"
        className="project-edition-modal__form__select"
        onChange={handleProjectSelect}
      >
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option
            key={project.id}
            value={project.name}
            className="project-edition-modal__form__select__option"
          >
            {project.name}
          </option>
        ))}
      </select>

      <label htmlFor="project-name">Project Name: </label>
      <input
        type="text"
        name="project-name"
        id="project-name"
        className="project-edition-modal__form__input"
        value={projectName}
        onChange={handleProjectNameChange}
      />

      <label htmlFor="project-company-name">Company Name: </label>
      <input
        type="text"
        name="project-company-name"
        id="project-company-name"
        className="project-edition-modal__form__input"
        value={company}
        onChange={handleCompanyChange}
      />

      <label htmlFor="project-contact-name">Project Contact Name: </label>
      <input
        type="text"
        name="project-contact-name"
        id="project-contact-name"
        className="project-edition-modal__form__input"
        value={name}
        onChange={handleNameChange}
      />

      <label htmlFor="project-contact-phone">Project Contact Phone: </label>
      <input
        type="tel"
        name="project-contact-phone"
        id="project-contact-phone"
        className="project-edition-modal__form__input"
        value={phone}
        onChange={handlePhoneChange}
      />

      <input
        type="submit"
        value="Save"
        id="project_info"
        className="project-edition-modal__submit save__button"
      />

      <input
        type="button"
        value="Cancel"
        className="project-edition-modal__submit cancel__button"
        onClick={onClose}
      />
    </form>
  );
};

export default ProjectEditionForm;
