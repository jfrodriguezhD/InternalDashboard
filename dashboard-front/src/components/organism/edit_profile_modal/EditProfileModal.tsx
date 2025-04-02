import WordBubble from "../../atoms/wordbubble/WordBubble";
import "./EditProfileModal.css";
import {
  senorities,
  mainCapabilities,
  subCapabilities,
} from "../../../data/edit_prospect_information/edit_prospect_information_data";
import { forwardRef, useContext, useEffect, useState } from "react";
import { ProspectContext } from "../prospect_view_menu/ProspectView";
import { Prospects } from "../../atoms/prospect_row/Prospect_Row";
import { prospectPutApiURL } from "../../../data/endpoints/api_endpoints";

interface Props {
  toggleDialog: () => void;
}

export default forwardRef<HTMLDialogElement, Props>(function EditProfileModal(
  { toggleDialog },
  ref
) {
  const ProfileData = useContext(ProspectContext);
  const [person, setPerson] = useState<Prospects>(ProfileData!);

  useEffect(() => {
    setPerson(ProfileData!);
  }, [ProfileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const handleChangeEnums = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPerson({
      ...person,
      [name]: [value],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const modifyURL = `${prospectPutApiURL}/${person.id}`;

    fetch(modifyURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => response.json())
      .then((data) =>
        alert("Profile successfully updated: " + JSON.stringify(data))
      );
    location.reload();

    toggleDialog();
  };

  return (
    <dialog ref={ref} className="edit-profile-modal">
      <div className="edit-profile-modal__heading">
        <h2>Edit Prospect Information</h2>
        <button className="close-modal" onClick={() => toggleDialog()}>
          X
        </button>
      </div>

      <form method="PUT" onSubmit={(e) => handleSubmit(e)}>
        <div className="edit-profile-modal__name">
          <p>Prospect Name:</p>
          <input
            type="text"
            name="name"
            value={person?.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <p>Prospect Lastname:</p>
          <input
            type="text"
            name="last_name"
            value={person?.last_name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="edit-profile-modal__senority">
          <p>Senority:</p>
          {senorities.map((senority, index) => (
            <WordBubble
              word={senority}
              group={"senority"}
              type={"radio"}
              check={person?.seniority[0] == senority}
              key={index}
              handleChange={() => {
                setPerson({
                  ...person,
                  seniority: [
                    senority as "SENIOR" | "CONSULTANT" | "ANALYST" | "MANAGER",
                  ],
                });
              }}
            />
          ))}
        </div>

        <div className="edit-profile-modal__status">
          <p>Status:</p>
          <select
            name="status"
            value={person?.status[0]}
            onChange={(e) => {
              handleChangeEnums(e);
            }}
          >
            <option value="HIRED">Hired</option>
            <option value="ACTIVE">Active</option>
            <option value="DISCARTED">Discarted</option>
            <option value="PAUSED">Paused</option>
            <option value="NOT_IN_PROCESS">Not in Process</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="edit-profile-modal__job-title">
          <p>Job Title:</p>
          <select
            name="job_title"
            value={person?.job_title[0]}
            onChange={(e) => {
              handleChangeEnums(e);
            }}
          >
            <option value="FRONTEND_DEVELOPER">Frontend Developer</option>
            <option value="BACKEND_DEVELOPER">Backend Developer</option>
            <option value="FULLSTACK_DEVELOPER">Full Stack Developer</option>
          </select>
        </div>

        <div className="edit-profile-modal__capabilities">
          <p>Main Capabilities:</p>
          {mainCapabilities.map((mainCapability, index) => (
            <WordBubble
              word={mainCapability}
              group={"capabilities"}
              type={"checkbox"}
              key={index}
            />
          ))}
        </div>
        <div className="edit-profile-modal__capabilities">
          <p>Sub Capabilities:</p>
          {subCapabilities.map((subCapability, index) => (
            <WordBubble
              word={subCapability}
              group={"capabilities"}
              type={"checkbox"}
              key={index}
            />
          ))}
        </div>
        <div className="edit-profile-modal__buttons">
          <button className="save-button" type="submit">
            Save
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => toggleDialog()}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});
