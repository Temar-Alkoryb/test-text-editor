import React, { Component } from 'react';
import './FileZone.css';


class FileZone extends Component {
    render() {
        return (
            <div id="file-zone">
                <div id="file" contentEditable="true" onDoubleClick={this.props.getSynonyms}></div>
            </div>
        );
    }
}

export default FileZone;
