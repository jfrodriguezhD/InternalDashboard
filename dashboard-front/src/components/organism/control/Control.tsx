import "./Control.css";
import ToolButton from "../../atoms/toolbutton/ToolButton";
import WordBubble from "../../atoms/wordbubble/WordBubble";
import { outputs, filters, tools } from "../../../data/control/control_data";

export default function Control() {
  return (
    <div className="control">
      <section className="control__heading">
        <h2>Prospects/Roster</h2>
        <p className="control__heading__total">x in total</p>
      </section>
      <section className="control__output">
        {outputs.map((output, index) => {
          return <WordBubble word={output} group="output" type="radio" key={index}/>;
        })}
      </section>
      <section className="control__grid">
        <p>Search prospects:</p>
        <p>Sort by:</p>
        <input
          className="control__grid__search"
          type="text"
          placeholder="Search by Name"
        ></input>
        <div className="control__grid__filters">
          {filters.map((filter, index) => {
            return <WordBubble word={filter} group="filters" type="radio" key={index}/>;
          })}
        </div>
      </section>
      <section className="control__tools">
        {tools.map((tool, index) => {
          return <ToolButton word={tool.word} group="tools" icon={tool.icon} key={index}/>;
        })}
      </section>
    </div>
  );
}
