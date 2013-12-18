c3d2
====

Droid factory - bootstrap a HTML5 android application quickly using a phonegap template

## install

```
$ npm install c3d2 -g
```

## examples

You can create android templates from within your node app:

```js
var C3D2 = require('c3d2');

var factory = new C3D2({
	dir:'/output/folder',
	name:'MyApp',
	title:'My App',
	package:'com.my.app'
})

factory.create(function(){
	factory.inject_assets('/my/html5/app/www', function(){
		console.log('we have a new droid!');
	})
})
```

Or you can use the cli.

```
$ c3d2 create /srv/testapp -n Test -t "Test App" -p com.test.test -a /srv/html5app/www
```

This will create a new app in /srv/testapp and will inject /srv/html5app/www

```
Usage: c3d2 [options] [command]

Commands:

  create [dir]           convert the big images to small ones
  *

Options:

  -h, --help              output usage information
  -d, --dir <string>      where to create the android app
  -a, --assets <string>   where to copy the HTML5 app from
  -n, --name <string>     the folder name of the app
  -t, --title <string>    the title of the app
  -p, --package <string>  the package name of the app
  -V, --version           output the version number
```

## licence

MIT