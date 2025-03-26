import WordBubble from "../../atoms/wordbubble/WordBubble";
import "./EditProfileModal.css";
import {
  senorities,
  mainCapabilities,
  subCapabilities,
} from "../../../data/edit_prospect_information/edit_prospect_information_data";
import { forwardRef } from "react";

interface Props {
  toggleDialog: () => void;
}

export default forwardRef<HTMLDialogElement, Props>(function EditProfileModal(
  { toggleDialog },
  ref
) {
  return (
    <dialog ref={ref} className="edit-profile-modal">
      <div className="edit-profile-modal__heading">
        <h2>Edit Prospect Information</h2>
        <button className="close-modal" onClick={() => toggleDialog()}>
          X
        </button>
      </div>

      <div className="edit-profile-modal__name">
        <p>Prospect Name:</p>
        <input type="text" />
      </div>

      <div className="edit-profile-modal__senority">
        <p>Senority:</p>
        {senorities.map((senority) => (
          <WordBubble word={senority} group={"senority"} type={"radio"} />
        ))}
      </div>

      <div className="edit-profile-modal__status">
        <p>Status:</p>
        <select name="status">
          <option value="hired">Hired</option>
          <option value="active">Active</option>
          <option value="discarted">Discarted</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      <div className="edit-profile-modal__job-title">
        <p>Job Title:</p>
        <select name="job_title">
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Full Stack Developer</option>
        </select>
      </div>

      <div className="edit-profile-modal__capabilities">
        <p>Main Capabilities:</p>
        {mainCapabilities.map((mainCapability) => (
          <WordBubble
            word={mainCapability}
            group={"capabilities"}
            type={"checkbox"}
          />
        ))}
      </div>
      <div className="edit-profile-modal__capabilities">
        <p>Sub Capabilities:</p>
        {subCapabilities.map((subCapability) => (
          <WordBubble
            word={subCapability}
            group={"capabilities"}
            type={"checkbox"}
          />
        ))}
      </div>
      <div className="edit-profile-modal__buttons">
        <button className="save-button">Save</button>
        <button className="cancel-button">Cancel</button>
      </div>
    </dialog>
  );
});
