import React from 'react';

export default class FilePath extends React.Component {
    constructor() {
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.pathSet;
        this.props.setPath({
            dirPath: form.url.value,
        });
        form.url.value = '';
    }
    render() {
        return (
            <div>
                <p>
                    <b>Directory Lookup: </b><br></br>
                    Enter an absolute or a relative directory path (w.r.t. current working directory) to display the directory content.<br></br>
                    Default path is './server' when the server starts.
                </p>
                <form name="pathSet" onSubmit={this.handleSubmit}>
                    <input type="text" name="url" placeholder="Enter path"/>
                    <button>Open Directory</button>
                </form>
            </div>
        );
    }
}