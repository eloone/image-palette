const express = require('express');
const app = express();
const pug = require('pug');
const Rx = require('rxjs/Rx');
const fs = require('fs');
const renderHome = require('./renderHome');

function homeData() {
  const readFiles = Rx.Observable.bindNodeCallback(fs.readdir);

  const homeData = readFiles('./public')
  .flatMap(filenames => Rx.Observable.from(filenames))
  .filter(filename => /\.png$/.test(filename))
  .map(filename => ({
      src: filename,
      caption: filename.replace('.png', ''),
      class: filename.replace(/(\.png)|\s+/g, '').toLowerCase()
    })
  )
  .reduce((acc, curr) => [...acc, curr], [])

  return homeData;
}

app.use('/images', express.static(__dirname + '/images'));

app.get('/', function (req, res) {
  /*const subs = homeData().subscribe(images => {
    const renderedHome = pug.renderFile('index.pug', {
      title: 'Tool Presets Viewer',
      subtitle: 'View how your Photoshop tool presets render',
      images: images
    });

    res.send(renderedHome);
    subs.unsubscribe();
  });*/

  const subs = renderHome().subscribe(html => {
    res.send(html);
    subs.unsubscribe();
  });

});

app.listen(3000, function () {
  console.log('Listening on port 3000')
});