## Licence
Liscensed under the BSD License (BSD-LICENSE.txt)

## Examples of use:
```javascript
var MyObject = function(/* ... */) {
	/* ... */
};
$.EventEmitter.applyTo(MyObject);
MyObject.prototype.method = function() {
	/* ... */
	this.trigger('method', ['foo', 'bar']);
	/* ... */
};

/* ... */

var obj = new MyObject();
obj.bind('method', function(a, b) {
	console.log(a); // 'foo'
	console.log(b); // 'bar'
};
```

