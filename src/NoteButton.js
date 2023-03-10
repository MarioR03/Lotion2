import { React } from "react";

function NoteButton({ props, liveNote, setLiveNote }) {
  function checkIfLive() {
    var string = "noteButtons";
    if (props.id === liveNote) {
      string += "Live";
    }
    return string;
  }

  if (!props) {
    return null;
  }

  return (
    <button
      onClick={() => setLiveNote(props.id)}
      className={checkIfLive()}
      id={`${props.id}`.toString()}
    >
      <h3 className="propsTitle">{props.title}</h3>
      <p className="propsDate">{props.date}</p>
      <p className="propsText">{props.body}</p>
    </button>
  );
}
export default NoteButton;
