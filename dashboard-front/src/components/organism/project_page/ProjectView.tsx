import "./ProjectView.css";
import { useState } from "react";
import Header from "../../molecules/header/Header";
import ProjectCreationModal from "../../molecules/project_creation/ProjectCreationModal";
import ProjectEditionModal from "../../molecules/project_edition/ProjectEditionModal";
import ProjectDeleteModal from "../../molecules/project_delete/ProjectDeleteModal";

function ProjectView() {
  const [activeModal, setActiveModal] = useState<
    "create" | "edit" | "delete" | null
  >(null);

  const handleCreateProjectClick = () => {
    setActiveModal("create");
  };

  const handleEditProjectClick = () => {
    setActiveModal("edit");
  };

  const handleDeleteProjectClick = () => {
    setActiveModal("delete");
  };

  const handleCloseModal = () => {
    setActiveModal(null);
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
