'use strict';

const textract = require('textract');
    
// returns an array of fileObjs to textract
function getFilesToTextract(dirContent) {
    return dirContent
        .filter(fileObj => {
            return (fileObj.fileType !== 'Directory') && 
                    (fileObj.fileExt === 'txt' || fileObj.fileExt === 'docx' ||
                    fileObj.fileExt === 'pptx' || fileObj.fileExt === 'pdf' ||
                    fileObj.fileExt === 'jpg' || fileObj.fileExt === 'png');
        })
        .map(fileObj => fileObj.filePath);
}

// Each of the files returned from getFilesToTextract() is textracted.
// returns a promise that
//   rejects with err if textract cannot textract the file or
//   resolve with empty string if file name or text does not contain the keyword or
//   resolve with the file's full path name if matched!

// Limitation: not an exact match (i.e. "files" would be considered matched with "file" keyword)
function textractFile(fileAbsPath, keyword) {
    return new Promise((resolve, reject) => {
        textract.fromFileWithPath(fileAbsPath, (err, text) => {
            // console.log(keyword);
            if (err)
                reject(err);
            if (fileAbsPath.indexOf(keyword) == -1 && text.indexOf(keyword) == -1)
                resolve('');
            else
                resolve(fileAbsPath); // matching file!
        });
    });
}

module.exports = {
    getFilesToTextract,
    textractFile,
}