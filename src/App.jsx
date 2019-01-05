const contentNode = document.getElementById('contents');

class FileSort extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.keyword;
        this.props.setKeyword({
            keyword: form.keyword.value,
        })
        form.keyword.value = '';
    }

    render() {
        return (
            <div>
                <p>
                    <b>Folder Organization: </b><br></br>
                    Enter a keyword to create a new directory and put files matching the keyword.<br></br>
                </p>
                <form name="keyword" onSubmit={this.handleSubmit}>
                    <input type="text" name="keyword" placeholder="Keyword to sort"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

// stateless component rewritten as a function rather than a class
const FileRow = (props) => (
    <tr>
        <td>{props.file.path}</td>
        <td>{props.file.name}</td>
        <td>{props.file.type}</td>
        <td style={{ textAlign: 'right' }}>{props.file.size}</td>
    </tr>
);

// initial rendering of the IssueTable component now uses the array from the state as its source data
// stateless component rewritten as a function rather than a class
const FileTable = (props) => {
    const fileRows = props.files.map(file =>
        <FileRow key={file.fullName} file={file} />);
    return (
        <div>
            <p>
                <b>Content Display: </b>Files in {props.path}<br></br>
                <small>
                    NOTE: Current working directory content should be displayed at the start of server. 
                    Hidden files are not handled.
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

class FilePath extends React.Component {
    constructor() {
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.pathSet;
        // console.log(typeof form.url.value);
        this.props.setPath({
            path: form.url.value,
        });
        form.url.value = '';
    }
    render() {
        return (
            <div>
                <p>
                    <b>Directory Lookup: </b><br></br>
                    Enter an absolute or a relative directory path to display all files.<br></br>
                </p>
                <form name="pathSet" onSubmit={this.handleSubmit}>
                    <input type="text" name="url" placeholder="Enter path"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

class FileOrganizer extends React.Component {
    constructor() {
        super();
        this.state = { files: [], keyword: '', path: '' };
        this.setPath = this.setPath.bind(this);
        this.setKeyword = this.setKeyword.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('/api/files').then(response =>
            response.json()
        ).then(data => {
            console.log('loading data');
            this.setState({ files: data.records });
            this.setState({ path: data.path });
        }).catch(err => {
            console.log(err);
        });
    }
    
    setPath(newPath) {
        // console.log(newPath);
        fetch('/api/path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPath),
        }).then(response => {
            if (response.ok) {
                response.json().then(newFiles => {
                    this.setState({ path: newPath.path });
                    this.setState({ files: newFiles });
                });
            } else {
                response.json().then(err => {
                    alert("Failed to set path: \n" + err.message)
                });
            }
        }).catch(err => {
            alert("Error in sending data to server: " + err.message);
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
                <FileSort setKeyword={this.setKeyword}/>
                <hr/>
                <FileTable files={this.state.files} path={this.state.path}/>
            </div>
        )
    }
}

ReactDOM.render(<FileOrganizer />, contentNode);

/////////
