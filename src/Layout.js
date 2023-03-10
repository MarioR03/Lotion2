import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import NoteButton from "./NoteButton";
import NoteContent from "./NotesContent";

const localStorageKey = "thisismykey";

function Layout() {
  const existing = localStorage.getItem(localStorageKey);
  const [noteArray, setNoteArray] = useState([]);
  const [navCSS, setnavCSS] = useState({ display: "flex" });
  const [liveNote, setLiveNote] = useState(false);
  const [latestNote, setLatestNote] = useState(false);
  const getLiveNote = () => {
    return noteArray.find((note) => note.id === liveNote);
  };
  // localStorage.clear();
  useEffect(() => {
    setNoteArray([latestNote, ...noteArray]);
    if (noteArray.length > 0) setLiveNote(noteArray[0]);
  }, [latestNote]);

  useEffect(() => {
    if (existing) {
      setNoteArray(JSON.parse(existing));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(noteArray));
    console.log("notes changed");
  }, [noteArray]);

  const editNote = (updatedNote) => {
    const upNotesArray = noteArray.map((note) => {
      if (note.id === liveNote) {
        return updatedNote;
      }

      return note;
    });

    setNoteArray(upNotesArray);
  };

  return (
    <>
      <header>
        <button
          onClick={() => {
            if (navCSS.display === "flex") {
              setnavCSS({ display: "none" });
            } else {
              setnavCSS({ display: "flex" });
            }
          }}
          id="menu_button"
        >
          &#9776;
        </button>
        <div id="title">
          <h1>Lotion</h1>
          <p>Like Notion, but worse.</p>
        </div>
      </header>
      <div id="content">
        <div style={navCSS} id="side_nav">
          <div id="side_nav_title">
            <h2>Notes</h2>
            <button
              onClick={() => {
                let newNote = {
                  id: v4(),
                  title: "Untitled",
                  body: "...",
                  date: "",
                };
                setLatestNote(newNote);
                // setNoteArray([newNote, ...noteArray]);

                // setLiveNote(newNote.id);
              }}
              id="addNote"
            >
              &#x2b;
            </button>
          </div>
          {/*The map method bellow creates a component for each individual element in the noteArray array*/}
          {noteArray.map((props, index) => (
            <NoteButton
              key={index}
              props={props}
              liveNote={liveNote}
              setLiveNote={setLiveNote}
            />
          ))}
        </div>
        <NoteContent liveNote={getLiveNote()} editNote={editNote} />
      </div>
    </>
  );
}

export default Layout;
