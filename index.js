const chokidar = require('chokidar'), fs = require('fs');

class JsonLoader{
  constructor(dir){
    this.dir = dir;
    this.routs = {};
    this.watcher = chokidar.watch(dir, { ignored: /[\/\\]\./, persistent: true});
  //this.watcher.on('ready', () => { //watcher change
  this.watcher.on('all', (event, path)=> {
    if(event == "add"||event == "change"){
      fs.readFile("./"+path,(err,file)=>{
        try{
          let data = JSON.parse(file)
          this.routs[(data[data.key]||path.split(".")[0])] = data;
        }catch(err){
          console.log(`ERR: ${err} on file ${path} with data "${file}"`)
        }
      })
    }
  })
//}) //watcher change
  }
}
module.exports = JsonLoader;
