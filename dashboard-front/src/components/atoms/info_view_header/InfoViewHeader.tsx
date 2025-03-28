import { RefObject } from "react";
import EditProfileModal from "../../organism/edit_profile_modal/EditProfileModal";
import ToolButton from "../toolbutton/ToolButton";
import "./InfoViewHeader.css";

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
        <EditProfileModal toggleDialog={handleClick} ref={dialogRef} />
      </div>
    </>
  );
}

export default InfoViewHeader;
