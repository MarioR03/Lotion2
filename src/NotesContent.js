import { React } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

function NoteContent({ liveNote, editNote, shouldEdit }) {
  const { noteID } = useParams;
  const onEditField = (key, value) => {
    editNote({
      ...liveNote,
      [key]: value,
    });
    console.log(typeof value);
  };

  if (!liveNote) {
    return <div className="notesContent-editLive"></div>;
  }

  return (
    <>
      <div
        className="notesContent-editLive"
        id={`${liveNote.id}`.toString() + "-A"}
      >
        <div className="noteContentHeader">
          <div className="nameDate">
            <input
              type="text"
              id="title"
              value={liveNote.title}
              onChange={(e) => onEditField("title", e.target.value)}
              autoFocus
            />
            <p className="date">date</p>
          </div>
          <div className="editDelete">
            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={liveNote.body}
          onChange={(e) => onEditField("body", e)}
        />
      </div>
    </>
  );
}
export default NoteContent;
