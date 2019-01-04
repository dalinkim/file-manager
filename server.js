const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const stat = promisify(require('fs').stat);

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

var pathName = './';

app.get('/api/files', (req, res) => {
    // const metadata = { total_count: pathContent.length };
    // res.json({ _metadata: metadata, records: pathContent });
    getPathContent(pathName).then((pathContent) => {
        const metadata = { total_count: pathContent.length };
        res.json({ _metadata: metadata, records: pathContent });
      }, (err) => {
        res.status(422).json({
          message: `${err}`
        });
      })
});

app.post('/api/files', (req, res) => {
    const newPath = req.body.path;
    getPathContent(newPath).then((pathContent) => {
      res.json(pathContent);
    }, (err) => {
      res.status(422).json({
        message: `${err}`
      });
    })
});

app.listen(3000, function () {
    console.log('App started on port 3000');
});

async function getPathContent(newPath) {
    const pathContent = [];

    let files = await readdir(newPath)
  
    let pathName = newPath;
    pathContent.length = 0;
  
    const absPath = path.resolve(pathName);
  
    // iterate each file
    for (let file of files) {
      // get file info and store in pathContent
      try {
        let fileStat = await stat(absPath + '/' + file)
        if (fileStat.isFile()) {
          pathContent.push({
            path: pathName,
            fullName: file,
            name: file.substring(0, file.lastIndexOf('.')),
            type: file.substring(file.lastIndexOf('.') + 1).concat(' File'),
            size: fileStat.size,
          })
        } else if (fileStat.isDirectory()) {
          pathContent.push({
            path: pathName,
            fullName: file,
            name: file,
            type: 'Directory',
            size: fileStat.size,
          });
        }
      } catch (err) {
        console.log(`${err}`);
      }
    }
    return pathContent;
  }