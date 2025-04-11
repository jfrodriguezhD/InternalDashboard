import { useState, useEffect } from "react";
import "./ProjectDeleteModal.css";

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

interface ProjectDeleteFormProps {
  onClose: () => void;
}

const ProjectDeleteForm: React.FC<ProjectDeleteFormProps> = ({ onClose }) => {
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

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectName = e.target.value;
    const project = projects.find((p) => p.name === selectedProjectName);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) {
      console.error("No project selected");
      return;
    }

    try {
      for (const contact of selectedProject.projectContacts) {
        const projectContactResponse = await fetch(
          `http://localhost:8080/api/v1/project_contact/${contact.id}`,
          {
            method: "DELETE",
          }
        );

        if (!projectContactResponse.ok) {
          console.error("Failed to delete project contact");
        }
      }

      const projectResponse = await fetch(
        `http://localhost:8080/api/v1/project/${selectedProject.id}`,
        {
          method: "DELETE",
        }
      );

      if (projectResponse.ok) {
        console.log("Project deleted successfully");
        onClose();
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-delete-modal__form">
      <label htmlFor="project-delete-list">Select a Project to delete: </label>
      <select
        name="project-delete-list"
        id="project-delete-list"
        className="project-delete-modal__form__select"
        onChange={handleProjectSelect}
      >
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option
            key={project.id}
            value={project.name}
            className="project-delete-modal__form__select__option"
          >
            {project.name}
          </option>
        ))}
      </select>

      <input
        type="submit"
        value="Delete"
        id="project_info"
        className="project-delete-modal__submit delete__button"
      />

      <input
        type="button"
        value="Cancel"
        className="project-delete-modal__submit cancel__delete__button"
        onClick={onClose}
      />
    </form>
  );
};

export default ProjectDeleteForm;
