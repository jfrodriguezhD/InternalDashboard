import { Projects } from "../../../data/entities_types/types";
import WordBubble from "../../atoms/wordbubble/WordBubble";
import { ProspectContext } from "../prospect_view_menu/ProspectView";
import "./EditProjectModal.css";
import { useContext, useEffect, useState } from "react";

interface ProyectInfoEditProps {
  closeModal: () => void;
  selectedProject: string;
  addSelectedProject: (projectName: string) => void;
}

const projectBaseApiURL = "http://localhost:8080/api/v1/project";

function EditProjectModal({
  closeModal,
  addSelectedProject,
}: ProyectInfoEditProps) {
  const [fullProjectList, setFullProjectList] = useState<Projects[]>([]);
  const [filteredProjectList, setFilteredProjectList] = useState<Projects[]>(
    []
  );
  const [selectedProjectName, setSelectedProjectName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dynamic URL construction
  const selectedProspect = useContext(ProspectContext);
  const prospectIdApiURL = selectedProspect
    ? `http://localhost:8080/api/v1/prospect/${selectedProspect.id}`
    : "";

  // Fetching Projects
  async function fetchData() {
    try {
      const response = await fetch(projectBaseApiURL);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: Projects[] = await response.json();
      setFullProjectList(data);
      setFilteredProjectList(data.slice(0, 5));
      //console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    search();
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery("");
    setFilteredProjectList(fullProjectList.slice(0, 5));
  }, [closeModal]);

  const search = () => {
    if (searchQuery === "") {
      setFilteredProjectList(fullProjectList.slice(0, 5));
    } else {
      const filtered = fullProjectList.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjectList(filtered);
    }
  };

  const handleSave = async () => {
    if (selectedProjectName) {
      addSelectedProject(selectedProjectName);

      const selectedProject = fullProjectList.find(
        (project) => project.name === selectedProjectName
      );

      if (selectedProject && prospectIdApiURL) {
        try {
          // Fetch existing projects
          const existingResponse = await fetch(prospectIdApiURL);
          if (!existingResponse.ok) {
            throw new Error(
              "Network response was not ok " + existingResponse.statusText
            );
          }
          const existingProspect = await existingResponse.json();
          const existingProjects = existingProspect.projects || [];

          // Merge new project with existing projects
          const updatedProjects = [
            ...existingProjects,
            {
              id: selectedProject.id,
              name: selectedProject.name,
              company: selectedProject.company,
            },
          ];

          // Construct the request body
          const requestBody = {
            ...existingProspect,
            projects: updatedProjects,
          };

          // Make the PUT request
          const response = await fetch(prospectIdApiURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }

          const data = await response.json();
          console.log("Update successful:", data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }

      setSearchQuery("");
      setFilteredProjectList(fullProjectList.slice(0, 5));
      closeModal();
    }
  };

  return (
    <div className="edit-project-modal__container">
      <div className="edit-project-modal__heading">
        <h2>Edit Project Information</h2>
        <button
          className="close-modal"
          onClick={() => {
            setSearchQuery("");
            setFilteredProjectList(fullProjectList.slice(0, 5));
            closeModal();
          }}
        >
          X
        </button>
      </div>
      <input
        className="edit-project__searchbar"
        placeholder="Insert a project name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="edit-project__searchbutton" onClick={search}>
        Search
      </button>
      <div className="edit-project__list">
        {filteredProjectList.map((project) => (
          <WordBubble
            group="projects"
            type="radio"
            word={project.name}
            key={project.name}
            onClick={() => setSelectedProjectName(project.name)}
          />
        ))}
      </div>
      <button className="edit-project__submitbutton" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export { EditProjectModal };
