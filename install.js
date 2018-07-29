/* global exec, mkdir, mv, test */

require('shelljs/global');
var wget = require('node-wget');
var tar = require('tar')

var path = require('path')

var fusekiTar = 'apache-jena-fuseki-3.8.0.tar.gz'
var fusekiDownload = path.join(__dirname, 'downloads', fusekiTar)
var fusekiUnzip = path.join(__dirname, fusekiTar.split('.').slice(0, -2).join('.'))
var fusekiApp = path.join(__dirname, '/../../fuseki')

if (!test('-f', fusekiDownload)) {
  mkdir('-p', 'downloads')
//  exec('wget https://mirror.synyx.de/apache/jena/binaries/' + fusekiTar + ' -O "' + fusekiDownload + '"')
var url = 'https://mirror.synyx.de/apache/jena/binaries/'+fusekiTar;

//var url = "https://spoggy.herokuapp.com/";
wget({url: url, dest: fusekiDownload},    function (error, response, body) {
        if (error) {
            console.log('--- error:');
            console.log(error);            // error encountered
        } else {
            console.log('--- headers:');
            console.log(response.headers); // response headers
            console.log('--- body:');
            console.log(body);             // content of package
            fin()
        }
    });
}


function fin(){
  console.log("Fuseki Téléchargé")

if (!test('-d', fusekiApp)) {
  //exec('tar -xzf ' + fusekiDownload)
  tar.x(  // or tar.extract(
  {
    file: fusekiDownload
  }
).then(_=> {
  mv(fusekiUnzip, fusekiApp)
   //.. tarball has been dumped in cwd .. })
console.log("Installation de Fuseki dans "+fusekiApp+" terminéee")
});
}}
