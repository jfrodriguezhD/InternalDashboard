import "./WordBubble.css";

interface WordBubbleProps {
  word: string;
  group: string;
  type: string;
  check?: boolean;
  onClick?: () => void;
}

export default function WordBubble({
  word,
  group,
  type,
  check,
  onClick,
}: WordBubbleProps) {
  return (
    <>
      <label className={`WordBubble ${group}`} onClick={onClick}>
        {word}
        <input type={type} name={group} checked={check}></input>
      </label>
    </>
  );
}
