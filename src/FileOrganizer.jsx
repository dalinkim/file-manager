import React from 'react';
import 'whatwg-fetch';
import FilePath from './FilePath.jsx';
import FileSort from './FileSort.jsx';

// stateless component rewritten as a function rather than a class
const FileRow = (props) => (
    <tr>
        <td>{props.file.dirPath}</td>
        <td>{props.file.fileName}</td>
        <td style={{ textAlign: 'right' }}>{props.file.fileType}</td>
        <td style={{ textAlign: 'right' }}>{props.file.fileSize}</td>
    </tr>
);

// initial rendering of the IssueTable component now uses the array from the state as its source data
// stateless component rewritten as a function rather than a class
const FileTable = (props) => {
    const fileRows = props.files.map(file =>
        <FileRow key={file.filePath} file={file} />);
    return (
        <div>
            <p>
                <b>Display Content:</b><br></br>
                Table lists all files in the following directory path: {props.path}<br></br>
                <small>
                    Note: Hidden files/directories are ignored.<br/>
                    Note: Current working directory content should be displayed at the start of the server. 
                </small>
            </p>
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Path</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>{fileRows}</tbody>
            </table>
        </div>
    );
}

export default class FileOrganizer extends React.Component {
    constructor() {
        super();
        this.state = { files: [], keyword: '', dirPath: '' };
        this.setPath = this.setPath.bind(this);
        this.setKeyword = this.setKeyword.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('/api/files')
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                    // console.log('loading data');
                    this.setState({ files: data.records });
                    this.setState({ dirPath: data.dirPath });
                })
            } else {
                response.json()
                .then(err => {
                    alert("Failed to load data:\n" + err.message);
                });
            }
        })
        .catch(err => {
            alert("Error in fetching data from server:\n" + err.message);
        });
    }
    
    setPath(newPath) {
        // console.log(newPath);
        fetch('/api/path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPath),
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(newFiles => {
                    this.setState({ dirPath: newPath.dirPath });
                    this.setState({ files: newFiles });
                });
            } else {
                response.json()
                .then(err => {
                    alert("Failed to set path:\n" + err.message)
                });
            }
        })
        .catch(err => {
            alert("Error in sending data to server:\n" + err.message);
        });
    }

    setKeyword(newKeyword) {
        fetch('/api/keyword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newKeyword),
        }).then(response => {
            if (response.ok) {
                response.json().then(newFiles => {
                    this.setState({ keyword: newKeyword.keyword });
                    this.setState({ files: newFiles });
                });
            } else {
                response.json().then(err => {
                    alert("Failed to sort by keyword: \n" + err.message)
                });
            }
        }).catch(err => {
            alert("Error in sending data to server: " + err.message);
        });
    }

    render() {
        return (
            <div>
                <hr/>
                <FilePath setPath={this.setPath}/>
                <hr/>
                <FileSort setKeyword={this.setKeyword} dirPath={this.state.dirPath}/>
                <hr/>
                <FileTable files={this.state.files} dirPath={this.state.dirPath}/>
            </div>
        )
    }
}