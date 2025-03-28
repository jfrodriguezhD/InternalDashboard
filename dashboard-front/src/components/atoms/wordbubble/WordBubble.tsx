import "./WordBubble.css";

interface WordBubbleProps {
  word: string;
  group: string;
  type: string;
}

export default function WordBubble({ word, group, type }: WordBubbleProps) {
  return (
    <>
      <label className={`WordBubble ${group}`}>
        {word}
        <input type={type} name={group}></input>
      </label>
    </>
  );
}
