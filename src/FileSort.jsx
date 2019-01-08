import React from 'react';

export default class FileSort extends React.Component {
    constructor() {
        super();
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAdd(e) {
        e.preventDefault();
        let form = document.forms.keyword;
        this.props.addKeyword(form.keyword.value);
        form.keyword.value = '';
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.organizeByKeywords();
    }

    render() {
        return (
            <div>
                <p>
                    <b>Organize by Keyword(s):</b><br/>
                    Add a keyword to create a new directory and move the matching files. Multiple keywords can be added.<br/>
                </p>
                <form name="keyword" onSubmit={this.handleAdd}>
                    <input type="text" name="keyword" placeholder="Keyword to sort"/>
                    <button>Add Keyword</button>
                </form>
                <p>
                    Click 'Submit' to organize. It will take a moment to extract all file contents and make necessary changes to the directory.<br/>
                    New folder named 'textracted' will also be created which contains all textracted files with details on matched keyword(s) and extracted text.<br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </p>
            </div>
        );
    }
}