import React, { Component } from 'react';
import './noteForm.css';
import { thisTypeAnnotation } from '@babel/types';

class NoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newNoteContent: ''
        }
    }
    noteHandleChange = (e) => {
        this.setState({
            newNoteContent: e.target.value,
        })

    }
    writeNote = () =>{

        this.props.addNote(this.state.newNoteContent);

        this.setState({
            newNoteContent:''
        })
    }

    render() {
        return (
            <div className="container">
                <form className="formWrapper">
                    <input className="noteInput"
                        value={this.state.newNoteContent}
                        onChange={this.noteHandleChange}
                        placeholder="Write a new note..." />
                    <button className="noteButton" type="button" onClick={this.writeNote}>Add Note</button>
                </form>

            </div>
        )

    }
}
export default NoteForm;