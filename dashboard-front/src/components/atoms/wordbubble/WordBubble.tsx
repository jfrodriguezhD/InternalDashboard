import "./WordBubble.css";

interface WordBubbleProps {
  word: string;
  group: string;
  type: string;
  onClick?: () => void;
}

export default function WordBubble({
  word,
  group,
  type,
  onClick,
}: WordBubbleProps) {
  return (
    <>
      <label className={`WordBubble ${group}`} onClick={onClick}>
        {word}
        <input type={type} name={group}></input>
      </label>
    </>
  );
}
