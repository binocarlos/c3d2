c3d2
====

Droid factory - bootstrap a HTML5 android application quickly using a phonegap template

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

This will create a new app in /srv/testapp and will inject /srv/html5app/www

```
$ c3d2 create /srv/testapp -n Test -t "Test App" -p com.test.test -a /srv/html5app/www
```

