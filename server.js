const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const stat = promisify(require('fs').stat);

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

var _pathName = './';
var _keyword = '';

app.get('/api/files', (req, res) => {
  getPathContent(_pathName).then((pathContent) => {
    const metadata = { total_count: pathContent.length };
    res.json({ _metadata: metadata, records: pathContent, path: _pathName });
  }, (err) => {
    res.status(422).json({ message: `${err}`  });
  });
});

app.post('/api/keyword', (req, res) => {
  const keyword = req.body.keyword;

  // organize files
  // create a directory named keyword
  let absPath = path.join(path.resolve(_pathName), keyword);
  if (!fs.existsSync(absPath)) {
    fs.mkdirSync(absPath);
  }


  // move all matching files in the keyword
  /*
    1. traverse all the files
    2. read files and match keywords
    3. move matching files
  */

  getPathContent(_pathName).then((pathContent) => {
    res.json(pathContent);
  }, (err) => {
    res.status(422).json({
      message: `${err}`
    });
  })  
});

app.post('/api/path', (req, res) => {
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

// async function getPathContent(path, pathContent = []) {
//   // const pathContent = [];

//   // get files
//   const files = await readdir(newPath)
//   const absPath = path.resolve(_pathName);

//   // iterate each file
//   for (let file of files) {
//     // get file info and store in pathContent
//     try {
//       let fileStat = await stat(absPath + '/' + file)
//       if (fileStat.isFile()) {
//         if (file.charAt(0) != '.') {
//           pathContent.push({
//             path: _pathName,
//             fullName: file,
//             name: file.substring(0, file.lastIndexOf('.')),
//             type: file.substring(file.lastIndexOf('.') + 1).toUpperCase().concat(' File'),
//             size: Math.ceil(fileStat.size/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' KB',
//           })
//         }
//       } else if (fileStat.isDirectory()) {
//         if (file.charAt(0) != '.') {
//           pathContent.push({
//             path: _pathName,
//             fullName: file,
//             name: file,
//             type: 'Directory',
//             size: '--',
//           });
//         }
//         // pathContent.push(getPathContent(path.join(pathName, file), pathContent));
//         // console.log(path.join(pathName, file));
//       }
//     } catch (err) {
//       console.log(`${err}`);
//     }
//   }
//   return pathContent;
// }

async function getPathContent(newPath, pathContent = []) {
  // const pathContent = [];

  // get files
  const files = await readdir(newPath)
  _pathName = newPath;
  pathContent.length = 0;
  const absPath = path.resolve(_pathName);

  // iterate each file
  for (let file of files) {
    // get file info and store in pathContent
    try {
      let fileStat = await stat(absPath + '/' + file)
      if (fileStat.isFile()) {
        if (file.charAt(0) != '.') {
          pathContent.push({
            path: _pathName,
            fullName: file,
            name: file.substring(0, file.lastIndexOf('.')),
            type: file.substring(file.lastIndexOf('.') + 1).toUpperCase().concat(' File'),
            size: Math.ceil(fileStat.size/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' KB',
          })
        }
      } else if (fileStat.isDirectory()) {
        if (file.charAt(0) != '.') {
          pathContent.push({
            path: _pathName,
            fullName: file,
            name: file,
            type: 'Directory',
            size: '--',
          });
        }
        // pathContent.push(getPathContent(path.join(pathName, file), pathContent));
        // console.log(path.join(pathName, file));
      }
    } catch (err) {
      console.log(`${err}`);
    }
  }
  return pathContent;
}