import { FormEvent, useRef } from "react";
import { capabilityBaseApiURL } from "../../../data/endpoints/api_endpoints";
import "./Capability_Form.css";

interface Capability_Form_Props {
  setIsRemoveActive: (a: any) => void;
}

const Capability_Form = ({ setIsRemoveActive }: Capability_Form_Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch(capabilityBaseApiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        type: typeRef.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    location.reload();
  };

  const handleRemove = () => {
    setIsRemoveActive((prevIsRemoveActive: any) => !prevIsRemoveActive);
  };

  return (
    <>
      <form className="capability-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          className="capability-form__input"
          placeholder="Add a new Capability"
          ref={nameRef}
        ></input>
        <select ref={typeRef}>
          <option defaultChecked>Type:</option>
          <option value={"MAIN_CAPABILITY"}>Main Capability</option>
          <option value={"SECONDARY_CAPABILITY"}>Subcapability</option>
        </select>
        <button className="add-capability" type="submit">
          +
        </button>
        <button
          className="remove-capability"
          type="button"
          onClick={() => handleRemove()}
        >
          -
        </button>
      </form>
    </>
  );
};

export default Capability_Form;
