const pug = require('pug');
const Rx = require('rxjs/Rx');
const fs = require('fs');
const IMG_PATH = './images/';
const IMG_DIR = './images/';

/**
* Creates the HTML of the gallery home page
*/

module.exports = renderHome;

function homeData() {
  const readFiles$ = Rx.Observable.bindNodeCallback(fs.readdir);

  const homeData$ = readFiles$(IMG_DIR)
  .flatMap(filenames => Rx.Observable.from(filenames))
  .filter(filename => /\.png$/.test(filename))
  .map(filename => ({
      src: IMG_PATH + filename,
      caption: filename.replace('.png', ''),
      class: filename.replace(/(\.png)|\s+/g, '').toLowerCase()
    })
  )
  .reduce((acc, curr) => [...acc, curr], []);

  return homeData$;
}

function homeHtml(data) {
  return Rx.Observable.of(
    pug.renderFile('home.pug', {
      images: data
    })
  );
}

function renderHome() {
  return homeData().mergeMap(homeHtml);
}