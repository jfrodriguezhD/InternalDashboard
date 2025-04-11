import { createContext, forwardRef } from "react";
import { rosterBaseApiURL } from "../../../data/endpoints/api_endpoints";
import { Roster } from "../../../data/entities_types/types";
import RosterPersonalInfoCard from "../../molecules/roster_personal_info_card/RosterPersonalInfoCard";
import RosterProfileInfoCard from "../../molecules/roster_profile_info_card/RosterProfileInfoCard";
import RosterProjectInfoCard from "../../molecules/roster_project_info_card/RosterProjectInfoCard";
import "./RosterView.css";

interface Props {
  toggleDialog: () => void;
  roster: Roster;
}

export const RosterContext = createContext<Roster | undefined>(undefined);

export default forwardRef<HTMLDialogElement, Props>(
  function RosterView( { toggleDialog, roster },ref) {
  const removeRoster = () => {
    const deleteRosterUrl = `${rosterBaseApiURL}/${roster.id}`;
    fetch(deleteRosterUrl, {
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
    <dialog ref={ref} className="roster-modal-view">
      <div className="roster__view__modal__header">
        <h2>Roster Information</h2>
        <button className="close-modal" onClick={() => toggleDialog()}>
          X
        </button>
      </div>
      <div className="roster__view__modal">
        <RosterContext.Provider value={roster}>
        <RosterProfileInfoCard
            name={roster.name}
            lastName={roster.last_name}
            capabilities={roster.capabilities}
            jobTitle={roster.job_title}
            seniority={roster.seniority}
            status={roster.status}
            subcapabilities={roster.sub_capabilities}
          />
          <RosterPersonalInfoCard
            phone={roster.phone}
            email={roster.email}
            resume={roster.route_to_resume}
          />
          <RosterProjectInfoCard
            projectName={roster.prospected_for}
            projectId={roster.prospected_for}
          />
        </RosterContext.Provider>
      </div>
      <button
        className="delete-roster-button"
        onClick={() => removeRoster()}
      >
        Delete Roster
        <i className="fa-solid fa-trash"></i>
      </button>
    </dialog>
  );
});
