const renderHome = require('./renderHome');
const Rx = require('rxjs/Rx');
const fs = require('fs');
const FILEPATH = './index.html';

/**
* usage: node createHtmlFile.js
* Creates the webpage "./index.html" that can be used standalone to view the gallery
*/

function createHtmlFile() {
  const writeFiles$ = Rx.Observable.bindNodeCallback(fs.writeFile);

  return renderHome().mergeMap(html => writeFiles$(FILEPATH, html, 'utf8'));
}

createHtmlFile().subscribe(() => console.log(FILEPATH + ' created'));