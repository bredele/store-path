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
					cache = null;

			for(var j = 1, h = path.length; j < h; j++) {
				if(!attr[path[j]]) attr[path[j]] = {};
				if((j+1) === h) attr[path[j]] = val;
			}
			debugger
			store.set(path[0], attr);
		}
	};

	store.change = function() {

	};
};
