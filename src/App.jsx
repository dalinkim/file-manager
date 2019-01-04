const contentNode = document.getElementById('contents');

class FileSort extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div>
                <form name="keyword" onSubmit={this.handleSubmit}>
                    <input type="text" name="keyword" placeholder="Keyword to sort"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

class DirContent extends React.Component {
    render() {
        return (
            <div>placeholder for directory content</div>
        );
    }
}

// stateless component rewritten as a function rather than a class
const FileRow = (props) => (
    <tr>
        <td>{props.file.path}</td>
        <td>{props.file.name}</td>
        <td>{props.file.type}</td>
    </tr>
);

// initial rendering of the IssueTable component now uses the array from the state as its source data
// stateless component rewritten as a function rather than a class
const FileTable = (props) => {
    const fileRows = props.files.map(file =>
        <FileRow key={file.name} file={file} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Path</th>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>{fileRows}</tbody>
        </table>
    );
}

class FilePath extends React.Component {
    constructor() {
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.pathSet;
        // console.log(typeof form.url.value);
        this.props.setPath({
            path: form.url.value,
        });
        form.url.value = '';
    }
    render() {
        return (
            <div>
                <form name="pathSet" onSubmit={this.handleSubmit}>
                    <input type="text" name="url" placeholder="Enter url"/>
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
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('/api/path').then(response =>
            response.json()
        ).then(data => {
            console.log('loading data');
            this.setState({ files: data.records });
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
                })
            } else {
                response.json().then(error => {
                    alert("Failed to set path: " + error.message)
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
                <p>Directory content for <b>{this.state.path}</b></p>
                <FileTable files={this.state.files}/>
                <hr/>
                {/* <FileSort /> */}
            </div>
        )
    }
}

ReactDOM.render(<FileOrganizer />, contentNode);

/////////
