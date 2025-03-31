import WordBubble from "../../atoms/wordbubble/WordBubble";
import "./EditProjectModal.css";
import { useState } from "react";

interface ProyectInfoEditProps {
  closeModal: () => void;
}

function EditProjectModal({ closeModal }: ProyectInfoEditProps) {
  // Supposed to get 5 last projects on initialization, changes when a search is called
  const [projectList, setProjectList] = useState<string[]>([
    "Amazon",
    "Google",
    "Toyota",
    "Nissan",
    "Nasa",
  ]);

  return (
    <div className="edit-project-modal__container">
      <div className="edit-project-modal__heading">
        <h2>Edit Project Information</h2>
        <button className="close-edit-project-modal" onClick={closeModal}>
          X
        </button>
      </div>

      <input
        className="edit-project__searchbar"
        placeholder="Insert a project name"
      />
      <button className="edit-project__searchbutton">Search</button>
      <div className="edit-project__list">
        {projectList.map((project) => (
          <WordBubble
            group="projects"
            type="radio"
            word={project}
            key={project}
          />
        ))}
      </div>
      <button className="edit-project__submitbutton">Save</button>
    </div>
  );
}
export { EditProjectModal };
