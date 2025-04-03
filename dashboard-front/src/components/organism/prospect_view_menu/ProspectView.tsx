import "./ProspectView.css";
import PersonalInfoCard from "../../molecules/personal_info_card/PersonalInfoCard";
import ProfileInfoCard from "../../molecules/profile_info_card/ProfileInfoCard";
import ProjectInfoCard from "../../molecules/project_info_card/ProjectInfoCard";
import { createContext, forwardRef } from "react";
import { Prospects } from "../../atoms/prospect_row/Prospect_Row";
import { prospectBaseApiURL } from "../../../data/endpoints/api_endpoints";

interface Props {
  toggleDialog: () => void;
  prospect: Prospects;
}

export const ProspectContext = createContext<Prospects | undefined>(undefined);

export default forwardRef<HTMLDialogElement, Props>(function ProspectView(
  { toggleDialog, prospect },
  ref
) {
  const removeProspect = () => {
    const deleteProspectUrl = `${prospectBaseApiURL}/${prospect.id}`;
    fetch(deleteProspectUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        alert("Profile successfully deleted: " + JSON.stringify(data))
      );
    location.reload();
  };

  return (
    <dialog ref={ref} className="prospect-modal-view">
      <div className="prospect__view__modal__header">
        <h2>Prospect Information</h2>
        <button className="close-modal" onClick={() => toggleDialog()}>
          X
        </button>
      </div>
      <div className="prospect__view__modal">
        <ProspectContext.Provider value={prospect}>
          <ProfileInfoCard
            name={prospect.name}
            lastName={prospect.last_name}
            capabilities={prospect.capabilities}
            jobTitle={prospect.job_title}
            seniority={prospect.seniority}
            status={prospect.status}
            subcapabilities={prospect.sub_capabilities}
          />
          <PersonalInfoCard
            phone={prospect.phone}
            email={prospect.email}
            resume={prospect.route_to_resume}
          />
          <ProjectInfoCard
            projectName={prospect.prospected_for}
            projectId={prospect.prospected_for}
          />
        </ProspectContext.Provider>
      </div>
      <button
        className="delete-prospect-button"
        onClick={() => removeProspect()}
      >
        Delete Prospect
        <i className="fa-solid fa-trash"></i>
      </button>
    </dialog>
  );
});
