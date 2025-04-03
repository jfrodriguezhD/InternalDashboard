import "./ProjectInfoCard.css";
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";
import { useRef, useEffect, useState } from "react";
import { EditProjectModal } from "../../organism/edit_project_modal/EditProjectModal";
import { Projects } from "../../../data/entities_types/types";

interface ProjectInfo {
  projectId: Projects;
  projectName: Projects;
}

function ProjectInfoCard({ projectId, projectName }: ProjectInfo) {
  const projectInfoModal = useRef<HTMLDialogElement>(null);
  const colors: string[] = ["red", "blue", "green", "yellow", "purple"];
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const setColor = (text: string): string => {
    const index = Math.floor(Math.random() * (4 - 0 + 1));
    return colors[index];
  };

  function toggleProjectInfoDialog() {
    if (!projectInfoModal.current) {
      return;
    }
    projectInfoModal.current.hasAttribute("open")
      ? projectInfoModal.current.close()
      : projectInfoModal.current.showModal();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        projectInfoModal.current &&
        event.target === projectInfoModal.current
      ) {
        projectInfoModal.current.close();
      }
    }

    if (projectInfoModal.current) {
      projectInfoModal.current.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (projectInfoModal.current) {
        projectInfoModal.current.removeEventListener(
          "click",
          handleClickOutside
        );
      }
    };
  }, []);

  const projectInfo = () => {
    console.log(projectId);
  };

  const addSelectedProject = (projectName: string) => {
    setSelectedProjects((prev) => {
      if (prev.length < 5 && !prev.includes(projectName)) {
        return [...prev, projectName];
      }
      return prev;
    });
  };

  return (
    <>
      <div className="project__info__card">
        <InfoViewHeader
          title="Project"
          handleClick={toggleProjectInfoDialog}
          dialogRef={projectInfoModal}
        />
        <div className="project__info__list">
          {selectedProjects.map((project, index) => (
            <p
              key={index}
              className={"project__info__card__color__" + setColor(project)}
              onClick={projectInfo}
            >
              {project}
            </p>
          ))}
        </div>
        <dialog ref={projectInfoModal} className="project__info__modal">
          <EditProjectModal
            closeModal={toggleProjectInfoDialog}
            addSelectedProject={addSelectedProject}
            selectedProject={""}
          />
        </dialog>
      </div>
    </>
  );
}

export default ProjectInfoCard;
