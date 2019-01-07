import React from 'react';

export default class FileSort extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.keyword;
        this.props.setKeyword({
            keyword: form.keyword.value,
            dirPath: this.props.dirPath,
        })
        form.keyword.value = '';
    }

    render() {
        return (
            <div>
                <p>
                    <b>Organize by Keyword(s):</b><br></br>
                    Enter a keyword to create a new directory and move the files that contain the keyword inside.<br></br>
                </p>
                <form name="keyword" onSubmit={this.handleSubmit}>
                    <input type="text" name="keyword" placeholder="Keyword to sort"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}