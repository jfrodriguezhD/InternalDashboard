import "./ProjectCreationModal.css";
import ProjectCreationForm from "./ProjectCreationForm";

interface ProjectCreationModalProps {
  onClose: (newProject?: any) => void;
}

const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({
  onClose,
}) => {
  const handleClose = (newProject?: any) => {
    onClose(newProject);
  };

  return (
    <div className="modal-overlay" onClick={() => handleClose()}>
      <div
        className="project-creation-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-creation-modal__header">
          <h2>Create a New Project</h2>
          <button className="close-modal" onClick={() => handleClose()}>
            X
          </button>
        </div>
        <ProjectCreationForm onClose={handleClose} />
      </div>
    </div>
  );
};

export default ProjectCreationModal;
