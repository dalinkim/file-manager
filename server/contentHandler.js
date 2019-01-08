'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getDirContent(pathName) {
    let dirContent = []; // to be updated and returned

    let files = await readdir(pathName); // get files
    let absDirPath = path.resolve(pathName);

    // console.log(files);

    for (let file of files) { // iterate each file
        let absFilePath = path.resolve(absDirPath, file);
        try {
            let fileStat = await stat(absFilePath);
            if (fileStat.isFile()) {
                if (file.charAt(0) != '.') { // ignores any hidden file
                    // console.log(file);
                    let fileExt = file.lastIndexOf('.') > -1 ? file.substring(file.lastIndexOf('.') + 1).toLowerCase() : '';
                    // console.log(fileExt);
                    dirContent.push({
                        dirPath: absDirPath,
                        filePath: absFilePath,
                        fileExt: fileExt,
                        // fileExt: '',
                        fileName: file,
                        fileType: fileExt.toLowerCase().concat(' File'),
                        // fileType: 'File',
                        // fileSize: Math.ceil(fileStat.size / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' KB',
                        fileSize: fileStat.size,
                    })
                }
            } else if (fileStat.isDirectory()) {
                if (file.charAt(0) != '.') { // ignores any hidden file
                    // console.log('something here?');
                    dirContent.push({
                        dirPath: absDirPath,
                        filePath: absFilePath,
                        fileExt: '',
                        fileName: file,
                        fileType: 'Directory',
                        fileSize: '--',
                    });
                    // recursion for any directory
                    const subDirContent = await getDirContent(path.join(pathName, file));
                    dirContent = dirContent.concat(subDirContent);
                }
            }
        } catch (err) {
            console.log(`${err}`);
        }
    }
    return dirContent.sort(compare);
}

function compare(a, b) {
    if (a.dirPath.toLowerCase() < b.dirPath.toLowerCase()) return -1;
    if (a.dirPath.toLowerCase() > b.dirPath.toLowerCase()) return 1;
    if ((a.fileType === 'Directory') != (b.fileType === 'Directory')) {
        return a.fileType === 'Directory' ? -1 : 1;
    }
    if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) return -1;
    if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) return 1;
    return 0;
}

module.exports = {
    getDirContent,
}