import "./ProfileInfoCard.css";
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";
import { useRef } from "react";
import { Capabilities } from "../../../data/entities_types/types";

interface Prospect {
  name: string;
  lastName: string;
  seniority: ["SENIOR"] | ["CONSULTANT"] | ["ANALYST"] | ["MANAGER"];
  jobTitle:
    | ["BACKEND_DEVELOPER"]
    | ["FRONTEND_DEVELOPER"]
    | ["FULLSTACK_DEVELOPER"];
  status:
    | ["ACTIVE"]
    | ["HIRED"]
    | ["NOT_IN_PROCESS"]
    | ["DISCARTED"]
    | ["PAUSED"]
    | ["ARCHIVED"];
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
  const setColor = (
    text:
      | ["ACTIVE"]
      | ["HIRED"]
      | ["NOT_IN_PROCESS"]
      | ["DISCARTED"]
      | ["PAUSED"]
      | ["ARCHIVED"]
  ): string => {
    //console.log(text);
    const index = Math.floor(Math.random() * (4 - 0 + 1));
    //console.log(index);
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
        <InfoViewHeader
          title="Profile Information"
          handleClick={toggleDialog}
          dialogRef={profileModal}
        />
        <div className="profile__info__card__content">
          <p>
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
              <p className={"profile__info__card__color__" + setColor(status)} key={index}>
                {capability.name}
              </p>
            ))}
          </div>
          <p>Subcapabillity</p>
          <div className="personal__info__card__subcapabilities">
            {subcapabilities.map((capability, index) => (
              <p className={"profile__info__card__color__" + setColor(status)} key={index}>
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
