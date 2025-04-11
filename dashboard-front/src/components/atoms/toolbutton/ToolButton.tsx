import { use, useState } from "react";
import { tools } from "../../../data/control/control_data";
import "./ToolButton.css";

interface ToolButtonProps {
  word?: string;
  icon: string;
  group: string;
  handleClick?: () => void;
}

function ToolButton({ word, icon, group, handleClick }: ToolButtonProps) {
  return (
    <label className="ToolButton">
      <i className={icon} />
      <p>{word}</p>
      <input type="radio" name={group} onClick={handleClick} id={word} ></input>
    </label>
  );
}
export default ToolButton;
