const textract = require('textract');

// returns an array of files to textract
function getFilesToTextract(pathContent) {
    const files = [];
    pathContent.forEach(file => {
        if (file.type === 'Directory') return;
        
        let fileExt = file.type.replace(" File", "").toLowerCase();
        if (fileExt == 'txt' || fileExt == 'docx' ||
        fileExt == 'pptx' || fileExt == 'pdf' ||
        fileExt == 'jpg' || fileExt == 'png') {
            files.push(file.fullName);
        }
    })
    return files;
}

// Each of the files returned from getFilesToTextract() is textracted.
// returns a promise that
//   rejects with err if textract cannot textract the file or
//   resolve with empty string if file name or text does not contain the keyword or
//   resolve with the file's full path name if matched!
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