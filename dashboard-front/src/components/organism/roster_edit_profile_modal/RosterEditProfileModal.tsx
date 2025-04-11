import { forwardRef, useContext, useEffect, useState } from "react";
import { senorities } from "../../../data/edit_roster_information/edit_roster_information_data";
import {
  capabilityBaseApiURL,
  rosterBaseApiURL,
} from "../../../data/endpoints/api_endpoints";
import { Capabilities, Roster } from "../../../data/entities_types/types";
import WordBubble from "../../atoms/wordbubble/WordBubble";
import { RosterContext } from "../roster_view/RosterView";
import "./RosterEditProfileModal.css";

interface Props {
  toggleDialog: () => void;
}

export default forwardRef<HTMLDialogElement, Props>(function EditProfileModal(
  { toggleDialog },
  ref
) {
  const ProfileData = useContext(RosterContext);
  const [person, setPerson] = useState<Roster>(ProfileData!);
  const [Capabilities, setCapabilities] = useState<Capabilities[]>([]);

  useEffect(() => {
    setPerson(ProfileData!);
    fetchCapablities();
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

  async function fetchCapablities() {
    try {
      const response = await fetch(capabilityBaseApiURL);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: Capabilities[] = await response.json();
      setCapabilities(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const handleCapabilityChange = (capability: Capabilities) => {
    if (capability.type === "MAIN_CAPABILITY") {
      setPerson((prevPerson) => {
        //List of previous capabilities
        const prevCapabilities = prevPerson.capabilities;

        const removeCap = prevCapabilities.filter(
          (prevCap) => prevCap.id == capability.id
        );
        let updatedCap;
        if (removeCap.length == 0) {
          updatedCap = [...prevCapabilities, capability];
        } else {
          updatedCap = prevCapabilities.filter(
            (prevCap) => prevCap.id != capability.id
          );
        }
        return { ...prevPerson, capabilities: updatedCap };
      });
    } else {
      setPerson((prevPerson) => {
        //List of previous capabilities
        const prevSubCapabilities = prevPerson.sub_capabilities;

        const removeCap = prevSubCapabilities.filter(
          (prevSubCap) => prevSubCap.id == capability.id
        );
        let updatedSubCap;
        if (removeCap.length == 0) {
          updatedSubCap = [...prevSubCapabilities, capability];
        } else {
          updatedSubCap = prevSubCapabilities.filter(
            (prevSubCap) => prevSubCap.id != capability.id
          );
        }
        return { ...prevPerson, sub_capabilities: updatedSubCap };
      });
    }
  };

  //   const initCap = new Set(prevPerson.capabilities);
  //   ...person,
  //   capabilities:
  // })
  // setPerson((prevState) => {
  // }
  //   const updatedCapabilities =
  //     type === "MAIN_CAPABILITY"
  //       ? [...(prevState.capabilities || []), capability]
  //       : prevState.capabilities || [];
  //   const updatedSubCapabilities =
  //     type === "SECONDARY_CAPABILITY"
  //       ? [...(prevState.sub_capabilities || []), capability]
  //       : prevState.sub_capabilities || [];
  //       setPerson({
  //         ...person,
  //         seniority: [
  //           senority as "SENIOR" | "CONSULTANT" | "ANALYST" | "MANAGER",
  //         ],
  //       });
  //   return {
  //     ...prevState,
  //     capabilities: updatedCapabilities,
  //     sub_capabilities: updatedSubCapabilities,
  //   };
  // });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const modifyURL = `${rosterBaseApiURL}/${person.id}`;

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
        <h2>Edit Roster Information</h2>
        <button className="close-modal" onClick={() => toggleDialog()}>
          X
        </button>
      </div>

      <form method="PUT" onSubmit={(e) => handleSubmit(e)}>
        <div className="edit-profile-modal__name">
          <p>Roster Name:</p>
          <input
            type="text"
            name="name"
            value={person?.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <p>Roster Lastname:</p>
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
              onClick={() => {
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
          {Capabilities.filter(
            (capability) => capability.type === "MAIN_CAPABILITY"
          ).map((mainCapability, index) => (
            <WordBubble
              word={mainCapability.name}
              group={"capabilities"}
              type={"checkbox"}
              check={person.capabilities
                .map((capability) => capability.name)
                .includes(mainCapability.name)}
              key={index}
              handleChange={() => handleCapabilityChange(mainCapability)}
            />
          ))}
        </div>
        <div className="edit-profile-modal__capabilities">
          <p>Sub Capabilities:</p>
          {Capabilities.filter(
            (capability) => capability.type === "SECONDARY_CAPABILITY"
          ).map((subCapability, index) => (
            <WordBubble
              word={subCapability.name}
              group={"capabilities"}
              type={"checkbox"}
              check={person.sub_capabilities
                .map((capability) => capability.name)
                .includes(subCapability.name)}
              key={index}
              handleChange={() => handleCapabilityChange(subCapability)}
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
