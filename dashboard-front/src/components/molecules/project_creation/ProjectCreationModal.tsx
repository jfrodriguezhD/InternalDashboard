import React, { useState } from "react";
import "./ProjectCreationModal.css";

interface ProjectCreationModalProps {
  onClose: () => void;
}

const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({
  onClose,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectName, setProjectName] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectContactRequestBody = {
      name,
      phone,
    };

    const projectRequestBody = {
      company,
      name: projectName,
    };

    try {
      const projectContactResponse = await fetch(
        "http://localhost:8080/api/v1/project_contact",
        {
          method: "POST",
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

      const projectResponse = await fetch(
        "http://localhost:8080/api/v1/project",
        {
          method: "POST",
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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-creation-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-creation-modal__header">
          <h2>Create a New Project</h2>
          <button className="close-modal" onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="project-creation-modal__form">
          <label htmlFor="project-name">Project Name: </label>
          <input
            type="text"
            name="project-name"
            id="project-name"
            className="project-creation-modal__form__input"
            onChange={handleProjectNameChange}
          />

          <label htmlFor="project-company-name">Company Name: </label>
          <input
            type="text"
            name="project-company-name"
            id="project-company-name"
            className="project-creation-modal__form__input"
            onChange={handleCompanyChange}
          />

          <label htmlFor="project-contact-name">Project Contact Name: </label>
          <input
            type="text"
            name="project-contact-name"
            id="project-contact-name"
            className="project-creation-modal__form__input"
            onChange={handleNameChange}
          />

          <label htmlFor="project-contact-phone">Project Contact Phone: </label>
          <input
            type="tel"
            name="project-contact-phone"
            id="project-contact-phone"
            className="project-creation-modal__form__input"
            onChange={handlePhoneChange}
          />

          <input
            type="submit"
            value="Save"
            id="project_info"
            className="project-creation-modal__submit save__button"
          />

          <input
            type="button"
            value="Cancel"
            className="project-creation-modal__submit cancel__button"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
};

export default ProjectCreationModal;
