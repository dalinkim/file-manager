const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rename = promisify(fs.rename);
const keywordHandler = require('./keywordHandler.js')

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

var _pathName = './files';
// var pathContent = [];
var _keyword = '';

app.get('/api/files', (req, res) => {
  const err = setPath(_pathName);
  if (err) {
    res.status(422).json({ message: `${err}`});
    return;
  }

  getPathContent(_pathName)
  .then((pathContent) => {
    const metadata = { total_count: pathContent.length };
    res.json({ _metadata: metadata, records: pathContent, path: _pathName });
  })
  .catch((err) => {
    res.status(422).json({ message: `${err}` });
  });
});

app.post('/api/keyword', (req, res) => {
  const keyword = req.body.keyword;

  // create a directory named keyword
  let absPath = path.join(path.resolve(_pathName), keyword);
  if (!fs.existsSync(absPath)) {
    fs.mkdirSync(absPath);
  }

  getPathContent(_pathName)
  .then((pathContent) => {
    let filesToTextract = keywordHandler.getFilesToTextract(pathContent);
    return Promise.all(filesToTextract.map(file => 
      keywordHandler.textractFile(file, keyword)));
  })
  .then((files) => {
    let filesToMove = files.filter(file => file != '');
    console.log(filesToMove);
    return Promise.all(filesToMove.map(oldName => rename(oldName, path.join(_pathName, keyword, oldName.substring(oldName.lastIndexOf('/'))))));
  })
  .then(() => getPathContent(_pathName))
  .then((pathContent) => {
    console.log(pathContent);
    res.json(pathContent);
  })
  .catch((err) => {
    res.status(422).json({ message: `${err}` });
  })

  
});

app.post('/api/path', (req, res) => {
  const newPath = req.body.path;
  const err = setPath(newPath);
  if (err) {
    res.status(422).json({ message: `${err}`});
    return;
  }

  getPathContent(newPath)
  .then((pathContent) => {
    res.json(pathContent);
  })
  .catch((err) => {
    res.status(422).json({ message: `${err}` });
  })
});

app.listen(3000, function () {
  console.log('App started on port 3000');
});

function setPath(pathName) {
  if (!fs.existsSync(pathName)) 
    return 'Invalid path';
  
  _pathName = pathName;
  return null;
}

async function getPathContent(pathName) {
  let pathContent = [];

  // get files
  const files = await readdir(pathName);
  const absDirPath = path.resolve(pathName);

  // iterate each file
  for (let file of files) {
    // get file info and store in pathContent
    const absFilePath = path.resolve(absDirPath, file);
    try {
      let fileStat = await stat(absFilePath);
      if (fileStat.isFile()) {
        const fileExt = file.substring(file.lastIndexOf('.') + 1);
        if (file.charAt(0) != '.') {
          pathContent.push({
            path: absDirPath,
            fullName: absFilePath,
            name: file.substring(0, file.lastIndexOf('.')),
            type: fileExt.toUpperCase().concat(' File'),
            size: Math.ceil(fileStat.size/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' KB',
          })
        }
        // if (fileExt == 'txt' || fileExt == 'docx' || fileExt == 'pptx' || fileExt == 'pdf' || fileExt == 'jpg' || fileExt == 'png') {
        //   var result = await textractFile(absFilePath);
        //   console.log(file);
        //   console.log(result);
        // }
      } else if (fileStat.isDirectory()) {
        if (file.charAt(0) != '.') {
          pathContent.push({
            path: absDirPath,
            fullName: absFilePath,
            name: file,
            type: 'Directory',
            size: '--',
          });
          const subPathContent = await getPathContent(path.join(pathName, file));
          pathContent = pathContent.concat(subPathContent);
        }
        // pathContent.push(getPathContent(path.join(pathName, file), pathContent));
        // console.log(path.join(pathName, file));
      }
    } catch (err) {
      console.log(`${err}`);
    }
  }
  // console.log(pathContent.length);
  return pathContent;
}