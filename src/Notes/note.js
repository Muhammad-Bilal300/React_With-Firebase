import React, { Component } from 'react';
import './note.css';

class Note extends Component {

    constructor(props) {
        super(props);
        this.message = "Hello From the Note Component!";
        this.noteContent = this.props.noteContent;
        this.noteId = this.props.noteId;
        

    }

    handleRemoveNote = (id) => {
        this.props.removeNote(id)
    }
    render(props) {

        return (

            <div className="note fade-in">
                <span className="closebtn" onClick={() => this.handleRemoveNote(this.noteId)}>
                    &times;
                </span>
                <p className="noteContent">{this.noteContent}</p>
            </div>

        )
    }
}
export default Note;