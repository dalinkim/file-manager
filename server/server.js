'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const rename = promisify(fs.rename);
const copy = promisify(fs.copyFile);
const textractHandler = require('./textractHandler.js');
const contentHandler = require('./contentHandler.js');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

// GET
app.get('/api/files', (req, res) => {
    const defaultDirPath = path.resolve('./_test');

    contentHandler.getDirContent(defaultDirPath)
        .then((dirContent) => {
            const metadata = { total_count: dirContent.length };
            res.json({
                _metadata: metadata,
                records: dirContent,
                dirPath: defaultDirPath
            });
        })
        .catch((err) => {
            res.status(422).json({
                message: `${err}`
            });
        });
});

// POST - set new path for content review
app.post('/api/path', (req, res) => {
    const newDirPath = path.resolve(req.body.dirPath);

    
    contentHandler.getDirContent(newDirPath)
        .then((dirContent) => {
            res.json(dirContent);
        })
        .catch((err) => {
            res.status(422).json({
                message: `${err}`
            });
        })
});

// POST - set new keywords for organization
app.post('/api/keyword', (req, res) => {
    const keyword = req.body.keyword;
    const currentDirPath = path.resolve(req.body.dirPath);
    const newKeywordPath = path.join(currentDirPath, keyword);

    if (!fs.existsSync(newKeywordPath)) {
        fs.mkdirSync(newKeywordPath); // will throw an error if file already exists so check with existsSync
    }

    contentHandler.getDirContent(currentDirPath) // get current content
        .then((dirContent) => { // textract textractable files
            let filesToTextract = textractHandler.getFilesToTextract(dirContent);
            return Promise.all(filesToTextract.map(file =>
                textractHandler.textractFile(file, keyword)));
        })
        .then((files) => { // move or copy files
            let filesToMove = files.filter(file => file != '');
            return Promise.all(filesToMove.map(oldFilePath => {
                let fileName = oldFilePath.substring(oldFilePath.lastIndexOf('/'));
                let fileParentPath = oldFilePath.substring(0, oldFilePath.lastIndexOf('/'));
                let newFilePath = path.join(currentDirPath, keyword, fileName);
                if (fileParentPath === currentDirPath)
                    rename(oldFilePath, newFilePath);
                else
                    copy(oldFilePath, newFilePath);
            }));
        })
        .then(() => // get updated content
            contentHandler.getDirContent(currentDirPath)
        )
        .then((dirContent) => {
            res.json(dirContent);
        })
        .catch((err) => {
            res.status(422).json({
                message: `${err}`
            });
        })
});

app.listen(3000, function () {
    console.log('App started on port 3000');
});