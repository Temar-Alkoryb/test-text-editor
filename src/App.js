import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import fetchSynonyms from './synonym.service';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedText: '',
            synonyms: null,
        }
    }

    wrapSelectedText = style => {
        const selection = window.getSelection();
        if (selection.rageCount) {
          const range = selection.getRangeAt(0);
          const selectedText = range.extractContents();
        }
        

        switch(style) {
            case 'boldText':
                document.execCommand('bold', false, '')
                break
            case 'italicText':
                document.execCommand('italic', false, '')
                break
            case 'underlinedText':
                document.execCommand('underline', false, '')
                break
            case 'setIndentationRight':
                document.execCommand('justifyRight', false, '')
                break
            case 'setIndentationLeft':
                document.execCommand('justifyLeft', false, '')
                break
            case 'setIndentationCenter':
                document.execCommand('justifyCenter', false, '')
                break
            default:
                break

        }
    }

    getSelection = (e) => {
        e.persist()
        const value = window.getSelection().toString()
        this.setState({ selectedText: value })
        const fullText = e.currentTarget.innerText
        const popup = document.getElementById('popup')
        

        if (value) {
            this.setState(() => { selectedText: value.firstChild })
            fetchSynonyms(value)
                .then(data => {
                    if (data.length) {
                        popup.className = 'showPopup'
                        popup.style.position = 'absolute'
                        popup.style.top = e.clientY + 15 + 'px'
                        popup.style.left = e.clientX + 'px'
                        popup.style.maxWidth = '500px'
                        this.renderButtons(data)

                    }
                })
        }
    }

    renderButtons = data => {
        this.setState({
            synonyms: data.map((d, id) => {
                return <button key={id} onClick={() => this.hidePopup(d.word)}>{d.word}</button>
            }) 
        })
        
    }

    hidePopup = e => {
        const popup = document.getElementById('popup')
        popup.className = 'hidePopup'
    }

    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        setBold={() => this.wrapSelectedText('boldText')}
                        setItalic={() => this.wrapSelectedText('italicText')}
                        setUnderline={() => this.wrapSelectedText('underlinedText')}
                        setIndentationRight={() => this.wrapSelectedText('setIndentationRight')}
                        setIndentationLeft={() => this.wrapSelectedText('setIndentationLeft')}
                        setIndentationCenter={() => this.wrapSelectedText('setIndentationCenter')}
                    />
                    <FileZone
                        popoverOpen={this.state.popoverOpen}
                        popoverTarget={this.state.popoverTarget}
                        getSynonyms={(e) => this.getSelection(e)}
                    />
                    <div id="popup" className="hidePopup">{this.state.synonyms}</div>
                </main>
            </div>
        );
    }
}

export default App;
