# file-manager

using node v10.15.0 (npm v6.4.1)

Get Path Content - get files from the given path<br>
1. F - get path from input - complete<br>
FilePath Component<br>
uses a form to get the url from a user<br>

2. F - send path to B - complete<br>
FilePath sets the path using its parent's passed down method (setPath()), which triggers POST for the server to update its pathName.<br>

3. B - get path<br>

4. B - update the list of files<br>

5. B - send the updated list of file to F<br>

6. F - sets path - complete<br>
Once the response ok is received, setPath() sets the state with updated path. This will reload the components, including FileTable

7. F - display files