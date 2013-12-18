/*

  (The MIT License)

  Copyright (C) 2005-2013 Kai Davenport

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*
  Module dependencies.
*/

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var wrench = require('wrench');

function C3D2(options){
  EventEmitter.call(this);
  this.options = options || {};
}

util.inherits(C3D2, EventEmitter);

module.exports = C3D2;

C3D2.prototype.inject_assets = function(from, done){
  var outputfolder = this.options.dir + '/assets/www';

  wrench.mkdirSyncRecursive(outputfolder);
  wrench.rmdirSyncRecursive(outputfolder, true);
  wrench.copyDirSyncRecursive(from, outputfolder);

  done && done();
}

C3D2.prototype.create = function(done){

  var outputfolder = this.options.dir;

  var settings = {
    appname:this.options.name,
    apptitle:this.options.title,
    packagename:this.options.package
  }

  var inputfolder = path.normalize(__dirname + '/../android_template/app_template');

  wrench.mkdirSyncRecursive(outputfolder);
  wrench.rmdirSyncRecursive(outputfolder, true);
  wrench.copyDirSyncRecursive(inputfolder, outputfolder);

  var code_folder = outputfolder + '/src/' + (settings.packagename.split('.').join('/'));

  wrench.mkdirSyncRecursive(code_folder);

  var code_templates = {
    'MyPhoneGap.java':'MyPhoneGap.java',
    'AppName.java':settings.appname + '.java'
  }

  Object.keys(code_templates || {}).forEach(function(inpath){
    var outpath = code_templates[inpath];
    var filename = path.normalize(__dirname + '/../android_template/code_template/' + inpath);

    var text = fs.readFileSync(filename, 'utf8');
    var code = ejs.render(text, {
      settings:settings
    })

    fs.writeFileSync(code_folder + '/' + outpath, code, 'utf8');

  })
  
  var templates = [
    'build.xml',
    'AndroidManifest.xml',
    '.project',
    'res/xml/config.xml',
    'res/values/strings.xml',
    'res/layout/main.xml'
  ]

  templates.forEach(function(templatepath){

    console.log('rendering: ' + templatepath);

    var text = fs.readFileSync(path.normalize(outputfolder + '/' + templatepath), 'utf8');
    var code = ejs.render(text, {
      settings:settings
    })
    
    fs.writeFileSync(outputfolder + '/' + templatepath, code, 'utf8');
  })

  done && done();
  
}