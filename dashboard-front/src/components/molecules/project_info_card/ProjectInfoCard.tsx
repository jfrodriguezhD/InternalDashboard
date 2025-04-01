import "./ProjectInfoCard.css";
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";
import { useRef, useEffect } from "react";
import { EditProjectModal } from "../../organism/edit_project_modal/EditProjectModal";

interface ProjectInfo {
  projectId: number;
  projectName: string;
}

function ProjectInfoCard({ projectId, projectName }: ProjectInfo) {
  const projectInfoModal = useRef<HTMLDialogElement>(null);
  const colors: string[] = ["red", "blue", "green", "yellow", "purple"];
  const setColor = (text: string): string => {
    //console.log(text);
    const index = Math.floor(Math.random() * (4 - 0 + 1));
    //console.log(index);
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
  return (
    <>
      <div className="project__info__card">
        <InfoViewHeader
          title="Project Information"
          handleClick={toggleProjectInfoDialog}
          dialogRef={projectInfoModal}
        />
        <div className="project__info__list">
          <p
            className={"project__info__card__color__" + setColor(projectName)}
            onClick={projectInfo}
          >
            {projectName}
          </p>
        </div>
        <dialog ref={projectInfoModal} className="project__info__modal">
          <EditProjectModal
            closeModal={toggleProjectInfoDialog}
            selectedProject={""}
          />{" "}
          {/* Cambiar selected Project */}
        </dialog>
      </div>
    </>
  );
}

export default ProjectInfoCard;
