import "./ProjectDeleteModal.css";
import ProjectDeleteForm from "./ProjectDeleteForm";

interface ProjectDeleteModalProps {
  onClose: () => void;
}

const ProjectDeleteModal: React.FC<ProjectDeleteModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-delete-modal__header">
          <h2>Delete a Project</h2>
          <button className="close-modal" onClick={onClose}>
            X
          </button>
        </div>
        <ProjectDeleteForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ProjectDeleteModal;
