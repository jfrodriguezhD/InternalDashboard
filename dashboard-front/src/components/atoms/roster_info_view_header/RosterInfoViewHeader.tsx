import { RefObject } from "react";
import RosterEditProfileModal from "../../organism/roster_edit_profile_modal/RosterEditProfileModal";
import ToolButton from "../toolbutton/ToolButton";
import "./RosterInfoViewHeader.css";

interface Props {
  title: string;
  handleClick: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
}

function InfoViewHeader({ title, handleClick, dialogRef }: Props) {
  return (
    <>
      <div className="info__view__header">
        <h4>{title}</h4>
        <ToolButton
          word="Edit"
          icon="fa-solid fa-pencil"
          group="tools"
          handleClick={handleClick}
          key={title}
        />
        <RosterEditProfileModal toggleDialog={handleClick} ref={dialogRef} />
      </div>
    </>
  );
}

export default InfoViewHeader;
