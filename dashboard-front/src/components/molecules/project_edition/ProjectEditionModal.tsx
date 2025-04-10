import "./ProjectEdition.css";
import ProjectEditionForm from "./ProjectEditionForm";

interface ProjectEditionModalProps {
  onClose: () => void;
}

const ProjectEditionModal: React.FC<ProjectEditionModalProps> = ({
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-edition-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-edition-modal__header">
          <h2>Edit a Project</h2>
          <button className="close-modal" onClick={onClose}>
            X
          </button>
        </div>
        <ProjectEditionForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ProjectEditionModal;
