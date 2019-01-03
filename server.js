'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

const testFolder = './files/';
let pathName = {};
let pathContent = [
    {
        path: './',
        name: 'text1.txt',
        ext: 'txt'
    },
    {
        path: './',
        name: 'doc1.docx',
        ext: 'docx'
    },
];

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('App started on port 3000');
});

app.get('/api/files', (req, res) => {
    // fs.readdir(testFolder, (err, files) => {
    //     if (err) {
    //         res.status(422).json({ message: `${err}` });
    //         return;
    //     }
    //     files.forEach(file => {
    //         console.log(typeof file);
    //     });
    // });
    const metadata = {
        total_count: pathContent.length
    };
    res.json({
        _metadata: metadata,
        records: pathContent
    });
});

app.post('/api/path', (req, res) => {
    const newPath = req.body;
    // console.log(newPath);
    const err = validatePath(newPath.path);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    pathName = newPath;
    // console.log(pathName);
    res.json(newPath);
});

function validatePath(path) {
    if (typeof path !== 'string')
        return `${path} is not a string`
    return null;
}