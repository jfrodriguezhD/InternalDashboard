import { Projects } from "../../../data/entities_types/types";
import WordBubble from "../../atoms/wordbubble/WordBubble";
import "./EditProjectModal.css";
import { useEffect, useState } from "react";

interface ProyectInfoEditProps {
  closeModal: () => void;
  selectedProject: string;
}


const projectBaseApiURL = "http://localhost:8080/api/v1/project"

function EditProjectModal({ closeModal, selectedProject }: ProyectInfoEditProps) {
  // Supposed to get 5 last projects on initialization, changes when a search is called
  const [projectList, setProjectList] = useState<Projects[]>([])

  async function fetchData() {
		try {
			const response = await fetch(projectBaseApiURL);
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			const data: Projects[] = await response.json();
			setProjectList(data);
      console.log(data);
		} catch (error) {
		  	console.error('There was a problem with the fetch operation:', error);
		}
	}

  useEffect(() => {
    fetchData();
  }, []);

  function search(): void {

  }

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
      <button className="edit-project__searchbutton" onClick={search}>Search</button>
      <WordBubble
            group="projects"
            type="radio"
            word={selectedProject}
            key={selectedProject}
          />
      <div className="edit-project__list">
        {projectList.map((project) => (
          <WordBubble
            group="projects"
            type="radio"
            word={project.name}
            key={project.name}
          />
        ))}
      </div>
      <button className="edit-project__submitbutton">Save</button>
    </div>
  );
}
export { EditProjectModal };
