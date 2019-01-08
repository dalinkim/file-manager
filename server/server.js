'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const rename = promisify(fs.rename);
const copy = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);
const textractHandler = require('./textractHandler.js');
const contentHandler = require('./contentHandler.js');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

// GET
app.get('/api/files', (req, res) => {
    const defaultDirPath = path.resolve(__dirname);
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
            const metadata = { total_count: dirContent.length };
            res.json({
                _metadata: metadata,
                records: dirContent,
                dirPath: newDirPath
            });
        })
        .catch((err) => {
            res.status(422).json({
                message: `${err}`
            });
        })
});

// POST - organize files based on keywords
app.post('/api/keywords', (req, res) => {
    const keywords = req.body.keywords; // array of keywords
    const currentDirPath = path.resolve(req.body.dirPath);

    let _fileObjs; // array of file objects that are textractable

    contentHandler.getDirContent(currentDirPath) // get current content
        .then((dirContent) => {
            // textract textractable files
            let fileObjsToTextract = textractHandler.getFilesToTextract(dirContent);
            return Promise.all(fileObjsToTextract.map(fileObj =>
                textractHandler.textractFile(fileObj, keywords)));
        })
        .then((fileObjs) => {
            _fileObjs = fileObjs;
            if (!fs.existsSync(path.join(currentDirPath, 'textracted'))) {
                fs.mkdirSync(path.join(currentDirPath, 'textracted'));
            }
            return Promise.all(fileObjs.map(fileObj =>
                writeFile(path.join(currentDirPath, 'textracted', fileObj.fileName + '.txt'),
                    `Matched keywords: [${fileObj.matchedKeywords}]\n\n${fileObj.text}`
                )));
        })
        .then(() => {
            // create folders for each keyword
            keywords.forEach(keyword => {
                let newKeywordPath = path.join(currentDirPath, keyword);
                if (!fs.existsSync(newKeywordPath)) {
                    // will throw an error if file already exists so check with existsSync
                    fs.mkdirSync(newKeywordPath);
                }
            });

            // only copies files for now as moving loses track of original locations of files
            return Promise.all(_fileObjs.filter(fileObj => fileObj.matchedKeywords.length != 0)
                .map(fileObj => {
                    fileObj.matchedKeywords.map(keyword => {
                        let newFilePath = path.join(currentDirPath, keyword, fileObj.fileName);
                        // if (fileObj.dirPath === currentDirPath)
                        //     rename(fileObj.filePath, newFilePath);
                        // else
                        if (fileObj.dirPath !== path.join(currentDirPath, keyword))
                            copy(fileObj.filePath, newFilePath);
                    });
                }))
        })
        .then(() => { // get updated content 
            return contentHandler.getDirContent(currentDirPath)
        })
        .then((dirContent) => {
            const metadata = { total_count: dirContent.length };
            res.json({
                _metadata: metadata,
                records: dirContent,
                dirPath: currentDirPath
            });
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
