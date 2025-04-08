import "./ProjectView.css";
import { useState } from "react";
import Header from "../../molecules/header/Header";
import ProjectCreationModal from "../../molecules/project_creation/ProjectCreationModal";

function ProjectView() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateProjectClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          <button className="edit-project-button">Edit Existing Project</button>
          <button className="delete-project-button">
            Delete Existing Project
          </button>
        </div>
      </div>

      {isModalVisible && <ProjectCreationModal onClose={handleCloseModal} />}
    </>
  );
}

export default ProjectView;
