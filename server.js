const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

var pathName = '';
const pathContent = [];

app.get('/api/path', (req, res) => {
    const metadata = { total_count: pathContent.length };
    res.json({ _metadata: metadata, records: pathContent });
});

app.post('/api/path', (req, res) => {
    const newPath = req.body.path;

    // ./files
    fs.readdir(newPath, (err, files) => {
        if (err) {
            res.status(422).json({ message: `\nPath "${newPath}" could not be opened with the following error:\n${err}` });
            return;
        }
        pathContent.length = 0;
        let absPath = path.resolve(newPath);
        console.log(absPath);
        files.forEach(file => {
            pathContent.push({
                path: newPath,
                name: file.lastIndexOf('.') >= 0 ? file.substring(0, file.lastIndexOf('.')) : file,
                type: file.lastIndexOf('.') >= 0 ? file.substring(file.lastIndexOf('.') + 1).concat('File') : 'Directory',
            })
        });

        // set the path name
        pathName = newPath;
        console.log(pathName);
        res.json(pathContent);
    });    
});

app.listen(3000, function () {
    console.log('App started on port 3000');
});