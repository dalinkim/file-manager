# File Organizer v1.0

This file organizer app was created for a course project.  
This is a single page web application that can assists with organizing files in a given directory path.  

Based on the keyword(s) a user provides, 
- new subfolder(s) (each named with a given keyword) will be created
- copies of the *matching* files will be placed inside the subfolder(s).  

A file is considered *matched* if its file name and/or its textual content contains the keyword provided.  
Using textract module, the application is able to extradt text from the following file types:  
- DOC
- DOCX
- JPG/JPEG
- PDF
- PNG
- PPTX
- TXT   
*NOTE: textract is capable of handling many more different file types.*

## Key Tech / Framework Used
**Built with**
- Node v10.15.0 (npm v6.4.1)
- Express
- React
- textract  

textract is a text extraction node.js module that works with various file types.  
See their [GitHub page](https://github.com/dbashford/textract) for more details.

:turtle: