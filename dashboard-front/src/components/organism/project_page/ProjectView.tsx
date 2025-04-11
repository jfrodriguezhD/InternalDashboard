import "./ProjectView.css";
import { useState, useEffect } from "react";
import Header from "../../molecules/header/Header";
import ProjectCreationModal from "../../molecules/project_creation/ProjectCreationModal";
import ProjectEditionModal from "../../molecules/project_edition/ProjectEditionModal";
import ProjectDeleteModal from "../../molecules/project_delete/ProjectDeleteModal";
import ProjectTable from "./ProjectTable";

interface Project {
  id: number;
  name: string;
  company: string;
  projectContacts: { name: string; phone: string }[];
}

function ProjectView() {
  const [activeModal, setActiveModal] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/project");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProjectClick = () => {
    setActiveModal("create");
  };

  const handleEditProjectClick = () => {
    setActiveModal("edit");
  };

  const handleDeleteProjectClick = () => {
    setActiveModal("delete");
  };

  const handleCloseModal = (newProject?: Project) => {
    setActiveModal(null);
    if (newProject && newProject.id && newProject.name && newProject.company) {
      setProjects([newProject, ...projects]);
    } else {
      fetchProjects();
    }
  };

  return (
    <>
      <Header />
      <div className="project-main-container">
        <div className="project-main-container__title">
          <h2>Projects</h2>
        </div>
        <div className="project-edition-buttons">
          <button
            className="create-project-button"
            onClick={handleCreateProjectClick}
          >
            Create new Project
          </button>
          <button
            className="edit-project-button"
            onClick={handleEditProjectClick}
          >
            Edit Existing Project
          </button>
          <button
            className="delete-project-button"
            onClick={handleDeleteProjectClick}
          >
            Delete Existing Project
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="project-table">
          <ProjectTable projects={projects} />
        </div>
      </div>
      {activeModal === "create" && (
        <ProjectCreationModal onClose={handleCloseModal} />
      )}
      {activeModal === "edit" && (
        <ProjectEditionModal onClose={handleCloseModal} />
      )}
      {activeModal === "delete" && (
        <ProjectDeleteModal onClose={handleCloseModal} />
      )}
    </>
  );
}

export default ProjectView;
