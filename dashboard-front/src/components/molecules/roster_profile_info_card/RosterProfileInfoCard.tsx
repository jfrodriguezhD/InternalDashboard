import { useRef } from "react";
import { Capabilities } from "../../../data/entities_types/types";
import RosterInfoViewHeader from "../../atoms/roster_info_view_header/RosterInfoViewHeader";
import "./RosterProfileInfoCard.css";

interface Prospect {
  name: string;
  lastName: string;
  seniority: ["SENIOR"] | ["CONSULTANT"] | ["ANALYST"] | ["MANAGER"];
  jobTitle:
    | ["BACKEND_DEVELOPER"]
    | ["FRONTEND_DEVELOPER"]
    | ["FULLSTACK_DEVELOPER"];
  status:["COMING_AVAILABLE"] | ["ASSIGNED"] | ["AVAILABLE"] | ["NOT_AVAILABLE"] | ["HOLD"];
  capabilities: Capabilities[];
  subcapabilities: Capabilities[];
}

function ProfileInfoCard({
  name,
  lastName,
  seniority,
  jobTitle,
  status,
  capabilities,
  subcapabilities,
}: Prospect) {
  const colors: string[] = ["red", "blue", "green", "yellow", "purple"];

  const setColor = (): string => {
    const index = Math.floor(Math.random() * (4 - 0 + 1));
    return colors[index];
  };

  const profileModal = useRef<HTMLDialogElement>(null);

  function toggleDialog() {
    if (!profileModal.current) {
      return;
    }
    profileModal.current.hasAttribute("open")
      ? profileModal.current.close()
      : profileModal.current.showModal();
  }

  return (
    <>
      <div className="profile__info__card">
        <RosterInfoViewHeader
          title="Profile Information"
          handleClick={toggleDialog}
          dialogRef={profileModal}
        />
        <div className="profile__info__card__content">
          <p className="profile__info__card__content__name">
            {name} {lastName}
          </p>
          <div className="profile__info__card__jobTitle">
            <p>{seniority}</p>
            <p>{jobTitle}</p>
          </div>
          <div className="profile__info__card__status">
            <p>Status: </p>
            <p className={"profile__info__card__status__" + status}>{status}</p>
          </div>
          <p>Main Capabillities</p>
          <div className="personal__info__card__capabilities">
            {capabilities.map((capability, index) => (
              <p
                className={"profile__info__card__color__" + setColor()}
                key={index}
              >
                {capability.name}
              </p>
            ))}
          </div>
          <p>Subcapabillity</p>
          <div className="personal__info__card__subcapabilities">
            {subcapabilities.map((capability, index) => (
              <p
                className={"profile__info__card__color__" + setColor()}
                key={index}
              >
                {capability.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfoCard;
