import "./WordBubble.css";

interface WordBubbleProps {
  word: string;
  group: string;
  type: string;
  check?: boolean;
  onClick?: () => void;
  handleChange?: (e: any) => void;
}

export default function WordBubble({
  word,
  group,
  type,
  check,
  onClick,
  handleChange,
}: WordBubbleProps) {
  return (
    <>
      <label className={`WordBubble ${group}`} onClick={onClick}>
        {word}
        <input
          type={type}
          name={group}
          checked={check}
          onChange={handleChange}
        ></input>
      </label>
    </>
  );
}
