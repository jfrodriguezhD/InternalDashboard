import "./WordBubble.css";

interface WordBubbleProps {
  word: string;
  group: string;
  type: string;
  check?: boolean;
}

export default function WordBubble({
  word,
  group,
  type,
  check,
}: WordBubbleProps) {
  return (
    <>
      <label className={`WordBubble ${group}`}>
        {word}
        <input type={type} name={group} checked={check}></input>
      </label>
    </>
  );
}
