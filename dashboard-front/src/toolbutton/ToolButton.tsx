interface ToolButtonProps {
  word: string;
  icon: string;
  group: string;
}

export default function ToolButton({ word, icon, group }: ToolButtonProps) {
  return (
    <>
      <label className="ToolButton">
        <i className={icon} />
        <p>{word}</p>
        <input type="radio" name={group}></input>
      </label>
    </>
  );
}
