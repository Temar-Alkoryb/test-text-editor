import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button onClick={this.props.setBold} className="format-action" type="button"><b>B</b></button>
                    <button onClick={this.props.setItalic} className="format-action" type="button"><i>I</i></button>
                    <button onClick={this.props.setUnderline} className="format-action" type="button"><u>U</u></button>
                    <button onClick={this.props.setIndentationLeft} className="format-action" type="button">Left</button>
                    <button onClick={this.props.setIndentationCenter} className="format-action" type="button">Center</button>
                    <button onClick={this.props.setIndentationRight} className="format-action" type="button">Right</button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
