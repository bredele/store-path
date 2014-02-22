var clone = require('clone');

/**
 * Expose Middleware
 */

module.exports = function(store) {

	store.path = function(name, val) {
		if(!val) {
			var path = name.split('.'),
			    attr = store.get(path[0]);

			for(var i = 1, l = path.length; i < l; i++) {
				attr = attr[path[i]];
			}
			return attr;
		} else {
			var path = name.split('.'),
					attr = clone(store.get(path[0])),
					cache = attr;

			for(var j = 1, h = path.length - 1; j < h; j++) {
				var prop = path[j];
				if(!cache.hasOwnProperty(prop) || (typeof cache[prop] !== 'object')) {
					cache[prop] = {};
				}
				cache = cache[prop];
			}
			cache[path[h]] = val;
			store.set(path[0], attr);
		}
	};

	store.change = function() {

	};
};
