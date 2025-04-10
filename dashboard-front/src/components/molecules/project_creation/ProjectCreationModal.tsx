import "./ProjectCreationModal.css";
import ProjectCreationForm from "./ProjectCreationForm";

interface ProjectCreationModalProps {
  onClose: () => void;
}

const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({
  onClose,
}) => {
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

        <ProjectCreationForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ProjectCreationModal;
