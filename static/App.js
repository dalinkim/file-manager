"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var FileSort = function (_React$Component) {
    _inherits(FileSort, _React$Component);

    function FileSort() {
        _classCallCheck(this, FileSort);

        var _this = _possibleConstructorReturn(this, (FileSort.__proto__ || Object.getPrototypeOf(FileSort)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(FileSort, [{
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { name: "keyword", onSubmit: this.handleSubmit },
                    React.createElement("input", { type: "text", name: "keyword", placeholder: "Keyword to sort" }),
                    React.createElement(
                        "button",
                        null,
                        "Submit"
                    )
                )
            );
        }
    }]);

    return FileSort;
}(React.Component);

var DirContent = function (_React$Component2) {
    _inherits(DirContent, _React$Component2);

    function DirContent() {
        _classCallCheck(this, DirContent);

        return _possibleConstructorReturn(this, (DirContent.__proto__ || Object.getPrototypeOf(DirContent)).apply(this, arguments));
    }

    _createClass(DirContent, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "placeholder for directory content"
            );
        }
    }]);

    return DirContent;
}(React.Component);

// stateless component rewritten as a function rather than a class


var FileRow = function FileRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.file.path
        ),
        React.createElement(
            "td",
            null,
            props.file.name
        ),
        React.createElement(
            "td",
            null,
            props.file.type
        )
    );
};

// initial rendering of the IssueTable component now uses the array from the state as its source data
// stateless component rewritten as a function rather than a class
var FileTable = function FileTable(props) {
    var fileRows = props.files.map(function (file) {
        return React.createElement(FileRow, { key: file.name, file: file });
    });
    return React.createElement(
        "table",
        { className: "bordered-table" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Path"
                ),
                React.createElement(
                    "th",
                    null,
                    "Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Type"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            fileRows
        )
    );
};

var FilePath = function (_React$Component3) {
    _inherits(FilePath, _React$Component3);

    function FilePath() {
        _classCallCheck(this, FilePath);

        var _this3 = _possibleConstructorReturn(this, (FilePath.__proto__ || Object.getPrototypeOf(FilePath)).call(this));

        _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
        return _this3;
    }

    _createClass(FilePath, [{
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.pathSet;
            // console.log(typeof form.url.value);
            this.props.setPath({
                path: form.url.value
            });
            form.url.value = '';
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { name: "pathSet", onSubmit: this.handleSubmit },
                    React.createElement("input", { type: "text", name: "url", placeholder: "Enter url" }),
                    React.createElement(
                        "button",
                        null,
                        "Submit"
                    )
                )
            );
        }
    }]);

    return FilePath;
}(React.Component);

var FileOrganizer = function (_React$Component4) {
    _inherits(FileOrganizer, _React$Component4);

    function FileOrganizer() {
        _classCallCheck(this, FileOrganizer);

        var _this4 = _possibleConstructorReturn(this, (FileOrganizer.__proto__ || Object.getPrototypeOf(FileOrganizer)).call(this));

        _this4.state = { files: [], keyword: '', path: '' };
        _this4.setPath = _this4.setPath.bind(_this4);
        return _this4;
    }

    _createClass(FileOrganizer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            var _this5 = this;

            fetch('/api/path').then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log('loading data');
                _this5.setState({ files: data.records });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: "setPath",
        value: function setPath(newPath) {
            var _this6 = this;

            // console.log(newPath);
            fetch('/api/path', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPath)
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (newFiles) {
                        _this6.setState({ path: newPath.path });
                        _this6.setState({ files: newFiles });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to set path: " + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in sending data to server: " + err.message);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("hr", null),
                React.createElement(FilePath, { setPath: this.setPath }),
                React.createElement("hr", null),
                React.createElement(
                    "p",
                    null,
                    "Directory content for ",
                    React.createElement(
                        "b",
                        null,
                        this.state.path
                    )
                ),
                React.createElement(FileTable, { files: this.state.files }),
                React.createElement("hr", null)
            );
        }
    }]);

    return FileOrganizer;
}(React.Component);

ReactDOM.render(React.createElement(FileOrganizer, null), contentNode);

/////////