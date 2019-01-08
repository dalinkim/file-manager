'use strict';

const textract = require('textract');
    
// returns an array of fileObjs to textract
function getFilesToTextract(dirContent) {
    return dirContent
        .filter(fileObj => {
            // fileType is all lowerCased.
            return (fileObj.fileType !== 'Directory') && 
                    (fileObj.fileSize > 0) &&
                    (fileObj.fileExt === 'txt' || fileObj.fileExt === 'docx' ||
                    fileObj.fileExt === 'pptx' || fileObj.fileExt === 'pdf' ||
                    fileObj.fileExt === 'jpg' || fileObj.fileExt === 'png');
        });
}

// Each of the files returned from getFilesToTextract() is textracted.
// returns a promise that
//   rejects with err if textract cannot textract the file or
//   resolve with fileObj with matchedKeywords arr added
// Limitation: not an exact match (i.e. "files" would be considered matched with "file" keyword)
// Limitation: file is not textracted if the filesize is 0.
function textractFile(fileObj, keywords) { // got array of keywords
    return new Promise((resolve, reject) => {
        textract.fromFileWithPath(fileObj.filePath, (err, text) => {
            if (err) { reject(err); }

            fileObj.matchedKeywords = [];
            keywords.forEach(keyword => {
                if (fileObj.fileName.toLowerCase().includes(keyword) || (typeof text !== 'undefined' && text.toLowerCase().includes(keyword)))
                    fileObj.matchedKeywords.push(keyword);
            })
            resolve(fileObj);
        });
    });
}

module.exports = {
    getFilesToTextract,
    textractFile,
}