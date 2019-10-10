import React, { Component } from 'react';
import './App.css';
import Note from './Notes/note';
import NoteForm from './NoteForm/noteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase';
import 'firebase/database';







class App extends React.Component {

  constructor(props) {
    super(props);

    

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');

    this.state = {
      notes: [],
      id: 0
    }
  }

  componentWillMount() {
    const previousNotes = this.state.notes;

    this.db.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({
        notes: previousNotes
      })
    })

    this.db.on('child_removed', snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1)
        }
      }
      this.setState({
        notes: previousNotes
      })
    })
  }


  addNote = (note) => {
    this.db.push().set({ noteContent: note })


    // var previousNotes = this.state.notes;
    // previousNotes.push({ id: previousNotes.length + 1, noteContent: note })

    // this.setState({
    //   notes: previousNotes
    // })


  }
  removeNote = (noteId) => {
    console.log("From the Parent:" + noteId)
    this.db.child(noteId).remove();
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <div className="notesWrapper">
          <div className="notesHeader">
            <h1 className="text-center heading">React,Redux Todo List With Firebase</h1>
          </div>
          <br></br>
          <div className="notesBody">
            {
              this.state.notes.map((note) => {
                return (
                  <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote} />
                )
              })
            }
          </div>
          <div className="notesFooter text-center">
            <NoteForm addNote={this.addNote} />
          </div>
        </div>
      </div>
    )

  }
}
export default App;