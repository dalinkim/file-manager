var textract = require('textract');
var path = './files/PNG1.png';


// txt - textract.fromFileWithPath(path, (error, text) => {
// docx - textract.fromFileWithPath(path, (error, text) => {
// pdf - textract.fromFileWithPath(path, (error, text) => {
// pptx - textract.fromFileWithPath(path, (error, text) => {
// jpg - textract.fromFileWithPath(path, (error, text) => {
// png - textract.fromFileWithPath(path, (error, text) => {

// doc - no
// ppt - no

textract.fromFileWithPath(path, (error, text) => {
    
    console.log(text);
    console.log(typeof text);
});


// textract.fromFileWithMimeAndPath('application/msword', path, (error, text) => {
//     console.log(text);
//     console.log(typeof text);
// });