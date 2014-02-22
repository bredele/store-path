
/**
 * Expose Middleware
 */

module.exports = function(store) {

	store.path = function(name, val) {
		var path = name.split('.'),
		    attr = store.get(path[0]);

		for(var i = 1, l = path.length; i < l; i++) {
			attr = attr[path[i]];
		}
		return attr;
	};

	store.change = function() {

	};
};
