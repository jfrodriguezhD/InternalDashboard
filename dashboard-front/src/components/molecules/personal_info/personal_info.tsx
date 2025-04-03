import { ChangeEvent, useContext, useState } from "react";
import { Prospects } from "../../atoms/prospect_row/Prospect_Row";
import "./personal_info.css";
import { ProspectContext } from "../../organism/prospect_view_menu/ProspectView";
import { prospectPutApiURL } from "../../../data/endpoints/api_endpoints";

interface PersonalInfoEditProps {
  closeModal: () => void;
}

function Personal_Info_Edit({ closeModal }: PersonalInfoEditProps) {
  const prospect = useContext(ProspectContext);

  const [data, setData] = useState<Prospects>(prospect!);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    console.log(name, value);
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const modifyURL = `${prospectPutApiURL}/${data.id}`;

    fetch(modifyURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        alert("Profile successfully updated: " + JSON.stringify(data))
      );
    location.reload();

    closeModal();
  };

  return (
    <div className="personal__info__edit">
      <div className="personal__info__edit__header">
        <h1>Edit Prospect Information</h1>
        <button className="close-modal" onClick={closeModal}>
          X
        </button>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        method="PUT"
        className="personal__info__edit__form"
      >
        <label htmlFor="phone_num">Phone: </label>
        <input
          type="tel"
          name="phone"
          id="phone_num"
          className="personal__info__edit__form__input"
          value={data?.phone}
          onChange={handleChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          className="personal__info__edit__form__input"
          value={data?.email}
          onChange={handleChange}
        />
        <label htmlFor="resume_file">Resume: </label>
        <div className="file__upload">
          <input
            type="file"
            name="route_to_resume"
            id="resume_file"
            className="file__input"
            onChange={handleChange}
          />
          <div className="file__upload__message">
            Drag and drop a file to upload or
            <a href="#" className="file__upload__link">
              {" "}
              Select a file from your computer{" "}
            </a>
          </div>
        </div>
        <div className="file-upload-instructions">
          Please ensure the resume is a Word or PDF file up to 2MB size
        </div>
        <label htmlFor="route_to_resume">
          {data.route_to_resume != ""
            ? "Current file: " + data.route_to_resume
            : ""}
        </label>
        <div className="personal__info__submit">
          <input
            type="submit"
            value="Save"
            id="personal_info"
            className="personal__info__submit__button save__button"
          />
          <input
            type="button"
            value="Cancel"
            className="personal__info__submit__button"
          />
        </div>
      </form>
    </div>
  );
}

export { Personal_Info_Edit };
